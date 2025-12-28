import { NextResponse } from 'next/server';
import { ImageResponse } from '@vercel/og';
import axios from 'axios';

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

export async function GET(request) {
  let matches = [];
  let error = null;

  try {
    if (!FOOTBALL_API_KEY) {
      throw new Error('FOOTBALL_API_KEY not set');
    }
    const res = await axios.get(`${BASE_URL}/competitions/PL/matches`, {
      headers: { 'X-Auth-Token': FOOTBALL_API_KEY },
      params: { 
        status: 'LIVE',
        // Opsional: batasi hanya hari ini
        // dateFrom: '2025-12-28',
        // dateTo: '2025-12-28'
      }
    });
    matches = res.data.matches || [];
  } catch (err) {
    console.error('API Error:', err.message);
    error = 'Gagal ambil data';
  }

  let displayText = '🔍 Tidak ada pertandingan live';
  if (error) {
    displayText = '⚠️ Error: cek API key';
  } else if (matches.length > 0) {
    const match = matches[0];
    const home = match.homeTeam.name || 'Home';
    const away = match.awayTeam.name || 'Away';
    const homeScore = match.score.fullTime.home ?? 0;
    const awayScore = match.score.fullTime.away ?? 0;
    const score = `${homeScore} - ${awayScore}`;
    displayText = `${home} ${score} ${away}\n⏱️ Live`;
  }

  // URL dasar (otomatis diisi Vercel)
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/api/og?text=${encodeURIComponent(displayText)}" />
      <meta property="fc:frame:button:1" content="🔁 Refresh Skor" />
      <meta property="fc:frame:post_url" content="${baseUrl}/" />
    </head>
    </html>
  `;
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
}

// Handle POST (saat user klik tombol)
export async function POST(request) {
  // Cukup redirect ke GET — biar ambil data terbaru
  return GET(request);
}

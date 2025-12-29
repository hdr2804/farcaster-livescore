import { NextResponse } from 'next/server';
import axios from 'axios';

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

export async function GET() {
  let displayText = '🔍 Mengambil data...';

  try {
    if (!FOOTBALL_API_KEY) throw new Error('API key tidak disetel');

    const res = await axios.get(`${BASE_URL}/competitions/PL/matches`, {
      headers: { 'X-Auth-Token': FOOTBALL_API_KEY },
      params: { status: 'LIVE' }
    });

    const matches = res.data.matches || [];
    if (matches.length > 0) {
      const m = matches[0];
      const home = m.homeTeam.name || 'Home';
      const away = m.awayTeam.name || 'Away';
      const s = `${m.score.fullTime.home ?? 0} - ${m.score.fullTime.away ?? 0}`;
      displayText = `${home} ${s} ${away}\n⏱️ Live`;
    } else {
      displayText = '🥅 Tidak ada pertandingan live hari ini';
    }
  } catch (err) {
    console.error('Error:', err.message);
    displayText = '⚠️ Gagal ambil data\n(Cek API key di Vercel)';
  }

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

// Tangani klik tombol
export async function POST() {
  return GET();
}

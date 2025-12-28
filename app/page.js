import { NextResponse } from 'next/server';
import { ImageResponse } from '@vercel/og';
import axios from 'axios';

const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

export async function GET(request) {
  let matches = [];
  let error = null;

  try {
    const res = await axios.get(`${BASE_URL}/competitions/PL/matches`, {
      headers: { 'X-Auth-Token': FOOTBALL_API_KEY },
      params: { status: 'LIVE' }
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
    const home = match.homeTeam.name;
    const away = match.awayTeam.name;
    const score = `${match.score.fullTime.home ?? 0} - ${match.score.fullTime.away ?? 0}`;
    const minute = match.status === 'LIVE' ? `⏱️ Live` : '';
    displayText = `${home} ${score} ${away}\n${minute}`;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${process.env.VERCEL_URL}/api/og?text=${encodeURIComponent(displayText)}" />
      <meta property="fc:frame:button:1" content="🔁 Refresh Skor" />
      <meta property="fc:frame:post_url" content="${process.env.VERCEL_URL}/" />
    </head>
    </html>
  `;
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
}

// --- 🔑 WAJIB: nonaktifkan static rendering ---
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';

function getSafeTime() {
  try {
    return new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Jakarta',
      hour12: false,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return new Date().toISOString().substring(11, 16);
  }
}

export async function GET() {
  const displayText = '🥅 Tidak ada pertandingan live\n🕒 ' + getSafeTime();

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
    <body>
      <h1>✅ Frame Aktif!</h1>
      <p>${displayText}</p>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

export async function POST() {
  return GET();
}

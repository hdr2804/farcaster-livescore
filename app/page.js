// --- 🔑 PASTIKAN INI ADA DI ATAS ---
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';

export async function GET() {
  // ✅ JANGAN PAKAI API UNTUK SEKARANG — HANYA TAMPILKAN TEKS STATIS
  const displayText = '⚽ Farcaster Livescore\n🕒 Live Update Skor Bola';

  // URL dasar (Vercel otomatis isi)
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/api/og?text=${encodeURIComponent(displayText)}" />
      <meta property="fc:frame:button:1" content="🔁 Refresh" />
      <meta property="fc:frame:post_url" content="${baseUrl}/" />
    </head>
    <body>
      <h1>✅ Frame Berhasil!</h1>
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

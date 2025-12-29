import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://via.placeholder.com/1120x630/0f172a/ffffff?text=⚽+Livescore+Test" />
      <meta property="fc:frame:button:1" content="🔁 Refresh" />
      <meta property="fc:frame:post_url" content="https://farcaster-livescore.vercel.app/" />
    </head>
    <body>
      <h1>✅ Frame Berhasil!</h1>
      <p>Jika kamu lihat ini di Warpcast, berarti Frame sudah jalan.</p>
    </body>
    </html>
  `;
  return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
}

export async function POST() {
  return GET();
}

import { NextResponse } from 'next/server';

// Fungsi bantu: aman di semua lingkungan
function getCurrentTime() {
  try {
    return new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Jakarta',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return new Date().toISOString().split('T')[1].substring(0, 5);
  }
}

export async function GET() {
  let displayText = '🥅 Tidak ada pertandingan live';

  // ✅ JANGAN PERNAH panggil API jika tidak yakin key valid
  // Untuk sementara, kita matikan API dan pakai dummy data dulu
  // (uncomment bagian bawah setelah Frame sudah muncul)

  /*
  try {
    const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
    if (!FOOTBALL_API_KEY) {
      displayText = '⚠️ API key belum diatur di Vercel';
    } else {
      // ... logika API ...
    }
  } catch (err) {
    displayText = '⚠️ Error: ' + (err.message || 'unknown');
  }
  */

  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="${baseUrl}/api/og?text=${encodeURIComponent(displayText + '\\n🕒 ' + getCurrentTime())}" />
      <meta property="fc:frame:button:1" content="🔁 Refresh Skor" />
      <meta property="fc:frame:post_url" content="${baseUrl}/" />
    </head>
    <body>
      <h1>✅ Frame Aktif!</h1>
      <p>${displayText}</p>
      <p>Waktu: ${getCurrentTime()}</p>
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

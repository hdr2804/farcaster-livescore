export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta property="fc:frame" content="vNext" />
      <meta property="fc:frame:image" content="https://via.placeholder.com/1120x630/0f172a/ffffff?text=✅+Frame+Berhasil" />
      <meta property="fc:frame:button:1" content="🔁 Refresh" />
      <meta property="fc:frame:post_url" content="https://farcaster-livescore.vercel.app/" />
    </head>
    <body>
      <h1>✅ Frame Berhasil!</h1>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

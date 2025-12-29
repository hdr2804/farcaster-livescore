import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// Fungsi aman untuk waktu
function getSafeTime() {
  try {
    const now = new Date();
    const options = { timeZone: 'Asia/Jakarta', hour12: false };
    return now.toLocaleTimeString('en-GB', options);
  } catch {
    return new Date().toISOString().substring(11, 16);
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text') || '⚽ Livescore';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, #0f172a 100%)',
          padding: 40,
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          whiteSpace: 'pre-wrap',
          fontSize: 36,
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 20 }}>⚽ Livescore</div>
        <div style={{ lineHeight: 1.5, maxWidth: '90%' }}>{text}</div>
        <div style={{ marginTop: 40, fontSize: 20, opacity: 0.7 }}>
          {getSafeTime()}
        </div>
      </div>
    ),
    { width: 1120, height: 630 }
  );
}

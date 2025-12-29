import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

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
          fontFamily: 'sans-serif',
          textAlign: 'center',
          whiteSpace: 'pre-wrap',
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 20 }}>⚽ Livescore</div>
        <div style={{ fontSize: 36, lineHeight: 1.4, maxWidth: '90%' }}>{text}</div>
        <div style={{ marginTop: 40, fontSize: 22, opacity: 0.7 }}>
          {new Date().toLocaleString('id-ID')}
        </div>
      </div>
    ),
    { width: 1120, height: 630 }
  );
}

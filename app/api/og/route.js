import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text') || '⚽ Farcaster Livescore';

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
          padding: '40px',
          color: 'white',
          fontFamily: '"Segoe UI", "Helvetica", sans-serif',
          textAlign: 'center',
          whiteSpace: 'pre-wrap',
          lineHeight: 1.4,
        }}
      >
        <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>⚽ Livescore</div>
        <div style={{ fontSize: '36px', maxWidth: '90%', wordBreak: 'break-word' }}>{text}</div>
        <div style={{ marginTop: '40px', fontSize: '22px', opacity: 0.7 }}>
          {new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    ),
    {
      width: 1120,
      height: 630,
    }
  );
}

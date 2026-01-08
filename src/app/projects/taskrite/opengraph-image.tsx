import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TaskRite - AI-Powered Task Management'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0f',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Background gradient effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.3) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50px',
            left: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,63,70,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            zIndex: 10,
          }}
        >
          {/* Live badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '50px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }}
              />
              <span style={{ color: '#4ade80', fontSize: '16px' }}>Live Project</span>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0,
              marginBottom: '16px',
              lineHeight: 1,
            }}
          >
            TaskRite
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '28px',
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              marginBottom: '40px',
              maxWidth: '700px',
              lineHeight: 1.4,
            }}
          >
            AI-powered task management that transforms complex goals into actionable steps
          </p>

          {/* Tech stack pills */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '40px',
            }}
          >
            {['Next.js 15', 'TypeScript', 'Claude AI', 'Supabase'].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 16px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '18px',
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: 'auto',
            }}
          >
            {[
              { value: '27', label: 'DB Migrations' },
              { value: '9', label: 'AI Agents' },
              { value: '50+', label: 'Components' },
              { value: '100%', label: 'TypeScript' },
            ].map((metric) => (
              <div
                key={metric.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#dc2626',
                  }}
                >
                  {metric.value}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Author badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            borderRadius: '50px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            IL
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>
              Ibrahim Lawal
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              Full-Stack Developer
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

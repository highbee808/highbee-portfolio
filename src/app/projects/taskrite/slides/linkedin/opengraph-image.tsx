import { ImageResponse } from 'next/og'
import { taskRiteData } from '@/lib/case-study/taskrite-data'

export const runtime = 'edge'
export const alt = 'TaskRite - AI-Powered Task Management'
export const size = { width: 1080, height: 1080 }
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
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(63,63,70,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
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
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '50px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                }}
              />
              <span style={{ color: '#4ade80', fontSize: '18px' }}>Live Project</span>
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
            {taskRiteData.title}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: '28px',
              color: '#dc2626',
              margin: 0,
              marginBottom: '20px',
              fontWeight: 500,
            }}
          >
            {taskRiteData.tagline}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              marginBottom: '40px',
              lineHeight: 1.5,
              maxWidth: '700px',
            }}
          >
            {taskRiteData.description}
          </p>

          {/* Metrics Grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              flex: 1,
              alignContent: 'flex-start',
            }}
          >
            {taskRiteData.metrics.map((metric) => (
              <div
                key={metric.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '28px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  width: '200px',
                }}
              >
                <span
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#dc2626',
                    marginBottom: '8px',
                  }}
                >
                  {metric.value}
                </span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: 'auto',
            }}
          >
            {taskRiteData.techStack.map((tech) => (
              <div
                key={tech.name}
                style={{
                  padding: '8px 16px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '16px',
                }}
              >
                {tech.name}
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
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
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
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            {taskRiteData.author.initials}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>
              {taskRiteData.author.name}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
              {taskRiteData.author.website}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

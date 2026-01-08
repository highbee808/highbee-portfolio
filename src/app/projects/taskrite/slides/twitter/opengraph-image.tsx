import { ImageResponse } from 'next/og'
import { taskRiteData } from '@/lib/case-study/taskrite-data'

export const runtime = 'edge'
export const alt = 'TaskRite - AI-Powered Task Management'
export const size = { width: 1200, height: 675 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0a0a0f',
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

        {/* Left side - Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
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
              fontSize: '72px',
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
              fontSize: '24px',
              color: '#dc2626',
              margin: 0,
              marginBottom: '16px',
              fontWeight: 500,
            }}
          >
            {taskRiteData.tagline}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: '22px',
              color: 'rgba(255,255,255,0.6)',
              margin: 0,
              maxWidth: '500px',
              lineHeight: 1.4,
            }}
          >
            {taskRiteData.description}
          </p>

          {/* Tech stack pills */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '24px',
            }}
          >
            {taskRiteData.techStack.slice(0, 4).map((tech) => (
              <div
                key={tech.name}
                style={{
                  padding: '6px 14px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                }}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Metrics */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
            paddingLeft: '0',
            gap: '20px',
          }}
        >
          {taskRiteData.metrics.map((metric) => (
            <div
              key={metric.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px 24px',
                borderRadius: '16px',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                }}
              >
                {metric.value}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '16px', fontWeight: 500, color: 'white' }}>
                  {metric.label}
                </span>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  {metric.description}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Author badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {taskRiteData.author.initials}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
              {taskRiteData.author.name}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
              {taskRiteData.author.website}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}

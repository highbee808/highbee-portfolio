import { ImageResponse } from 'next/og'
import type { JSX } from 'react'
import { taskRiteData } from '@/lib/case-study/taskrite-data'

export const runtime = 'edge'
export const alt = 'TaskRite Case Study'
export const size = { width: 1080, height: 1350 }
export const contentType = 'image/png'

// Shared styles
const colors = {
  bg: '#0a0a0f',
  primary: '#dc2626',
  primaryDark: '#991b1b',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.7)',
  textDim: 'rgba(255,255,255,0.5)',
  glass: 'rgba(255,255,255,0.03)',
  border: 'rgba(255,255,255,0.06)',
  success: '#22c55e',
}

// Author badge component
function AuthorBadge() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '48px',
        right: '48px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        borderRadius: '50px',
        backgroundColor: colors.glass,
        border: `1px solid ${colors.border}`,
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        {taskRiteData.author.initials}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ color: 'white', fontSize: '16px', fontWeight: 500 }}>
          {taskRiteData.author.name}
        </span>
        <span style={{ color: colors.textDim, fontSize: '12px' }}>
          {taskRiteData.author.title}
        </span>
      </div>
    </div>
  )
}

// Slide number indicator
function SlideNumber({ current, total }: { current: number; total: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '48px',
        left: '48px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: colors.textDim,
        fontSize: '14px',
      }}
    >
      <span style={{ color: colors.primary, fontWeight: 'bold' }}>{current}</span>
      <span>/</span>
      <span>{total}</span>
    </div>
  )
}

// Cover Slide
function CoverSlide() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      {/* Gradient orbs */}
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {/* Live badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '50px',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: colors.success,
            }}
          />
          <span style={{ color: '#4ade80', fontSize: '18px' }}>Live Project</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '24px',
            lineHeight: 1,
          }}
        >
          {taskRiteData.title}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: '32px',
            color: colors.primary,
            margin: 0,
            marginBottom: '24px',
            fontWeight: 500,
          }}
        >
          {taskRiteData.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: '24px',
            color: colors.textMuted,
            margin: 0,
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
          }}
        >
          {taskRiteData.description}
        </p>
      </div>

      <AuthorBadge />
      <SlideNumber current={1} total={9} />
    </div>
  )
}

// Problem Slide
function ProblemSlide() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '50px',
              backgroundColor: 'rgba(220,38,38,0.2)',
              color: '#f87171',
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            The Problem
          </div>
        </div>

        {/* Problem statement */}
        <h2
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '32px',
            lineHeight: 1.2,
          }}
        >
          Task Management is{' '}
          <span style={{ color: colors.primary }}>Broken</span>
        </h2>

        <p
          style={{
            fontSize: '32px',
            color: colors.textMuted,
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '800px',
          }}
        >
          {taskRiteData.problem}
        </p>
      </div>

      <AuthorBadge />
      <SlideNumber current={2} total={9} />
    </div>
  )
}

// Solution Slide
function SolutionSlide() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '50px',
              backgroundColor: 'rgba(34,197,94,0.2)',
              color: '#4ade80',
              fontSize: '18px',
              fontWeight: 500,
            }}
          >
            The Solution
          </div>
        </div>

        <h2
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '32px',
            lineHeight: 1.2,
          }}
        >
          AI That <span style={{ color: colors.success }}>Understands</span> Your Goals
        </h2>

        <p
          style={{
            fontSize: '28px',
            color: colors.textMuted,
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '800px',
          }}
        >
          {taskRiteData.solution}
        </p>
      </div>

      <AuthorBadge />
      <SlideNumber current={3} total={9} />
    </div>
  )
}

// Features Slide
function FeaturesSlide() {
  const featuresTop = taskRiteData.features.slice(0, 3)
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: `linear-gradient(to right, ${colors.primary}, transparent)`,
            }}
          />
          <span
            style={{
              color: colors.primary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Key Features
          </span>
        </div>

        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '48px',
          }}
        >
          What Makes It <span style={{ color: colors.primary }}>Different</span>
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            flex: 1,
          }}
        >
          {featuresTop.map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                padding: '28px',
                borderRadius: '20px',
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '8px',
                  }}
                >
                  {feature.title}
                </span>
                <span style={{ fontSize: '18px', color: colors.textMuted, lineHeight: 1.5 }}>
                  {feature.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthorBadge />
      <SlideNumber current={4} total={9} />
    </div>
  )
}

// Tech Stack Slide
function TechStackSlide() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%)',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: `linear-gradient(to right, ${colors.primary}, transparent)`,
            }}
          />
          <span
            style={{
              color: colors.primary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Tech Stack
          </span>
        </div>

        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '48px',
          }}
        >
          Built With <span style={{ color: colors.primary }}>Modern Tools</span>
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            flex: 1,
            alignContent: 'flex-start',
          }}
        >
          {taskRiteData.techStack.map((tech, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 40px',
                borderRadius: '20px',
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
                minWidth: '200px',
              }}
            >
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '8px',
                }}
              >
                {tech.name}
              </span>
              <span style={{ fontSize: '14px', color: colors.textDim, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AuthorBadge />
      <SlideNumber current={5} total={9} />
    </div>
  )
}

// Architecture Slide
function ArchitectureSlide() {
  const layers = [
    { name: 'Frontend', items: taskRiteData.architecture.frontend, color: '#3b82f6' },
    { name: 'AI Layer', items: taskRiteData.architecture.ai, color: colors.primary },
    { name: 'Backend', items: taskRiteData.architecture.backend, color: '#10b981' },
  ]

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: `linear-gradient(to right, ${colors.primary}, transparent)`,
            }}
          />
          <span
            style={{
              color: colors.primary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Architecture
          </span>
        </div>

        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '48px',
          }}
        >
          System <span style={{ color: colors.primary }}>Design</span>
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flex: 1,
          }}
        >
          {layers.map((layer, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                padding: '24px 32px',
                borderRadius: '20px',
                backgroundColor: index === 1 ? `${layer.color}15` : colors.glass,
                border: `1px solid ${index === 1 ? `${layer.color}30` : colors.border}`,
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${layer.color}, ${layer.color}aa)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: 'white',
                    marginBottom: '8px',
                  }}
                >
                  {layer.name}
                </span>
                <span style={{ fontSize: '16px', color: colors.textMuted }}>
                  {layer.items.join(' • ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AuthorBadge />
      <SlideNumber current={6} total={9} />
    </div>
  )
}

// Challenges Slide
function ChallengesSlide() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: `linear-gradient(to right, ${colors.primary}, transparent)`,
            }}
          />
          <span
            style={{
              color: colors.primary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Challenges
          </span>
        </div>

        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '40px',
          }}
        >
          Problems <span style={{ color: colors.primary }}>Solved</span>
        </h2>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            flex: 1,
          }}
        >
          {taskRiteData.challenges.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                borderRadius: '20px',
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div
                  style={{
                    padding: '4px 12px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(220,38,38,0.2)',
                    color: '#f87171',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  Challenge
                </div>
              </div>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '16px',
                }}
              >
                {item.challenge}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div
                  style={{
                    padding: '4px 12px',
                    borderRadius: '50px',
                    backgroundColor: 'rgba(34,197,94,0.2)',
                    color: '#4ade80',
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                >
                  Solution
                </div>
              </div>
              <span style={{ fontSize: '16px', color: colors.textMuted, lineHeight: 1.5 }}>
                {item.solution}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AuthorBadge />
      <SlideNumber current={7} total={9} />
    </div>
  )
}

// Results Slide
function ResultsSlide() {
  const allMetrics = [...taskRiteData.metrics, ...taskRiteData.highlights]
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, zIndex: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '3px',
              background: `linear-gradient(to right, ${colors.primary}, transparent)`,
            }}
          />
          <span
            style={{
              color: colors.primary,
              fontSize: '16px',
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Results
          </span>
        </div>

        <h2
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '48px',
          }}
        >
          Key <span style={{ color: colors.primary }}>Achievements</span>
        </h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            flex: 1,
            alignContent: 'flex-start',
          }}
        >
          {allMetrics.map((metric, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px',
                borderRadius: '24px',
                backgroundColor: colors.glass,
                border: `1px solid ${colors.border}`,
                width: '280px',
              }}
            >
              <span
                style={{
                  fontSize: '56px',
                  fontWeight: 'bold',
                  color: colors.primary,
                  marginBottom: '8px',
                }}
              >
                {metric.value}
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '4px',
                }}
              >
                {metric.label}
              </span>
              <span style={{ fontSize: '14px', color: colors.textDim, textAlign: 'center' }}>
                {metric.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AuthorBadge />
      <SlideNumber current={8} total={9} />
    </div>
  )
}

// CTA Slide
function CTASlide() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.bg,
        padding: '60px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: 'white',
            margin: 0,
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Try <span style={{ color: colors.primary }}>TaskRite</span> Today
        </h2>

        <p
          style={{
            fontSize: '24px',
            color: colors.textMuted,
            margin: 0,
            marginBottom: '48px',
            textAlign: 'center',
            maxWidth: '600px',
          }}
        >
          Transform how you manage tasks with AI-powered conversations
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '20px 40px',
            borderRadius: '50px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
            boxShadow: '0 8px 32px rgba(220,38,38,0.3)',
          }}
        >
          <span style={{ fontSize: '24px', fontWeight: 600, color: 'white' }}>
            trytaskrite.com
          </span>
        </div>

        <div
          style={{
            marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '16px', color: colors.textDim }}>
            Built by
          </span>
          <span style={{ fontSize: '24px', fontWeight: 600, color: 'white' }}>
            {taskRiteData.author.name}
          </span>
          <span style={{ fontSize: '16px', color: colors.primary }}>
            {taskRiteData.author.website}
          </span>
        </div>
      </div>

      <SlideNumber current={9} total={9} />
    </div>
  )
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const slides: Record<string, () => JSX.Element> = {
    '1': CoverSlide,
    '2': ProblemSlide,
    '3': SolutionSlide,
    '4': FeaturesSlide,
    '5': TechStackSlide,
    '6': ArchitectureSlide,
    '7': ChallengesSlide,
    '8': ResultsSlide,
    '9': CTASlide,
  }

  const SlideComponent = slides[id] || CoverSlide

  return new ImageResponse(<SlideComponent />, { ...size })
}


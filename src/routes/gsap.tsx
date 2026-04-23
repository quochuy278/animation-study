import { useEffect, useRef, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import gsap from 'gsap'

export const Route = createFileRoute('/gsap')({
  component: GsapPage,
})

function GsapPage() {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const barsRef = useRef<Array<HTMLDivElement | null>>([])
  const [progress, setProgress] = useState(0)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const bars = barsRef.current.filter((bar): bar is HTMLDivElement => Boolean(bar))

    if (!bars.length) {
      return
    }

    const ctx = gsap.context(() => {
      timelineRef.current = gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.gsap-kicker', { y: 24, opacity: 0, duration: 0.45 })
        .from('.gsap-title-line', { yPercent: 120, opacity: 0, stagger: 0.08, duration: 0.65 }, '-=0.2')
        .from('.gsap-copy', { y: 20, opacity: 0, duration: 0.45 }, '-=0.35')
        .from(
          '.gsap-stat',
          { y: 18, opacity: 0, stagger: 0.08, duration: 0.4 },
          '-=0.22',
        )
        .from(
          bars,
          { scaleY: 0.2, transformOrigin: 'center bottom', stagger: 0.06, duration: 0.55 },
          '-=0.25',
        )
    }, heroRef)

    return () => {
      ctx.revert()
      timelineRef.current = null
    }
  }, [])

  useEffect(() => {
    const bars = barsRef.current.filter((bar): bar is HTMLDivElement => Boolean(bar))

    if (!bars.length) {
      return
    }

    gsap.to(bars, {
      height: (index) => 90 + ((index * 37 + progress * 140) % 180),
      duration: 0.5,
      stagger: 0.03,
      ease: 'power2.out',
    })
  }, [progress])

  const handleProgress = (value: number) => {
    setProgress(value)
    timelineRef.current?.progress(value).pause()
  }

  return (
    <div className="study-page">
      <section className="study-hero" ref={heroRef}>
        <div>
          <p className="eyebrow gsap-kicker">GSAP</p>
          <h1 className="study-title">
            <span className="title-mask">
              <span className="gsap-title-line">Practice timing as a design tool.</span>
            </span>
            <span className="title-mask">
              <span className="gsap-title-line">GSAP shines when motion has to be directed.</span>
            </span>
          </h1>
          <p className="study-copy gsap-copy">
            This study page uses a timeline for the intro, then lets you scrub the sequence to
            understand how GSAP thinks about motion through time rather than only through state.
          </p>
        </div>
        <div className="study-meta">
          <span className="gsap-stat">Focus: sequencing and control</span>
          <span className="gsap-stat">Great for: intros, scroll scenes, SVG, storytelling</span>
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <div className="section-heading">
            <h2>Timeline scrubber</h2>
            <p>
              Drag the slider and watch how a single GSAP timeline can become an interactive design
              tool.
            </p>
          </div>
          <label className="scrubber">
            <span>Timeline progress</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={(event) => handleProgress(Number(event.target.value))}
            />
            <strong>{Math.round(progress * 100)}%</strong>
          </label>
        </div>

        <div className="panel">
          <div className="section-heading">
            <h2>Animated bars</h2>
            <p>
              These bars respond to the same slider state, but the animation is handled through GSAP
              tweens rather than React transitions.
            </p>
          </div>
          <div className="barscape" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`bar-${index + 1}`}
                className="bar"
                ref={(node) => {
                  barsRef.current[index] = node
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="practice-note">
        <p>
          Next step: once timelines click, try the{' '}
          <Link to="/three" className="inline-link">
            Three.js page
          </Link>{' '}
          to mix motion with camera, lighting, and depth.
        </p>
      </section>
    </div>
  )
}

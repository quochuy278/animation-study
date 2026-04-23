import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Box, Cuboid, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="study-page">
      <section className="home-hero">
        <p className="eyebrow">Animation Lab</p>
        <h1 className="home-title">Practice modern frontend motion without losing the fundamentals.</h1>
        <p className="home-copy">
          This project is now set up as a small study app so you can compare three animation styles:
          React-native motion, timeline-driven choreography, and 3D scene animation.
        </p>
        <div className="cta-row">
          <Link to="/motion" className="primary-link">
            Start with Motion
            <ArrowRight size={18} />
          </Link>
          <Link to="/three" className="secondary-link">
            Jump to 3D
          </Link>
        </div>
      </section>

      <section className="card-grid">
        <Link to="/motion" className="feature-card">
          <div className="icon-wrap">
            <Sparkles size={22} />
          </div>
          <h2>Motion</h2>
          <p>Best for learning animation tied directly to React state and component structure.</p>
        </Link>

        <Link to="/gsap" className="feature-card">
          <div className="icon-wrap">
            <Box size={22} />
          </div>
          <h2>GSAP</h2>
          <p>Best for mastering sequencing, scrubbers, intros, scroll choreography, and timing.</p>
        </Link>

        <Link to="/three" className="feature-card">
          <div className="icon-wrap">
            <Cuboid size={22} />
          </div>
          <h2>Three</h2>
          <p>Best for building intuition around 3D composition, lights, camera, and interaction.</p>
        </Link>
      </section>
    </div>
  )
}

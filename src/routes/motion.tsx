import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'

export const Route = createFileRoute('/motion')({
  component: MotionPage,
})

const motionCards = [
  {
    id: 'gesture',
    title: 'Gesture Feedback',
    description: 'Practice hover, tap, and spring timing on interactive cards.',
    accent: 'rgba(255, 122, 69, 0.35)',
  },
  {
    id: 'layout',
    title: 'Layout Motion',
    description: 'See how a selected element can smoothly rearrange around others.',
    accent: 'rgba(255, 210, 63, 0.32)',
  },
  {
    id: 'presence',
    title: 'Presence',
    description: 'Add and remove UI with entry and exit motion that feels intentional.',
    accent: 'rgba(79, 181, 255, 0.3)',
  },
]

function MotionPage() {
  const [selectedId, setSelectedId] = useState(motionCards[0]?.id ?? '')
  const [isPanelOpen, setIsPanelOpen] = useState(true)

  const selectedCard = motionCards.find((card) => card.id === selectedId) ?? motionCards[0]

  return (
    <div className="study-page">
      <section className="study-hero">
        <div>
          <p className="eyebrow">Motion for React</p>
          <h1 className="study-title">Build intuition for React-native UI animation.</h1>
          <p className="study-copy">
            Motion is ideal when you want animated components to stay close to React state.
            This page mixes entrance choreography, hover feedback, layout animation, and
            presence-based UI.
          </p>
        </div>
        <div className="study-meta">
          <span>Focus: component animation</span>
          <span>Great for: cards, modals, route transitions</span>
        </div>
      </section>

      <section className="panel-grid">
        <div className="panel">
          <div className="section-heading">
            <h2>Stagger + gestures</h2>
            <p>Try changing spring values and hover scale to feel how the UI responds.</p>
          </div>
          <LayoutGroup>
            <motion.div
              className="card-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {motionCards.map((card, index) => (
                <motion.button
                  key={card.id}
                  type="button"
                  className="feature-card"
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 220,
                    damping: 22,
                    delay: index * 0.02,
                  }}
                  whileHover={{ y: -10, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedId(card.id)}
                  style={{
                    boxShadow:
                      selectedId === card.id
                        ? `0 0 0 1px rgba(255,255,255,0.2), 0 20px 40px ${card.accent}`
                        : undefined,
                  }}
                >
                  <motion.div
                    layoutId={`accent-${card.id}`}
                    className="card-accent"
                    style={{ background: card.accent }}
                  />
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </motion.button>
              ))}
            </motion.div>
          </LayoutGroup>
        </div>

        <div className="panel">
          <div className="section-heading">
            <h2>Presence panel</h2>
            <p>Toggle the panel to practice enter and exit animation with `AnimatePresence`.</p>
          </div>
          <div className="toggle-row">
            <button
              type="button"
              className="pill-button"
              onClick={() => setIsPanelOpen((current) => !current)}
            >
              {isPanelOpen ? 'Hide details' : 'Show details'}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {isPanelOpen ? (
              <motion.div
                key={selectedCard.id}
                className="detail-panel"
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="detail-badge">Selected pattern</span>
                <h3>{selectedCard.title}</h3>
                <p>{selectedCard.description}</p>
                <ul className="detail-list">
                  <li>Swap `whileHover` for `whileFocus` to make keyboard motion feel deliberate.</li>
                  <li>Try `layoutId` on a shared button or thumbnail for smoother transitions.</li>
                  <li>
                    Test <code>transition={"{ type: 'spring' }"}</code> versus duration-based
                    easing.
                  </li>
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      <section className="practice-note">
        <p>
          Next step: once these patterns feel natural, move to{' '}
          <Link to="/gsap" className="inline-link">
            GSAP
          </Link>{' '}
          for stronger timeline control.
        </p>
      </section>
    </div>
  )
}

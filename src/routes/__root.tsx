import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <div className="app-shell">
        <header className="app-header">
          <Link className="brand-mark" to="/">
            Animation Study
          </Link>
          <nav className="app-nav" aria-label="Main navigation">
            <Link
              to="/motion"
              className="nav-link"
              activeProps={{ className: 'nav-link nav-link-active' }}
            >
              Motion
            </Link>
            <Link
              to="/gsap"
              className="nav-link"
              activeProps={{ className: 'nav-link nav-link-active' }}
            >
              GSAP
            </Link>
            <Link
              to="/three"
              className="nav-link"
              activeProps={{ className: 'nav-link nav-link-active' }}
            >
              Three
            </Link>
          </nav>
        </header>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}

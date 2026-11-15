import { useEffect } from 'react'
import { useTheme } from './store/theme'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CallToAction, Diagnostics, Features, Footer, Pipeline, Roles } from './components/Sections'

// URL del dashboard de ColdTrack. Configurable con VITE_DASHBOARD_URL en un archivo .env
const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || '#'

function useRevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  useRevealOnScroll()

  return (
    <>
      <a
        href="#funciones"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-cold-ice focus:text-cold-on-accent focus:px-3 focus:py-2 focus:rounded-lg"
      >
        Saltar al contenido
      </a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} dashboardUrl={dashboardUrl} />
      <main>
        <Hero theme={theme} dashboardUrl={dashboardUrl} />
        <Features />
        <Pipeline />
        <Diagnostics />
        <Roles />
        <CallToAction dashboardUrl={dashboardUrl} />
      </main>
      <Footer />
    </>
  )
}

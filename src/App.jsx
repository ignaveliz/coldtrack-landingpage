import { useEffect } from 'react'
import { useTheme } from './store/theme'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { CallToAction, Diagnostics, Features, Footer, Pipeline, Roles } from './components/Sections'

// URL del dashboard de ColdTrack. Configurable con VITE_DASHBOARD_URL en un archivo .env
const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || '#'

// Revela cada [data-reveal] una sola vez cuando entra en pantalla
function useRevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) return
    root.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-cold-inverse focus:text-cold-on-inverse focus:px-4 focus:py-2 focus:rounded-full"
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

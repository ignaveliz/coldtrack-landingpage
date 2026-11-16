import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowIcon, Button, Wrap } from './ui'
import { DashboardPreview } from './DashboardPreview'

const Mascot = lazy(() => import('./Mascot'))
const desktopQuery = '(min-width: 1024px)'

function useIsDesktop() {
  const [matches, setMatches] = useState(() => window.matchMedia(desktopQuery).matches)
  useEffect(() => {
    const mq = window.matchMedia(desktopQuery)
    const onChange = (e) => setMatches(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return matches
}

// Monta el 3D cuando el navegador queda libre, para no frenar la primera pintura (sobre todo en mobile).
// El contenedor ya tiene su altura reservada, así que no hay salto de layout.
function useIdleMount() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let id
    const go = () => setReady(true)
    if ('requestIdleCallback' in window) id = window.requestIdleCallback(go, { timeout: 1200 })
    else id = window.setTimeout(go, 300)
    return () => ('cancelIdleCallback' in window ? window.cancelIdleCallback(id) : window.clearTimeout(id))
  }, [])
  return ready
}

/** Estrella de cuatro puntas del isotipo */
function Star({ className }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" fill="currentColor" />
    </svg>
  )
}

export function Hero({ theme, dashboardUrl }) {
  const isDesktop = useIsDesktop()
  const showMascot = useIdleMount()

  return (
    <section id="inicio" className="relative pt-20 md:pt-28 lg:pt-36 overflow-hidden">
      <div className="absolute inset-0 grid-lines pointer-events-none" aria-hidden="true" />
      <div className="glow-ground" aria-hidden="true" />

      <Wrap className="relative">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-2 lg:gap-10 items-center [&>*]:min-w-0">
          <div className="text-center lg:text-left">
            <h1
              className="enter display mx-auto lg:mx-0 max-w-[16ch] text-[40px] sm:text-[56px] lg:text-[64px] xl:text-[72px] text-cold-text"
              style={{ '--d': '80ms' }}
            >
              Tus equipos de frío,{' '}
              <span className="relative inline-block text-cold-accent">
                bajo control
                <Star className="twinkle absolute -top-3 -right-6 size-5 text-cold-star" />
              </span>{' '}
              en tiempo real.
            </h1>

            <p
              className="enter mx-auto lg:mx-0 mt-7 max-w-xl text-lg text-cold-muted leading-relaxed"
              style={{ '--d': '160ms' }}
            >
              Coldtrack lee cinco canales de cada heladera y cámara, detecta fallas antes de que se pierda la
              mercadería y avisa al propietario y al técnico indicado.
            </p>

            <div
              className="enter mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3"
              style={{ '--d': '240ms' }}
            >
              <Button as="a" href={dashboardUrl} size="lg">
                Ingresar al dashboard <ArrowIcon />
              </Button>
              <Button as="a" href="#como-funciona" size="lg" variant="outline">
                Ver cómo funciona
              </Button>
            </div>
          </div>

          {/* Tracky: arriba del título en mobile y tablet, a la derecha en escritorio */}
          <div
            className="enter order-first lg:order-none relative h-56 sm:h-72 lg:h-[440px] xl:h-[480px] -mx-5 sm:mx-0 overflow-hidden lg:overflow-visible"
            style={{ '--d': '0ms' }}
          >
            <div
              className="absolute inset-x-16 inset-y-6 lg:inset-10 rounded-full bg-cold-brand/25 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="animate-bubble absolute z-10 panel rounded-2xl rounded-bl-sm top-2 right-3 max-w-[150px] px-3 py-2 sm:right-auto sm:left-[58%] sm:max-w-[200px] lg:top-6 lg:left-[56%] lg:max-w-[220px] lg:px-4 lg:py-3">
              <p className="text-xs sm:text-sm font-medium text-cold-text">Hola, soy Tracky.</p>
              <p className="hidden sm:block text-xs text-cold-muted mt-0.5">Cuido la temperatura de tus equipos.</p>
            </div>
            {showMascot && (
              <Suspense fallback={null}>
                <Mascot theme={theme} compact={!isDesktop} />
              </Suspense>
            )}
          </div>
        </div>

        <div className="enter relative mt-14 lg:mt-6 -mb-24 md:-mb-32" style={{ '--d': '420ms' }}>
          <div className="scroll-flatten">
            <DashboardPreview className="mx-auto max-w-[1100px]" />
          </div>
        </div>
      </Wrap>

      {/* Desvanecido inferior hacia la siguiente sección */}
      <div className="relative h-40 bg-gradient-to-b from-transparent to-cold-bg pointer-events-none" aria-hidden="true" />
    </section>
  )
}

import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Badge, Button } from './ui'

const Mascot = lazy(() => import('./Mascot'))

function MascotFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-24 w-24 rounded-full border-2 border-cold-ice/20 border-t-cold-ice animate-spin" />
    </div>
  )
}

const desktopQuery = '(min-width: 768px)'

// Solo monta la mascota 3D en pantallas md+ para no descargar three.js en mobile
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

export function Hero({ theme, dashboardUrl }) {
  const showMascot = useIsDesktop()

  return (
    <section id="inicio" className="relative pt-28 pb-16 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-6">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Plataforma IoT para cadena de frío
          </Badge>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-cold-text">
            Tus equipos de frío,
            <br />
            <span className="text-gradient">bajo control en tiempo real.</span>
          </h1>

          <p className="mt-6 text-lg text-cold-muted leading-relaxed max-w-xl">
            ColdTrack recibe la telemetría de cada heladera y cámara, detecta fallas antes de que se
            pierda la mercadería y avisa al propietario y al técnico indicado.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button as="a" href={dashboardUrl} size="lg">
              Ingresar al dashboard
              <ArrowRight className="size-4" />
            </Button>
            <Button as="a" href="#como-funciona" size="lg" variant="outline">
              Ver cómo funciona
            </Button>
          </div>
        </div>

        <div className="relative hidden md:block h-[460px] lg:h-[520px]">
          <div
            className="absolute inset-8 rounded-full bg-cold-ice/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="animate-bubble absolute top-4 left-[58%] z-10 glass-panel rounded-2xl rounded-bl-sm px-4 py-3 max-w-[220px]">
            <p className="text-sm font-semibold text-cold-text">¡Hola! Soy Tracky 👋</p>
            <p className="text-xs text-cold-muted mt-0.5">Cuido la temperatura de tus equipos.</p>
          </div>
          {showMascot && (
            <Suspense fallback={<MascotFallback />}>
              <Mascot theme={theme} />
            </Suspense>
          )}
        </div>
      </div>
    </section>
  )
}

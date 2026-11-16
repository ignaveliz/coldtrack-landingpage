import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import clsx from 'clsx'
import { ArrowIcon, Button } from './ui'

const links = [
  { href: '#funciones', label: 'Funciones' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#roles', label: 'Roles' },
]

/** Isotipo del brand board: blanco en tema oscuro, azul de marca en tema claro */
export function Mark({ className = 'size-8' }) {
  return (
    <>
      <img src="/logos/mark-white.png" alt="" className={`only-dark ${className}`} />
      <img src="/logos/mark-blue.png" alt="" className={`only-light ${className}`} />
    </>
  )
}

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5 rounded-md" aria-label="Coldtrack, ir al inicio">
      <Mark className="size-8" />
      <span className="font-heading font-bold text-[19px] tracking-tight text-cold-text">Coldtrack</span>
    </a>
  )
}

export function Navbar({ theme, onToggleTheme, dashboardUrl }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isLight = theme === 'light'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        className={clsx(
          'mx-auto max-w-[1200px] h-14 pl-4 pr-2 flex items-center justify-between rounded-full border transition-all duration-300',
          scrolled || open
            ? 'bg-cold-bg/75 backdrop-blur-xl border-cold-line'
            : 'bg-transparent border-transparent',
        )}
      >
        <Logo />

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative px-3 py-2 text-sm text-cold-muted hover:text-cold-text transition-colors after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-current after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            aria-pressed={isLight}
            aria-label={isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}
            title={isLight ? 'Tema oscuro' : 'Tema claro'}
          >
            {isLight ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </Button>
          <span className="hidden sm:block">
            <Button as="a" href={dashboardUrl} size="sm">
              Ingresar <ArrowIcon />
            </Button>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div id="menu-movil" className="md:hidden panel bg-cold-bg/95 backdrop-blur-xl mt-2 rounded-3xl p-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center h-12 px-4 text-base text-cold-text rounded-2xl hover:bg-cold-text/5"
            >
              {l.label}
            </a>
          ))}
          <Button as="a" href={dashboardUrl} size="lg" className="w-full mt-2">
            Ingresar al dashboard <ArrowIcon />
          </Button>
        </div>
      )}
    </header>
  )
}

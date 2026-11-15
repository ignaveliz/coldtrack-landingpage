import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import clsx from 'clsx'
import { Button } from './ui'

const links = [
  { href: '#funciones', label: 'Funciones' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#diagnostico', label: 'Diagnóstico' },
  { href: '#roles', label: 'Roles' },
]

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="ColdTrack, ir al inicio">
      <span className="h-8 w-8 rounded-lg bg-cold-dark border border-cold-ice/25 flex items-center justify-center p-1 shadow-[0_0_10px_rgba(190,207,255,0.15)]">
        <img src="/logos/1.png" alt="" className="h-full w-full object-contain" />
      </span>
      <span className="font-heading font-bold text-lg text-cold-text tracking-tight">
        Cold<span className="text-cold-ice">Track</span>
      </span>
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
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <nav
        className={clsx(
          'mx-auto max-w-7xl px-4 lg:px-6 h-14 flex items-center justify-between rounded-2xl transition-all duration-300',
          scrolled && 'glass-panel mx-4 lg:mx-auto',
        )}
      >
        <Logo />

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-2 text-sm text-cold-muted hover:text-cold-text rounded-lg hover:bg-cold-divider/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
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
              Ingresar
            </Button>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Abrir menú"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden glass-panel mx-4 mt-2 rounded-2xl p-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-cold-text rounded-lg hover:bg-cold-divider/5"
            >
              {l.label}
            </a>
          ))}
          <Button as="a" href={dashboardUrl} size="sm" className="w-full mt-2">
            Ingresar al dashboard
          </Button>
        </div>
      )}
    </header>
  )
}

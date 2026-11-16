import clsx from 'clsx'

const buttonBase =
  'group/btn inline-flex items-center justify-center gap-2 font-medium rounded-full cursor-pointer select-none whitespace-nowrap ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ' +
  'hover:-translate-y-px active:translate-y-0 active:scale-[0.97] ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-cold-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cold-bg'

const buttonVariants = {
  // Botón blanco sobre fondo oscuro (invertido en tema claro), como en las referencias
  // Azul de marca (#004aad) del brand board
  primary:
    'bg-cold-brand text-white hover:bg-[#0a5bd1] shadow-[0_8px_24px_-12px_#004aad] hover:shadow-[0_14px_34px_-12px_#2f74e6]',
  outline:
    'bg-transparent text-cold-text border border-cold-line hover:border-cold-accent/60 hover:bg-cold-accent/5',
  ghost: 'bg-transparent text-cold-muted hover:text-cold-text hover:bg-cold-text/5',
}

const buttonSizes = {
  sm: 'text-sm px-4 h-9',
  md: 'text-sm px-5 h-11',
  lg: 'text-[15px] px-6 h-12',
  icon: 'h-10 w-10 p-0',
}

export function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className, ...props }) {
  return <Tag className={clsx(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props} />
}

/** Flecha que se desplaza al pasar el cursor por el botón */
export function ArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={clsx('size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5', className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Card({ className, lit = false, hover = true, ...props }) {
  return (
    <div
      className={clsx(lit ? 'panel-lit' : 'panel', 'relative overflow-hidden', hover && 'lift', className)}
      {...props}
    />
  )
}

const badgeVariants = {
  default: 'bg-cold-accent/10 text-cold-accent border-cold-accent/25',
  muted: 'bg-cold-text/5 text-cold-muted border-cold-line',
  success: 'bg-cold-ok/10 text-cold-ok border-cold-ok/25',
  danger: 'bg-cold-alert/10 text-cold-alert border-cold-alert/30',
}

export function Badge({ variant = 'default', className, ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 h-6 rounded-full text-xs font-medium border select-none',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeading({ eyebrow, title, children, center = false, className }) {
  return (
    <div data-reveal="up" className={clsx('max-w-2xl', center && 'mx-auto text-center', className)}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="display text-4xl md:text-[56px] text-cold-text mt-4">{title}</h2>
      {children && <p className="text-cold-muted text-lg mt-5 leading-relaxed">{children}</p>}
    </div>
  )
}

export function Wrap({ className, ...props }) {
  return <div className={clsx('mx-auto w-full max-w-[1200px] px-5 md:px-8', className)} {...props} />
}

/** Envuelve un bloque para que aparezca al entrar en pantalla. variant: up | left | right | zoom */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className, style, ...props }) {
  return <Tag data-reveal={variant} className={className} style={{ '--rd': `${delay}ms`, ...style }} {...props} />
}

import clsx from 'clsx'

const buttonBase =
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cold-ice/40 select-none rounded-lg cursor-pointer'

const buttonVariants = {
  primary:
    'bg-cold-ice text-cold-on-accent font-semibold hover:bg-cold-accent-hover hover:shadow-[0_0_20px_rgba(190,207,255,0.45)] active:scale-[0.98]',
  secondary:
    'bg-cold-lavender/15 text-cold-ice border border-cold-lavender/30 hover:bg-cold-lavender/25 hover:border-cold-ice/40 active:scale-[0.98]',
  outline:
    'bg-transparent text-cold-text border border-cold-divider/15 hover:border-cold-ice/50 hover:text-cold-ice hover:bg-cold-ice/5 active:scale-[0.98]',
  ghost: 'bg-transparent text-cold-muted hover:text-cold-text hover:bg-cold-divider/5',
}

const buttonSizes = {
  sm: 'text-xs px-3 py-1.5 h-8',
  md: 'text-sm px-4 py-2 h-10',
  lg: 'text-base px-6 py-3 h-12',
  icon: 'h-9 w-9 p-0',
}

export function Button({ as: Tag = 'button', variant = 'primary', size = 'md', className, ...props }) {
  return <Tag className={clsx(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props} />
}

export function Card({ className, hover = true, ...props }) {
  return (
    <div
      className={clsx(
        'glass-panel rounded-xl p-6 relative overflow-hidden transition-all duration-300',
        hover && 'glass-panel-hover',
        className,
      )}
      {...props}
    />
  )
}

const badgeVariants = {
  default: 'bg-cold-ice/10 text-cold-ice border-cold-ice/25',
  secondary: 'bg-cold-lavender/10 text-cold-lavender border-cold-lavender/25',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  danger: 'bg-rose-500/10 text-rose-400 border-rose-500/25',
}

export function Badge({ variant = 'default', className, ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide select-none',
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  )
}

export function SectionHeading({ eyebrow, title, children, center = true }) {
  return (
    <div className={clsx('max-w-2xl mb-12', center && 'mx-auto text-center')}>
      <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-cold-lavender">
        {eyebrow}
      </span>
      <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-cold-text mt-3">
        {title}
      </h2>
      {children && <p className="text-cold-muted mt-4 leading-relaxed">{children}</p>}
    </div>
  )
}

export function Reveal({ className, children, delay = 0 }) {
  return (
    <div className={clsx('reveal', className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

import { AlertTriangle, Bell, LayoutDashboard, Settings2, Thermometer, Wrench } from 'lucide-react'
import clsx from 'clsx'

// Serie de ejemplo de temperatura interior (24 h, una lectura por hora)
const series = [3.1, 3.0, 2.9, 3.0, 3.2, 3.1, 3.3, 3.6, 3.9, 3.7, 3.4, 3.3, 3.5, 3.8, 4.2, 4.6, 4.4, 4.0, 3.7, 3.5, 3.3, 3.2, 3.1, 3.2]
const W = 600
const H = 180
const min = 2
const max = 6
const x = (i) => (i / (series.length - 1)) * W
const y = (v) => H - ((v - min) / (max - min)) * H

const linePath = series.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
const areaPath = `${linePath} L${W},${H} L0,${H} Z`

const nav = [
  { icon: LayoutDashboard, label: 'Flota', active: true },
  { icon: AlertTriangle, label: 'Alertas', count: 2 },
  { icon: Settings2, label: 'Operaciones' },
  { icon: Wrench, label: 'Mantenimiento' },
]

const equipos = [
  { id: 'SIM-001', name: 'Cámara de frío', state: 'alert' },
  { id: 'SIM-002', name: 'Heladera exhibidora', state: 'ok' },
  { id: 'SIM-003', name: 'Freezer vertical', state: 'ok' },
]

const tiles = [
  { label: 'Condensador', value: '68.4', unit: '°C', alert: true },
  { label: 'Succión', value: '-8.1', unit: '°C' },
  { label: 'Presión alta', value: '92', unit: '%', alert: true },
  { label: 'Presión baja', value: '34', unit: '%' },
]

export function DashboardPreview({ className }) {
  return (
    <div
      className={clsx(
        'panel-lit rounded-2xl p-1.5 shadow-[0_40px_120px_-40px_color-mix(in_srgb,var(--color-cold-accent)_55%,transparent)]',
        className,
      )}
      role="img"
      aria-label="Vista del dashboard de Coldtrack: temperatura interior del equipo SIM-001 en las últimas 24 horas y una alerta de posible problema de condensación"
    >
      <div className="rounded-xl bg-cold-bg border border-cold-line overflow-hidden text-left" aria-hidden="true">
        {/* Barra de ventana */}
        <div className="flex items-center gap-2 h-10 px-4 border-b border-cold-line">
          <span className="size-2.5 rounded-full bg-cold-line" />
          <span className="size-2.5 rounded-full bg-cold-line" />
          <span className="size-2.5 rounded-full bg-cold-line" />
          <span className="ml-3 font-mono text-[11px] text-cold-faint">coldtrack / flota / SIM-001</span>
        </div>

        <div className="grid md:grid-cols-[200px_1fr]">
          {/* Sidebar */}
          <aside className="hidden md:flex flex-col gap-1 p-3 border-r border-cold-line">
            {nav.map(({ icon: Icon, label, active, count }) => (
              <span
                key={label}
                className={clsx(
                  'flex items-center gap-2.5 h-9 px-3 rounded-lg text-[13px]',
                  active ? 'bg-cold-accent/12 text-cold-text' : 'text-cold-muted',
                )}
              >
                <Icon className={clsx('size-4', active && 'text-cold-accent')} />
                {label}
                {count && (
                  <span className="ml-auto text-[10px] font-mono px-1.5 rounded bg-cold-alert/15 text-cold-alert">{count}</span>
                )}
              </span>
            ))}
            <div className="mt-4 pt-4 border-t border-cold-line space-y-1">
              <span className="block px-3 pb-1 font-mono text-[10px] uppercase tracking-widest text-cold-faint">Equipos</span>
              {equipos.map((e) => (
                <span key={e.id} className="flex items-center gap-2 h-8 px-3 text-[12px] text-cold-muted">
                  <span className={clsx('size-1.5 rounded-full', e.state === 'alert' ? 'bg-cold-alert live-dot' : 'bg-cold-ok')} />
                  <span className="font-mono">{e.id}</span>
                </span>
              ))}
            </div>
          </aside>

          {/* Contenido */}
          <div className="p-4 md:p-5 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Thermometer className="size-4 text-cold-accent" />
                <span className="font-mono text-sm text-cold-text">SIM-001</span>
                <span className="hidden sm:inline text-xs text-cold-muted">Cámara de frío · Depósito central</span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-cold-ok">
                <span className="size-1.5 rounded-full bg-cold-ok live-dot" /> Recibiendo telemetría
              </span>
            </div>

            <div className="mt-4 grid lg:grid-cols-[1fr_240px] gap-3">
              {/* Gráfico */}
              <div className="rounded-xl border border-cold-line p-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] text-cold-muted">Temp. interior · 24 h</p>
                    <p className="mt-1 text-3xl tracking-tight text-cold-text">
                      3.2<span className="text-base text-cold-muted ml-1">°C</span>
                    </p>
                  </div>
                  <span className="font-mono text-[10px] text-cold-faint">máx 5 °C</span>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full h-28 md:h-36 overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--color-cold-accent)" stopOpacity="0.35" />
                      <stop offset="1" stopColor="var(--color-cold-accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--color-cold-line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  ))}
                  <line x1="0" x2={W} y1={y(5)} y2={y(5)} stroke="var(--color-cold-alert)" strokeOpacity="0.7" strokeDasharray="4 5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <path d={areaPath} fill="url(#area)" />
                  <path d={linePath} fill="none" stroke="var(--color-cold-accent)" strokeWidth="2" vectorEffect="non-scaling-stroke" className="draw-line" pathLength="1200" />
                </svg>
              </div>

              {/* Alerta + lecturas */}
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-cold-alert/30 bg-cold-alert/8 p-3.5">
                  <div className="flex items-center gap-2 text-cold-alert text-[11px] font-mono">
                    <AlertTriangle className="size-3.5 shrink-0" /> CONDENSACIÓN
                  </div>
                  <p className="text-[12px] text-cold-muted mt-1.5 leading-snug">Revisar ventilación y condensador.</p>
                  <p className="flex items-center gap-1.5 mt-2.5 text-[11px] text-cold-text">
                    <Bell className="size-3 text-cold-accent" /> Correo enviado al propietario
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {tiles.map((t) => (
                    <div key={t.label} className="rounded-lg border border-cold-line px-3 py-2.5">
                      <p className="text-[10px] text-cold-muted">{t.label}</p>
                      <p className={clsx('font-mono text-sm mt-0.5', t.alert ? 'text-cold-alert' : 'text-cold-text')}>
                        {t.value}
                        <span className="text-cold-faint ml-0.5">{t.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

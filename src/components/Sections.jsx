import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Bell,
  Bot,
  CalendarClock,
  CheckCircle2,
  Cpu,
  Gauge,
  KeyRound,
  LayoutDashboard,
  Mail,
  Network,
  Radio,
  Server,
  SlidersHorizontal,
  Thermometer,
  UserCog,
  Users,
  Wrench,
} from 'lucide-react'
import { Badge, Button, Card, Reveal, SectionHeading } from './ui'
import { Logo } from './Navbar'

/* ---------------- Features ---------------- */

const features = [
  {
    icon: Activity,
    title: 'Telemetría en tiempo real',
    text: 'Temperatura interior, de condensador y de succión, más presión alta y baja de cada equipo, con historial consultable.',
  },
  {
    icon: AlertTriangle,
    title: 'Diagnóstico automático',
    text: 'Cada lectura se evalúa contra los umbrales del equipo. Se abre una alerta por condición y se detectan fallas combinadas.',
  },
  {
    icon: Mail,
    title: 'Avisos por correo',
    text: 'Cada alerta notifica al propietario. Los envíos quedan en cola y se reintentan hasta confirmarse.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Políticas de captura',
    text: 'Elegí qué canales registrar, en qué horarios y con qué límites. Pausá la captura sin desconectar el equipo.',
  },
  {
    icon: Wrench,
    title: 'Mantenimiento y técnicos',
    text: 'Asociá una solicitud de revisión a una alerta y asignala a un técnico de tu red de contactos.',
  },
  {
    icon: Bot,
    title: 'Asistente virtual',
    text: 'Respuestas guiadas sobre captura, alertas, alta de equipos, acceso y mantenimiento, sin salir del panel.',
  },
]

export function Features() {
  return (
    <section id="funciones" className="py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Funciones" title="Todo lo que tu cadena de frío necesita">
            Desde el sensor hasta la orden de trabajo: ColdTrack centraliza el monitoreo, el diagnóstico y la
            respuesta ante fallas.
          </SectionHeading>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 70}>
              <Card className="h-full group">
                <div className="size-11 rounded-xl bg-cold-ice/10 border border-cold-ice/20 flex items-center justify-center mb-5 group-hover:ice-glow transition-shadow">
                  <Icon className="size-5 text-cold-ice" aria-hidden="true" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-cold-text">{title}</h3>
                <p className="text-sm text-cold-muted mt-2 leading-relaxed">{text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Pipeline ---------------- */

const steps = [
  { icon: Cpu, tag: '01 · Hardware', title: 'Sensores + Arduino', text: 'El equipo mide temperaturas y presiones y emite JSON por el puerto serie.' },
  { icon: Radio, tag: '02 · Enlace', title: 'Serial bridge', text: 'La salida serie se reenvía al gateway local sin hardware adicional.' },
  { icon: Network, tag: '03 · Gateway', title: 'ColdTrack Gateway', text: 'Valida y filtra cada lectura y la envía a la API con el token del equipo.' },
  { icon: Server, tag: '04 · API', title: 'ColdTrack API', text: 'Aplica la política de captura, diagnostica, persiste y encola notificaciones.' },
  { icon: LayoutDashboard, tag: '05 · Panel', title: 'Dashboard web', text: 'Flota, alertas, operaciones y mantenimiento en una sola interfaz.' },
]

export function Pipeline() {
  return (
    <section id="como-funciona" className="py-16 md:py-24 scroll-mt-20 border-y border-cold-divider/10 bg-cold-surface/40">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Cómo funciona" title="Del sensor al dashboard en segundos">
            Un pipeline de telemetría simple y seguro: cada equipo se autentica con su propio token y la API decide
            qué se registra.
          </SectionHeading>
        </Reveal>

        <ol className="grid sm:grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10 relative">
          <div
            className="hidden md:block absolute top-9 left-[10%] right-[10%] border-t-2 border-dashed border-cold-lavender/40 pointer-events-none"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, tag, title, text }, i) => (
            <Reveal key={title} delay={i * 90}>
              <li className="relative text-center flex flex-col items-center">
                <div className="relative z-10 size-[72px] rounded-2xl glass-panel flex items-center justify-center mb-5">
                  <Icon className={i === steps.length - 1 ? 'size-7 text-cold-ice' : 'size-7 text-cold-lavender'} aria-hidden="true" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-cold-lavender font-semibold">{tag}</span>
                <h3 className="font-heading font-semibold text-cold-text mt-1.5">{title}</h3>
                <p className="text-xs text-cold-muted mt-2 leading-relaxed max-w-[200px]">{text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ---------------- Diagnostics showcase ---------------- */

const channels = [
  { key: 'tempInterior', label: 'Temp. interior', value: '3.2', unit: '°C', limit: 'máx 5 °C', pct: 64, status: 'ok' },
  { key: 'tempCondensador', label: 'Temp. condensador', value: '68.4', unit: '°C', limit: 'máx 65 °C', pct: 100, status: 'alert' },
  { key: 'tempSuccion', label: 'Temp. succión', value: '-8.1', unit: '°C', limit: 'sin límite', pct: 35, status: 'ok' },
  { key: 'presionAlta', label: 'Presión alta', value: '92', unit: '%', limit: 'máx 90 %', pct: 100, status: 'alert' },
  { key: 'presionBaja', label: 'Presión baja', value: '34', unit: '%', limit: 'mín 10 %', pct: 34, status: 'ok' },
]

export function Diagnostics() {
  return (
    <section id="diagnostico" className="py-16 md:py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center [&>*]:min-w-0">
        <Reveal>
          <SectionHeading center={false} eyebrow="Diagnóstico inteligente" title="No solo alertas: causas probables">
            ColdTrack cruza los canales entre sí. Si la presión alta y la temperatura del condensador se disparan
            juntas, no recibís dos avisos sueltos: recibís un diagnóstico con la acción recomendada.
          </SectionHeading>
          <ul className="space-y-4 -mt-4">
            {[
              { code: 'POSIBLE_PROBLEMA_CONDENSACION', text: 'Presión alta + condensador caliente → revisar ventilación y condensador.' },
              { code: 'POSIBLE_PERDIDA_CAPACIDAD_FRIGORIFICA', text: 'Presión baja + cámara caliente → revisar circuito y carga de refrigerante.' },
            ].map((d) => (
              <li key={d.code} className="flex gap-3">
                <CheckCircle2 className="size-5 text-cold-ice shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <code className="font-mono text-xs text-cold-lavender break-all">{d.code}</code>
                  <p className="text-sm text-cold-muted mt-0.5">{d.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <Card hover={false} className="p-0">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-cold-divider/10">
              <div className="flex items-center gap-2.5">
                <Thermometer className="size-4 text-cold-ice" aria-hidden="true" />
                <span className="font-heading text-sm font-semibold tracking-wider uppercase text-cold-ice">SIM-001</span>
                <span className="hidden sm:inline text-xs text-cold-muted">Cámara de frío · Depósito central</span>
              </div>
              <Badge variant="danger" className="animate-pulse">
                <AlertTriangle className="size-3" /> Alerta
              </Badge>
            </div>

            <div className="p-5 space-y-3.5">
              {channels.map((ch) => (
                <div key={ch.key}>
                  <div className="flex items-baseline justify-between gap-2 text-xs mb-1.5">
                    <span className="text-cold-muted">{ch.label}</span>
                    <span className="font-mono">
                      <span className={ch.status === 'alert' ? 'text-rose-400 font-semibold' : 'text-cold-text'}>
                        {ch.value} {ch.unit}
                      </span>
                      <span className="hidden sm:inline text-cold-muted/70 ml-2">{ch.limit}</span>
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-cold-divider/10 overflow-hidden">
                    <div
                      className={ch.status === 'alert' ? 'h-full rounded-full bg-rose-500' : 'h-full rounded-full bg-cold-ice'}
                      style={{ width: `${ch.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-5 mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/25">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold break-all">
                <Gauge className="size-4 shrink-0" aria-hidden="true" />
                POSIBLE_PROBLEMA_CONDENSACION
              </div>
              <p className="text-xs text-cold-muted mt-1.5">
                Presión alta y temperatura de condensador elevadas. Revisar ventilación y condensador.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary"><Bell className="size-3" /> Correo enviado al propietario</Badge>
                <Badge><Wrench className="size-3" /> Solicitar revisión</Badge>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Roles ---------------- */

export function Roles() {
  const roles = [
    {
      icon: UserCog,
      title: 'Propietario',
      badge: 'owner',
      items: [
        'Registra equipos y obtiene su token de telemetría',
        'Define canales, horarios y umbrales por equipo',
        'Recibe alertas por correo y consulta el historial',
        'Guarda contactos técnicos y solicita revisiones',
      ],
    },
    {
      icon: Users,
      title: 'Técnico',
      badge: 'technician',
      items: [
        'Forma parte del directorio de técnicos registrados',
        'Recibe las solicitudes de revisión asignadas',
        'Ve el equipo, el diagnóstico y las notas del propietario',
        'Recibe un correo con cada nueva solicitud',
      ],
    },
  ]

  return (
    <section id="roles" className="py-16 md:py-24 scroll-mt-20 border-t border-cold-divider/10 bg-cold-surface/40">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Roles" title="Pensado para quien opera y para quien repara">
            Cuentas verificadas por correo, sesiones seguras y permisos según el rol.
          </SectionHeading>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {roles.map(({ icon: Icon, title, badge, items }, i) => (
            <Reveal key={title} delay={i * 100}>
              <Card className="h-full p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-xl bg-cold-lavender/15 border border-cold-lavender/30 flex items-center justify-center">
                      <Icon className="size-5 text-cold-ice" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-cold-text">{title}</h3>
                  </div>
                  <Badge variant="secondary" className="font-mono">{badge}</Badge>
                </div>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-cold-muted">
                      <CheckCircle2 className="size-4 text-cold-ice shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: KeyRound, title: 'Token por equipo', text: 'Cada dispositivo envía datos con su credencial Bearer.' },
              { icon: Mail, title: 'Verificación por código', text: 'Alta con código de seis dígitos que vence en 10 minutos.' },
              { icon: CalendarClock, title: 'Captura programada', text: 'Ventanas horarias por día, incluso cruzando la medianoche.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-3 p-4 rounded-xl border border-cold-divider/10">
                <Icon className="size-5 text-cold-lavender shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-cold-text">{title}</p>
                  <p className="text-xs text-cold-muted mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- CTA ---------------- */

export function CallToAction({ dashboardUrl }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-panel px-6 py-10 md:p-14 text-center">
            <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cold-ice/15 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-cold-lavender/20 blur-3xl" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight text-cold-text">
                Que ninguna falla te tome <span className="text-gradient">por sorpresa</span>.
              </h2>
              <p className="text-cold-muted mt-4 max-w-xl mx-auto">
                Conectá tu primer equipo, configurá sus umbrales y empezá a recibir diagnósticos hoy mismo.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button as="a" href={dashboardUrl} size="lg">
                  Empezar ahora <ArrowRight className="size-4" />
                </Button>
                <Button as="a" href="#funciones" size="lg" variant="secondary">
                  Explorar funciones
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */

export function Footer() {
  return (
    <footer className="border-t border-cold-divider/10 bg-cold-shade/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-cold-muted">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <p>Telemetría IoT y mantenimiento predictivo para la cadena de frío.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-cold-lavender tracking-wider uppercase">Desarrollado por</span>
          <span className="bg-cold-raised border border-cold-divider/10 px-2 py-1 rounded-lg">
            <img src="/logos/tucsoft.png" alt="TucSoft" className="h-5 w-auto object-contain" />
          </span>
        </div>
        <p>© {new Date().getFullYear()} ColdTrack. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

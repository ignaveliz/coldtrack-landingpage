import {
  AlertTriangle,
  Bell,
  Bot,
  CalendarClock,
  Check,
  Cpu,
  KeyRound,
  LayoutDashboard,
  Mail,
  Network,
  Radio,
  RotateCw,
  Server,
  ShieldCheck,
  UserCog,
  Users,
  Wrench,
} from 'lucide-react'
import clsx from 'clsx'
import { ArrowIcon, Badge, Button, Card, Reveal, SectionHeading, Wrap } from './ui'
import { Logo } from './Navbar'

/* ---------------- Funciones (bento) ---------------- */

function FeatureHead({ icon: Icon, title, text }) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className="size-8 rounded-lg bg-cold-accent/10 border border-cold-accent/20 flex items-center justify-center">
          <Icon className="size-4 text-cold-accent" aria-hidden="true" />
        </span>
        <h3 className="text-lg font-medium tracking-tight text-cold-text">{title}</h3>
      </div>
      <p className="text-[15px] text-cold-muted mt-3 leading-relaxed max-w-md">{text}</p>
    </div>
  )
}

const telemetry = [
  { label: 'Temp. interior', value: '3.2 °C', d: 'M0,18 C20,16 40,20 60,15 S100,12 120,16 S160,20 200,14' },
  { label: 'Temp. condensador', value: '68.4 °C', alert: true, d: 'M0,20 C20,19 40,17 60,15 S100,10 120,8 S160,4 200,2' },
  { label: 'Temp. succión', value: '-8.1 °C', d: 'M0,12 C20,14 40,10 60,12 S100,14 120,11 S160,12 200,13' },
  { label: 'Presión alta', value: '92 %', alert: true, d: 'M0,18 C20,17 40,15 60,14 S100,9 120,7 S160,5 200,3' },
  { label: 'Presión baja', value: '34 %', d: 'M0,10 C20,12 40,9 60,11 S100,13 120,10 S160,11 200,12' },
]

function TelemetryVisual() {
  return (
    <div className="mt-6 rounded-xl border border-cold-line bg-cold-bg/60 divide-y divide-cold-line" aria-hidden="true">
      {telemetry.map((c) => (
        <div key={c.label} className="grid grid-cols-[1fr_auto] sm:grid-cols-[150px_1fr_80px] items-center gap-4 px-4 h-11">
          <span className="text-[13px] text-cold-muted">{c.label}</span>
          <svg viewBox="0 0 200 22" className="hidden sm:block w-full h-5 overflow-visible" preserveAspectRatio="none">
            <path
              d={c.d}
              fill="none"
              stroke={c.alert ? 'var(--color-cold-alert)' : 'var(--color-cold-accent)'}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              className="flow-line"
            />
          </svg>
          <span className={clsx('font-mono text-[13px] text-right', c.alert ? 'text-cold-alert' : 'text-cold-text')}>
            {c.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function AssistantVisual() {
  return (
    <div className="mt-6 space-y-2.5 text-[13px]" aria-hidden="true">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-cold-accent-strong text-white px-3.5 py-2">
        ¿Cómo doy de alta un equipo?
      </p>
      <p className="w-fit max-w-[90%] rounded-2xl rounded-bl-md border border-cold-line bg-cold-bg/60 text-cold-text px-3.5 py-2 leading-relaxed">
        Registralo en tu cuenta y copiá su token de telemetría en el gateway. Desde ahí, cada lectura llega sola.
      </p>
      <p className="flex items-center gap-1.5 text-[11px] text-cold-faint pl-1">
        <Bot className="size-3.5" /> Asistente Coldtrack
      </p>
    </div>
  )
}

function MailQueueVisual() {
  const rows = [
    { to: 'propietario', state: 'Entregado', icon: Check, cls: 'text-cold-ok' },
    { to: 'propietario', state: 'Reintentando', icon: RotateCw, cls: 'text-cold-warn' },
    { to: 'técnico', state: 'En cola', icon: Mail, cls: 'text-cold-muted' },
  ]
  return (
    <ul className="mt-6 rounded-xl border border-cold-line bg-cold-bg/60 divide-y divide-cold-line" aria-hidden="true">
      {rows.map((r, i) => (
        <li key={i} className="flex items-center justify-between gap-3 px-4 h-11 text-[13px]">
          <span className="text-cold-muted">
            Alerta → <span className="text-cold-text">{r.to}</span>
          </span>
          <span className={clsx('inline-flex items-center gap-1.5 font-mono text-[11px]', r.cls)}>
            <r.icon className="size-3.5" /> {r.state}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ScheduleVisual() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const on = [true, true, true, true, true, false, false]
  return (
    <div className="mt-6 rounded-xl border border-cold-line bg-cold-bg/60 p-4" aria-hidden="true">
      <div className="flex justify-between gap-1">
        {days.map((d, i) => (
          <span
            key={i}
            className={clsx(
              'size-8 rounded-lg flex items-center justify-center text-xs font-medium',
              on[i] ? 'bg-cold-accent-strong text-white' : 'border border-cold-line text-cold-faint',
            )}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[13px]">
        <span className="text-cold-text">22:00</span>
        <span className="flex-1 mx-3 h-px bg-gradient-to-r from-cold-accent to-cold-cyan" />
        <span className="text-cold-text">06:00</span>
      </div>
      <p className="mt-1.5 text-[11px] text-cold-faint">Cruza la medianoche</p>
    </div>
  )
}

function TechnicianVisual() {
  return (
    <div className="mt-6 rounded-xl border border-cold-line bg-cold-bg/60 p-4 text-[13px]" aria-hidden="true">
      <div className="flex items-center gap-2 text-cold-alert font-mono text-[11px]">
        <AlertTriangle className="size-3.5" /> SIM-001 · Condensación
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="size-9 rounded-full bg-cold-accent/15 text-cold-accent flex items-center justify-center">
          <Wrench className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-cold-text">Solicitud de revisión</p>
          <p className="text-[12px] text-cold-muted">Asignada a tu técnico de confianza</p>
        </div>
      </div>
    </div>
  )
}

export function Features() {
  return (
    <section id="funciones" className="py-20 md:py-28 scroll-mt-20">
      <Wrap>
        <SectionHeading eyebrow="Funciones" title="Del sensor a la orden de trabajo, en un solo panel.">
          Coldtrack centraliza el monitoreo, el diagnóstico y la respuesta ante fallas de toda tu flota de frío.
        </SectionHeading>

        <div className="mt-14 grid lg:grid-cols-6 gap-4">
          <Reveal className="lg:col-span-4" delay={0}>
            <Card lit className="h-full p-6 md:p-8">
              <FeatureHead
                icon={Radio}
                title="Telemetría en tiempo real"
                text="Cinco canales por equipo, con historial consultable. Ves cada lectura apenas llega a la API."
              />
              <TelemetryVisual />
            </Card>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={120}>
            <Card className="h-full p-6 md:p-8">
              <FeatureHead
                icon={Bot}
                title="Asistente virtual"
                text="Respuestas guiadas sobre captura, alertas, alta de equipos y mantenimiento."
              />
              <AssistantVisual />
            </Card>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={0}>
            <Card className="h-full p-6 md:p-8">
              <FeatureHead
                icon={Mail}
                title="Avisos por correo"
                text="Cada alerta notifica al propietario. Los envíos se reintentan hasta confirmarse."
              />
              <MailQueueVisual />
            </Card>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={120}>
            <Card className="h-full p-6 md:p-8">
              <FeatureHead
                icon={CalendarClock}
                title="Políticas de captura"
                text="Elegí canales, días y horarios. Pausá la captura sin desconectar el equipo."
              />
              <ScheduleVisual />
            </Card>
          </Reveal>
          <Reveal className="lg:col-span-2" delay={240}>
            <Card className="h-full p-6 md:p-8">
              <FeatureHead
                icon={Wrench}
                title="Mantenimiento"
                text="Asociá una solicitud de revisión a una alerta y asignala a un técnico de tu red."
              />
              <TechnicianVisual />
            </Card>
          </Reveal>
        </div>
      </Wrap>
    </section>
  )
}

/* ---------------- Pipeline ---------------- */

const steps = [
  { icon: Cpu, tag: '01', title: 'Sensores + Arduino', text: 'Mide temperaturas y presiones y emite JSON por el puerto serie.' },
  { icon: Radio, tag: '02', title: 'Serial bridge', text: 'Reenvía la salida serie al gateway local, sin hardware extra.' },
  { icon: Network, tag: '03', title: 'Gateway', text: 'Valida y filtra cada lectura y la firma con el token del equipo.' },
  { icon: Server, tag: '04', title: 'API', text: 'Aplica la política de captura, diagnostica y encola avisos.' },
  { icon: LayoutDashboard, tag: '05', title: 'Dashboard', text: 'Flota, alertas, operaciones y mantenimiento en una interfaz.' },
]

export function Pipeline() {
  return (
    <section id="como-funciona" className="relative py-20 md:py-28 scroll-mt-20 bg-cold-surface border-y border-cold-line overflow-hidden">
      <div className="absolute inset-0 grid-lines scroll-drift opacity-60 pointer-events-none" aria-hidden="true" />
      <Wrap className="relative">
        <SectionHeading eyebrow="Cómo funciona" title="Del sensor al dashboard en segundos.">
          Cada equipo se autentica con su propio token y la API decide qué se registra.
        </SectionHeading>

        <ol className="mt-16 relative grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Línea con pulso que viaja entre los pasos */}
          <div className="hidden lg:block absolute left-[10%] right-[10%] top-7 h-px bg-cold-line" aria-hidden="true">
            <span className="pulse-dot" />
            <span className="pulse-dot" style={{ animationDelay: '1.6s' }} />
          </div>
          {steps.map(({ icon: Icon, tag, title, text }, i) => (
            <Reveal as="li" key={title} className="relative" delay={i * 110}>
              <div
                className={clsx(
                  'relative z-10 size-14 rounded-2xl border flex items-center justify-center mx-0 lg:mx-auto',
                  i === steps.length - 1
                    ? 'bg-cold-accent-strong border-cold-accent text-white shadow-[0_0_40px_-6px_var(--color-cold-accent)]'
                    : 'bg-cold-bg border-cold-line text-cold-accent',
                )}
              >
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <div className="mt-6 lg:text-center">
                <span className="font-mono text-[11px] text-cold-faint">{tag}</span>
                <h3 className="text-base font-medium text-cold-text mt-1">{title}</h3>
                <p className="text-sm text-cold-muted mt-2 leading-relaxed lg:max-w-[22ch] lg:mx-auto">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Wrap>
    </section>
  )
}

/* ---------------- Diagnóstico ---------------- */

const channels = [
  { label: 'Temp. interior', value: '3.2', unit: '°C', limit: 'máx 5 °C', pct: 64 },
  { label: 'Temp. condensador', value: '68.4', unit: '°C', limit: 'máx 65 °C', pct: 100, alert: true },
  { label: 'Temp. succión', value: '-8.1', unit: '°C', limit: 'sin límite', pct: 35 },
  { label: 'Presión alta', value: '92', unit: '%', limit: 'máx 90 %', pct: 100, alert: true },
  { label: 'Presión baja', value: '34', unit: '%', limit: 'mín 10 %', pct: 34 },
]

const rules = [
  {
    code: 'POSIBLE_PROBLEMA_CONDENSACION',
    when: 'Presión alta + condensador caliente',
    then: 'Revisar ventilación y condensador.',
  },
  {
    code: 'POSIBLE_PERDIDA_CAPACIDAD_FRIGORIFICA',
    when: 'Presión baja + cámara caliente',
    then: 'Revisar circuito y carga de refrigerante.',
  },
]

export function Diagnostics() {
  return (
    <section id="diagnostico" className="py-20 md:py-28 scroll-mt-20">
      <Wrap className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center [&>*]:min-w-0">
        <div>
          <SectionHeading eyebrow="Diagnóstico" title="No solo alertas: causas probables.">
            Coldtrack cruza los canales entre sí. Si dos lecturas se disparan juntas, recibís un diagnóstico con la
            acción recomendada, no dos avisos sueltos.
          </SectionHeading>
          <ul className="mt-10 space-y-3">
            {rules.map((r, i) => (
              <Reveal as="li" key={r.code} variant="left" delay={150 + i * 120}>
                <div className="panel lift p-5">
                  <code className="font-mono text-[11px] text-cold-accent break-all">{r.code}</code>
                  <p className="mt-2 text-[15px] text-cold-text">{r.when}</p>
                  <p className="mt-1 text-sm text-cold-muted">→ {r.then}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal variant="right" delay={100}>
        <Card lit hover={false} className="p-0">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-cold-line">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="font-mono text-sm text-cold-text">SIM-001</span>
              <span className="hidden sm:inline text-xs text-cold-muted truncate">Cámara de frío · Depósito central</span>
            </div>
            <Badge variant="danger">
              <span className="size-1.5 rounded-full bg-cold-alert live-dot" /> Alerta
            </Badge>
          </div>

          <div className="p-5 space-y-4">
            {channels.map((ch, i) => (
              <div key={ch.label} style={{ '--bd': `${i * 90}ms` }}>
                <div className="flex items-baseline justify-between gap-2 text-[13px] mb-2">
                  <span className="text-cold-muted">{ch.label}</span>
                  <span className="font-mono">
                    <span className={ch.alert ? 'text-cold-alert' : 'text-cold-text'}>
                      {ch.value} {ch.unit}
                    </span>
                    <span className="hidden sm:inline text-cold-faint ml-2">{ch.limit}</span>
                  </span>
                </div>
                <div className="h-1 rounded-full bg-cold-line overflow-hidden">
                  <div
                    className={clsx('bar-fill h-full rounded-full', ch.alert ? 'bg-cold-alert' : 'bg-gradient-to-r from-cold-accent to-cold-cyan')}
                    style={{ width: `${ch.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mx-5 mb-5 p-4 rounded-xl bg-cold-alert/8 border border-cold-alert/30">
            <div className="flex items-center gap-2 text-cold-alert text-xs font-mono break-all">
              <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
              POSIBLE_PROBLEMA_CONDENSACION
            </div>
            <p className="text-[13px] text-cold-muted mt-2">
              Presión alta y temperatura de condensador elevadas. Revisar ventilación y condensador.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="muted"><Bell className="size-3" /> Correo enviado al propietario</Badge>
              <Badge><Wrench className="size-3" /> Solicitar revisión</Badge>
            </div>
          </div>
        </Card>
        </Reveal>
      </Wrap>
    </section>
  )
}

/* ---------------- Roles ---------------- */

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

const security = [
  { icon: KeyRound, title: 'Token por equipo', text: 'Cada dispositivo envía datos con su credencial Bearer.' },
  { icon: ShieldCheck, title: 'Verificación por código', text: 'Alta con código de seis dígitos que vence en 10 minutos.' },
  { icon: CalendarClock, title: 'Captura programada', text: 'Ventanas horarias por día, incluso cruzando la medianoche.' },
]

export function Roles() {
  return (
    <section id="roles" className="py-20 md:py-28 scroll-mt-20 border-t border-cold-line">
      <Wrap>
        <SectionHeading eyebrow="Roles" title="Para quien opera y para quien repara.">
          Cuentas verificadas por correo, sesiones seguras y permisos según el rol.
        </SectionHeading>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {roles.map(({ icon: Icon, title, badge, items }, i) => (
            <Reveal key={title} variant="zoom" delay={i * 140}>
            <Card className="h-full p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="size-10 rounded-xl bg-cold-accent/10 border border-cold-accent/20 flex items-center justify-center">
                    <Icon className="size-5 text-cold-accent" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl tracking-tight text-cold-text">{title}</h3>
                </div>
                <Badge variant="muted" className="font-mono">{badge}</Badge>
              </div>
              <ul className="mt-7 divide-y divide-cold-line border-t border-cold-line">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 py-3.5 text-[15px] text-cold-muted">
                    <Check className="size-4 text-cold-accent shrink-0 mt-1" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          {security.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="flex gap-3.5 p-5 rounded-[14px] border border-cold-line">
              <Icon className="size-5 text-cold-cyan shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-[15px] font-medium text-cold-text">{title}</p>
                <p className="text-sm text-cold-muted mt-1">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Wrap>
    </section>
  )
}

/* ---------------- CTA ---------------- */

export function CallToAction({ dashboardUrl }) {
  return (
    <section className="pb-20 md:pb-28">
      <Wrap>
        <Reveal variant="zoom" className="relative overflow-hidden rounded-[28px] border border-cold-line bg-cold-surface">
          <div className="glow-ground" aria-hidden="true" />
          <div className="relative px-6 py-16 md:p-20 text-center">
            <img
              src="/logos/icon-round.png"
              alt=""
              className="mx-auto size-16 md:size-20 drop-shadow-[0_12px_30px_rgba(0,74,173,0.6)]"
            />
            <h2 className="display text-4xl md:text-6xl text-cold-text mt-8 max-w-[18ch] mx-auto">
              Que ninguna falla te tome por sorpresa.
            </h2>
            <p className="text-lg text-cold-muted mt-5 max-w-md mx-auto leading-relaxed">
              Conectá tu primer equipo, configurá sus umbrales y empezá a recibir diagnósticos.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
              <Button as="a" href={dashboardUrl} size="lg">
                Conectar mi primer equipo <ArrowIcon />
              </Button>
              <Button as="a" href="#funciones" size="lg" variant="outline">
                Ver funciones
              </Button>
            </div>
          </div>
        </Reveal>
      </Wrap>
    </section>
  )
}

/* ---------------- Footer ---------------- */

export function Footer() {
  return (
    <footer className="border-t border-cold-line">
      <Wrap className="py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-cold-muted">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Logo />
          <p>Telemetría IoT y mantenimiento predictivo para la cadena de frío.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-widest uppercase text-cold-faint">Desarrollado por</span>
          <img src="/logos/tucsoft.png" alt="TucSoft" className="h-6 w-auto object-contain rounded-md" />
        </div>
        <p>© {new Date().getFullYear()} Coldtrack</p>
      </Wrap>
    </footer>
  )
}

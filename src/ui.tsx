import { ReactNode, useState } from 'react'

const P: Record<string, string> = {
  home: 'M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z',
  users: 'M16 11a4 4 0 10-8 0 4 4 0 008 0zM4 21a8 8 0 0116 0',
  book: 'M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4zM8 4v16',
  cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  wallet: 'M3 7h17v13H3zM3 7l3-3h12v3M16 13h2',
  chart: 'M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6',
  chat: 'M4 5h16v11H9l-5 4z',
  file: 'M6 3h9l4 4v14H6zM14 3v5h5',
  gear: 'M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2',
  check: 'M5 12l5 5 9-10',
  alert: 'M12 3l10 18H2zM12 10v5M12 18v.5',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM16 16l5 5',
  plus: 'M12 5v14M5 12h14',
  bell: 'M6 16V11a6 6 0 0112 0v5l2 2H4zM10 21h4',
  log: 'M5 4h14v16H5zM8 9h8M8 13h8M8 17h5',
  swap: 'M4 8h14l-3-3M20 16H6l3 3',
  user: 'M12 3a4 4 0 100 8 4 4 0 000-8zM4 21a8 8 0 0116 0',
  chev: 'M9 6l6 6-6 6',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 018 0v4',
}
export const Icon = ({ n, c = 'w-4 h-4' }: { n: string; c?: string }) => (
  <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d={P[n] || P.file} />
  </svg>
)

const tones: Record<string, string> = {
  gray: 'bg-slate-100 text-slate-600 border-slate-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  red: 'bg-red-50 text-red-700 border-red-200',
}
const map: Record<string, string> = {
  ACTIVE: 'green', COMPLETED: 'green', PAID: 'green', APPROVED: 'green', VERIFIED: 'green', WON: 'green', CONFIRMED: 'green', ACKNOWLEDGED: 'green',
  'WAITING PAYMENT': 'amber', PENDING: 'amber', 'DP PAID': 'blue', 'PARTIALLY PAID': 'blue', SUBMITTED: 'blue', 'UNDER REVIEW': 'blue', SCHEDULED: 'blue', ELIGIBLE: 'amber', 'WAITING DECISION': 'amber', DRAFT: 'gray', NEW: 'blue', CONTACTED: 'gray', ASSESSMENT: 'gray', 'MENTOR MATCHING': 'blue',
  REJECTED: 'red', CANCELLED: 'red', EXPIRED: 'red', LOST: 'red', OVERDUE: 'red', 'AT RISK': 'red', PASSIVE: 'amber', RESCHEDULED: 'amber', 'ON HOLD': 'amber', INACTIVE: 'gray', 'EXPIRING': 'amber', REQUESTED: 'blue', CONFLICT: 'red', MISSING: 'red', 'MISSING REPORT': 'red',
}
export const Badge = ({ s, tone }: { s: string; tone?: string }) => (
  <span className={`inline-block whitespace-nowrap rounded border px-1.5 py-0.5 text-[10.5px] font-semibold tracking-wide ${tones[tone || map[s.toUpperCase()] || 'gray']}`}>{s}</span>
)

export const PageHeader = ({ title, sub, actions, perm }: { title: string; sub?: string; actions?: ReactNode; perm?: string }) => (
  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
    <div>
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      {sub && <p className="mt-0.5 text-sm text-slate-500">{sub}</p>}
      {perm && <span className="mt-2 inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10.5px] text-slate-500"><Icon n="lock" c="w-3 h-3" />{perm}</span>}
    </div>
    <div className="flex gap-2">{actions}</div>
  </div>
)

export const Btn = ({ children, primary, small, onClick, danger }: { children: ReactNode; primary?: boolean; small?: boolean; onClick?: () => void; danger?: boolean }) => (
  <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-md border font-medium transition ${small ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm'} ${primary ? 'border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700' : danger ? 'border-red-200 bg-white text-red-600 hover:bg-red-50' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}>{children}</button>
)

export const Card = ({ title, action, children, pad = true, className = '' }: { title?: ReactNode; action?: ReactNode; children: ReactNode; pad?: boolean; className?: string }) => (
  <section className={`rounded-lg border border-slate-200 bg-white ${className}`}>
    {title && (
      <header className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
        {action}
      </header>
    )}
    <div className={pad ? 'p-4' : ''}>{children}</div>
  </section>
)

export const Stat = ({ label, value, hint, tone }: { label: string; value: string | number; hint?: string; tone?: string }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <div className="text-xs text-slate-500">{label}</div>
    <div className={`mt-1 text-2xl font-semibold ${tone === 'red' ? 'text-red-600' : tone === 'amber' ? 'text-amber-600' : 'text-slate-900'}`}>{value}</div>
    {hint && <div className="mt-0.5 text-xs text-slate-400">{hint}</div>}
  </div>
)

export const Table = ({ cols, rows, onRow }: { cols: string[]; rows: ReactNode[][]; onRow?: (i: number) => void }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
          {cols.map((c) => <th key={c} className="whitespace-nowrap px-4 py-2 font-medium">{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} onClick={() => onRow?.(i)} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 ${onRow ? 'cursor-pointer' : ''}`}>
            {r.map((c, j) => <td key={j} className="whitespace-nowrap px-4 py-2.5 text-slate-700">{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export const Toolbar = ({ filters = [], search = 'Search…' }: { filters?: string[]; search?: string }) => (
  <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
    <div className="flex min-w-48 flex-1 items-center gap-2 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-400"><Icon n="search" />{search}</div>
    {filters.map((f) => <span key={f} className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs text-slate-600">{f} ▾</span>)}
  </div>
)

export const Tabs = ({ tabs, render }: { tabs: string[]; render: (t: string) => ReactNode }) => {
  const [t, setT] = useState(tabs[0])
  return (
    <div>
      <div className="mb-4 flex gap-1 border-b border-slate-200">
        {tabs.map((x) => (
          <button key={x} onClick={() => setT(x)} className={`-mb-px border-b-2 px-3 py-2 text-sm ${t === x ? 'border-indigo-600 font-medium text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>{x}</button>
        ))}
      </div>
      {render(t)}
    </div>
  )
}

export const Field = ({ label, value, area, note }: { label: string; value?: string; area?: boolean; note?: string }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
    <div className={`rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 ${area ? 'min-h-20' : ''}`}>{value || <span className="text-slate-300">—</span>}</div>
    {note && <span className="mt-1 block text-[11px] text-slate-400">{note}</span>}
  </label>
)

export const KV = ({ items }: { items: [string, ReactNode][] }) => (
  <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
    {items.map(([k, v]) => (
      <div key={k}><dt className="text-xs text-slate-500">{k}</dt><dd className="mt-0.5 text-slate-800">{v}</dd></div>
    ))}
  </dl>
)

export const Progress = ({ v, max }: { v: number; max: number }) => (
  <div className="flex items-center gap-2">
    <div className="h-1.5 w-24 rounded bg-slate-200"><div className="h-1.5 rounded bg-indigo-500" style={{ width: `${(v / max) * 100}%` }} /></div>
    <span className="text-xs text-slate-500">{v}/{max}</span>
  </div>
)

export const Stepper = ({ steps, current }: { steps: string[]; current: number }) => (
  <ol className="flex flex-wrap gap-y-2">
    {steps.map((s, i) => (
      <li key={s} className="flex items-center">
        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${i < current ? 'bg-indigo-600 text-white' : i === current ? 'border-2 border-indigo-600 text-indigo-700' : 'border border-slate-300 text-slate-400'}`}>{i < current ? '✓' : i + 1}</span>
        <span className={`ml-1.5 text-xs ${i === current ? 'font-semibold text-slate-900' : 'text-slate-500'}`}>{s}</span>
        {i < steps.length - 1 && <span className="mx-2 h-px w-5 bg-slate-300" />}
      </li>
    ))}
  </ol>
)

export const Alert = ({ children, tone = 'amber' }: { children: ReactNode; tone?: string }) => (
  <div className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${tones[tone]}`}><Icon n="alert" c="mt-0.5 h-4 w-4 shrink-0" /><div>{children}</div></div>
)

export const Grid = ({ cols = 4, children }: { cols?: number; children: ReactNode }) => (
  <div className={`grid gap-4 ${cols === 4 ? 'sm:grid-cols-2 xl:grid-cols-4' : cols === 3 ? 'md:grid-cols-3' : cols === 2 ? 'lg:grid-cols-2' : ''}`}>{children}</div>
)
export const Stack = ({ children }: { children: ReactNode }) => <div className="space-y-4">{children}</div>
export const Placeholder = ({ label, h = 'h-40' }: { label: string; h?: string }) => (
  <div className={`flex ${h} items-center justify-center rounded-md border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400`}>{label}</div>
)
export const Code = ({ c }: { c: string }) => (
  <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-slate-700">{c}</span>
)
export const Check = ({ label, on }: { label: string; on?: boolean }) => (
  <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" defaultChecked={on} />{label}</label>
)
export const Select = ({ label, options, value, onChange, note }: { label: string; options: string[]; value?: string; onChange?: (v: string) => void; note?: string }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
    <select value={value} onChange={(e) => onChange?.(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
    {note && <span className="mt-1 block text-[11px] text-slate-400">{note}</span>}
  </label>
)
export const Input = ({ label, value, onChange, note, type = 'text', placeholder }: { label: string; value?: string; onChange?: (v: string) => void; note?: string; type?: string; placeholder?: string }) => (
  <label className="block">
    <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
    <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700" />
    {note && <span className="mt-1 block text-[11px] text-slate-400">{note}</span>}
  </label>
)
export const EmptyState = ({ title, hint }: { title: string; hint: string }) => (
  <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center"><div className="text-sm font-medium text-slate-700">{title}</div><div className="mt-1 text-xs text-slate-500">{hint}</div></div>
)
export const idr = (n: number) => 'Rp' + n.toLocaleString('id-ID')

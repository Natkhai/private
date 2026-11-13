import { ReactNode, useEffect, useState } from 'react'
import { Ctx, Role } from './ctx'
import { normCode, searchable } from './data'
import { Code, Icon } from './ui'
import * as A from './pages/admin'
import * as M from './pages/mentor'
import * as F from './pages/finance'
import * as P from './pages/pmo'
import * as S from './pages/student'
import { Blueprint } from './pages/blueprint'

type Nav = [string, string, string, () => ReactNode]
const cfg: Nav = ['cfg', 'Konfigurasi', 'gear', P.Config]
const rules: Nav = ['rules', 'Ketentuan paket', 'file', P.Rules]
const audit: Nav = ['aud', 'Log audit', 'log', P.Audit]
const bp: Nav = ['bp', 'Blueprint', 'file', Blueprint]

const accounts: { role: Role; name: string; sub: string; nav: Nav[] }[] = [
  { role: 'Student', name: 'Natasha (demo)', sub: 'ENR-001', nav: [['home', 'My Private', 'home', S.StudentHome], ['cur', 'Kurikulum', 'book', S.StudentCurriculum], ['jad', 'Jadwal', 'cal', S.StudentSchedule], ['pay', 'Pembayaran', 'wallet', S.StudentPayment], ['prog', 'Progres', 'chart', S.StudentProgress], ['chat', 'Pesan', 'chat', () => <S.Chat who="Budi Santoso" />]] },
  { role: 'Admin', name: 'Sari Wulandari', sub: 'Operasional', nav: [
    ['home', 'Hari ini', 'home', A.Today], ['lead', 'Pipeline lead', 'users', A.Pipeline], ['match', 'Mentor matching', 'swap', A.Matching], ['enr', 'Enrollment', 'book', A.Enrollments],
    ['jad', 'Jadwal & Zoom', 'cal', A.Schedule], ['pay', 'Pembayaran', 'wallet', A.PaymentInput], ['chat', 'Pesan (intervensi)', 'chat', () => <S.Chat who="semua enrollment" />], ['rem', 'Pengingat', 'bell', P.Reminders], ['imp', 'Impor data lama', 'file', P.Import], bp, audit] },
  { role: 'Mentor', name: 'Budi Santoso', sub: 'MNT-001', nav: [['home', 'Ruang mentor', 'home', M.MentorHome], ['ses', 'Sesi & laporan', 'cal', M.MentorSessions], ['hon', 'Honor saya', 'wallet', M.MentorHonor], ['chat', 'Pesan', 'chat', () => <S.Chat who="Natasha" />]] },
  { role: 'Finance', name: 'Dewi Lestari', sub: 'Finance', nav: [['home', 'Hari ini', 'home', F.FinanceHome], ['ver', 'Verifikasi bayar', 'check', F.Verify], ['hon', 'Honor mentor', 'wallet', F.Honor], cfg, rules, bp, audit] },
  { role: 'PMO', name: 'Rina Hartono', sub: 'Monitoring', nav: [['home', 'Dashboard', 'chart', P.PmoDashboard], ['case', 'Kasus', 'alert', P.Cases], ['enr', 'Enrollment', 'book', A.Enrollments], ['hon', 'Honor mentor', 'wallet', F.Honor], cfg, rules,
    ['method', 'Validasi produk', 'check', P.ProductValidation], bp, ['met', 'Metrik pilot', 'chart', P.Metrics], ['chk', 'Pemeriksaan data', 'check', P.Checks], ['sys', 'Sistem', 'gear', P.System], ['imp', 'Impor data lama', 'file', P.Import], audit] },
  { role: 'Management', name: 'Hadi Kusuma', sub: 'Owner', nav: [['home', 'Ikhtisar', 'chart', P.PmoDashboard], ['cfg', 'Persetujuan konfigurasi', 'check', P.Config], rules, bp, audit] },
  { role: 'Marketing', name: 'Joko Santoso', sub: 'CRM saja', nav: [['lead', 'Pipeline lead', 'users', A.Pipeline]] },
]

export default function App() {
  const [ai, setAi] = useState(1)
  const [page, setPage] = useState('home')
  const [menu, setMenu] = useState(false)
  const [toastMsg, setToast] = useState('')
  const [dlg, setDlg] = useState<{ m: string; fn: () => void } | null>(null)
  const [sq, setSq] = useState<string | null>(null)
  const acct = accounts[ai]
  const cur = acct.nav.find((n) => n[0] === page) || acct.nav[0]
  const Page = cur[3]

  const toast = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2600) }
  const go = (p: string) => setPage(acct.nav.some((n) => n[0] === p) ? p : acct.nav[0][0])
  const pick = (i: number) => { setAi(i); setPage(accounts[i].nav[0][0]); setMenu(false) }

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) { e.preventDefault(); setSq('') }
      if (e.key === 'Escape') setSq(null)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const code = sq ? normCode(sq) : null
  const results = sq === null ? [] : searchable.filter((r) => r.roles.includes(acct.role) && (code ? r.code === code : sq ? (r.code + r.label).toLowerCase().includes(sq.toLowerCase()) : false)).slice(0, 6)

  return (
    <Ctx.Provider value={{ role: acct.role, toast, confirm: (m, fn) => setDlg({ m, fn }), go }}>
      <div className="flex h-screen flex-col bg-slate-50 text-slate-800">
        <div className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-1 text-center text-xs text-amber-800">
          <span>Mode demo: semua data fiktif, WhatsApp dimatikan</span>
          <span className="rounded border border-amber-300 bg-amber-50 px-1.5 font-semibold">SDLC: Prototype & UAT</span>
        </div>
        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
            <div className="flex h-14 items-center gap-2 border-b border-slate-200 px-4">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">D</div>
              <div className="leading-tight"><div className="text-sm font-semibold">Devata</div><div className="text-[11px] text-slate-400">Private Module</div></div>
            </div>
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
              <div className="px-2 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{acct.role}</div>
              {acct.nav.map((n) => (
                <button key={n[0]} onClick={() => setPage(n[0])} className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm ${cur[0] === n[0] ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}><Icon n={n[2]} />{n[1]}</button>
              ))}
            </nav>
            <div className="border-t border-slate-200 p-3 text-[11px] text-slate-400">
              <div>Wireframe · Blueprint v1</div>
              <div className="mt-1">Design Thinking → SDLC</div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4">
              <button onClick={() => setSq('')} className="flex w-72 items-center gap-2 rounded-md border border-slate-300 px-2.5 py-1.5 text-sm text-slate-400 hover:bg-slate-50">
                <Icon n="search" />Cari kode atau nama<kbd className="ml-auto rounded border border-slate-300 px-1.5 text-[10px]">/</kbd>
              </button>
              <div className="flex items-center gap-3">
                <button className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100"><Icon n="bell" /></button>
                <div className="relative">
                  <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 rounded-md border border-slate-200 py-1 pl-1 pr-2.5 hover:bg-slate-50">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold">{acct.name[0]}</span>
                    <span className="text-left leading-tight"><span className="block text-sm font-medium">{acct.name}</span><span className="block text-[11px] text-slate-400">{acct.role}</span></span>
                  </button>
                  {menu && (
                    <div className="absolute right-0 z-20 mt-2 w-60 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
                      <div className="px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">Ganti akun demo</div>
                      {accounts.map((a, i) => (
                        <button key={a.role} onClick={() => pick(i)} className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-slate-50 ${i === ai ? 'bg-slate-50' : ''}`}>
                          <Icon n="user" /><span className="flex-1"><span className="block">{a.role}</span><span className="block text-[11px] text-slate-400">{a.name} · {a.sub}</span></span>{i === ai && <Icon n="check" c="w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </header>
            <div className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white p-2 md:hidden">
              {acct.nav.map((n) => <button key={n[0]} onClick={() => setPage(n[0])} className={`whitespace-nowrap rounded px-2.5 py-1 text-xs ${cur[0] === n[0] ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600'}`}>{n[1]}</button>)}
            </div>
            <main className="flex-1 overflow-y-auto p-6"><div className="mx-auto max-w-6xl"><Page key={acct.role + cur[0]} /></div></main>
          </div>
        </div>

        {sq !== null && (
          <div className="fixed inset-0 z-30 flex items-start justify-center bg-slate-900/30 pt-24" onClick={() => setSq(null)}>
            <div className="w-full max-w-lg rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <input autoFocus value={sq} onChange={(e) => setSq(e.target.value)} placeholder="Ketik kode (enr 4 = ENR-004) atau nama" className="w-full rounded-t-lg border-b border-slate-200 px-4 py-3 text-sm outline-none" />
              <div className="p-2">
                {results.length === 0 && <div className="p-4 text-center text-xs text-slate-400">{sq ? 'Tidak ada hasil untuk peran ini' : 'Pencarian menghormati hak akses peran Anda'}</div>}
                {results.map((r) => (
                  <button key={r.code} onClick={() => { setSq(null); toast(`Membuka ${r.code}`) }} className="flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm hover:bg-slate-50"><Code c={r.code} /><span className="flex-1">{r.label}</span><span className="text-xs text-slate-400">{r.kind}</span></button>
                ))}
              </div>
            </div>
          </div>
        )}
        {dlg && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30">
            <div className="w-96 rounded-lg bg-white p-5 shadow-xl">
              <p className="text-sm text-slate-700">{dlg.m}</p>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setDlg(null)} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm">Batal</button>
                <button onClick={() => { dlg.fn(); setDlg(null) }} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white">Lanjutkan</button>
              </div>
            </div>
          </div>
        )}
        {toastMsg && <div className="fixed bottom-5 right-5 z-50 rounded-md bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">{toastMsg}</div>}
      </div>
    </Ctx.Provider>
  )
}

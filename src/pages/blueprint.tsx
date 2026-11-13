import { useState } from 'react'
import { Flow, flows } from '../flows'
import { Alert, Badge, Card, Code, Grid, PageHeader, Stack, Table, Tabs } from '../ui'

const W = 150, H = 54, CW = 190, LH = 100, LX = 110

const FlowChart = ({ f }: { f: Flow }) => {
  const maxCol = Math.max(...f.nodes.map((n) => n.col))
  const width = LX + (maxCol + 1) * CW + 20
  const height = f.lanes.length * LH + 10
  const pos = (id: string) => {
    const n = f.nodes.find((x) => x.id === id)!
    return { x: LX + n.col * CW + 10, y: n.lane * LH + (LH - H) / 2 + 5 }
  }
  const path = (a: string, b: string) => {
    const A = pos(a), B = pos(b)
    if (B.x > A.x) {
      const x1 = A.x + W, y1 = A.y + H / 2, x2 = B.x, y2 = B.y + H / 2, xm = x1 + (x2 - x1) / 2
      return { d: `M${x1} ${y1} H${xm} V${y2} H${x2}`, lx: xm, ly: (y1 + y2) / 2 }
    }
    if (B.x === A.x) {
      const down = B.y > A.y
      const x = A.x + W / 2
      return { d: `M${x} ${down ? A.y + H : A.y} V${down ? B.y : B.y + H}`, lx: x + 4, ly: (A.y + B.y) / 2 + H / 2 }
    }
    const x1 = A.x + W / 2, y1 = A.y + H, x2 = B.x + W / 2, y2 = B.y + H, yb = Math.max(y1, y2) + 14
    return { d: `M${x1} ${y1} V${yb} H${x2} V${y2}`, lx: (x1 + x2) / 2, ly: yb - 3, back: true }
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <svg width={width} height={height} className="text-slate-700">
        <defs><marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#64748b" /></marker></defs>
        {f.lanes.map((l, i) => (
          <g key={l}>
            <rect x="0" y={i * LH + 5} width={width} height={LH} fill={i % 2 ? '#f8fafc' : '#ffffff'} stroke="#e2e8f0" />
            <text x="10" y={i * LH + LH / 2 + 9} fontSize="11" fontWeight="600" fill="#64748b">{l}</text>
          </g>
        ))}
        {f.edges.map(([a, b, lab], i) => {
          const p = path(a, b)
          return (
            <g key={i}>
              <path d={p.d} fill="none" stroke="#64748b" strokeWidth="1.3" strokeDasharray={p.back ? '4 3' : undefined} markerEnd="url(#ar)" />
              {lab && <text x={p.lx} y={p.ly - 3} fontSize="9.5" textAnchor="middle" fill="#475569" stroke="#fff" strokeWidth="3" paintOrder="stroke">{lab}</text>}
            </g>
          )
        })}
        {f.nodes.map((n) => {
          const { x, y } = pos(n.id)
          const lines = n.label.length > 22 ? [n.label.slice(0, n.label.lastIndexOf(' ', 22)), n.label.slice(n.label.lastIndexOf(' ', 22) + 1)] : [n.label]
          return (
            <g key={n.id}>
              {n.kind === 'decision' ? <polygon points={`${x + W / 2},${y - 4} ${x + W},${y + H / 2} ${x + W / 2},${y + H + 4} ${x},${y + H / 2}`} fill="#fffbeb" stroke="#f59e0b" />
                : <rect x={x} y={y} width={W} height={H} rx={n.kind === 'start' || n.kind === 'end' ? 26 : 6} fill={n.kind === 'start' ? '#eef2ff' : n.kind === 'end' ? '#ecfdf5' : '#fff'} stroke={n.kind === 'start' ? '#6366f1' : n.kind === 'end' ? '#10b981' : '#94a3b8'} />}
              {lines.map((t, i) => <text key={i} x={x + W / 2} y={y + H / 2 + (i - (lines.length - 1) / 2) * 12 + 4} fontSize="10.5" textAnchor="middle" fill="#0f172a">{t}</text>)}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

const decisions = [
  ['D-01', 'Portal student penuh sejak rilis 1', 'Dikonfirmasi'], ['D-02', 'Aturan lama berlaku; ketentuan terbaru disimpan', 'Dikonfirmasi'], ['D-03', 'Paket 5 sesi Rp1.750.000', 'Dikonfirmasi'],
  ['D-04', 'Owner menyetujui; PMO/Finance mengusulkan', 'Dikonfirmasi'], ['D-05', 'Honor per tier mentor', 'Dikonfirmasi'], ['D-06', 'Mandiri dulu, mengikuti stack Portal', 'Dikonfirmasi'],
]
const questions = [
  ['OQ-01', 'Jumlah tier, nominal tarif, kriteria, batas margin', 'Owner, Finance', 'Pilot'], ['OQ-02', 'Konsekuensi no-show student/mentor', 'Owner', 'Penegakan otomatis'],
  ['OQ-03', 'Peringatan atau blokir sesi saat pelunasan kurang', 'Owner', 'Pemblokiran'], ['OQ-04', 'Aktivasi bila DP kurang dari 50%', 'Owner', 'Aktivasi DP kurang'],
  ['OQ-05', 'Siklus honor: minimum, tanggal potong, gabungan bulanan', 'Finance', 'Tidak'], ['OQ-06', 'Kebijakan unggah bukti: jenis, ukuran, retensi, SLA', 'Finance, Security', 'Rilis 1'],
  ['OQ-07', 'Kanal notifikasi ke student', 'PMO, Admin', 'Rilis 1'], ['OQ-08', 'Kapan, siapa, dan bagaimana akun student dibuat', 'Owner, Admin', 'Rilis 1'],
  ['OQ-09', 'Chat: bangun baru, reuse Portal, atau eksternal', 'Owner, Arsitek', 'Rilis 1'], ['OQ-12', 'Volume, hosting, pemilik cadangan', 'Owner, DevOps', 'Pilot'],
  ['OQ-13', 'Akun Zoom Private hanya satu?', 'Admin', 'Tahap jadwal'], ['OQ-18', 'Hasil audit Devata Portal (stack, auth, chat, keuangan)', 'Arsitek', 'Desain teknis final'],
  ['OQ-21', 'Set status honor yang dipakai', 'Finance', 'Fase honor'], ['OQ-22', 'Delegasi bila Owner berhalangan', 'Owner', 'Pilot'],
  ['OQ-23', 'Perlindungan data pribadi (UU PDP)', 'Owner, Legal', 'Rilis 1'], ['OQ-24', 'Product Owner, PIC admin, pelatihan', 'Owner', 'Pilot'],
]
const screens: [string, string, string, string, string][] = [
  ['SCR-STU-01..06', 'Student', 'Beranda, kurikulum, jadwal, pembayaran, progres, pesan', 'FR-STU, FR-CUR-03, FR-PAY-01,02, FR-SCH-06', 'F1, F3, F4, F5'],
  ['SCR-MEN-01..05', 'Mentor', 'Ruang mentor, kurikulum, sesi & laporan, penilaian, honor', 'FR-CUR, FR-RPT, FR-HON-02', 'F3, F5, F6'],
  ['SCR-ADM-01..06', 'Admin', 'Hari ini, pipeline, matching, enrollment, jadwal & Zoom, pembayaran', 'FR-CRM, FR-MAT, FR-ENR, FR-SCH, FR-PAY-02', 'F2, F4, F5, F8'],
  ['SCR-FIN-01..03', 'Finance', 'Hari ini, verifikasi, honor', 'FR-PAY-03..06, FR-HON-03..06', 'F4, F6'],
  ['SCR-PMO-01..03', 'PMO', 'Dashboard, kasus, metrik, pemeriksaan data, sistem', 'FR-MON, FR-CFG-06', 'F9'],
  ['SCR-CFG-01,02', 'PMO, Finance, Management', 'Usulan/persetujuan konfigurasi, ketentuan paket', 'FR-CFG-01..05', 'F7'],
  ['SCR-MGT-01', 'Management', 'Ikhtisar bisnis baca saja', 'FR-MON-02', '-'],
  ['SCR-X-01..03', 'Semua', 'Pencarian, blueprint, audit', 'FR-AUD-01', '-'],
]
const access: [string, string, string, string, string, string, string, string][] = [
  ['Lead / CRM', '-', '-', 'RW', '-', 'R', 'R', 'RW*'], ['Kurikulum', 'K / R', 'RW asg', 'R/RW', '-', 'R', 'R', '-'],
  ['Enrollment', 'R own', 'R asg', 'RW', 'R', 'R', 'R', '-'], ['Jadwal', 'R own', 'RW asg', 'RW', 'R', 'R', 'R', '-'],
  ['Laporan sesi', 'R own', 'RW own', 'R', 'R', 'R', 'R', '-'], ['Pembayaran student', 'R + unggah', '-', 'catat', 'verifikasi', 'R', 'R', '-'],
  ['Honor mentor', '-', 'S own', '-', 'RW', 'R', 'R', '-'], ['Tier, tarif', '-', 'R own', '-', 'R', 'usul', 'A', '-'],
  ['Rekening mentor', '-', 'own', '-', 'RW', 'tersamar', '-', '-'], ['Harga paket / tujuan bayar', 'R', '-', 'R', 'usul', 'usul', 'A', '-'],
]
const states: [string, string][] = [
  ['Lead', 'New > Contacted > Assessment > Mentor Matching > Waiting Decision > Won | Lost (alasan wajib)'],
  ['Enrollment', 'Draft > Waiting Payment > Active > On Hold | Completed | Expired | Cancelled'],
  ['Sesi', 'Scheduled > Completed | Rescheduled | Cancelled (penanda needs_confirm bukan status)'],
  ['Transaksi bayar', 'Pending > Verified | Rejected; status bayar enrollment dihitung: Pending, DP Paid, Partially Paid, Paid'],
  ['Honor', 'Eligible > Submitted > Under Review > Approved > Paid | Rejected (kembali Eligible) [OQ-21]'],
  ['Kurikulum', 'Draft > Submitted > Acknowledged > Confirmed > Superseded (revisi baru)'],
  ['Usulan konfigurasi', 'Proposed > Approved > Effective > Superseded | Rejected'],
]
const docs = [
  ['00-index', 'Peta dokumen, konvensi ID, tingkat kepercayaan sumber'], ['01-keputusan-dan-pertanyaan', 'Keputusan D-xx, konflik CF-xx, pertanyaan terbuka OQ-xx'],
  ['02-prd', 'Tujuan, peran, FR, NFR'], ['03-aturan-bisnis', 'Katalog BR-xx'], ['04-flowchart', 'F1 sampai F10 (Mermaid)'], ['05-status-dan-transisi', 'Mesin status'],
  ['06-arsitektur', 'Konteks, modul, ERD, API, keamanan, ADR'], ['07-hak-akses', 'Matriks peran dan izin per kolom'], ['08-ux-wireframe', 'IA, inventaris layar, pola UI'],
  ['09-rencana-pengujian', 'Strategi tes, TC-xx, UAT'], ['10-rencana-pengiriman', 'Tahap, RACI, risiko, DoR/DoD'], ['11-traceability', 'FR ke aturan, alur, layar, tes'],
]

export const Blueprint = () => {
  const [fid, setFid] = useState('F1')
  const f = flows.find((x) => x.id === fid)!
  return (
    <Stack>
      <PageHeader title="Blueprint sistem" sub="Alur, layar, hak akses, status, dan keputusan yang saling terhubung. Dokumen lengkap ada di docs/blueprint." />
      <Tabs tabs={['Flowchart', 'Status', 'Peta layar', 'Hak akses', 'Keputusan & pertanyaan', 'Dokumen']} render={(t) => {
        if (t === 'Flowchart') return (
          <Stack>
            <div className="flex flex-wrap gap-2">{flows.map((x) => <button key={x.id} onClick={() => setFid(x.id)} className={`rounded-md border px-3 py-1.5 text-xs ${fid === x.id ? 'border-indigo-600 bg-indigo-50 font-medium text-indigo-700' : 'border-slate-300 bg-white text-slate-600'}`}>{x.id} · {x.title}</button>)}</div>
            <p className="text-sm text-slate-600">{f.desc}</p>
            <FlowChart f={f} />
            <Card title="Keterhubungan">
              <Grid cols={2}>
                <div className="text-sm"><div className="text-xs text-slate-500">Aturan bisnis</div>{f.refs.br}</div>
                <div className="text-sm"><div className="text-xs text-slate-500">Kebutuhan fungsional</div>{f.refs.fr}</div>
                <div className="text-sm"><div className="text-xs text-slate-500">Layar</div>{f.refs.scr}</div>
                <div className="text-sm"><div className="text-xs text-slate-500">Test case</div>{f.refs.tc}</div>
              </Grid>
            </Card>
            <p className="text-xs text-slate-400">Garis putus-putus = jalur kembali. Belah ketupat = keputusan. Alur lain (F2, F10) ada di docs/blueprint/04-flowchart.md.</p>
          </Stack>
        )
        if (t === 'Status') return <Card pad={false}><Table cols={['Entitas', 'Transisi resmi']} rows={states.map((s) => [<b>{s[0]}</b>, s[1]])} /></Card>
        if (t === 'Peta layar') return <Card pad={false}><Table cols={['Layar', 'Peran', 'Isi', 'Kebutuhan', 'Alur']} rows={screens.map((s) => [<Code c={s[0]} />, s[1], s[2], s[3], s[4]])} /></Card>
        if (t === 'Hak akses') return (
          <Stack>
            <Card pad={false}><Table cols={['Data', 'Student', 'Mentor', 'Admin', 'Finance', 'PMO', 'Mgmt', 'Marketing']} rows={access.map((r) => r)} /></Card>
            <p className="text-xs text-slate-400">R baca, W tulis, S ajukan, K acknowledge, A setujui, asg ditugaskan, *tanpa konversi ke enrollment. Admin tidak pernah menerima tier, tarif, honor, atau rekening mentor.</p>
          </Stack>
        )
        if (t === 'Dokumen') return <Card pad={false}><Table cols={['Berkas docs/blueprint', 'Isi']} rows={docs.map((d) => [<Code c={d[0] + '.md'} />, d[1]])} /></Card>
        return (
          <Stack>
            <Card title="Keputusan terkonfirmasi" pad={false}><Table cols={['ID', 'Keputusan', 'Status']} rows={decisions.map((d) => [<Code c={d[0]} />, d[1], <Badge s={d[2]} tone="green" />])} /></Card>
            <Alert>Pertanyaan berikut belum dijawab. Tim tidak mengisinya dengan asumsi; wireframe hanya memakai nilai contoh fiktif.</Alert>
            <Card title="Pertanyaan terbuka" pad={false}><Table cols={['ID', 'Pertanyaan', 'Pemilik keputusan', 'Menghalangi']} rows={questions.map((q) => [<Code c={q[0]} />, q[1], q[2], <Badge s={q[3]} tone={q[3] === 'Tidak' ? 'gray' : 'amber'} />])} /></Card>
          </Stack>
        )
      }} />
    </Stack>
  )
}

import { useState } from 'react'
import { useApp } from '../ctx'
import { payments, prl } from '../data'
import { Alert, Badge, Btn, Card, Check, Code, Field, Grid, Input, PageHeader, Placeholder, Stack, Stat, Table, Tabs, Toolbar, idr } from '../ui'

export const FinanceHome = () => (
  <Stack>
    <PageHeader title="Hari ini (Finance)" sub="Verifikasi pembayaran dan honor mentor" />
    <Grid><Stat label="Pembayaran menunggu verifikasi" value={2} tone="amber" /><Stat label="Sisa tagihan" value={idr(4500000)} /><Stat label="Pengajuan honor" value={2} /><Stat label="Mentor tanpa tier" value={1} tone="red" hint="Honor tertahan" /></Grid>
    <Alert tone="red">MNT-003 belum memiliki tier. Sesi selesai tetap berjalan, honor tertahan sampai tier disetujui (usulan di Konfigurasi).</Alert>
  </Stack>
)

export const Verify = () => {
  const { toast, confirm } = useApp()
  const pend = payments.filter((p) => p.status === 'Pending')
  const [sel, setSel] = useState<string[]>([])
  const [open, setOpen] = useState(pend[0].code)
  const p = payments.find((x) => x.code === open)!
  const tog = (c: string) => setSel(sel.includes(c) ? sel.filter((x) => x !== c) : [...sel, c])
  return (
    <Stack>
      <PageHeader title="Verifikasi pembayaran" sub="Hanya Finance yang dapat memverifikasi" actions={<Btn small primary onClick={() => (sel.length ? confirm(`Verifikasi ${sel.length} pembayaran sekaligus?`, () => { toast('Terverifikasi: ' + sel.join(', ')); setSel([]) }) : toast('Pilih pembayaran dulu'))}>Verifikasi terpilih ({sel.length})</Btn>} />
      <Tabs tabs={['Antrian', 'Sisa tagihan']} render={(t) => t === 'Sisa tagihan' ? (
        <Card pad={false}><Toolbar filters={['Status jatuh tempo', 'Status enrollment']} /><Table cols={['Enrollment', 'Student', 'Harga', 'Terverifikasi', 'Sisa', 'Aturan', 'Status']} rows={[
          [<Code c="ENR-001" />, 'Natasha', idr(3000000), idr(1500000), idr(1500000), 'Sebelum sesi 6', <Badge s="AT RISK" tone="amber" />],
          [<Code c="ENR-004" />, 'Rafi', idr(1750000), idr(0), idr(1750000), 'Sebelum sesi 3', <Badge s="Pending" />]]} /></Card>
      ) : (
        <Grid cols={2}>
          <Card pad={false}><Table cols={['', 'Kode', 'Student', 'Jumlah', 'Dicatat']} onRow={(i) => setOpen(pend[i].code)} rows={pend.map((x) => [<input type="checkbox" checked={sel.includes(x.code)} onClick={(e) => e.stopPropagation()} onChange={() => tog(x.code)} />, <Code c={x.code} />, x.student, idr(x.amt), x.by])} /></Card>
          <Card title={`${p.code} · ${p.student}`}>
            <Stack>
              <Placeholder label="Bukti pembayaran (tautan Drive)" h="h-28" />
              <div className="space-y-2"><Check label="Jumlah sesuai mutasi bank" /><Check label="Tanggal sesuai" /><Check label="Tidak ada catatan dobel" /><Check label="Atas nama / berita memuat kode enrollment" /></div>
              <Input label="Alasan (wajib bila ditolak)" />
              <div className="flex gap-2"><Btn primary small onClick={() => toast(`${p.code} terverifikasi. Status bayar ${p.enr} diperbarui.`)}>Verifikasi</Btn><Btn small onClick={() => toast('Alasan wajib diisi')}>Tolak</Btn></div>
              <p className="text-xs text-slate-400">Verified tidak bisa diubah; koreksi lewat catatan koreksi baru.</p>
            </Stack>
          </Card>
        </Grid>
      )} />
    </Stack>
  )
}

export const Honor = () => {
  const { toast, confirm } = useApp()
  const flow = ['Submitted', 'Under Review', 'Approved', 'Paid']
  const [st, setSt] = useState('Submitted')
  const [shown, setShown] = useState(false)
  const idx = flow.indexOf(st)
  return (
    <Stack>
      <PageHeader title="Honor mentor" perm="Hanya Finance dan PMO. Admin tidak melihat halaman ini." />
      <Tabs tabs={['Pengajuan', 'Rekap per mentor']} render={(t) => t === 'Pengajuan' ? (
        <Stack>
          <Card pad={false}><Table cols={['Kode', 'Mentor', 'Sesi', 'Nominal', 'Diajukan', 'Status']} rows={prl.map((r) => [<Code c={r.code} />, r.mentor, r.n, idr(r.amt), r.date, <Badge s={r.code === 'PRL-012' ? st : r.status} />])} /></Card>
          <Card title="Tinjau PRL-012 · Budi Santoso" action={<Badge s={st} />}>
            <Stack>
              <Table cols={['Sesi', 'Selesai', 'Laporan', 'Tier', 'Tarif (snapshot)']} rows={[[<Code c="SES-004" />, 'Ya', 'Terkirim', 'Tier 2', idr(350000)], [<Code c="SES-005" />, 'Ya', 'Terkirim', 'Tier 2', idr(350000)], [<Code c="SES-009" />, 'Ya', 'Terkirim', 'Tier 2', idr(350000)]]} />
              <div className="flex flex-wrap items-center gap-1 text-xs text-slate-500">{flow.map((s, i) => <span key={s} className={`rounded px-2 py-0.5 ${i <= idx ? 'bg-indigo-50 font-medium text-indigo-700' : 'bg-slate-100'}`}>{s}{i < flow.length - 1 ? '  ›' : ''}</span>)}</div>
              {st === 'Submitted' && <Btn primary small onClick={() => setSt('Under Review')}>Mulai tinjau</Btn>}
              {st === 'Under Review' && (
                <div className="flex flex-wrap items-end gap-2"><div className="w-64"><Input label="Alasan (wajib bila ditolak)" /></div>
                  <Btn primary small onClick={() => { setSt('Approved'); toast('Disetujui; identitas dan waktu tercatat') }}>Setujui</Btn><Btn small onClick={() => toast('Alasan wajib; sesi dilepas kembali ke Eligible')}>Tolak</Btn></div>)}
              {st === 'Approved' && (
                <div className="grid items-end gap-3 md:grid-cols-4"><Input label="Tanggal bayar" type="date" /><Input label="Referensi pembayaran" /><div /><Btn primary small onClick={() => confirm('Catat Paid? Tidak dapat dibatalkan.', () => { setSt('Paid'); toast('PRL-012 Paid') })}>Catat pembayaran</Btn></div>)}
              {st === 'Paid' && <Alert tone="green">Paid. Rekaman terkunci; koreksi lewat catatan baru.</Alert>}
              <Btn small onClick={() => setSt('Submitted')}>Reset contoh</Btn>
            </Stack>
          </Card>
        </Stack>
      ) : (
        <Card pad={false}><Table cols={['Mentor', 'Bulan', 'Sesi', 'Total', 'Rekening']} rows={[
          ['Budi Santoso', 'Mar 2026', 5, idr(1750000), shown ? 'BCA 0000-DEMO-1234' : <Btn small onClick={() => { setShown(true); toast('Pembukaan rekening dicatat di audit log') }}>Tampilkan</Btn>],
          ['Citra Dewi', 'Mar 2026', 5, idr(1750000), <span className="text-slate-400">tersembunyi</span>]]} />
          <div className="flex gap-2 border-t border-slate-100 p-3"><Btn small>Ekspor Excel</Btn><Btn small>Cetak slip honor</Btn></div></Card>
      )} />
    </Stack>
  )
}

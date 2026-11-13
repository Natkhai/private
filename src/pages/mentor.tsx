import { useState } from 'react'
import { useApp } from '../ctx'
import { Alert, Badge, Btn, Card, Code, Grid, Input, PageHeader, Progress, Stack, Stat, Table, Tabs, idr } from '../ui'

export const MentorHome = () => (
  <Stack>
    <PageHeader title="Ruang mentor" sub="Budi Santoso · MNT-001" perm="Hanya enrollment milik Anda. Tanpa harga paket atau pembayaran student." />
    <Grid>
      <Stat label="Student aktif" value={3} /><Stat label="Sesi minggu ini" value={4} />
      <Stat label="Laporan jatuh tempo (H+1)" value={1} tone="red" /><Stat label="Honor eligible" value={idr(1200000)} hint="4 sesi · tarif tier Anda" />
    </Grid>
    <Card title="Perlu tindakan"><div className="space-y-2">
      <Alert tone="red"><Code c="SES-006" /> Natasha sesi 2: laporan terlambat (batas 20 Mar)</Alert>
      <Alert>Dimas (<Code c="ENR-002" />) belum merespons jadwal 7 hari. Anda follow-up lebih dulu, lalu Admin.</Alert>
    </div></Card>
    <Card title="Student saya" pad={false}><Table cols={['Enrollment', 'Student', 'Paket', 'Status', 'Sesi', 'Berlaku s.d.', 'Sesi berikutnya']} rows={[
      [<Code c="ENR-001" />, 'Natasha', '10 sesi', <Badge s="Active" />, <Progress v={2} max={10} />, '12 Sep 2026', '28 Mar 19:00'],
      [<Code c="ENR-002" />, 'Dimas', '5 sesi', <Badge s="Active" />, <Progress v={3} max={5} />, '10 Jun 2026', 'Belum dijadwalkan'],
      [<Code c="ENR-004" />, 'Rafi', '5 sesi', <Badge s="Waiting Payment" />, <Progress v={0} max={5} />, '-', '-'],
    ]} /></Card>
  </Stack>
)

export const MentorSessions = () => {
  const { toast } = useApp()
  return (
    <Stack>
      <PageHeader title="Sesi & laporan" sub="Sesi valid untuk honor bila terlaksana dan laporan terkirim" />
      <Card pad={false}><Table cols={['Kode', 'Student', 'Sesi', 'Waktu', 'Status', 'Laporan', '']} rows={[
        [<Code c="SES-006" />, 'Natasha', 2, '19 Mar 19:00', <Badge s="Scheduled" />, <Badge s="OVERDUE" />, <Btn small>Isi laporan</Btn>],
        [<Code c="SES-007" />, 'Natasha', 3, '28 Mar 19:00', <Badge s="Scheduled" />, '-', <Btn small>Ajukan reschedule</Btn>],
        [<Code c="SES-005" />, 'Natasha', 1, '12 Mar 19:00', <Badge s="Completed" />, <Badge s="Submitted" />, ''],
      ]} /></Card>
      <Card title="Laporan sesi: SES-006 · Natasha sesi 2" action={<span className="text-xs text-red-600">Lewat batas H+1</span>}>
        <Stack>
          <Grid cols={2}><Input label="Topik / materi *" /><Input label="Progres / capaian *" /><Input label="Langkah berikutnya *" /><Input label="Catatan (opsional)" /></Grid>
          <div className="flex items-center gap-3"><Btn primary onClick={() => toast('Laporan terkirim. Sesi menjadi Completed dan honor eligible.')}>Kirim laporan</Btn><span className="text-xs text-slate-400">Laporan tidak dapat diisi sebelum sesi dimulai.</span></div>
        </Stack>
      </Card>
      <Card title="Laporan akhir program"><p className="text-sm text-slate-500">Tersedia untuk program yang masuk tahap penutupan.</p></Card>
    </Stack>
  )
}

export const MentorHonor = () => {
  const { toast } = useApp()
  const rows = [['SES-004', 'Dimas sesi 3', '10 Mar', 350000], ['SES-005', 'Natasha sesi 1', '12 Mar', 350000], ['SES-009', 'Dimas sesi 2', '03 Mar', 350000]]
  const [sel, setSel] = useState([true, true, false])
  const total = rows.reduce((a, r, i) => a + (sel[i] ? (r[3] as number) : 0), 0)
  return (
    <Stack>
      <PageHeader title="Honor saya" sub="Nominal otomatis dari tarif tier pada tanggal sesi. Tidak dapat diubah." perm="Hanya honor milik sendiri" />
      <Tabs tabs={['Eligible', 'Pengajuan']} render={(t) => t === 'Eligible' ? (
        <Card pad={false}>
          <Table cols={['', 'Sesi', 'Keterangan', 'Tanggal', 'Tier', 'Nominal']} rows={rows.map((r, i) => [<input type="checkbox" checked={sel[i]} onChange={() => setSel(sel.map((v, j) => (j === i ? !v : v)))} />, <Code c={r[0] as string} />, r[1], r[2], 'Tier 2', idr(r[3] as number)])} />
          <div className="flex items-center justify-between border-t border-slate-100 p-4"><b>Total {idr(total)}</b><Btn primary onClick={() => toast('Pengajuan PRL-013 dikirim ke Finance')}>Ajukan honor</Btn></div>
        </Card>
      ) : (
        <Card pad={false}><Table cols={['Kode', 'Tanggal', 'Sesi', 'Nominal', 'Status']} rows={[
          [<Code c="PRL-012" />, '22 Mar', 3, idr(900000), <Badge s="Requested" />], [<Code c="PRL-011" />, '10 Mar', 2, idr(700000), <Badge s="Paid" />], [<Code c="PRL-008" />, '02 Mar', 1, idr(300000), <Badge s="Rejected" />]]} />
          <p className="px-4 py-3 text-xs text-slate-400">Ditolak: sesi dilepas dan dapat diajukan lagi setelah laporan diperbaiki.</p></Card>
      )} />
    </Stack>
  )
}

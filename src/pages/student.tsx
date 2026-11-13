import { useState } from 'react'
import { useApp } from '../ctx'
import { Alert, Badge, Btn, Card, Code, Field, Grid, Input, KV, PageHeader, Placeholder, Stack, Stat, Stepper, Table, Tabs, idr } from '../ui'

export const StudentHome = () => (
  <Stack>
    <PageHeader title="My Private" sub="ENR-001 · Persiapan Tugas Akhir · Paket 10 sesi" perm="Hanya menampilkan data enrollment Anda" />
    <Card><Stepper steps={['Konsultasi', 'Kurikulum', 'Paket', 'Pembayaran', 'Aktif', 'Penutupan', 'Selesai']} current={4} /></Card>
    <Alert>Pelunasan Rp1.500.000 jatuh tempo sebelum sesi ke-6 dimulai. Unggah bukti di menu Pembayaran setelah transfer.</Alert>
    <Grid>
      <Stat label="Sesi selesai" value="2 / 10" hint="8 tersisa" />
      <Stat label="Sesi berikutnya" value="28 Mar" hint="19:00-21:00 · Zoom" />
      <Stat label="Berlaku sampai" value="12 Sep 2026" hint="6 bulan" />
      <Stat label="Pembayaran" value="DP Paid" hint="Sisa Rp1.500.000" tone="amber" />
    </Grid>
    <Grid cols={2}>
      <Card title="Tujuan belajar" action={<Badge s="Confirmed" />}>
        <p className="text-sm text-slate-700">Menyelesaikan bab analisis data skripsi dengan SPSS dan mempresentasikan hasilnya.</p>
        <p className="mt-3 text-xs text-slate-500">Kurikulum v1 · dikonfirmasi Budi Santoso, 02 Mar 2026</p>
      </Card>
      <Card title="Mentor Anda"><div className="flex gap-3"><div className="h-12 w-12 rounded-full bg-slate-200" /><div className="text-sm"><div className="font-medium">Budi Santoso</div><div className="text-slate-500">Statistik · SPSS · Metodologi penelitian</div><p className="mt-1 text-xs text-slate-400">Ketersediaan dan data internal mentor tidak ditampilkan.</p></div></div></Card>
    </Grid>
  </Stack>
)

export const StudentCurriculum = () => {
  const { toast, confirm } = useApp()
  const [ack, setAck] = useState(false)
  return (
    <Stack>
      <PageHeader title="Kurikulum" sub="Hanya baca. Perubahan dilakukan mentor sebagai revisi baru." />
      <Tabs tabs={['Rencana aktif (v1)', 'Draf menunggu Anda', 'Riwayat']} render={(t) => t.startsWith('Draf') ? (
        <Card title="Revisi v2: draf" action={<Badge s={ack ? 'Acknowledged' : 'Submitted'} />}>
          <Stack>
            <Alert tone="blue">Diskusikan dengan mentor lebih dulu. Acknowledge mencatat nama dan waktu Anda; Anda tidak dapat mengubah isi.</Alert>
            <Grid cols={2}><Field label="Tujuan belajar" value="Menambah pemodelan regresi pada skripsi" /><Field label="Estimasi sesi / paket rekomendasi" value="4 sesi tambahan · paket < 5 sesi" /></Grid>
            <Field label="Topik" area value="1. Regresi berganda  2. Uji asumsi  3. Pelaporan hasil" />
            <Field label="Capaian" area value="Menjalankan dan menafsirkan regresi, menulis bagian hasil." />
            {ack ? <Alert tone="green">Anda mengakui draf ini pada 23 Mar 2026 10:20. Mentor akan mengonfirmasi menjadi rencana aktif.</Alert>
              : <div className="flex gap-2"><Btn primary onClick={() => confirm('Acknowledge draf kurikulum v2?', () => { setAck(true); toast('Acknowledgement tercatat') })}>Acknowledge draf</Btn><Btn>Kirim pesan ke mentor</Btn></div>}
          </Stack>
        </Card>
      ) : t === 'Riwayat' ? (
        <Card pad={false}><Table cols={['Versi', 'Status', 'Acknowledge', 'Dikonfirmasi']} rows={[['v1', <Badge s="Confirmed" />, '01 Mar 2026 · Natasha', 'Budi · 02 Mar 2026']]} /></Card>
      ) : (
        <Card title="Revisi v1: aktif" action={<Badge s="Confirmed" />}>
          <Stack>
            <Field label="Tujuan belajar" value="Menyelesaikan bab analisis data skripsi dengan SPSS." />
            <Field label="Topik" area value="1. Pembersihan data  2. Statistik deskriptif  3. Uji hipotesis  4. Interpretasi" />
            <Field label="Capaian" area value="Menjalankan analisis SPSS secara mandiri dan melaporkan temuan." />
            <KV items={[['Estimasi sesi', '10'], ['Paket rekomendasi', '10 sesi']]} />
          </Stack>
        </Card>
      )} />
    </Stack>
  )
}

export const StudentSchedule = () => (
  <Stack>
    <PageHeader title="Jadwal" sub="Sesi yang disepakati dengan mentor, termasuk riwayat reschedule." />
    <Card pad={false}><Table cols={['Kode', 'Sesi', 'Tanggal', 'Jam', 'Mentor', 'Status', 'Zoom']} rows={[
      [<Code c="SES-005" />, '#1', '12 Mar 2026', '19:00-21:00', 'Budi Santoso', <Badge s="Completed" />, '-'],
      [<Code c="SES-006" />, '#2', '19 Mar 2026', '19:00-21:00', 'Budi Santoso', <Badge s="Completed" />, '-'],
      [<Code c="SES-010" />, '#3', '26 Mar 2026', '19:00-21:00', 'Budi Santoso', <Badge s="Rescheduled" />, 'Dipindah ke SES-007'],
      [<Code c="SES-007" />, '#3', '28 Mar 2026', '19:00-21:00', 'Budi Santoso', <Badge s="Scheduled" />, <a className="text-indigo-600 underline">Gabung Zoom</a>],
    ]} /></Card>
  </Stack>
)

export const StudentPayment = () => {
  const { toast } = useApp()
  const [uploaded, setUploaded] = useState(false)
  const [amt, setAmt] = useState('1500000')
  return (
    <Stack>
      <PageHeader title="Pembayaran" sub="Kewajiban, rekening tujuan, dan riwayat yang sudah diverifikasi." />
      <Grid>
        <Stat label="Harga paket" value={idr(3000000)} hint="10 sesi · snapshot" /><Stat label="Terverifikasi" value={idr(1500000)} /><Stat label="Sisa" value={idr(1500000)} tone="amber" /><Stat label="Aturan" value="DP 50%" hint="Lunas sebelum sesi 6" />
      </Grid>
      <Grid cols={2}>
        <Card title="Bayar ke"><KV items={[['Bank', 'Bank (demo)'], ['No. rekening', 'DEMO-0000-0000'], ['Atas nama', 'Devata Studio'], ['Berita transfer', 'Cantumkan ENR-001']]} /></Card>
        <Card title="Unggah bukti pembayaran">
          <Stack>
            <Placeholder label="Seret bukti transfer (gambar / PDF)" h="h-20" />
            <Input label="Jumlah (Rp)" value={amt} onChange={setAmt} note="Minimal Rp10.000, kelipatan Rp1.000" />
            <Btn primary onClick={() => { setUploaded(true); toast('Bukti terkirim, menunggu verifikasi Finance') }}>Kirim untuk verifikasi</Btn>
          </Stack>
        </Card>
      </Grid>
      <Card title="Riwayat pembayaran" pad={false}><Table cols={['Kode', 'Tanggal', 'Jumlah', 'Jenis', 'Status']} rows={[
        ...(uploaded ? [[<Code c="PAY-006" />, '23 Mar 2026', idr(Number(amt) || 0), 'Pelunasan', <Badge s="Pending" />]] : []),
        [<Code c="PAY-003" />, '01 Mar 2026', idr(1500000), 'DP', <Badge s="Verified" />]]} /></Card>
      <p className="text-xs text-slate-400">Catatan internal verifikasi Finance tidak ditampilkan kepada Anda.</p>
    </Stack>
  )
}

export const StudentProgress = () => (
  <Stack>
    <PageHeader title="Progres belajar" sub="Laporan yang dibagikan mentor. Catatan internal mentor tidak ditampilkan." />
    <Card title="Laporan sesi" pad={false}><Table cols={['Sesi', 'Topik', 'Capaian', 'Langkah berikutnya']} rows={[['#2 · 19 Mar', 'Statistik deskriptif', 'Dapat membuat tabel frekuensi', 'Siapkan data uji-t'], ['#1 · 12 Mar', 'Pembersihan data', 'Dataset skripsi bersih', 'Periksa label variabel']]} /></Card>
    <Card title="Penilaian akhir"><Placeholder label="Tersedia saat program memasuki tahap penutupan" /></Card>
  </Stack>
)

export const Chat = ({ who }: { who: string }) => (
  <Stack>
    <PageHeader title="Pesan" sub={`Konteks percakapan ENR-001 · ${who}`} perm="Admin memiliki akses intervensi yang tercatat" />
    <Card className="flex h-96 flex-col" pad={false}>
      <div className="flex-1 space-y-3 p-4 text-sm">
        <div className="max-w-sm rounded-lg bg-slate-100 p-2.5">Bisa geser sesi 3 ke Jumat?</div>
        <div className="ml-auto max-w-sm rounded-lg bg-indigo-50 p-2.5">Jumat 28 Mar jam 19:00 bisa.</div>
      </div>
      <div className="flex gap-2 border-t border-slate-100 p-3"><div className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-300">Tulis pesan...</div><Btn primary>Kirim</Btn></div>
    </Card>
  </Stack>
)

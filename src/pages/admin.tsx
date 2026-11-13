import { useState } from 'react'
import { useApp } from '../ctx'
import { enrollments, leads, mentors, payments, sessions } from '../data'
import { Alert, Badge, Btn, Card, Check, Code, EmptyState, Field, Grid, Input, KV, PageHeader, Placeholder, Progress, Select, Stack, Stat, Stepper, Table, Tabs, Toolbar, idr } from '../ui'

const LEAD_STATUS = ['New', 'Contacted', 'Assessment', 'Mentor Matching', 'Waiting Decision', 'Won', 'Lost']
const PKG: Record<string, { price: number; quota: string; valid: string; rule: string }> = {
  '< 5 sesi (fleksibel)': { price: 350000, quota: '1-4 sesi', valid: '3 bulan', rule: 'Lunas di awal (Rp350.000 / sesi)' },
  '5 sesi': { price: 1750000, quota: '5 sesi', valid: '3 bulan', rule: 'DP 50%, lunas sebelum sesi ke-3' },
  '10 sesi': { price: 3000000, quota: '10 sesi', valid: '6 bulan', rule: 'DP 50%, lunas sebelum sesi ke-6' },
  '20 sesi': { price: 5000000, quota: '20 sesi', valid: '12 bulan', rule: 'DP 50%, lunas sebelum sesi ke-11' },
}

export const Today = () => {
  const { go } = useApp()
  return (
    <Stack>
      <PageHeader title="Hari ini" sub="Yang perlu ditindaklanjuti Admin pada Senin, 23 Maret 2026" actions={<Btn primary small onClick={() => go('lead')}>+ Lead baru</Btn>} />
      <Grid>
        <Stat label="Follow-up hari ini" value={3} hint="1 terlewat" tone="amber" />
        <Stat label="Sesi hari ini" value={4} />
        <Stat label="Bentrok Zoom" value={1} tone="red" hint="28 Mar 19:00" />
        <Stat label="Pembayaran menunggu Finance" value={2} hint="Admin tidak memverifikasi" />
      </Grid>
      <Grid cols={2}>
        <Card title="Follow-up lead" action={<Btn small onClick={() => go('lead')}>Buka pipeline</Btn>} pad={false}>
          <Table cols={['Lead', 'Status', 'Tindakan', 'Jadwal']} rows={leads.filter((l) => l.fu === 'Hari ini' || l.fu.startsWith('Terlewat')).map((l) => [<span><Code c={l.code} /> {l.name}</span>, <Badge s={l.status} />, l.next, l.fu])} />
        </Card>
        <Card title="Peringatan"><div className="space-y-2">
          <Alert tone="red"><Code c="SES-007" /> dan <Code c="SES-008" /> bentrok pada akun Zoom Private, 28 Mar 19:00</Alert>
          <Alert><Code c="ENR-002" /> pasif 7 hari: mentor sudah follow-up, giliran Admin</Alert>
          <Alert tone="blue"><Code c="LEAD-041" /> Won: buat enrollment</Alert>
          <Alert><Code c="SES-006" /> sudah lewat H+1 dan belum ada laporan (hanya mentor yang dapat mengisi)</Alert>
        </div></Card>
      </Grid>
    </Stack>
  )
}

export const Pipeline = () => {
  const { role, toast, go } = useApp()
  const [rows, setRows] = useState(leads.map((l) => ({ ...l })))
  const [sel, setSel] = useState(leads[1].code)
  const [lostReason, setLostReason] = useState('')
  const [view, setView] = useState<'board' | 'list'>('board')
  const [log, setLog] = useState<Record<string, string[]>>({})
  const lead = rows.find((l) => l.code === sel)!
  const marketing = role === 'Marketing'
  const upd = (patch: Partial<typeof lead>) => setRows(rows.map((l) => (l.code === sel ? { ...l, ...patch } : l)))
  const step = lead.status === 'Won' ? 1 : 0
  const changeStatus = (s: string) => {
    if (s === 'Lost' && !lostReason.trim()) return toast('Alasan wajib diisi bila status Lost')
    upd({ status: s })
    toast(`${lead.code} dipindah ke ${s}`)
  }
  const wa = `Halo ${lead.name}, terima kasih sudah menghubungi Devata Private. Untuk melanjutkan, kami jadwalkan konsultasi gratis via Zoom...`
  return (
    <Stack>
      <PageHeader title="Pipeline lead" sub="Catat lead, posisi, dan tindakan berikutnya" perm={marketing ? 'Marketing: hanya CRM, tanpa konversi ke enrollment' : undefined}
        actions={<><Btn small onClick={() => setView(view === 'board' ? 'list' : 'board')}>{view === 'board' ? 'Tampilan daftar' : 'Tampilan papan'}</Btn><Btn primary small onClick={() => toast('Formulir lead baru dibuka')}>+ Lead baru</Btn></>} />
      {view === 'board' ? (
        <div className="grid gap-3 overflow-x-auto md:grid-cols-4 xl:grid-cols-7">
          {LEAD_STATUS.map((s) => (
            <div key={s} className="min-w-36 rounded-lg bg-slate-100 p-2">
              <div className="mb-2 flex items-center justify-between px-1 text-xs font-semibold text-slate-600">{s}<span className="text-slate-400">{rows.filter((l) => l.status === s).length}</span></div>
              <div className="space-y-2">{rows.filter((l) => l.status === s).map((l) => (
                <button key={l.code} onClick={() => setSel(l.code)} className={`w-full rounded-md border bg-white p-2 text-left text-xs ${sel === l.code ? 'border-indigo-500' : 'border-slate-200'}`}>
                  <Code c={l.code} /><div className="mt-1 font-medium text-slate-800">{l.name}</div><div className="text-slate-400">{l.fu}</div>
                </button>))}</div>
            </div>
          ))}
        </div>
      ) : (
        <Card pad={false}>
          <Toolbar filters={['Status', 'Tanggal follow-up', 'PIC']} search="Cari lead atau kode (tekan /)" />
          <Table onRow={(i) => setSel(rows[i].code)} cols={['Kode', 'Lead', 'Kebutuhan', 'Software', 'Status', 'PIC', 'Tindakan', 'Follow-up']} rows={rows.map((l) => [<Code c={l.code} />, l.name, l.need, l.skill, <Badge s={l.status} />, l.pic, l.next, l.fu])} />
        </Card>
      )}
      <Card title={`${lead.code} · ${lead.name}`} action={<Badge s={lead.status} />}>
        <Stack>
          <Stepper steps={['Lead Won', 'Student', 'Enrollment', 'Rencana belajar', 'Pembayaran']} current={step} />
          <Grid cols={3}>
            <Input label="Kebutuhan belajar" value={lead.need} onChange={(v) => upd({ need: v })} />
            <Input label="Software / skill" value={lead.skill} onChange={(v) => upd({ skill: v })} />
            <Select label="PIC" options={['Sari', 'Rio']} value={lead.pic} onChange={(v) => upd({ pic: v })} />
          </Grid>
          <Grid cols={2}>
            <Input label="Tindakan berikutnya" value={lead.next} onChange={(v) => upd({ next: v })} />
            <Input label="Jadwal follow-up" value={lead.fu} onChange={(v) => upd({ fu: v })} />
          </Grid>
          <div>
            <div className="mb-2 text-xs font-medium text-slate-600">Catat cepat komunikasi</div>
            <div className="flex flex-wrap gap-2">{['Tidak dibalas', 'Minta waktu', 'Info paket terkirim', 'Tanya jadwal', 'Setuju konsultasi'].map((q) => <Btn key={q} small onClick={() => { setLog({ ...log, [lead.code]: [`${q} · baru saja`, ...(log[lead.code] || [])] }); toast(`Dicatat untuk ${lead.code}: ${q}`) }}>{q}</Btn>)}</div>
            {(log[lead.code] || []).length > 0 && <ul className="mt-2 space-y-1 text-xs text-slate-500">{log[lead.code].map((l, i) => <li key={i}>• {l}</li>)}</ul>}
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">Templat WhatsApp: kontak pertama<Btn small onClick={() => { navigator.clipboard?.writeText(wa); toast('Pesan disalin') }}>Salin</Btn></div>
            <p className="text-sm text-slate-600">{wa}</p>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <Select label="Pindah status" options={LEAD_STATUS} value={lead.status} onChange={changeStatus} />
            <div className="w-64"><Input label="Alasan (wajib bila Lost)" value={lostReason} onChange={setLostReason} /></div>
            <Btn small onClick={() => { upd({ fu: 'Besok' }); toast('Follow-up ditunda 1 hari') }}>Tunda follow-up</Btn>
            <Btn small onClick={() => toast(`Perubahan ${lead.code} disimpan`)}>Simpan perubahan</Btn>
            {!marketing && <Btn primary small onClick={() => (lead.status === 'Won' ? go('enr') : toast('Konversi hanya untuk lead berstatus Won'))}>Konversi ke enrollment</Btn>}
          </div>
        </Stack>
      </Card>
    </Stack>
  )
}

export const Matching = () => (
  <Stack>
    <PageHeader title="Mentor matching" sub="LEAD-040 Maya Putri · SPSS · Tugas akhir" perm="Tier, tarif, honor, dan rekening tidak ditampilkan untuk Admin" />
    <Card pad={false}>
      <Toolbar filters={['Keahlian', 'Status: Aktif', 'Beban']} search="Cari nama mentor" />
      <Table cols={['Kode', 'Mentor', 'Keahlian', 'Status', 'Ketersediaan', 'Beban / kapasitas', '']} rows={mentors.map((m) => [<Code c={m.code} />, m.name, m.skills, <Badge s={m.status} />, m.avail, <Progress v={m.load} max={m.cap} />,
        m.status === 'Active' && m.load < m.cap ? <Btn small>Rekomendasikan</Btn> : <span className="text-xs text-slate-400">{m.status === 'Active' ? 'Penuh' : 'Nonaktif'}</span>])} />
    </Card>
    <p className="text-xs text-slate-400">Urutan daftar tidak dapat diurutkan menurut tier atau tarif agar urutan bayaran tidak bocor.</p>
  </Stack>
)

export const Enrollments = () => {
  const { toast, confirm } = useApp()
  const [open, setOpen] = useState('ENR-001')
  const [pkg, setPkg] = useState('10 sesi')
  const [mentor, setMentor] = useState('Budi Santoso')
  const [reason, setReason] = useState('Tidak menyanggupi materi')
  const e = enrollments.find((x) => x.code === open)!
  const p = PKG[pkg]
  return (
    <Stack>
      <PageHeader title="Enrollment" sub="Satu program private milik satu student" />
      <Card pad={false}>
        <Toolbar filters={['Status', 'Paket', 'Mentor']} />
        <Table onRow={(i) => setOpen(enrollments[i].code)} cols={['Kode', 'Student', 'Mentor', 'Paket', 'Status', 'Pembayaran', 'Sesi', 'Berakhir', 'Catatan']} rows={enrollments.map((x) => [<Code c={x.code} />, x.student, x.mentor, x.pkg, <Badge s={x.status} />, <Badge s={x.pay} />, <Progress v={x.done} max={x.quota} />, x.end, x.flag ? <Badge s={x.flag} tone="amber" /> : ''])} />
      </Card>
      <Card title={<>{e.code} · {e.student}</>} action={<Badge s={e.status} />}>
        <Tabs tabs={['Ringkasan 360', 'Rencana belajar', 'Mentor', 'Pembayaran', 'Penutupan & dokumen', 'Riwayat']} render={(t) => {
          if (t === 'Ringkasan 360') return (
            <Stack>
              <Grid><Stat label="Sesi selesai" value={`${e.done} / ${e.quota}`} /><Stat label="Pembayaran" value={e.pay} /><Stat label="Masa aktif s.d." value={e.end} /><Stat label="Mentor" value={e.mentor} /></Grid>
              <div className="flex flex-wrap gap-2"><Btn small>Jadwalkan sesi</Btn><Btn small>Catat pembayaran</Btn><Btn small>Kirim WA: pengingat jadwal</Btn><Btn small onClick={() => confirm(`Tahan ${e.code}?`, () => toast(`${e.code} ditahan`))}>Tahan program</Btn></div>
            </Stack>)
          if (t === 'Rencana belajar') return (
            <Stack>
              <Alert tone="blue">Student tidak punya akun. Setelah mendiskusikan draf dengan mentor lewat WhatsApp, Admin mencatat persetujuan di sini.</Alert>
              <Grid cols={2}><Field label="Tujuan belajar" value="Menyelesaikan bab analisis data skripsi dengan SPSS" /><Field label="Estimasi sesi" value="10" /></Grid>
              <Field label="Topik & target" area value="Pembersihan data, statistik deskriptif, uji hipotesis, interpretasi hasil" />
              <Table cols={['Revisi', 'Dibuat oleh', 'Persetujuan student', 'Status']} rows={[['v1', 'Budi Santoso', 'WA, 01 Mar 2026 (dicatat Sari)', <Badge s="Confirmed" />]]} />
              <div className="flex gap-2"><Btn small onClick={() => toast('Catatan persetujuan WA disimpan')}>Catat persetujuan student</Btn><Btn small>Buat revisi baru</Btn></div>
            </Stack>)
          if (t === 'Mentor') return (
            <Stack>
              <Table cols={['Mentor', 'Mulai', 'Selesai', 'Alasan']} rows={[['Budi Santoso', '02 Mar 2026', 'berjalan', 'Penugasan awal']]} />
              <div className="rounded-md border border-slate-200 p-3"><div className="mb-3 text-sm font-medium">Ganti mentor utama</div>
                <Grid cols={3}><Select label="Mentor baru" options={mentors.filter((m) => m.status === 'Active').map((m) => m.name)} value={mentor} onChange={setMentor} /><Select label="Alasan (wajib)" options={['Tidak menyanggupi materi', 'Tidak sesuai kebutuhan', 'Mentor berhalangan', 'Kendala kualitas layanan']} value={reason} onChange={setReason} /><div className="self-end"><Check label="Student sudah menyetujui" /></div></Grid>
                <div className="mt-3"><Btn small onClick={() => confirm(`Ganti mentor ${e.code} ke ${mentor}? Sesi lama tetap milik mentor sebelumnya. PMO menerima catatan dampak margin.`, () => toast('Mentor diganti'))}>Ganti mentor</Btn></div></div>
              <p className="text-xs text-slate-400">Mentor tamu untuk satu sesi ditunjuk di halaman Jadwal, dengan alasan resmi.</p>
            </Stack>)
          if (t === 'Pembayaran') return <Card pad={false}><Table cols={['Kode', 'Tanggal', 'Jumlah', 'Jenis', 'Status']} rows={payments.filter((x) => x.enr === e.code).map((x) => [<Code c={x.code} />, x.date, idr(x.amt), x.kind, <Badge s={x.status} />])} /></Card>
          if (t.startsWith('Penutupan')) return (
            <Stack>
              <Grid cols={2}>
                <div><div className="mb-2 text-sm font-medium">Daftar periksa penyelesaian</div><div className="space-y-2">{['Semua sesi selesai atau diselesaikan', 'Laporan akhir mentor masuk', 'Pembayaran lunas', 'Kelayakan sertifikat (manual di V1)', 'Kelayakan grup komunitas (manual di V1)'].map((c, i) => <Check key={c} label={c} on={i === 0} />)}</div></div>
                <Stack><Input label="Catatan penutupan" /><Select label="Rating student" options={['5', '4', '3', '2', '1']} /><Btn primary small onClick={() => confirm('Tandai Completed? Tidak dapat dibatalkan.', () => toast('Enrollment selesai'))}>Tandai Completed</Btn></Stack>
              </Grid>
              <div><div className="mb-2 text-sm font-medium">Cetak dokumen</div><div className="flex flex-wrap gap-2">{['Invoice INV/2026/0001', 'Kwitansi', 'Laporan progres', 'Sertifikat'].map((d) => <Btn key={d} small onClick={() => toast(`${d} dibuat`)}>{d}</Btn>)}</div></div>
            </Stack>)
          return <Table cols={['Waktu', 'Pelaku', 'Aksi']} rows={[['22 Mar 10:12', 'Sari', 'Mencatat PAY-003'], ['02 Mar 09:30', 'Sari', 'Menetapkan mentor MNT-001'], ['01 Mar 14:00', 'Sari', 'Rencana belajar v1 disetujui via WA']]} />
        }} />
      </Card>
      <Card title="Buat enrollment baru">
        <Stack>
          <Stepper steps={['Lead Won', 'Student', 'Paket & mentor', 'Rencana belajar', 'Pembayaran']} current={2} />
          <Alert>Kemungkinan enrollment ganda: <Code c="STD-004" /> Rafi Anggara sudah memiliki <Code c="ENR-004" /> (Menunggu Pembayaran). Lanjutkan hanya bila ini program baru.</Alert>
          <Grid cols={3}><Select label="Paket" options={Object.keys(PKG)} value={pkg} onChange={setPkg} /><Select label="Mentor" options={mentors.filter((m) => m.status === 'Active').map((m) => m.name)} value={mentor} onChange={setMentor} /><Input label="Tanggal mulai" type="date" /></Grid>
          <div className="rounded-md bg-slate-50 p-3"><div className="mb-2 text-xs font-medium text-slate-600">Snapshot yang disimpan di enrollment (aturan berlaku)</div>
            <KV items={[['Harga', pkg.startsWith('<') ? `${idr(p.price)} / sesi` : idr(p.price)], ['Kuota', p.quota], ['Masa aktif', p.valid], ['Aturan bayar', p.rule]]} /></div>
          <Btn primary small onClick={() => toast('Enrollment dibuat dengan kode ENR-005')}>Simpan sebagai Menunggu Pembayaran</Btn>
        </Stack>
      </Card>
    </Stack>
  )
}

export const Schedule = () => {
  const { toast, confirm } = useApp()
  const [mentor, setMentor] = useState('Budi')
  const [time, setTime] = useState('19:00-21:00')
  const [date, setDate] = useState('28 Mar 2026')
  const [guest, setGuest] = useState(false)
  const clash = sessions.find((s) => s.when === `${date} ${time}` && s.status === 'Scheduled')
  return (
    <Stack>
      <PageHeader title="Jadwal & Zoom" sub="Semua sesi Private pada satu akun Zoom" />
      <Tabs tabs={['Daftar sesi', 'Jadwalkan sesi']} render={(t) => t === 'Daftar sesi' ? (
        <Stack>
          <Alert tone="red"><b>Bentrok Zoom</b> · 28 Mar 2026 19:00-21:00: <Code c="SES-007" /> dan <Code c="SES-008" /></Alert>
          <Card pad={false}>
            <Toolbar filters={['Tanggal', 'Mentor', 'Status', 'Sudah lewat, belum ada laporan']} />
            <Table cols={['Kode', 'Enrollment', 'Student', 'Mentor', 'Sesi', 'Waktu', 'Status', 'Zoom', 'Laporan (baca saja)']} rows={sessions.map((s) => [<Code c={s.code} />, <Code c={s.enr} />, s.student, s.mentor, s.n, s.when, <span className="flex gap-1"><Badge s={s.status} />{s.confirm && <Badge s="Perlu konfirmasi" tone="amber" />}</span>, <Badge s={s.zoom === 'OK' ? 'OK' : 'CONFLICT'} tone={s.zoom === 'OK' ? 'green' : undefined} />, s.report === 'Terlambat' ? <Badge s="OVERDUE" /> : s.report])} />
          </Card>
          <p className="text-xs text-slate-400">Admin hanya melihat laporan sesi. Laporan dibuat dan dikirim oleh mentor pengajar.</p>
        </Stack>
      ) : (
        <Card title="Jadwalkan / konfirmasi sesi">
          <Stack>
            <Grid cols={3}>
              <Select label="Enrollment" options={enrollments.filter((e) => e.status === 'Active').map((e) => `${e.code} ${e.student}`)} />
              <Select label="Tanggal" options={['28 Mar 2026', '29 Mar 2026', '02 Apr 2026']} value={date} onChange={setDate} />
              <Select label="Jam (2 jam)" options={['16:00-18:00', '19:00-21:00']} value={time} onChange={setTime} />
              <Select label="Mentor pengajar" options={['Budi', 'Citra', 'Eko']} value={mentor} onChange={setMentor} />
              <div className="self-end"><Check label="Mentor tamu untuk sesi ini" on={false} /></div>
            </Grid>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={guest} onChange={(e) => setGuest(e.target.checked)} />Tunjuk mentor tamu (alasan resmi wajib)</label>
            {guest && <Select label="Alasan mentor tamu" options={['Mentor utama berhalangan', 'Materi khusus', 'Lainnya']} />}
            {clash ? <Alert tone="red"><b>Ditolak:</b> bentrok dengan <Code c={clash.code} /> ({clash.student}, {clash.mentor}) pada akun Zoom Private. Pilih jam lain.</Alert> : <Alert tone="blue">Tidak ada bentrok Zoom pada slot ini.</Alert>}
            <Alert>Peringatan lunak: sesi jatuh setelah masa aktif berakhir. Dapat dilanjutkan dengan alasan tercatat.</Alert>
            <Input label="Alasan melanjutkan (untuk peringatan lunak)" />
            <div><Btn primary onClick={() => (clash ? toast('Tidak dapat disimpan: bentrok Zoom') : confirm('Simpan jadwal?', () => toast('Jadwal dikonfirmasi')))}>Konfirmasi jadwal</Btn></div>
          </Stack>
        </Card>
      )} />
    </Stack>
  )
}

export const PaymentInput = () => {
  const { toast, confirm } = useApp()
  const [amt, setAmt] = useState('1500000')
  const n = Number(amt.replace(/\D/g, ''))
  const remaining = 1500000
  const err = n < 10000 ? 'Minimal Rp10.000' : n % 1000 ? 'Harus kelipatan Rp1.000' : ''
  return (
    <Stack>
      <PageHeader title="Pembayaran student" sub="Student mengunggah bukti sendiri, atau Admin mencatat atas nama student. Finance memverifikasi." perm="Admin tidak dapat mengubah status menjadi Verified" />
      <Card title="Catat pembayaran baru">
        <Stack>
          <Grid cols={3}>
            <Select label="Enrollment" options={['ENR-001 Natasha (sisa ' + idr(remaining) + ')', 'ENR-004 Rafi (sisa ' + idr(1750000) + ')']} />
            <Input label="Jumlah (Rp)" value={amt} onChange={setAmt} note={err || `Jenis otomatis: ${n >= remaining ? 'Pelunasan' : 'DP / cicilan'}`} />
            <Input label="Tanggal bayar" type="date" />
            <Select label="Metode" options={['Transfer bank', 'QRIS', 'Tunai', 'Lainnya']} />
            <Input label="Bukti (tautan Drive / referensi)" placeholder="https://drive..." />
          </Grid>
          {n > remaining && !err && <Alert>Jumlah melebihi sisa tagihan. Perlu konfirmasi.</Alert>}
          <Alert tone="blue">Peringatan dobel: ada catatan lain untuk enrollment, jumlah, dan tanggal yang sama? Sistem memeriksa saat disimpan.</Alert>
          <div><Btn primary onClick={() => (err ? toast(err) : confirm('Simpan sebagai Pending?', () => toast('Dicatat sebagai PAY-006 (Pending)')))}>Simpan (Pending)</Btn></div>
        </Stack>
      </Card>
      <Card title="Catatan pembayaran" pad={false}><Table cols={['Kode', 'Enrollment', 'Student', 'Tanggal', 'Jumlah', 'Jenis', 'Status', 'Dicatat oleh']} rows={payments.map((p) => [<Code c={p.code} />, <Code c={p.enr} />, p.student, p.date, idr(p.amt), p.kind, <Badge s={p.status} />, p.by])} /></Card>
    </Stack>
  )
}

import { useState } from 'react'
import { useApp } from '../ctx'
import { Alert, Badge, Btn, Card, Check, Code, Field, Grid, Input, PageHeader, Progress, Select, Stack, Stat, Table, Tabs, Toolbar, idr } from '../ui'

export const PmoDashboard = () => {
  const { go } = useApp()
  return (
    <Stack>
      <PageHeader title="Dashboard operasional" sub="Baca saja. Setiap peringatan menaut ke catatannya." />
      <Grid>
        <Stat label="Aktif" value={18} /><Stat label="Menunggu pembayaran" value={3} tone="amber" /><Stat label="Ditahan" value={2} /><Stat label="Selesai / Kedaluwarsa" value="41 / 4" />
        <Stat label="Sesi bulan ini" value={64} /><Stat label="Laporan terlambat" value={3} tone="red" /><Stat label="Kedaluwarsa < 14 hari" value={2} tone="amber" /><Stat label="Student pasif" value={2} tone="amber" />
      </Grid>
      <Grid cols={2}>
        <Card title="Peringatan"><div className="space-y-2">
          <Alert tone="red"><Code c="SES-006" /> laporan terlambat</Alert>
          <Alert><Code c="ENR-001" /> pelunasan mendekati batas (sebelum sesi 6)</Alert>
          <Alert><Code c="ENR-003" /> kedaluwarsa 28 Nov, sisa 1 sesi: butuh keputusan PMO</Alert>
          <Alert tone="blue">Usulan konfigurasi menunggu persetujuan <Btn small onClick={() => go('cfg')}>Buka</Btn></Alert>
        </div></Card>
        <Card title="Beban mentor" pad={false}><Table cols={['Mentor', 'Aktif / kapasitas']} rows={[['Budi Santoso', <Progress v={3} max={5} />], ['Citra Dewi', <Progress v={5} max={5} />], ['Eko Pratama', <Progress v={1} max={4} />]]} /></Card>
      </Grid>
    </Stack>
  )
}

export const Cases = () => {
  const { toast } = useApp()
  return (
    <Stack>
      <PageHeader title="Kasus" sub="Keputusan PMO untuk kedaluwarsa dan student pasif. Tidak ada perpanjangan atau penghapusan otomatis." />
      <Card pad={false}><Table cols={['Enrollment', 'Jenis', 'Detail', 'Keputusan', '']} rows={[
        [<Code c="ENR-003" />, <Badge s="EXPIRING" />, 'Sisa 1 sesi, berakhir 28 Nov', 'Belum', <Btn small onClick={() => toast('Keputusan dicatat')}>Catat keputusan</Btn>],
        [<Code c="ENR-002" />, <Badge s="PASSIVE" />, 'Tanpa respons jadwal 7 hari', 'Admin follow-up', <Btn small onClick={() => toast('Keputusan dicatat')}>Catat keputusan</Btn>],
        [<Code c="ENR-001" />, <Badge s="Rescheduled" />, 'Reschedule 3 kali', 'Belum', <Btn small>Catat keputusan</Btn>]]} /></Card>
    </Stack>
  )
}

export const Config = () => {
  const { role, toast } = useApp()
  const prop = [
    { id: 'CFG-007', what: 'Tarif Tier 2: Rp350.000 menjadi Rp375.000', by: 'PMO', eff: '01 Apr 2026', status: 'Proposed' },
    { id: 'CFG-006', what: 'Tier MNT-003: tetapkan Tier 1', by: 'Finance', eff: '25 Mar 2026', status: 'Proposed' },
    { id: 'CFG-005', what: 'Tujuan bayar: rekening baru', by: 'Finance', eff: '15 Mar 2026', status: 'Approved' },
  ]
  return (
    <Stack>
      <PageHeader title="Konfigurasi" sub="PMO dan Finance mengusulkan; hanya Management/Owner yang menyetujui." perm="Berlaku untuk enrollment baru dan sesi setelah tanggal efektif; tidak berlaku mundur" />
      <Tabs tabs={['Usulan', 'Tier & tarif', 'Matriks margin', 'Tujuan pembayaran']} render={(t) => t === 'Usulan' ? (
        <Stack>
          <Card pad={false}><Table cols={['Kode', 'Perubahan', 'Pengusul', 'Berlaku', 'Status', '']} rows={prop.map((p) => [<Code c={p.id} />, p.what, p.by, p.eff, <Badge s={p.status} />,
            p.status === 'Proposed' ? (role !== 'Management' ? <span className="text-xs text-slate-400">Menunggu persetujuan Owner</span> : <span className="flex gap-1"><Btn small primary onClick={() => toast(`${p.id} disetujui`)}>Setujui</Btn><Btn small onClick={() => toast('Alasan wajib')}>Tolak</Btn></span>) : ''])} /></Card>
          {role !== 'Management' && <Card title="Buat usulan"><Grid cols={3}><Select label="Objek" options={['Harga paket', 'Tarif tier', 'Tier mentor', 'Tujuan pembayaran']} /><Input label="Nilai baru" /><Input label="Tanggal efektif" type="date" /></Grid><div className="mt-3 flex items-end gap-3"><div className="flex-1"><Input label="Alasan" /></div><Btn primary small onClick={() => toast('Usulan dibuat, menunggu persetujuan Owner')}>Ajukan</Btn></div></Card>}
        </Stack>
      ) : t === 'Tier & tarif' ? (
        <Card pad={false}><Table cols={['Tier', 'Tarif per sesi (2 jam)', 'Berlaku sejak', 'Mentor']} rows={[['Tier 1', idr(300000), '01 Jan 2026', 'MNT-004'], ['Tier 2', idr(350000), '01 Jan 2026', 'MNT-001, MNT-002'], ['(belum ada)', '-', '-', 'MNT-003']]} /></Card>
      ) : t === 'Matriks margin' ? (
        <Card title="Margin per sesi = harga sesi paket dikurangi tarif tier" pad={false}><Table cols={['Paket', 'Harga / sesi', 'Tier 1', 'Tier 2']} rows={[['< 5 sesi', idr(350000), idr(50000), idr(0)], ['5 sesi', idr(350000), idr(50000), idr(0)], ['10 sesi', idr(300000), idr(0), <span className="font-semibold text-red-600">-{idr(50000)}</span>], ['20 sesi', idr(250000), <span className="font-semibold text-red-600">-{idr(50000)}</span>, <span className="font-semibold text-red-600">-{idr(100000)}</span>]]} /><p className="px-4 py-3 text-xs text-slate-400">Peringatan margin negatif atau di bawah batas; tidak memblokir.</p></Card>
      ) : (
        <Card><Grid cols={2}><Field label="Bank" value="Bank (demo)" /><Field label="No. rekening" value="DEMO-0000-0000" /><Field label="Atas nama" value="Devata Studio" /><Field label="Instruksi" value="Cantumkan kode ENR pada berita transfer" /></Grid></Card>
      )} />
    </Stack>
  )
}

export const Rules = () => {
  const { toast } = useApp()
  return (
    <Stack>
      <PageHeader title="Ketentuan paket" sub="Dua set disimpan. Aturan lama berlaku, ketentuan terbaru belum dilaksanakan." actions={<Btn primary small onClick={() => toast('Usulan dibuat untuk tiap paket yang berbeda; menunggu persetujuan')}>Usulkan ketentuan terbaru</Btn>} />
      <Grid cols={2}>
        <Card title="Aturan lama" action={<Badge s="Active" />} pad={false}><Table cols={['Paket', 'Harga', 'Pembayaran', 'Aktif']} rows={[['< 5 sesi', 'Rp350.000/sesi', 'Lunas di awal', '3 bln'], ['5 sesi', idr(1750000), 'DP 50%, lunas sebelum sesi 3', '3 bln'], ['10 sesi', idr(3000000), 'DP 50%, sebelum sesi 6', '6 bln'], ['20 sesi', idr(5000000), 'DP 50%, sebelum sesi 11', '12 bln']]} /></Card>
        <Card title="Ketentuan terbaru" action={<Badge s="Draft" />} pad={false}><Table cols={['Paket', 'Harga', 'Pembayaran', 'Aktif']} rows={[['< 5 sesi', 'Rp370.000/sesi', 'Lunas di awal', '3 bln'], ['5 sesi', idr(1750000), 'Lunas di awal', '3 bln'], ['10 sesi', idr(3000000), 'Cicil 2x, sebelum sesi 6', '6 bln'], ['20 sesi', idr(5400000), 'Cicil 2x, sebelum sesi 11', '12 bln']]} /></Card>
      </Grid>
      <Alert>Perlu konfirmasi: lampiran menulis paket 5 sesi Rp1.850.000, sedangkan 5 x Rp350.000 = Rp1.750.000. Disimpan Rp1.750.000.</Alert>
    </Stack>
  )
}

export const Metrics = () => (
  <Stack>
    <PageHeader title="Metrik pilot" sub="Pilot paralel dengan WhatsApp, 3-4 minggu" />
    <Grid>
      <Stat label="Sesi tercatat sebelum berlangsung" value="96%" hint="target 100%" /><Stat label="Bentrok Zoom lolos" value={0} hint="target 0" /><Stat label="Laporan masuk H+1" value="88%" hint="target 90%" tone="amber" /><Stat label="Pertanyaan status ke Admin" value="-42%" hint="target -50%" />
    </Grid>
    <Card title="Laporan CRM"><Grid><Stat label="Win rate" value="62%" hint="n = 13" /><Stat label="Time to Won (median)" value="6 hari" /><Stat label="Respons pertama" value="3,2 jam" hint="cakupan 91%" /><Stat label="Follow-up terlewat" value={4} tone="red" /></Grid></Card>
  </Stack>
)

const designStages = [
  {
    name: '1. Empathize',
    status: 'Selesai',
    detail: 'Wawancara dan telaah kerja Admin, Mentor, Finance, PMO, Marketing; WhatsApp dan spreadsheet adalah konteks kerja utama.',
    evidence: 'Operational Book, PRD, keputusan K1–K18, analisis spreadsheet',
  },
  {
    name: '2. Define',
    status: 'Selesai',
    detail: 'Informasi operasional tersebar di chat dan kepala satu orang, sehingga status, jadwal, pembayaran, laporan, dan honor tidak punya satu sumber data.',
    evidence: 'Problem statement PRD MVP Rev. 2',
  },
  {
    name: '3. Ideate',
    status: 'Selesai',
    detail: 'Beranda berbasis tindakan, kode referensi tetap, pencarian cepat, hak akses minimum, maker-checker, dan peringatan operasional.',
    evidence: 'Prioritas P0/P1 dan rekomendasi U1–U10, H1–H11, E1–E8',
  },
  {
    name: '4. Prototype',
    status: 'Berjalan',
    detail: 'Wireframe interaktif dengan data fiktif dan pergantian akun untuk menguji alur lintas peran tanpa menyentuh data riil.',
    evidence: 'Aplikasi demo saat ini',
  },
  {
    name: '5. Test',
    status: 'Menunggu UAT',
    detail: 'Dry-run tiga kasus nyata dan pilot paralel WhatsApp selama 3–4 minggu sebelum integrasi Portal.',
    evidence: 'Skenario UAT dan metrik pilot',
  },
]

const sdlcStages = [
  ['1', 'Planning', 'Selesai', 'Tujuan, ruang lingkup MVP, non-goal, pemilik risiko', 'PRD MVP Rev. 2'],
  ['2', 'Analysis', 'Selesai', 'Aturan bisnis, persona/peran, izin, proses as-is dan to-be', 'K1–K18 + Operational Book'],
  ['3', 'Design', 'Selesai', 'Arsitektur informasi, wireframe, status, data model, audit', 'Prototype v3'],
  ['4', 'Development', 'Berjalan', 'Implementasi alur P0 dengan pemisahan akses server-side', 'Backlog P0'],
  ['5', 'Testing', 'Berjalan', 'Tes aturan uang/jadwal, kontrak akses, UAT per peran', 'QA + UAT'],
  ['6', 'Deployment', 'Belum', 'Pilot lokal/demo, lalu rilis setelah gate UAT', 'Rencana pilot'],
  ['7', 'Maintenance', 'Belum', 'Monitoring metrik, backup, audit, perbaikan hasil pilot', 'SLA & backlog'],
]

const traceability = [
  ['DT-01', 'Admin perlu tahu tindakan hari ini tanpa membuka banyak sheet', 'U2 / A1', 'Beranda Hari ini + pipeline', 'UAT-ADM-01', 'Siap diuji'],
  ['DT-02', 'Tim perlu satu rujukan yang tidak ambigu di WA dan bukti transfer', 'R1–R4', 'Kode LEAD/ENR/SES/PAY/PRL + pencarian /', 'UAT-X-01', 'Siap diuji'],
  ['DT-03', 'Jadwal tidak boleh bentrok pada satu akun Zoom', 'A4', 'Validasi bentrok tegas', 'UAT-ADM-04', 'Siap diuji'],
  ['DT-04', 'Finance harus memisahkan input dan verifikasi uang', 'F1 / K12', 'Admin input Pending; Finance verifikasi', 'UAT-FIN-01', 'Siap diuji'],
  ['DT-05', 'Mentor perlu honor otomatis dari laporan valid', 'M2–M3 / K5', 'Completed → Eligible → Requested → Paid', 'UAT-MEN-03', 'Siap diuji'],
  ['DT-06', 'Konfigurasi uang tidak boleh diubah satu pihak', 'C1 / F4–F5', 'Maker-checker PMO–Finance', 'UAT-CFG-01', 'Siap diuji'],
  ['DT-07', 'Admin tidak boleh mengetahui honor atau rekening mentor', 'K10', 'Navigasi dan data keuangan dipisahkan', 'SEC-ADM-01', 'Perlu tes API'],
]

export const ProductValidation = () => {
  const { toast } = useApp()
  const [uat, setUat] = useState<Record<string, boolean>>({})
  const passed = Object.values(uat).filter(Boolean).length
  const scenarios = [
    ['UAT-ADM-01', 'Admin', 'Lead baru sampai Won', 'Lead punya PIC, next action, dan riwayat tetap tersimpan'],
    ['UAT-ADM-04', 'Admin', 'Masukkan jadwal yang overlap', 'Sistem menolak dan menampilkan sesi penyebab bentrok'],
    ['UAT-FIN-01', 'Finance', 'Verifikasi pembayaran Pending', 'Status bayar dihitung dan enrollment aktif bila syarat terpenuhi'],
    ['UAT-MEN-03', 'Mentor', 'Kirim laporan lalu ajukan honor', 'Sesi Completed, tarif snapshot terkunci, nominal tidak dapat diedit'],
    ['UAT-CFG-01', 'PMO + Finance', 'Usulkan dan setujui perubahan tarif', 'Pengusul tidak dapat menyetujui sendiri; nilai lama tidak berubah mundur'],
    ['SEC-ADM-01', 'Admin', 'Buka daftar mentor, audit, ekspor, pencarian', 'Tidak ada tier, tarif, honor, rekening, atau urutan bayaran'],
  ]

  return (
    <Stack>
      <PageHeader
        title="Validasi produk"
        sub="Design Thinking untuk menemukan solusi yang tepat; SDLC untuk membangunnya secara terkendali."
        perm="Gate saat ini: Prototype & UAT — belum untuk data operasional"
      />
      <Grid>
        <Stat label="Kebutuhan terlacak" value="7 / 7" hint="ke requirement dan layar" />
        <Stat label="Skenario UAT" value={`${passed} / ${scenarios.length}`} hint="ditandai lulus pada sesi ini" tone={passed < scenarios.length ? 'amber' : undefined} />
        <Stat label="Temuan blocking" value={3} hint="tier, maker-checker, kebijakan pilot" tone="red" />
        <Stat label="Gate berikutnya" value="Pilot" hint="setelah UAT disetujui" />
      </Grid>

      <Tabs tabs={['Design Thinking', 'SDLC', 'Traceability', 'UAT & Gate']} render={(tab) => {
        if (tab === 'Design Thinking') return (
          <Stack>
            <Card title="Pernyataan masalah">
              <p className="text-sm leading-6 text-slate-700">
                Tim Private membutuhkan satu catatan operasional yang dapat dipercaya agar status lead, enrollment,
                jadwal, pembayaran, laporan sesi, dan honor dapat diketahui tanpa bertanya ulang ke Admin—namun tetap
                menjaga pemisahan akses keuangan dan kebiasaan komunikasi melalui WhatsApp.
              </p>
            </Card>
            <Card title="How might we?">
              <p className="text-sm font-medium text-slate-800">
                Bagaimana kita dapat membuat setiap peran mengetahui tindakan berikutnya dan status terbaru dalam
                kurang dari satu menit, tanpa membocorkan data yang tidak dibutuhkan?
              </p>
            </Card>
            <div className="grid gap-3 md:grid-cols-5">
              {designStages.map((stage) => (
                <Card key={stage.name} title={stage.name} action={<Badge s={stage.status} tone={stage.status === 'Selesai' ? 'green' : stage.status === 'Berjalan' ? 'blue' : 'amber'} />}>
                  <p className="min-h-24 text-xs leading-5 text-slate-600">{stage.detail}</p>
                  <div className="mt-3 border-t border-slate-100 pt-2 text-[11px] text-slate-400">{stage.evidence}</div>
                </Card>
              ))}
            </div>
            <Card title="Hipotesis yang diuji saat pilot" pad={false}>
              <Table cols={['Hipotesis', 'Indikator', 'Target']} rows={[
                ['Beranda berbasis tindakan mengurangi pertanyaan status ke Admin', 'Pertanyaan status per minggu', 'Turun ≥ 50%'],
                ['Validasi jadwal mencegah konflik operasional', 'Bentrok Zoom yang lolos', '0'],
                ['Laporan H+1 cukup jelas bagi Mentor', 'Laporan masuk tepat waktu', '≥ 90%'],
                ['Rekap honor menggantikan spreadsheet pembantu', 'Payroll ditutup tanpa sheet lain', '100%'],
              ]} />
            </Card>
          </Stack>
        )

        if (tab === 'SDLC') return (
          <Stack>
            <Alert tone="blue">Setiap fase harus melewati gate dan menghasilkan bukti sebelum fase berikutnya dinyatakan selesai.</Alert>
            <Card pad={false}>
              <Table cols={['Tahap', 'Fase', 'Status', 'Exit criteria', 'Artefak']} rows={sdlcStages.map((s) => [
                s[0], <span className="font-medium">{s[1]}</span>,
                <Badge s={s[2]} tone={s[2] === 'Selesai' ? 'green' : s[2] === 'Berjalan' ? 'blue' : 'gray'} />,
                s[3], s[4],
              ])} />
            </Card>
            <Grid cols={2}>
              <Card title="Definition of Ready">
                <div className="space-y-2">
                  <Check label="Masalah dan peran terdampak jelas" on />
                  <Check label="Aturan bisnis dan pemilik keputusan tercatat" on />
                  <Check label="Acceptance criteria dapat diuji" on />
                  <Check label="Hak akses dan risiko data dipetakan" on />
                </div>
              </Card>
              <Card title="Definition of Done">
                <div className="space-y-2">
                  <Check label="Acceptance criteria lulus" />
                  <Check label="Tes kontrak akses lulus" />
                  <Check label="Audit dan histori tidak dapat dihapus" />
                  <Check label="UAT pemilik proses disetujui" />
                  <Check label="Dokumentasi dan rollback tersedia" />
                </div>
              </Card>
            </Grid>
          </Stack>
        )

        if (tab === 'Traceability') return (
          <Stack>
            <Alert>Perubahan tanpa requirement, acceptance criteria, dan test case tidak masuk sprint implementasi.</Alert>
            <Card pad={false}>
              <Table cols={['Need', 'Insight pengguna', 'Requirement', 'Solusi UI/flow', 'Test', 'Status']} rows={traceability.map((r) => [
                <Code c={r[0]} />, r[1], r[2], r[3], <Code c={r[4]} />, <Badge s={r[5]} tone={r[5] === 'Siap diuji' ? 'blue' : 'amber'} />,
              ])} />
            </Card>
          </Stack>
        )

        return (
          <Stack>
            <Card title="Checklist UAT" action={<Badge s={`${passed}/${scenarios.length} lulus`} tone={passed === scenarios.length ? 'green' : 'amber'} />} pad={false}>
              <Table cols={['Lulus', 'ID', 'Peran', 'Skenario', 'Hasil yang diharapkan']} rows={scenarios.map((s) => [
                <input
                  type="checkbox"
                  checked={Boolean(uat[s[0]])}
                  onChange={(e) => setUat({ ...uat, [s[0]]: e.target.checked })}
                />,
                <Code c={s[0]} />, s[1], s[2], s[3],
              ])} />
            </Card>
            <Grid cols={3}>
              <Card title="Gate 1 · UAT internal" action={<Badge s={passed === scenarios.length ? 'Lulus' : 'Berjalan'} tone={passed === scenarios.length ? 'green' : 'blue'} />}>
                <p className="text-xs leading-5 text-slate-600">Semua skenario P0 dan kontrak akses harus lulus.</p>
              </Card>
              <Card title="Gate 2 · Pilot" action={<Badge s="Terkunci" />}>
                <p className="text-xs leading-5 text-slate-600">3–4 minggu paralel WhatsApp dengan metrik mingguan.</p>
              </Card>
              <Card title="Gate 3 · Integrasi Portal" action={<Badge s="Terkunci" />}>
                <p className="text-xs leading-5 text-slate-600">Hanya setelah dua minggu tanpa perubahan flow besar.</p>
              </Card>
            </Grid>
            <div className="flex gap-2">
              <Btn primary onClick={() => passed === scenarios.length ? toast('Gate UAT disetujui; pilot dapat dijadwalkan') : toast(`Masih ada ${scenarios.length - passed} skenario yang belum lulus`)}>
                Evaluasi gate UAT
              </Btn>
              <Btn onClick={() => toast('Catatan sesi validasi dibuat')}>Catat temuan</Btn>
            </div>
          </Stack>
        )
      }} />
    </Stack>
  )
}

export const Checks = () => (
  <Stack>
    <PageHeader title="Pemeriksaan data" sub="Pemeriksaan otomatis atas anomali data" />
    <Card pad={false}><Table cols={['Pemeriksaan', 'Temuan', 'Catatan']} rows={[
      ['Sesi Completed tanpa laporan', <Badge s="OK" tone="green" />, '-'], ['Enrollment Active tanpa pembayaran terverifikasi', <Badge s="1 temuan" tone="red" />, <Code c="ENR-009" />],
      ['Mentor aktif tanpa tier', <Badge s="1 temuan" tone="amber" />, <Code c="MNT-003" />], ['Kode ganda / relasi yatim', <Badge s="OK" tone="green" />, '-']]} /></Card>
  </Stack>
)

export const Reminders = () => {
  const { toast } = useApp()
  return (
    <Stack>
      <PageHeader title="Pengingat" sub="Siap kirim. Dikirim manual lewat tautan WhatsApp; tidak ada pengiriman otomatis." />
      <Card pad={false}><Table cols={['Untuk', 'Jenis', 'Pesan', '']} rows={[
        ['Natasha', 'Jadwal besok', 'Halo Natasha, sesi ENR-001 besok 19:00...', <Btn small onClick={() => toast('Pesan disalin')}>Salin</Btn>],
        ['Natasha', 'Pelunasan', 'Pelunasan ENR-001 sebelum sesi 6...', <Btn small onClick={() => toast('Pesan disalin')}>Salin</Btn>]]} /></Card>
    </Stack>
  )
}

export const System = () => {
  const { toast, confirm } = useApp()
  return (
    <Stack>
      <PageHeader title="Sistem" sub="Pengaturan, cadangan, dan templat" />
      <Tabs tabs={['Pengaturan', 'Templat WhatsApp', 'Cadangan', 'Penerimaan lead', 'Pengguna']} render={(t) => t === 'Pengaturan' ? (
        <Card><Grid cols={3}>{[['Kapasitas Zoom', '1'], ['Durasi sesi (menit)', '120'], ['Peringatan kedaluwarsa (hari)', '14'], ['Batas pasif (hari)', '7'], ['Batas laporan (hari)', '1'], ['Minimum pengajuan honor (Rp)', '0']].map(([l, v]) => <Input key={l} label={l} value={v} />)}</Grid><div className="mt-3"><Btn primary small onClick={() => toast('Pengaturan disimpan')}>Simpan</Btn></div></Card>
      ) : t === 'Templat WhatsApp' ? (
        <Card><Stack><Select label="Templat" options={['Kontak pertama', 'Info paket', 'Pengingat jadwal', 'Pelunasan', 'Closing']} /><Field label="Isi (placeholder: {nama}, {kode_enrollment})" area value="Halo {nama}, berikut ringkasan program {kode_enrollment}..." /><div><Btn primary small onClick={() => toast('Templat disimpan')}>Simpan</Btn></div></Stack></Card>
      ) : t === 'Cadangan' ? (
        <Card><div className="flex flex-wrap items-center gap-3 text-sm"><span>Cadangan otomatis harian: terakhir 23 Mar 02:00</span><Btn small>Unduh</Btn><Btn small onClick={() => toast('Uji pemulihan berhasil')}>Uji pemulihan</Btn></div></Card>
      ) : t === 'Penerimaan lead' ? (
        <Card><div className="flex items-center gap-4"><Check label="Aktifkan penerimaan lead otomatis (bertoken)" /><Field label="Token" value="•••• •••• 7f3a" /></div></Card>
      ) : (
        <Card pad={false}><Table cols={['Pengguna', 'Peran', 'Status', '']} rows={[['Sari', 'Admin', <Badge s="Active" />, <Btn small>Reset sandi</Btn>], ['Dewi', 'Finance', <Badge s="Active" />, <Btn small>Reset sandi</Btn>], ['Rina', 'PMO', <Badge s="Active" />, <Btn small>Reset sandi</Btn>], ['Joko', 'Marketing', <Badge s="Active" />, <Btn small>Reset sandi</Btn>]]} /></Card>
      )} />
    </Stack>
  )
}

export const Import = () => {
  const { toast, role } = useApp()
  return (
    <Stack>
      <PageHeader title="Impor data lama" sub="Hanya aktif di mode demo. Kode asal dipertahankan, impor ulang menghasilkan 0 baris baru." perm={role === 'Admin' ? 'Admin tidak dapat mengimpor rekening mentor' : undefined} />
      <Card><Stack>
        <Grid cols={2}><Select label="Sumber" options={['Spreadsheet V1.1 (.xlsx)', 'Cadangan aplikasi lama private-devata (.db)']} /><Input label="Berkas" placeholder="Pilih berkas" /></Grid>
        <Btn primary small onClick={() => toast('Pratinjau dibuat (belum ada data ditulis)')}>Pratinjau (dry run)</Btn>
      </Stack></Card>
      <Card title="Hasil pratinjau"><Grid><Stat label="Akan masuk" value={38} /><Stat label="Sudah ada" value={4} /><Stat label="Konflik" value={1} tone="amber" /><Stat label="Ditolak" value={2} tone="red" /></Grid>
        <div className="mt-3"><Btn small onClick={() => toast('Impor dijalankan dalam satu transaksi')}>Jalankan impor</Btn></div></Card>
    </Stack>
  )
}

export const Audit = () => (
  <Stack>
    <PageHeader title="Log audit" sub="Tidak dapat dihapus dari antarmuka. Nilai keuangan disamarkan untuk Admin." />
    <Card pad={false}><Toolbar filters={['Entitas', 'Pelaku', 'Tanggal']} /><Table cols={['Waktu', 'Pelaku', 'Entitas', 'Aksi']} rows={[
      ['23 Mar 10:12', 'Finance · Dewi', <Code c="PAY-003" />, 'Verifikasi Rp1.500.000'], ['22 Mar 16:40', 'Admin · Sari', <Code c="ENR-001" />, 'Rencana belajar v1 disetujui via WA'],
      ['20 Mar 09:00', 'PMO · Rina', <Code c="CFG-007" />, 'Mengusulkan tarif Tier 2'], ['19 Mar 11:30', 'Finance · Dewi', <Code c="MNT-001" />, 'Membuka data rekening']]} /></Card>
  </Stack>
)

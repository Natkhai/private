# Private Module: MVP dan Tahapan Pengembangan (Revisi 2)

Status: DRAFT UNTUK DISKUSI. Belum ada kode, repo, atau push yang dibuat.
Basis: Operational Book Private Devata v1.0 (single source of truth), PRD Private Module v1.0, keputusan Mas Radev 4 Nov 2026.
Proyek ini BARU dan terpisah dari `private-devata` (app spreadsheet-trial). App lama hanya referensi logika.

## 0. Keputusan yang sudah diambil (4 Nov 2026)

| # | Keputusan | Dampak ke spesifikasi |
|---|---|---|
| 1 | Dibangun mandiri dulu, kemudian dimasukkan ke Devata Portal (bagian Academy). Flow dan kerja Private harus pasti dulu sebelum integrasi. | Bagian 9 (kesiapan integrasi). Fokus tahap mandiri: memastikan flow, bukan membangun fitur sebanyak mungkin. |
| 2 | Honor mentor dibedakan per tier. PMO atau Finance mengisi di web app. Perlu database mentor. | Entitas Tier Mentor, tarif per tier, tier melekat pada mentor (bagian 5 dan 7). |
| 3 | Siklus honor fleksibel: berdasarkan laporan sesi yang disubmit dan pengajuan mentor. Aturan batas waktu disesuaikan nanti. | Batas pengajuan dibuat konfigurasi, bukan hard-code. |
| 4 | Pembayaran student diinput Admin, diverifikasi Finance. | Admin membuat catatan bayar (Pending), Finance memverifikasi. Admin tidak bisa memverifikasi. |
| 5 | Perubahan konfigurasi memerlukan persetujuan dua pihak, atau pihak yang paling sesuai. | Rekomendasi: maker-checker antara PMO dan Finance (bagian 4.1). |
| 6 | Volume student dan sesi belum diketahui. | Tahap 0 mengukur volume. Ukuran pilot ditetapkan setelah inventaris. |
| 7 | No-show diabaikan dulu (keputusan sebelumnya). | Dicatat sebagai Cancelled dengan alasan teks. |
| 8 | Tier mentor = bayaran mentor per sesi. Harga sesi student sudah termasuk bayaran mentor. | Honor adalah biaya Devata, bukan tambahan tagihan ke student. Margin per sesi = harga sesi paket dikurangi tarif tier (bagian 4.2). |
| 9 | Admin tidak boleh mengetahui jumlah honor dan rekening mentor. | Pemisahan data keuangan mentor dipaksa di server (bagian 4.2). |

---

## 1. Problem Statement

Private berjalan lewat chat WhatsApp antara admin, student, dan mentor. Jadwal ditentukan oleh kesepakatan mentor dan student, jadi tim Devata lain (PMO, Finance) tidak tahu perkembangan sampai bertanya ke admin. Akibatnya status program, jadwal, pelunasan, laporan sesi, dan honor mentor tidak punya satu sumber data. Prinsip Book bab 13 ("aktivitas yang tidak tercatat dianggap belum terjadi") tidak bisa ditegakkan. Percobaan spreadsheet sebelumnya belum selesai dan flow-nya belum pasti, jadi belum ada yang dipakai harian.

Akar masalah: informasi operasional hidup di chat dan kepala satu orang. Nilai terbesar MVP adalah satu catatan yang bisa dilihat semua peran, bukan fitur untuk student.

## 2. Goals

1. **Satu sumber data.** PMO dan Finance melihat status lead, enrollment, sesi, pembayaran, dan honor tanpa bertanya ke admin.
2. **Tidak ada bentrok Zoom.** Semua sesi tercatat sebelum berlangsung dan sistem menolak overlap pada akun Zoom Private.
3. **Laporan sesi tepat waktu.** Sesi yang belum dilaporkan terlihat jelas dan tidak masuk honor.
4. **Honor mentor dihitung otomatis** dari laporan sesi dan tier mentor, tanpa rekap manual.
5. **Uang bisa dilacak.** Harga dan honor historis tidak berubah saat konfigurasi diubah, dan setiap perubahan penting punya pelaku, penyetuju, dan waktu.
6. **Flow Private terkonfirmasi** lewat pilot sebelum diintegrasikan ke Portal.

## 3. Non-Goals (tidak ada di MVP)

| Non-goal | Alasan |
|---|---|
| Portal / akun student | Book tidak punya peran student. Masalah ada di sisi internal. Kebutuhan student belum terbukti. |
| Chat student-mentor di sistem | WhatsApp sudah jalan, belum ada keluhan. |
| Notifikasi otomatis ke student | Kebijakan kirim belum diputuskan, ada risiko spam. Alert hanya untuk tim, di dalam aplikasi. |
| Acknowledgement kurikulum oleh student di sistem | Tanpa akun student, persetujuan dicatat admin (tanggal, catatan). Alur penuh menyusul. |
| Aturan no-show | Diputuskan abaikan dulu. |
| Gateway pembayaran, rekonsiliasi bank, checkout Academy | Pembayaran manual. Private belum dijual lewat checkout online. |
| Pembuatan meeting Zoom otomatis | Cukup catat slot dan tautan. |
| Sertifikat dan komunitas otomatis | Cukup checklist penyelesaian. |
| Migrasi data lama | Tidak ada data di app lama. Enrollment aktif dari WA diinput manual saat pilot. |
| Peran Management terpisah | Konfigurasi dipegang PMO dan Finance (bagian 4.1). |
| Integrasi Portal | Setelah flow pasti. Hanya disiapkan kesiapannya (bagian 9). |

## 4. Peran di MVP

| Peran | Fokus (Book bab 4) | Konfigurasi |
|---|---|---|
| Admin | Lead sampai enrollment aktif, mentor matching, jadwal dan slot Zoom, input pembayaran student, closing review | Tidak boleh |
| Mentor | Sesi, laporan sesi (maks H+1), laporan akhir, ajukan honor | Tidak boleh |
| Finance | Verifikasi pembayaran, payroll mentor, data bank mentor | Mengusulkan dan menyetujui (4.1) |
| PMO | Monitoring, review kasus kedaluwarsa dan pasif | Mengusulkan dan menyetujui (4.1) |

Aturan izin: peran minimum untuk tiap pekerjaan. Admin tidak memverifikasi uang. Mentor tidak melihat data keuangan internal. Data keuangan mentor (tier, tarif, honor, rekening) dipisahkan per kolom dan dipaksa di server, lihat 4.2.

### 4.1 Hak ubah konfigurasi: maker-checker PMO dan Finance

Objek konfigurasi: harga/kuota/masa aktif/aturan DP paket, tarif per tier honor, tier yang dipegang tiap mentor, tujuan pembayaran student.

Alur:
1. PMO atau Finance membuat usulan perubahan (nilai baru, tanggal efektif, alasan). Status Proposed.
2. Pihak lainnya menyetujui atau menolak (alasan wajib). Pengusul tidak bisa menyetujui usulannya sendiri.
3. Setelah disetujui, perubahan aktif pada tanggal efektif. Bila persetujuan datang sesudah tanggal efektif, berlaku sejak tanggal persetujuan. Tidak ada perubahan berlaku mundur.
4. Enrollment yang sudah dibuat dan honor yang sudah eligible tidak berubah.
5. Semua langkah masuk audit log (pengusul, penyetuju, nilai lama dan baru, waktu).

Alasan: Finance membayar honor dan memverifikasi pembayaran student, jadi tidak seharusnya menetapkan sendiri tarif yang ia bayar atau harga yang ia verifikasi. PMO memonitor operasional, bukan pemegang uang. Perubahan konfigurasi jarang terjadi sehingga persetujuan dua pihak murah dibandingkan risikonya.

### 4.2 Pemisahan data keuangan mentor

Prinsip: harga sesi student sudah termasuk bayaran mentor. Honor adalah biaya Devata, bukan tambahan tagihan ke student. Admin tidak boleh mengetahui jumlah honor maupun rekening mentor.

| Data | Admin | Mentor | Finance | PMO |
|---|---|---|---|---|
| Tier mentor | Tidak | Milik sendiri | Ya | Ya |
| Tarif per tier | Tidak | Tarif sendiri | Ya | Ya |
| Honor per sesi (snapshot) | Tidak | Milik sendiri | Ya | Ya |
| Pengajuan dan pembayaran honor | Tidak | Milik sendiri | Ya | Baca saja |
| Rekening bank mentor | Tidak | Milik sendiri | Ya, penuh | Tersamar (4 digit terakhir) |
| Margin per sesi dan per enrollment | Tidak | Tidak | Ya | Ya |

Aturan penegakan:
1. **Dipaksa di server**, bukan sekadar disembunyikan di tampilan. Respons API untuk akun Admin tidak pernah memuat kolom tier, tarif, honor, atau rekening.
2. **Jalur kebocoran yang harus ditutup:** KPI dan dashboard (total honor, honor belum dibayar), alert honor, audit log (nilai lama dan baru perubahan keuangan disamarkan untuk Admin), ekspor CSV, detail sesi (kolom honor), pesan galat, serta filter, pencarian, dan urutan di daftar mentor (tidak boleh berdasarkan tier atau tarif, karena itu membocorkan urutan bayaran).
3. Admin tetap melihat sesi Completed, tetapi tidak status honornya.
4. **Mentor baru:** Admin membuat profil dasar (nama, kontak, keahlian, kapasitas, status). Finance mengisi rekening. Tier ditetapkan lewat persetujuan 4.1. Selama tier belum ada, sesi tetap berjalan, honornya tertahan, dan alert muncul untuk Finance dan PMO.
5. Rekening disimpan terenkripsi. Setiap pembukaan data rekening tercatat di audit log (siapa dan kapan).
6. **Tes kontrak otomatis:** untuk setiap endpoint, respons akun Admin diuji tidak mengandung kolom terlarang.
7. Admin yang mengganti mentor secara tidak langsung mengubah biaya (tier berbeda). PMO menerima catatan penggantian mentor agar dampak margin terlihat.

Margin: harga per sesi paket (Rp270.000 sampai Rp370.000) dibandingkan tarif tier ditampilkan sebagai matriks tier dan paket di layar persetujuan 4.1. Sistem memberi peringatan (bukan blokir) bila margin per sesi negatif atau di bawah batas yang ditetapkan PMO dan Finance.

## 5. User Stories dan Acceptance Criteria (P0)

### Admin
**A1. Lead.** Sebagai admin, saya ingin mencatat lead dan statusnya agar posisi setiap calon student terlihat.
- Given lead baru, When disimpan dengan nama, kontak, kebutuhan, tujuan, Then status New Lead dengan PIC dan tanggal.
- Status hanya dari Book: New Lead, Contacted, Assessment, Mentor Matching, Waiting Decision, Won, Lost. Lost wajib alasan.
- Bisa difilter status dan tanggal follow-up. Follow-up terlewat tampil sebagai alert.

**A2. Mentor matching.** Sebagai admin, saya ingin mencari mentor yang cocok agar matching cepat.
- Filter keahlian, status aktif, dan beban (enrollment aktif dibanding kapasitas).
- Admin tidak melihat tier, tarif, honor, maupun data bank (4.2). Bila Admin butuh penanda tingkat keahlian untuk matching, itu atribut terpisah yang tidak berkaitan dengan bayaran (Open Question 9).

**A3. Enrollment.** Sebagai admin, saya ingin membuat enrollment dari lead Won agar program terhubung ke riwayat lead.
- Snapshot harga, kuota, masa aktif, dan aturan DP dari paket saat dibuat. Perubahan harga paket tidak mengubah enrollment yang ada.
- Lead tetap tersimpan dan terhubung. Student yang ambil program lagi mendapat enrollment baru.
- Status: Draft lalu Waiting Payment setelah paket dan mentor ditetapkan.

**A4. Jadwal.** Sebagai admin, saya ingin mencatat jadwal dan melihat bentrok Zoom.
- Given ada sesi online 10.00-12.00, When sesi online 11.00-13.00 dimasukkan, Then ditolak dengan menampilkan sesi yang bentrok.
- Mentor yang sama dan student yang sama tidak boleh punya dua sesi di jam yang sama.
- Mentor boleh mengajukan jadwal; menjadi Scheduled setelah admin mengonfirmasi (Book: mentor menginformasikan ke admin, admin memeriksa slot).
- Reschedule: sesi lama berstatus Rescheduled, menunjuk sesi baru, alasan wajib.

**A5. Rencana belajar.** Sebagai admin, saya ingin mencatat rencana belajar dan persetujuan student.
- Enrollment punya rencana belajar (tujuan, topik, target, estimasi sesi) yang diisi mentor atau admin.
- Admin mencatat "disetujui student via WA" dengan tanggal dan catatan. Perubahan sesudahnya membuat revisi baru, versi lama tetap tersimpan.

**A6. Catat pembayaran.** Sebagai admin, saya ingin memasukkan pembayaran yang diterima dari student agar Finance bisa memverifikasi.
- Isi: enrollment, jumlah, tanggal bayar, tipe (DP/pelunasan/penuh), bukti (tautan atau berkas). Status awal Pending.
- Admin tidak bisa mengubah status menjadi Verified. Pembayaran Pending boleh dikoreksi admin sampai Finance memprosesnya.
- Sistem memperingatkan bila ada catatan dengan enrollment, jumlah, dan tanggal yang sama (kemungkinan dobel).

### Mentor
**M1.** Sebagai mentor, saya ingin melihat student, jadwal, dan rencana belajar saya.
- Hanya enrollment miliknya. Tidak ada harga paket, pembayaran student, atau tarif mentor lain.

**M2. Laporan sesi.** Sebagai mentor, saya ingin mengisi laporan sesi agar sesi valid dan honor bisa diajukan.
- Wajib: topik/materi, progres, langkah berikutnya. Catatan opsional.
- Given sesi belum dimulai, Then laporan tidak bisa diisi (kecuali PMO).
- Setelah laporan masuk, sesi Completed. Tanpa laporan, tidak eligible honor dan tampil terlambat bila lewat H+1.
- Saat sesi menjadi Completed, tarif honor diambil dari tier mentor pada tanggal sesi lalu disimpan (snapshot) di sesi tersebut.

**M3. Ajukan honor.** Sebagai mentor, saya ingin mengajukan honor atas sesi yang sudah eligible.
- Daftar sesi eligible dengan nominal otomatis. Mentor tidak dapat mengubah nominal.
- Pilih satu atau beberapa sesi dalam satu pengajuan. Sesi yang sudah masuk pengajuan tidak bisa diajukan lagi.
- Status terlihat: Eligible, Requested, Rejected, Paid.
- Batas/aturan pengajuan (minimum, tanggal potong) berupa konfigurasi, awalnya tanpa batas.

### Finance
**F1. Verifikasi pembayaran.** Sebagai finance, saya ingin memverifikasi pembayaran yang diinput admin.
- Aksi: Verified atau Rejected (alasan wajib). Tercatat pelaku dan waktu. Pembayaran Verified tidak bisa diubah; koreksi lewat catatan koreksi baru.
- Enrollment Waiting Payment menjadi Active setelah syarat awal terpenuhi: lunas untuk < 5 dan 5 sesi, DP minimal 50% untuk 10 dan 20 sesi.
- Status pembayaran dihitung dari pembayaran Verified: Pending, DP Paid, Partially Paid, Paid.
- DP kurang dari 50%: sesi yang boleh jalan dihitung proporsional (Book bab 9). Sistem memberi peringatan, tidak memblokir sesi.

**F2. Outstanding.** Sebagai finance, saya ingin melihat sisa tagihan: total, terbayar terverifikasi, sisa, dan batas pelunasan (sebelum sesi ke-6 untuk 10 sesi, ke-11 untuk 20 sesi).

**F3. Review dan bayar honor.** Sebagai finance, saya ingin meninjau pengajuan honor dan mencatat pembayaran.
- Terlihat daftar sesi, laporan, tier, dan nominal snapshot.
- Aksi: Tolak (alasan wajib) atau Bayar (tanggal, referensi).
- Setelah Paid, tidak bisa diubah atau dibatalkan; koreksi lewat catatan koreksi baru.
- Rekap per mentor dan per bulan, ekspor CSV.

**F4. Tier dan tarif honor.** Sebagai PMO atau Finance, saya ingin mengelola tier mentor dan tarif per tier.
- Tier punya nama, tarif per sesi (2 jam), dan tanggal efektif. Perubahan lewat alur persetujuan 4.1.
- Mentor memiliki tier dengan riwayat (tier lama tetap tercatat dengan periodenya). Perubahan tier mentor juga lewat persetujuan.
- Honor sesi memakai tarif tier yang berlaku pada tanggal sesi.
- Layar persetujuan menampilkan matriks margin per sesi (harga sesi tiap paket dikurangi tarif tier) dan peringatan bila margin negatif atau di bawah batas.

**F5. Harga paket.** Sebagai PMO atau Finance, saya ingin mengelola harga, kuota, masa aktif, dan aturan DP paket lewat persetujuan 4.1. Nilai awal dari Book: < 5 sesi Rp370.000/sesi, 5 sesi Rp1.750.000, 10 sesi Rp3.000.000, 20 sesi Rp5.400.000.

### PMO
**P1. Dashboard dan alert.** Jumlah enrollment per status, sesi periode ini, laporan terlambat, mendekati kedaluwarsa (default 14 hari), student pasif (7 hari tanpa jadwal berikutnya), pelunasan mendekati batas, beban mentor. Tiap alert menautkan ke catatannya.

**P2. Keputusan kasus.** Kasus kedaluwarsa dengan sisa sesi dan student pasif mendapat catatan keputusan PMO (tanggal, pelaku). Tidak ada perpanjangan atau penghapusan otomatis.

### Lintas peran
- **X1.** Aksi penting (status, verifikasi bayar, konfigurasi, ganti mentor, bayar honor) masuk audit log yang tidak bisa dihapus dari antarmuka.
- **X2.** Ganti mentor menyimpan riwayat penugasan: sesi lama tetap milik mentor yang mengajar, sesi baru memakai mentor baru, alasan wajib, dan student sudah disetujui (dicatat admin).
- **X3.** Tidak ada penghapusan permanen data operasional. Arsipkan atau nonaktifkan.

## 6. Prioritas

**P0:** semua story di atas, login dan 4 peran, audit log, status resmi Book (Lead 7, Enrollment 7, Sesi 4, Pembayaran 4), cek bentrok, honor otomatis dari tier, dashboard PMO, ekspor CSV.

**P1 (fast follow setelah pilot):** laporan akhir mentor dan closing review dengan checklist penyelesaian; acknowledgement kurikulum formal dengan revisi; catatan komunikasi per lead dan enrollment; notifikasi WA ke tim internal; impor enrollment aktif; cetak dokumen enrollment; laporan margin per enrollment (PMO dan Finance saja).

**P2:** tautan student read-only lalu akun; chat; integrasi Portal (SSO, identitas, chat); aturan no-show dan blokir sesi saat pelunasan kurang; perpanjangan masa aktif; sertifikat dan komunitas otomatis; peran Owner/Management.

## 7. Model Data MVP (konsep)

Lead → Enrollment → (Rencana Belajar versi, Penugasan Mentor riwayat, Sesi, Pembayaran).
Sesi → Laporan; Sesi Completed → Honor sesi (tarif snapshot dari tier) → Pengajuan Honor (item) → Pembayaran Honor.
Mentor → Riwayat Tier ← Tier (tarif per tanggal efektif).
Konfigurasi (paket, tarif tier, tier mentor, tujuan bayar) dengan status usulan/disetujui dan tanggal efektif.
Audit log.
Kolom `portal_user_id` kosong pada Mentor dan Student untuk pemetaan ke Portal nanti.

## 8. Tahapan Pengembangan

Estimasi kasar, berasumsi satu pengembang fokus, belum divalidasi. Dipakai untuk urutan, bukan janji tanggal.

| Tahap | Isi | Hasil yang bisa didemokan | Perkiraan |
|---|---|---|---|
| **0. Validasi flow** | Dry-run dengan 3 kasus nyata: paket < 5 sesi, paket 10 sesi dengan DP, dan kasus ganti mentor. Inventaris: jumlah student aktif, sesi per bulan, pertanyaan status ke admin per minggu (baseline), daftar mentor dan tiernya. Putuskan definisi tier dan stack. | Alur disepakati semua peran, data dictionary, seed konfigurasi dari Book | 1 minggu |
| **1. Fondasi + pipeline admin** | Login/peran, audit log, konfigurasi dengan persetujuan (4.1), tier dan database mentor, paket, CRM lead, enrollment dengan snapshot, rencana belajar | Lead sampai enrollment Waiting Payment; usulan harga disetujui dua pihak | 2-3 minggu |
| **2. Pembayaran + sesi** | Admin input bayar, Finance verifikasi, aktivasi enrollment, penjadwalan, cek bentrok, reschedule/cancel, laporan sesi | Enrollment aktif sampai sesi Completed | 2-3 minggu |
| **3. Honor + monitoring** | Honor sesi dari tier, pengajuan mentor, review dan bayar Finance, dashboard PMO, alert, ekspor CSV | MVP lengkap | 2 minggu |
| **Pilot** | Paralel dengan WA pada enrollment nyata. Ukuran ditetapkan setelah inventaris Tahap 0. Evaluasi mingguan. | Keputusan: lanjut, ubah flow, atau berhenti | 3-4 minggu |
| **4. Rilis 1.1 (P1)** | Laporan akhir, closing review, acknowledgement formal, notifikasi internal, impor | Siklus Book penuh sampai Completed | sesuai hasil pilot |
| **5. Integrasi Portal** | Pemetaan ke Portal V20 (user, mentor, role, chat), student view | Private menjadi bagian Academy/Portal | setelah flow pasti |

Kriteria keluar:
- Tahap 0 selesai bila Mas Radev menyetujui alur dan pertanyaan blocking terjawab.
- Tahap 1-3 selesai bila acceptance criteria lulus tes otomatis dan didemokan dengan data nyata oleh peran pemakainya.
- Pilot selesai bila metrik di bawah terpenuhi dua minggu berturut dan tidak ada perubahan flow besar dalam dua minggu terakhir.
- Tahap 5 dimulai hanya bila flow dinyatakan pasti oleh Mas Radev.

## 9. Kesiapan Integrasi Portal

Karena tujuan akhirnya Portal, tahap mandiri harus menghasilkan aset yang bisa dipindahkan:
1. **Flow dan aturan bisnis terdokumentasi** (aset utama, bukan kode).
2. **Logika uang dan jadwal terpisah sebagai fungsi murni** (status pembayaran, sesi yang boleh jalan, eligibility honor, snapshot tarif, bentrok jadwal) dengan tes otomatis yang menjadi kontrak saat dipindahkan.
3. **`portal_user_id`** pada mentor dan student; peran memakai nama yang mudah dipetakan.
4. **Tanpa penghapusan permanen** dan skema yang dibuat otomatis oleh aplikasi (selaras dengan aturan Portal: tanpa file .sql terpisah, tabel uang tidak dihapus).
5. **Keputusan stack** (Open Question 1) menentukan apakah integrasi berupa salin logika atau tulis ulang.

## 10. Metrik Keberhasilan (hipotesis, dikonfirmasi di Tahap 0)

Leading (pilot):
- 100% sesi tercatat sebelum berlangsung.
- 0 bentrok Zoom lolos.
- Minimal 90% laporan sesi masuk dalam H+1.
- Finance menutup payroll bulan pilot tanpa spreadsheet pembantu.

Lagging (1-3 bulan):
- Pertanyaan status ke admin per minggu turun minimal 50% dari baseline (baseline diukur di Tahap 0).
- Waktu Finance menutup payroll turun dari baseline.
- Enrollment yang mendekati kedaluwarsa terdeteksi lebih awal dari 14 hari.

## 11. Open Questions

**Blocking (sebelum Tahap 1):**
1. **Nilai tier saat ini** (Mas Radev, Finance). Definisinya sudah jelas: bayaran mentor per sesi 2 jam, termasuk dalam harga sesi student. Masih terbuka: berapa tier dan nominalnya sekarang (untuk data awal), kriteria naik/turun tier, siapa yang menetapkan, apakah tarif dibedakan online dan offline, dan batas margin minimum per sesi (4.2). Asumsi: tarif berlaku menurut tanggal sesi.
2. **Stack mandiri** (Mas Radev, pengembang). Portal adalah PHP/MySQL. Bila stack mandiri sama dengan Portal, integrasi berupa salin; bila berbeda (misalnya Node seperti app lama), integrasi berupa tulis ulang dari spesifikasi dan tes. Rekomendasi: ikuti stack Portal bila yang memelihara sistem ini juga memelihara Portal.
3. **Konfirmasi maker-checker 4.1** (Mas Radev). Termasuk: bila salah satu pihak berhalangan, apakah perubahan menunggu, atau perlu akun Owner sebagai pemutus?

**Non-blocking:**
4. Aturan siklus honor: minimum nominal, tanggal potong, bayar per pengajuan atau digabung per bulan (diputuskan saat pilot; sistem dibuat konfigurable).
5. Sesi offline: Book menyebut harga disesuaikan. Apakah MVP online saja, atau admin boleh override harga per enrollment?
6. Harga publik di situs Academy dan KB chatbot (350rb dan 5jt untuk paket < 5 dan 20 sesi) berbeda dengan Book (370rb dan 5,4jt). Perlu disamakan; tidak memblokir sistem karena harga bisa dikonfigurasi.
7. Volume student dan sesi (diukur di Tahap 0).
8. Pemilik sistem setelah rilis: pemeliharaan, backup, akun.
9. Apakah Admin butuh penanda tingkat keahlian mentor untuk matching (misalnya "kompleks" atau "dasar")? Bila ya, dibuat atribut terpisah yang bukan tier bayaran.
10. Apakah PMO cukup melihat rekening tersamar (4 digit terakhir)? Asumsi dokumen ini: ya, rekening penuh hanya Finance.

## 12. Risiko dan Mitigasi

| Risiko | Mitigasi |
|---|---|
| Mengulang kegagalan percobaan lama: flow belum pasti lalu kode ditulis | Tahap 0 wajib selesai dulu, 3 kasus nyata |
| Tim tetap pakai WA, sistem tidak diisi | Pilot paralel, metrik "tercatat sebelum berlangsung", satu PIC admin |
| Scope melebar ke portal student dan chat | Non-goals eksplisit; setiap tambahan harus menyingkirkan sesuatu |
| Aturan uang salah | Tes otomatis untuk status bayar, sesi yang boleh jalan, snapshot harga dan tarif |
| Persetujuan dua pihak macet | Perubahan jarang; tanggal efektif memberi jeda; opsi Owner (Open Question 3) |
| Data bank mentor bocor | Izin per kolom, hanya Finance dan PMO |
| Dibangun dua kali (mandiri lalu Portal) | Aset utama = flow dan tes; keputusan stack di Tahap 0 |

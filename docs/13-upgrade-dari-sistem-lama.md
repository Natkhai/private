# Spesifikasi: upgrade Private Module dari sistem lama (spreadsheet V1.1)

Status: tahap 1-3 DIKERJAKAN sebagai versi demo (cabang `claude/kode-id-demo`, 10 Nov 2026), menunggu tinjauan Mas Radev sebelum digabung ke `main`. P1 (R7-R12) dan tahap 5 belum. Tanggal: 10 Nov 2026.
Sumber yang dibaca: `PRIVATE_MANAGEMENT_DATABASE_V1.1.xlsx` (Drive, diubah 12 Agu 2026), `PRIVATE_FINANCE (1).xlsx` (Drive, 11 Agu 2026), aplikasi lama repo `devata-studio/private-devata` (Node + SQLite, commit `a4a26de`: `server/db.js`, `server/api.js`, `server/logic.js`), kode Private Module commit `f982316`, `docs/01`, `docs/08`, `docs/10`, `docs/11`.

Ada TIGA "sistem lama", bukan satu: (a) spreadsheet V1.1 (rancangan data), (b) aplikasi `private-devata` yang dibangun dari spreadsheet itu, (c) spreadsheet kerja tim tab `PRIVATE` (data riil, kolom belum diketahui). Aplikasi (b) sudah memakai kode yang persis sama dengan spreadsheet sebagai primary key teks (`LEAD-001`, `STD-001`, ..., dibangkitkan `nextId()`), jadi kode itulah bahasa bersama yang harus dipertahankan.

## 0. Lingkup saat ini: VERSI DEMO (keputusan Mas Radev, 10 Nov 2026)

Pekerjaan ini **tidak menyentuh data riil dan data yang sudah ada**. Semua yang dibangun diuji di mode demo (`PM_MODE=demo`, `data/demo.db`) dengan data fiktif. Akibatnya:
- R1-R4 (kode tetap, tampil di mana-mana, pencarian) dibangun untuk semua mode, tetapi diisi dan diperiksa memakai data demo. Baris lama di database operasional tetap dapat kode lewat migrasi otomatis yang hanya menambah kolom, tidak mengubah isi lain.
- R5 dan R5b (impor) **hanya aktif di mode demo** dan diuji dengan berkas contoh fiktif yang dibangkitkan sistem sendiri: `DemoSeed` membuat berkas bergaya spreadsheet V1.1 dan berkas cadangan bergaya aplikasi lama (`tests/fixtures/`, isinya fiktif). Mode operasional menolak impor dengan pesan "Impor data lama belum dibuka untuk data riil".
- Tahap 5 (impor data riil) dan pertanyaan Q1, Q7 **ditunda**, tidak memblokir.
- `DemoSeed` memakai kode bergaya lama (`MNT-001`, `LEAD-001`, `STD-001`, `ENR-001`, `SES-001`, `PAY-001`, `PRL-001`) dan `DemoScenarios` mendapat skenario baru untuk kode, pencarian kode, dan impor (dry run, impor, impor ulang 0 baris baru, konflik, baris ditolak).

## 1. Masalah

Sistem lama adalah dua spreadsheet yang dirancang "database-ready": setiap baris punya kode yang mudah dibaca manusia (`LEAD-001`, `STD-001`, `ENR-001`, `SES-001`, `PAY-001`, `PRL-001`, `MNT-001`, `PKG-001`, `ZBK-001`), dan semua relasi memakai kode itu. Sistem baru memakai nomor urut polos (`#12`). Akibatnya tim kehilangan bahasa yang sama: di WhatsApp, bukti transfer, dan catatan Finance, "ENR-004" langsung jelas maksudnya, sedangkan "#4" bisa berarti lead, enrollment, atau pembayaran. Data dari spreadsheet juga tidak bisa dicocokkan ulang ke sistem baru tanpa kode asal.

## 2. Fakta yang ditemukan (bukan asumsi)

1. **Kedua spreadsheet hampir kosong.** Isinya kamus data, aturan, dan contoh: 2 mentor (`MNT-001` contoh, `MNT-002` aldi), 4 paket, 2 lead (`LEAD-001` contoh, `LEAD-002` aGUS, WON), 1 student contoh, 1 baris enrollment setengah isi, 0 sesi, 0 Zoom booking, 1 pembayaran contoh, 1 payroll contoh. Jadi **yang diwarisi adalah struktur, kode, dan aturan, bukan volume data.** Data riil Private hari ini ada di chat WhatsApp dan di spreadsheet kerja tim (tab `PRIVATE`, lihat `docs/10`), bukan di dua file ini.
2. **Harga di sheet V1.1 bertentangan dengan "aturan lama" di sistem baru.** Sheet (Agustus 2026): per sesi Rp370.000, 20 sesi Rp5.400.000, 10 sesi masa aktif 6 bulan. Itu sama dengan set **ketentuan terbaru** di `docs/11`, bukan aturan lama (Rp350.000, Rp5.000.000). Kesimpulan sementara: harga turun lewat keputusan 24 Sep 2026, lalu ketentuan terbaru mengembalikan harga Agustus. Ini memperkuat bahwa pemetaan "aturan lama = 24 Sep" masih perlu dikonfirmasi (pertanyaan terbuka lama).
3. **Sistem baru sudah lebih ketat dari sheet** di banyak hal: snapshot harga dikunci di DB, status bayar dihitung dari pembayaran terverifikasi (sheet: diisi manual oleh Finance, rawan lupa), honor dikunci ke laporan sesi, Admin tidak melihat honor dan rekening (sama dengan aturan akses sheet), bentrok Zoom dicegah otomatis.

## 3. Pemetaan sistem lama ke sistem baru

### 3.1 Entitas dan kode

| Sheet lama | Kode lama | Tabel baru | Kode di sistem baru (usulan) | Catatan |
|---|---|---|---|---|
| MASTER MENTOR | `MNT-001` | `mentors` | `MNT-001` | `specialization` lama = `skills` baru |
| MASTER PACKAGE | `PKG-001` | konfigurasi paket (`package_code`) | `PKG-001` (fleksibel), `PKG-002` (5), `PKG-003` (10), `PKG-004` (20) | Urutan persis sheet |
| CRM | `LEAD-001` | `leads` | `LEAD-001` | |
| STUDENT | `STD-001` | `students` | `STD-001` | |
| ENROLLMENT | `ENR-001` | `enrollments` | `ENR-001` | |
| SESSION | `SES-001` | `sessions` | `SES-001` | `session_number` sudah ada (urutan per enrollment) |
| ZOOM BOOKING | `ZBK-001` | tidak ada tabel; Meeting ID dan waktu ada di `sessions` | tidak dibuat | Satu sesi = satu booking, jadi `SES` sudah cukup (lihat Non-goal) |
| PAYMENT (Finance) | `PAY-001` | `payments` | `PAY-001` | |
| PAYROLL (Finance) | `PRL-001`, satu baris per sesi | `honor_requests`, satu pengajuan berisi banyak sesi | `PRL-001` per pengajuan | Semantik berbeda, lihat pertanyaan Q2 |
| MENTOR BANK INFO | per `MNT` | data rekening di `mentors` (hanya Finance) | ikut `MNT` | |
| (tidak ada) | | dokumen cetak | `INV/2026/0001`, kwitansi, sertifikat | Sudah ada, tidak diubah |

### 3.2 Status

| Entitas | Status lama | Status baru | Keputusan |
|---|---|---|---|
| Lead | NEW, CONTACTED, ASSESSMENT, MENTOR_MATCHING, WAITING_DECISION, WON, LOST | 7 tahap yang sama makna (K11: Waiting Decision bagian follow-up) | Petakan 1:1 saat impor |
| Enrollment | PENDING, CONFIRMED, ACTIVE, ON_HOLD, COMPLETED, CANCELLED, EXPIRED | mengikuti Operational Book (Draft, Waiting Payment, Active, ...) | PENDING jadi Draft, CONFIRMED jadi Waiting Payment, sisanya sama |
| Sesi | SCHEDULED, COMPLETED, RESCHEDULED, CANCELLED, NO_SHOW | tanpa NO_SHOW (K6/K7) | NO_SHOW diimpor sebagai Cancelled dengan alasan "No show (data lama)" |
| Status bayar | PENDING, DP_PAID, PARTIALLY_PAID, PAID (manual) | dihitung dari pembayaran terverifikasi | Tidak diimpor sebagai angka; dicocokkan dan selisihnya dilaporkan |
| Payroll | Unpaid, Paid per sesi | requested, rejected, paid per pengajuan | Sesi berstatus Paid di sheet ditandai sudah dibayar |

### 3.3 Aplikasi lama `private-devata` dibandingkan sistem baru

Yang sudah setara atau lebih baik di sistem baru (tidak perlu dikerjakan): CRM 7 tahap, konversi lead, enrollment dengan snapshot harga, aturan DP kurang dari 50% proporsional (`Payment::plan` sama logikanya dengan `paymentPlan` lama), bentrok Zoom, verifikasi dan tolak pembayaran, laporan sesi, laporan akhir, ekspor `.ics`, pencarian, cadangan, pengguna dan ganti sandi, log aktivitas. Sistem baru menambah: maker-checker konfigurasi paket dan tarif, tier honor, pemisahan rekening terenkripsi, peran Marketing, rencana belajar, reschedule berantai, mentor tamu, dokumen cetak bernomor, dan 118 tes.

Celah yang ditemukan (aplikasi lama punya, sistem baru belum):

| No | Fitur aplikasi lama | Bukti di kode lama | Kondisi di sistem baru | Usulan |
|---|---|---|---|---|
| G1 | ID bergaya `LEAD-001`, `ENR-001`, dst. sebagai rujukan utama | `nextId()` di `server/db.js` | Nomor urut polos `#12` | **P0**, R1-R4 |
| G2 | Perpanjang masa aktif enrollment | `POST /enrollments/:id/extend` | Tidak ada; hanya catatan keputusan kasus PMO | Butuh keputusan (Q6): PRD `docs/02` sengaja menaruh perpanjangan di P2 dan melarang perpanjangan otomatis. Usulan R10 bila disetujui |
| G3 | Penutupan program: catatan dan rating student | `closing_notes`, `closing_rating` | Hanya templat WA "closing", tidak ada data yang disimpan | P1, R11 |
| G4 | Rating student per sesi | `sessions.student_rating` | Tidak ada | P1, digabung R11 (rating per program cukup untuk pilot) |
| G5 | Metode pembayaran dan jenis CICILAN | `payments.method`, `type IN (...,'CICILAN')` | `kind` tanpa cicilan, tanpa metode | P1, R12 (metode bermanfaat untuk rekonsiliasi Finance; cicilan cukup sebagai `settlement` bertahap) |
| G6 | Status sesi NO_SHOW dan REQUESTED | CHECK status sesi | Sengaja dihapus (K6/K7); REQUESTED digantikan `needs_confirm` | Tidak dikerjakan; NO_SHOW diimpor sebagai Cancelled beralasan |
| G7 | Batalkan tanda "sudah dibayar" honor | `POST /payroll/unpay` | Honor `paid` final | Tidak dikerjakan: koreksi lewat catatan kasus, supaya jejak uang tidak bisa dihapus |
| G8 | Ubah paket langsung (CRUD) | `POST/PUT /packages` | Lewat usulan dan persetujuan | Tidak dikerjakan: maker-checker adalah keputusan K16 |

## 4. Tujuan

1. Setiap baris yang bisa dirujuk tim punya kode tetap bergaya lama, tampil di semua layar, cetakan, ekspor, pesan WhatsApp, dan bisa dicari. Ukuran: 100% layar daftar, detail, cetak, ekspor, dan templat WA menampilkan kode; pencarian kode tepat menemukan barisnya dalam satu langkah.
2. Data dari sheet lama (dan nanti spreadsheet kerja tim) bisa diimpor dengan kode asalnya dipertahankan, tanpa duplikat, dengan laporan hasil. Ukuran: impor ulang file yang sama menghasilkan 0 baris baru.
3. Kode tidak pernah berubah dan tidak pernah dipakai dua kali. Ukuran: dijaga trigger DB dan indeks unik, dibuktikan tes.
4. Tidak ada aturan bisnis yang mundur: snapshot harga, maker-checker, pemisahan akses Admin dan Finance, honor dari laporan mentor tetap berlaku. Ukuran: 118 tes lama tetap lulus.

## 5. Non-goal

1. **Tidak membuat tabel Zoom Booking.** Satu sesi selalu satu booking; menyimpan dua kali berarti dua sumber kebenaran untuk jam yang sama, dan bentrok sudah dicegah di sesi.
2. **Tidak mengganti primary key integer.** Kode adalah kolom tambahan. Mengganti PK ke teks menyentuh semua relasi dan tes tanpa manfaat bagi pengguna.
3. **Tidak mengimpor status bayar manual sebagai kebenaran.** Status bayar di sheet adalah ketikan; sumber kebenaran tetap pembayaran terverifikasi Finance.
4. **Tidak membawa Google Form mentor.** Mentor sudah melapor langsung di sistem (K17/K18).
5. **Tidak memberlakukan ketentuan terbaru** lewat pekerjaan ini. Itu tetap lewat alur usulan dan persetujuan (K16).

## 6. Cerita pengguna

Admin
- Sebagai Admin, saya ingin melihat dan menyebut "ENR-004" seperti di sheet lama, supaya percakapan dengan student, mentor, dan Finance tidak salah rujuk.
- Sebagai Admin, saya ingin mengetik `STD-012` di pencarian dan langsung masuk ke profilnya.
- Sebagai Admin, saya ingin templat WhatsApp otomatis menyertakan kode enrollment, supaya student bisa menuliskannya di berita transfer.

Finance
- Sebagai Finance, saya ingin pembayaran dan pengajuan honor punya kode `PAY-` dan `PRL-` yang sama di sistem, kwitansi, slip, dan mutasi bank, supaya rekonsiliasi cepat.
- Sebagai Finance, saya ingin ekspor CSV/Excel berisi kode, bukan nomor internal, supaya cocok dengan berkas lama.

PMO
- Sebagai PMO, saya ingin mengimpor sheet lama dan melihat laporan: berapa baris masuk, dilewati karena sudah ada, dan ditolak beserta alasannya, sebelum data benar-benar ditulis.
- Sebagai PMO, saya ingin selisih status bayar sheet vs pembayaran terverifikasi dilaporkan, bukan ditimpa diam-diam.

Kasus pinggir
- Baris sheet tanpa kode (sel kosong) mendapat kode baru dan dicatat di laporan.
- Kode di sheet salah format (`ENR 4`, `enr-004`) dinormalisasi bila jelas, ditolak bila tidak.
- Kode sudah ada di sistem dengan isi berbeda: tidak ditimpa, masuk daftar konflik.
- Relasi menunjuk kode yang tidak ada (`ENR-009` untuk sesi): baris ditolak dengan alasan.
- Lebih dari 999 baris: kode lanjut `ENR-1000` (tidak dipotong, tidak dimulai ulang per tahun).

## 7. Kebutuhan

### P0 (wajib)

**R1. Kolom kode per entitas.** Tabel `mentors`, `leads`, `students`, `enrollments`, `sessions`, `payments`, `honor_requests` mendapat kolom `code TEXT` dengan indeks unik dan trigger "tidak bisa diubah" (pola sama dengan `cert_no`). Migrasi runtime lewat `Schema::COLUMNS`, mengisi baris lama secara otomatis.
- [ ] Baris baru selalu mendapat kode saat dibuat, di transaksi yang sama.
- [ ] `UPDATE ... SET code` ditolak DB.
- [ ] Dua baris tidak bisa punya kode sama.

**R2. Penomoran.** Format `PREFIX-NNN` (minimal 3 digit, lanjut tanpa batas). Nomor diambil dari tabel penghitung per prefix (`code_counters`), bukan dari `id`, supaya kode hasil impor (mis. `LEAD-002`) tidak bentrok dan baris baru melanjutkan dari kode terbesar.
- [ ] Setelah impor `LEAD-001..LEAD-040`, lead baru menjadi `LEAD-041`.
- [ ] Penghitung aman di bawah transaksi bersamaan (dalam `dbtx`).

**R3. Tampil di mana-mana.** Ganti `#<id>` dengan kode di semua view, judul halaman, dokumen cetak, ekspor CSV/XLSX (kolom pertama), dan placeholder templat WA baru `{kode_enrollment}`. Nomor internal tidak lagi tampil ke pengguna.
- [ ] Tes HTTP: tidak ada `#<angka>` sebagai rujukan entitas di halaman utama.

**R4. Pencarian kode.** `/cari` mengenali pola kode (tanpa peduli huruf besar kecil, spasi, atau angka nol di depan: `enr 4` = `ENR-004`) dan langsung mengarahkan ke detail bila tepat satu hasil, tetap menghormati hak akses peran (Marketing hanya `LEAD`, Admin tidak melihat `PRL`).

**R5. Impor sheet V1.1 dengan kode asal.** Perluas impor (`.xlsx`) untuk sheet MASTER MENTOR, MASTER PACKAGE (hanya pencocokan, tidak mengubah konfigurasi), CRM, STUDENT, ENROLLMENT, SESSION, dan file Finance (PAYMENT, PAYROLL, MENTOR BANK INFO).
- Pratinjau dulu (dry run bawaan), tulis hanya setelah konfirmasi, dalam satu transaksi.
- Idempoten: kunci pencocokan = kode. Impor ulang = 0 baris baru.
- Urutan dependensi: mentor, lead, student, enrollment, sesi, pembayaran, payroll. Relasi lewat kode, bukan nama.
- Harga enrollment diambil dari kolom snapshot sheet (`package_price`), bukan dari konfigurasi hari ini.
- Pembayaran impor masuk sebagai "menunggu verifikasi" kecuali `Status Verifikasi` = Verified dan importir adalah Finance (maker-checker tetap).
- Rekening mentor hanya bisa diimpor oleh Finance; baris file Finance ditolak bila importir Admin.
- Laporan hasil: masuk, sudah ada, konflik, ditolak (dengan alasan per baris), dan selisih status bayar.
- [ ] Contoh baris di sheet (`Nama Mentor Contoh`, `Nama Calon Student`, `email@contoh.com`) dikenali dan dilewati.

**R6. Jejak.** Setiap baris impor tercatat di `audit_log` dengan sumber berkas dan kode asal.

**R5b. Impor dari aplikasi lama `private-devata`.** PMO mengunggah berkas cadangan SQLite aplikasi lama (`data/private-devata.db` atau berkas di `data/backups/`). Dibaca lewat PDO baca saja, dipetakan dengan tabel di 3.1 dan 3.3. Primary key teks lama (`ENR-004`) menjadi `code` di sistem baru, jadi rujukan tidak berubah. Aturan sama dengan R5: pratinjau dulu, idempoten, satu transaksi, laporan. Tambahan:
- `packages` lama hanya dicocokkan ke `package_code` (tidak mengubah konfigurasi, K16); enrollment memakai snapshot `package_price`, `session_quota`, `validity_months`, `dp_amount` miliknya.
- `mentors.honor_per_session` lama TIDAK diimpor sebagai tarif (tarif lewat tier dan maker-checker); dicantumkan di laporan khusus Finance agar tier mentor bisa diusulkan.
- `payroll` lama (per sesi) hanya dihitung di laporan dan TIDAK dibuat menjadi pengajuan honor. Alasan: honor di sistem baru berasal dari laporan sesi mentor dan tier (K16/K17), dan honor Paid terkunci permanen oleh trigger, jadi mengisinya dari impor berarti menulis uang tanpa pemeriksa kedua. Koreksi bila perlu lewat Finance setelah impor. (Ini mengubah usulan awal; Q2 tentang `PRL-` per sesi tetap terbuka.)
- `interactions` dan `activity_log` lama ikut dibawa sebagai riwayat, ditandai sumber "aplikasi lama".
- Baris `is_demo = 1` dilewati.
- [ ] Impor cadangan yang sama dua kali: kali kedua 0 baris baru.
- [ ] Jumlah enrollment, sesi Completed, dan total pembayaran Verified per enrollment sama dengan aplikasi lama (laporan rekonsiliasi).

### P1 (sebaiknya, menyusul cepat)

- **R11.** Penutupan program menyimpan catatan dan rating student 1 sampai 5 (G3, G4), diisi Admin dari jawaban student atas templat WA "closing"; tampil di detail enrollment dan halaman metrik PMO.
- **R12.** Kolom metode pembayaran (transfer bank, QRIS, tunai, lainnya) di input pembayaran, kwitansi, dan ekspor Finance (G5).

- **R7.** Kode di kwitansi dan invoice sebagai "berita transfer" yang disarankan (`ENR-004`), plus kolom kode di form input pembayaran supaya Admin bisa mengetik kode dari bukti transfer.
- **R8.** Dasbor angka dengan nama yang sama seperti DASHBOARD sheet (Active Enrollments, Expiring ≤ 14 hari, Sessions This Week, Leads In Progress), supaya tim yang terbiasa membaca sheet langsung paham.
- **R9.** Ekspor balik ke format kolom sheet V1.1 (kolom sama, urutan sama) untuk cadangan yang bisa dibuka siapa pun.

### P2 (dicatat agar rancangan tidak menutupnya)

- Kode yang sama dipakai saat integrasi ke Portal (K7): Portal menyimpan `ENR-xxx` sebagai rujukan, bukan id internal.
- Impor spreadsheet kerja tim tab `PRIVATE` setelah kolomnya diketahui (sudah tercatat belum dikerjakan).

## 8. Ukuran keberhasilan

- Leading (minggu pertama): 0 rujukan `#angka` di layar; impor sheet V1.1 lolos dengan laporan yang dibaca PMO; impor ulang 0 baris baru; semua tes (118 + tes baru) lulus.
- Lagging (bulan pertama pilot): Finance mencocokkan pembayaran ke enrollment tanpa bertanya ke Admin (target: tidak ada pertanyaan "ini enrollment yang mana" yang tercatat di catatan kasus); 0 kasus salah rujuk karena nomor.

## 9. Pertanyaan terbuka

| No | Pertanyaan | Untuk | Memblokir? |
|---|---|---|---|
| Q1 | (Ditunda, lihat bagian 0) Di mana data Private riil hari ini? Dua file ini hanya templat. Kalau ada spreadsheet kerja tim (tab `PRIVATE`) atau rekap WhatsApp, itu yang perlu diimpor, dan kolomnya harus saya lihat dulu. | Mas Radev / Admin | Ditunda (bagian 0) |
| Q2 | `PRL` di sheet lama satu baris per sesi, sedangkan sistem baru satu pengajuan berisi banyak sesi. Pakai `PRL-` untuk pengajuan (usulan saya), atau Finance butuh kode per sesi juga? Per sesi sudah terwakili oleh `SES-`. | Kak Gina (Finance) | Tidak, bawaan: `PRL-` per pengajuan |
| Q3 | Harga di sheet Agustus (Rp370.000 dan Rp5.400.000) = ketentuan terbaru. Benarkah aturan lama yang berlaku sekarang hasil keputusan 24 Sep, dan berapa harga 5 sesi (Rp1.750.000 atau Rp1.850.000)? | Mas Radev | Tidak untuk kode, ya untuk enrollment baru |
| Q4 | Kode dimulai dari 001 atau melanjutkan nomor terakhir yang pernah dipakai tim di luar sheet (mis. di catatan WhatsApp)? | Admin | Tidak, bawaan: lanjut dari kode terbesar yang diimpor |
| Q6 | Perpanjangan masa aktif (aplikasi lama punya tombolnya, PRD menaruhnya di P2): perlu dibuat sekarang? Kalau ya, siapa yang memutuskan (usulan: PMO, dengan alasan tercatat, maksimal berapa bulan, berbayar atau tidak)? | Mas Radev | Tidak, bawaan: tidak dibuat |
| Q7 | Apakah aplikasi lama `private-devata` pernah dipakai dengan data riil? Kalau ya, di mana berkas `data/private-devata.db`-nya (repo tidak menyimpannya karena berisi data pribadi). | Mas Radev / Admin | Ditunda (bagian 0) |
| Q5 | Perlu prefix tahun (`ENR-2026-001`)? Usulan saya tidak: kode pendek lebih mudah diucapkan, dan dokumen cetak sudah bertahun. | Mas Radev | Tidak |

## 10. Tahapan

| Tahap | Isi | Syarat selesai |
|---|---|---|
| 1 | R1, R2 (skema, penghitung, isi otomatis baris lama, trigger) | Tes unit: unik, tidak bisa diubah, lanjut setelah impor |
| 2 | R3, R4 (tampilan, cetak, ekspor, WA, pencarian) | Tes HTTP + screenshot 375px dan desktop |
| 3 | R5, R5b, R6 di mode demo (berkas contoh fiktif bergaya sheet V1.1, Finance, dan cadangan aplikasi lama; dry run, laporan) + skenario QA demo | Impor berkas contoh dua kali: kali kedua 0 baris baru; mode operasional menolak impor |
| 4 | P1 (R7-R9) | Setelah Finance mencoba tahap 1-3 |
| 5 | Impor data riil (DITUNDA) | Hanya atas perintah Mas Radev, setelah Q1/Q7 terjawab |

Rekomendasi eksekusi: tahap 1-3 menyentuh skema DB dan uang (pembayaran, rekening), jadi dikerjakan Sonnet di cabang baru dengan tes, bukan diserahkan ke Antigravity.


## 11. Status pengerjaan (versi demo)

| Butir | Status | Bukti |
|---|---|---|
| R1 kolom kode, trigger tidak bisa diubah, indeks unik, isi baris lama | Selesai | `src/Codes.php`, `Schema::migrateCodes`, `tests/fase5.php`. Trigger uang (`pay_verified_immutable`, `honor_paid_immutable`) hanya mengizinkan satu hal baru: mengisi kode yang masih kosong, kolom lain harus sama |
| R2 penghitung `code_counters` | Selesai | Melanjutkan dari kode terbesar yang diimpor (tes `LEAD-040` lalu `LEAD-041`) |
| R3 kode tampil di layar, cetak, ekspor CSV/XLSX, jejak audit, templat WA `{kode_enrollment}` | Selesai | Tangkapan layar 375px dan 1280px. Kolom ID ekspor menjadi Kode |
| R4 pencarian kode | Selesai | `SearchSvc::byCode`, hak akses per peran (Marketing hanya LEAD, Admin tidak menemukan PRL) |
| R5, R5b, R6 impor (demo saja) | Selesai | `src/LegacyImport.php`, `src/DemoLegacy.php`, `/impor-lama`. Mode operasional menolak |
| Demo | Diperbarui | 6 skenario baru (KOD-01, KOD-02, IMP-01 sampai IMP-04), total 70; data demo berkode gaya lama; berkas contoh fiktif diunduh dari halaman impor |
| R7 sampai R12 (P1) | Belum | Menunggu keputusan Mas Radev (Q6 perpanjangan masa aktif) |
| Tahap 5 impor data riil | Ditunda | Atas perintah Mas Radev |

Hal yang sengaja berbeda dari rencana awal: (1) kode diberikan di satu tempat, `dbinsert()`, bukan di tiap layanan, supaya tidak ada jalur sisip yang lupa memberi kode; (2) impor tanpa kode di baris sheet dicocokkan lewat nama dan nomor WhatsApp (atau kunci alami lain) supaya tetap idempoten; (3) payroll lama tidak menjadi honor (lihat R5b).

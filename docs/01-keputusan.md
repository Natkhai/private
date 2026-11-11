# Catatan keputusan

Format: keputusan, alasan, dan akibatnya ke sistem. Sumber: percakapan dengan Mas Radev, 4 sampai 5 Nov 2026. Bila Mas Radev mengoreksi sesuatu, perbarui berkas ini di sesi yang sama.

## A. Keputusan dari Mas Radev

| # | Keputusan | Alasan yang disampaikan | Akibat |
|---|---|---|---|
| K1 | Harga mengikuti PRD (Rp370.000 per sesi untuk kurang dari 5 sesi, Rp5.400.000 untuk 20 sesi), dan harga tidak selalu tetap: bisa diubah PMO atau Finance. | Operational Book v1.0 menyebut angka yang sama. | Harga dikonfigurasi, bukan ditulis mati. Data awal dari Book (`Schema::seedBase`). |
| K2 | Aplikasi lama (`private-devata`) belum dipakai: masih trial berbasis spreadsheet yang belum selesai, flow-nya belum pasti. | PRD baru dibuat setelah brainstorm dan menggambarkan operasi Private yang sebenarnya. | Proyek ini baru dan terpisah. Aplikasi lama hanya referensi logika. |
| K3 | Selama ini Private berjalan lewat chat WhatsApp admin, student, dan mentor. Jadwal disepakati mentor dan student, sehingga tim lain tidak tahu update sebelum bertanya ke admin. | Inilah masalah yang diselesaikan. | MVP berfokus pada sisi internal. Student belum punya akun. |
| K4 | Private belum dijual lewat checkout Academy (Duitku). | Pembayaran masih manual. | Tidak ada integrasi gateway. Pembayaran: Admin input, Finance verifikasi. |
| K5 | Honor mentor otomatis dari laporan sesi, dan mentor bisa meminta pembayaran setelah laporan dibuat. | Menjaga kontrol tanpa rekap manual. | Eligible muncul otomatis, mentor memilih sesi dan mengajukan, Finance meninjau lalu membayar. |
| K6 | No-show diabaikan dulu. | Aturan kuota dan honor belum diputuskan. | Dicatat sebagai Cancelled dengan alasan. Tidak ada status baru. |
| K7 | Bangun mandiri dulu, nanti dimasukkan ke Devata Portal karena Private bagian dari Academy. Flow harus pasti dulu sebelum integrasi. | Menghindari membangun di atas flow yang belum teruji. | `docs/07-integrasi-portal.md`. Logika murni dan tes menjadi kontrak pemindahan. |
| K8 | Tarif honor dibedakan per tier. PMO atau Finance yang mengisi di web app. | Tier adalah bayaran mentor per sesi. | Tabel `tiers`, tarif per tier, tier per mentor, semuanya lewat konfigurasi bertanggal efektif. |
| K9 | Harga sesi student sudah termasuk bayaran mentor. | Honor adalah biaya Devata, bukan tambahan tagihan. | Matriks margin per tier dan paket dengan peringatan (bukan pemblokir). |
| K10 | Admin tidak boleh mengetahui jumlah honor maupun rekening mentor. | Pemisahan tugas: Admin mengoperasikan layanan, Finance memegang uang. | Pemisahan dipaksa di server dan diuji otomatis (`AGENTS.md` aturan 1). |
| K11 | Pengajuan honor bisa disesuaikan nanti, berdasarkan laporan yang disubmit dan pengajuan mentor. | Siklus belum pasti. | Batas pengajuan berupa pengaturan (`honor_min_request`), awalnya tanpa batas. |
| K12 | Pembayaran student diinput Admin lalu diverifikasi Finance. | Admin yang berhubungan dengan student lewat WhatsApp. | Admin tidak bisa memverifikasi (403). |
| K13 | Perubahan konfigurasi perlu persetujuan dua pihak, "atau mana yang sebaiknya memiliki hak". | Mas Radev meminta rekomendasi. | Diputuskan maker-checker PMO dan Finance (lihat C1). Menunggu konfirmasi. |
| K14 | Volume student dan sesi belum diketahui. | Belum ada data. | Ukuran pilot ditentukan setelah inventaris (Tahap 0). |

## B. Aturan Book yang diterapkan apa adanya

Paket dan harga, masa aktif (3, 3, 6, 12 bulan), DP 50% untuk 10 dan 20 sesi dengan pelunasan sebelum sesi ke-6 dan ke-11, DP kurang dari 50% dihitung proporsional, satu sesi 2 jam, laporan sesi maksimal H+1, sesi valid bila dilaksanakan dan laporan terisi, murid pasif setelah 7 hari tanpa respons jadwal, mentor dapat diganti dengan persetujuan student, refund tidak tersedia secara umum.

## C. Asumsi saya (perlu dikonfirmasi Mas Radev)

| # | Asumsi | Alasan | Cara mengubah bila salah |
|---|---|---|---|
| C1 | Konfigurasi memakai maker-checker: PMO atau Finance mengusulkan, peran lainnya menyetujui. Pengusul tidak boleh menyetujui sendiri. | Finance membayar honor dan memverifikasi pembayaran sehingga tidak seharusnya menetapkan sendiri tarif atau harga. Perubahan jarang, biaya persetujuan kecil. Risiko: macet bila salah satu berhalangan. | `Config::decide`. Opsi: akun Owner sebagai pemutus. |
| C2 | Tier disembunyikan dari Admin juga (bukan hanya nominalnya). | Nama tier membocorkan tingkat bayaran. | Bila Admin butuh penanda keahlian, buat atribut terpisah yang bukan tier. |
| C3 | PMO melihat rekening tersamar (4 digit terakhir). Hanya Finance melihat penuh, dan pembukaannya tercatat. | Prinsip akses minimum. | `MentorSvc::listFinance`. |
| C4 | Enrollment menjadi Active bila pembayaran terverifikasi mencapai syarat awal: lunas (paket < 10 sesi) atau DP minimal 50% (10 dan 20 sesi). Di bawah itu tetap Waiting Payment. | Mengikuti PRD. Book menyebut perhitungan proporsional untuk DP kurang dari 50%, tetapi belum menjelaskan apakah enrollment sudah Active. | `Payment::plan` (`activation_ok`). Kasus DP kurang dari 50% perlu alur override. |
| C5 | Paket fleksibel (< 5 sesi) dibatasi 1 sampai 4 sesi. | Definisi "kurang dari 5". | `EnrollSvc::create`. |
| C6 | Tarif tier untuk sesi yang terjadi sebelum tier atau tarif pertama berlaku memakai nilai pertama yang disetujui. Bila belum ada sama sekali, honor tertahan dan alert muncul. | Mentor baru tidak boleh kehilangan honor sesi pertamanya hanya karena tier terlambat ditetapkan. | `HonorSvc::resolve` (parameter `fallbackFirst`). |
| C7 | Tolak pengajuan honor membebaskan sesi sehingga bisa diajukan lagi setelah diperbaiki. | Penolakan biasanya karena laporan kurang jelas. | `HonorSvc::reject`. |
| C8 | Laporan sesi hanya oleh mentor pengajar. PRD menyebut pengecualian PMO untuk laporan sebelum sesi dimulai; tidak diterapkan. | PMO bersifat baca saja. | `SessionSvc::report`. |
| C9 | Status honor di MVP: Eligible (dihitung), Requested, Paid, Rejected. Tidak ada status Approved atau Under Review terpisah. | Finance langsung membayar atau menolak. | Tambah status bila Finance butuh dua langkah. |
| C10 | Reschedule oleh mentor membuat sesi baru yang menunggu konfirmasi Admin. | Admin bertanggung jawab atas slot Zoom (Book bab 7). | `SessionSvc::reschedule`. |

## D. Belum diputuskan

Lihat `docs/05-status-dan-backlog.md` bagian "Pertanyaan terbuka".

## Pembaruan 5 Nov 2026: reschedule, mentor tamu, ruang mentor

| # | Keputusan (Mas Radev) | Penerapan |
|---|---|---|
| K7 | No-show tidak diperlukan. Jadwal ditentukan student dan mentor; bila salah satu tidak bisa hadir, sesi di-reschedule atas kesepakatan. | Tidak ada status baru. K6 (no-show diabaikan) digantikan keputusan ini. |
| K8 | Satu sesi boleh diajar mentor lain sesuai kebutuhan, tanpa mengganti mentor utama. | Kolom `sessions.is_guest`, `guest_code`, `guest_note`. Hanya Admin yang menunjuk mentor pengajar, alasan resmi wajib. Honor mengikuti mentor pengajar sesi (asumsi, belum dikonfirmasi eksplisit). |
| K9 | Mengganti mentor utama wajib beralasan jelas (tidak menyanggupi materi, tidak sesuai kebutuhan, dan sejenisnya). | `EnrollSvc::CHANGE_CODES`, kolom `enrollment_mentors.reason_code`. |
| K10 | Pencatatan enrollment dan per sesi memuat mentor penanggung jawab dan waktu pelaksanaan. Halaman mentor berisi laporan sesi, progres belajar, waktu, dan student. | `/my` (Ruang mentor) dan `/mentors/{id}/aktivitas` (Admin, PMO, Finance; tanpa data honor). |

## Pembaruan 6 Nov 2026: demo, sandbox, dan laporan CRM

| # | Keputusan (Mas Radev) | Penerapan |
|---|---|---|
| K11 | Follow-up termasuk Waiting Decision: menunggu student memutuskan jadi mengambil Private atau tidak. Tidak ada status baru. | Pemetaan status di `docs/09-demo-dan-skenario-qa.md`. |
| K12 | Aturan harga dan DP mengikuti Operational Book. PMO, Finance, atau Owner dapat menyesuaikan lewat sistem. | Sudah lewat persetujuan dua pihak PMO dan Finance. Peran Owner belum ada (backlog P2). Spreadsheet kerja tim memuat harga yang berbeda dari Book (mis. 10 sesi di Rp3.000.000 dan Rp3.500.000); tidak diadopsi tanpa keputusan. |
| K13 | Demo cukup lokal. Semua data saat ini belum data riil (sandbox pengujian). | Database demo terpisah (`data/demo.db`), banner, WhatsApp dimatikan, reset hanya untuk database bertanda demo. |
| K14 | Skenario dibuat seperti test case QA. | `DemoScenarios` dan Fase 3 tes otomatis. |
| K15 | Laporan CRM dipisah dari kondisi pipeline. Win rate = Won/(Won+Lost) untuk keputusan pada periode, dengan jumlah sampel (ditandai bila kurang dari 5). Time to Won untuk lead Won pada periode. First Contact Time dalam jam untuk lead masuk pada periode yang sudah dihubungi, disertai cakupan. | `LeadSvc::analytics` dan `LeadSvc::pipeline`. Usulan Claude yang dikonfirmasi dengan menjawab pertanyaan; median ditambahkan. |

## Pembaruan 9 Nov 2026: dua set ketentuan paket dan peran laporan sesi

| # | Keputusan (Mas Radev) | Penerapan |
|---|---|---|
| K16 | Lampiran memuat ketentuan Private terbaru. Aturan lama masih berlaku dan ketentuan terbaru belum dilaksanakan. Keduanya disimpan. | `PackageRules` (dua set), halaman Ketentuan paket, `docs/11-ketentuan-paket.md`. Seed memuat aturan lama; ketentuan terbaru diberlakukan lewat usulan dua pihak. Mengoreksi K1 yang semula memuat harga Book. Pertanyaan terbuka: harga paket 5 sesi Rp1.750.000 atau Rp1.850.000 (lampiran), dan konfirmasi bahwa aturan lama = keputusan 24 Sep 2026. |
| K17 | Laporan sesi dibuat dan disubmit oleh mentor untuk pengajuan honor. Admin hanya melihat laporannya (baca saja), tidak mengisi, mengubah, atau menilai selesai. | Hanya mentor pemilik sesi yang bisa mengirim laporan (sudah ditegakkan di router dan service). Halaman sesi Admin menampilkan kartu Laporan sesi baca saja (isi laporan, atau "Belum ada laporan"); Jadwal punya filter "Sudah lewat, belum ada laporan". |

## Pembaruan 9 Nov 2026 (lanjutan): laporan sesi baca saja dan penerapan rekomendasi dokumen 10

| Kode | Keputusan | Penerapan |
|---|---|---|
| K18 | Laporan sesi dibuat dan disubmit mentor untuk mengajukan honor; Admin hanya melihat laporannya (menggantikan kotak pengecekan di K17). Semua rekomendasi `docs/10-perbandingan-dan-rekomendasi.md` diterapkan atas permintaan Mas Radev. Pilihan bawaan yang perlu dikonfirmasi: peran Marketing (CRM saja, tanpa konversi), padanan istilah spreadsheet tim (perkiraan), cetak dokumen tanpa kop alamat (alamat dan kontak belum ada di sumber), bayar honor massal tetap per pengajuan dengan satu referensi batch, penerimaan lead otomatis mati sampai PMO mengaktifkan, peran Owner belum dibuat. | Lihat `docs/12-peningkatan.md`. |


## Pembaruan 10 Nov 2026: upgrade dari sistem lama dikerjakan sebagai versi demo

Mas Radev: pekerjaan upgrade dari sistem lama (`docs/13`) tidak menyentuh data riil dan data yang sudah ada; dibangun dan diuji di mode demo dengan data fiktif. Impor data lama hanya aktif di mode demo sampai ada perintah membukanya untuk data riil.

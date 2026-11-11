# Perbandingan New-PrivateSystem dan private-devata, serta rekomendasi perbaikan

Dibuat 9 Nov 2026. Dasar: kode dan dokumen kedua repo (`devata-studio/New-PrivateSyatem` di commit `ff749ee`, `devata-studio/private-devata` di commit `7f84ebb`), Operational Book Private Devata (Drive, tertulis "Versi 1.0"), PRD Private Module v1.0, tab `PRIVATE` pada spreadsheet kerja tim, dan keputusan Mas Radev di `docs/01-keputusan.md`. Fakta, interpretasi, dan rekomendasi dipisahkan. Tidak ada data pribadi dari spreadsheet yang disalin ke dokumen ini.

## 1. Ringkasan

1. **Dua aplikasi ini mengoptimalkan hal yang berbeda.** `private-devata` (lama) mengejar *kelengkapan operasional*: dari lead sampai sertifikat, lengkap dengan cetak invoice, kwitansi, slip honor, impor spreadsheet, dan pencarian cepat. `New-PrivateSystem` (baru) mengejar *kendali dan integritas*: persetujuan dua pihak untuk harga dan tarif, honor berbasis tier, data uang yang terkunci, Admin yang tidak bisa melihat honor, CRM yang bisa diukur, dan mode demo.
2. **Untuk kebutuhan yang Mas Radev sebutkan sendiri, sistem baru lebih tepat.** Tarif honor per tier, honor yang dikunci per tanggal sesi, persetujuan dua pihak, mentor tamu per sesi, alasan resmi ganti mentor, dan stack PHP yang searah dengan integrasi Portal tidak ada di sistem lama.
3. **Sistem baru belum menyamai kegunaan harian sistem lama.** Yang paling terasa: tidak ada cetak dokumen (invoice, kwitansi, slip, sertifikat), pencarian cepat, halaman pengaturan, ganti kata sandi, cadangan lewat layar, impor Excel, dan pengaman nominal pembayaran. Ini inti rekomendasi.
4. **Temuan paling mendesak bukan soal fitur, tetapi harga dan aturan DP.** Tiga sumber saling bertentangan (bagian 6). Sistem baru saat ini mengikuti Book yang tertulis v1.0, sedangkan praktik tim dan keputusan 24 Sep 2026 di repo lama berbeda. Perlu keputusan sebelum pilot.
5. **Rekomendasi arsitektur:** jadikan sistem baru sebagai satu-satunya basis, pindahkan kekuatan sistem lama yang terbukti berguna (bagian 7), dan pensiunkan repo lama setelah itu. Jangan menggabungkan dua kode.

## 2. Fakta dasar

| | private-devata (lama) | New-PrivateSystem (baru) |
|---|---|---|
| Stack | Node 22, Express, SQLite, Preact di browser (SPA) | PHP 8.1+, SQLite, tampilan di server, tanpa build |
| Ukuran | sekitar 3.700 baris JS | sekitar 5.000 baris PHP |
| Rujukan aturan | "Operational Book v2" dan "Database V1.1" | Operational Book (Drive) tertulis "Versi 1.0" |
| Status pemakaian | belum dipakai (trial), sempat dipakai sebagai alat uji | belum dipakai, belum pilot (Tahap 0 belum dilakukan) |
| Tes otomatis | sekitar 100 | 95, termasuk 49 skenario QA data demo |
| Peluncur | `START.bat`, `START-LAN.bat` | `MULAI.bat`, `MULAI-DEMO.bat`, `mulai.sh`, `mulai-demo.sh`, Codespaces |
| Integrasi Portal | tidak searah (Node vs PHP Portal) | searah (PHP, skema runtime, alur sama dengan Portal) |

## 3. Produk dan prioritas

| Aspek | Lama | Baru |
|---|---|---|
| Tujuan utama | Menggantikan spreadsheet dengan aplikasi lengkap | Alur yang dapat dikendalikan, diaudit, dan diukur |
| Prioritas tersirat | Kelengkapan: closing, sertifikat, cetak, impor | Integritas uang, pemisahan tugas, CRM yang berguna, kesiapan demo |
| Siapa yang diuntungkan | PMO dan Admin (alat kerja serba ada) | Finance dan PMO (kontrol), Admin (CRM), Mentor (ruang kerja) |
| Risiko utama | Kontrol longgar (lihat bagian 5) | Belum cukup nyaman untuk kerja harian |
| Cara menangani aturan berubah | PMO mengubah harga dan honor langsung | Usulan dua pihak (PMO dan Finance) dengan tanggal efektif |

## 4. Perbandingan fitur

Keterangan: **Ada**, **Sebagian**, **Tidak ada**.

| Area | Lama | Baru | Catatan |
|---|---|---|---|
| Papan lead dan tahap | Ada | Ada | Baru menambah riwayat tahap yang tidak bisa diubah |
| Catat komunikasi lead | Ada | Ada | Baru: antrean follow-up (terlewat, hari ini, mengendap) |
| Deteksi duplikat lead | Tidak ada | Ada | Berdasarkan nomor dan email yang dinormalisasi |
| Impor lead | Impor Excel dari spreadsheet lama | CSV dengan pratinjau | Baru belum membaca Excel |
| Laporan CRM | Ada (dasar) | Ada | Baru: win rate, waktu respons, corong, sumber, dipisah dari pipeline |
| Konversi lead jadi student plus enrollment | Satu langkah | Satu langkah (opsi "sekalian buat enrollment") | Setara |
| Pemakaian ulang student lama (alumni) | Ada (pilih student lama) | Otomatis lewat nomor sama | Baru lebih sedikit klik |
| Paket dan harga | Diedit PMO langsung | Usulan dua pihak, tanggal efektif | Baru lebih aman, lebih lambat |
| Snapshot harga di enrollment | Ada | Ada | Setara |
| Pembayaran: input, verifikasi, tolak | Ada | Ada | Setara; baru memisahkan tugas lebih tegas |
| Pembayaran Verified bisa diubah | Bisa oleh PMO (ubah dan hapus) | Tidak bisa (dikunci database) | Baru lebih ketat |
| Pengaman nominal melebihi tagihan | Ada (peringatan, bisa dipaksa) | **Tidak ada** | Celah di sistem baru |
| Pembayaran sebagian dan batas pelunasan | Ada | Ada | Setara |
| Jadwal, bentrok Zoom, mentor, student | Ada, bisa dipaksa dengan log | Ada, ditolak tegas | Beda filosofi (bagian 5) |
| Peringatan jadwal lewat masa aktif | Ada | **Tidak ada** | Celah di sistem baru |
| Kalender pekan dan ekspor .ics | Pekan | Pekan dan .ics | Baru lebih lengkap |
| Reschedule, batal | Ada | Ada | Setara |
| Status NO_SHOW dan REQUESTED | Ada (di luar Book) | Tidak ada (sesuai Book dan keputusan K7) | Baru sesuai Book |
| Mentor tamu per sesi | Tidak ada | Ada | Kebutuhan baru dari Mas Radev |
| Riwayat dan alasan ganti mentor utama | Hanya log aktivitas, alasan opsional | Tabel riwayat dan alasan resmi wajib | Baru lebih tepat |
| Laporan sesi mentor, H+1 | Ada | Ada | Setara |
| Laporan akhir enrollment | Ada | Ada | Setara |
| Honor mentor | Datar per mentor, otomatis per sesi Completed | Per tier, tanggal efektif, mentor mengajukan, Finance memutuskan | Baru sesuai keputusan Mas Radev |
| Pembayaran honor massal dan referensi batch | Ada | Per pengajuan | Lama lebih praktis untuk Finance |
| Rekening mentor | Teks biasa di database | Terenkripsi, tersamar untuk PMO | Baru lebih aman |
| Admin tidak melihat honor dan rekening | Sebagian (field dibuang di sebagian endpoint) | Ditegakkan dan diuji dengan data kanari | Baru lebih kuat |
| Closing review, rating, nomor sertifikat | Ada | Minimal | Baru belum ada |
| Perpanjang masa aktif | Ada (PMO) | Tidak ada | Menunggu keputusan aturan |
| Cetak: invoice, kwitansi, slip honor, sertifikat, laporan progres | Ada | **Tidak ada** | Celah terbesar untuk kerja harian |
| Pencarian cepat (Ctrl+K) | Ada | **Tidak ada** | Celah |
| Laporan keuangan (pemasukan, honor, piutang) | Ada | Sebagian (piutang, rekap honor CSV) | Celah |
| Halaman pengaturan sistem | Ada | Tidak ada (tabel `settings`) | Celah |
| Ganti dan reset kata sandi | Ada (wajib ganti saat awal) | Tidak ada | Celah |
| Cadangan | Otomatis harian, 30 hari, tombol di layar | Skrip `bin/backup.php` manual | Celah |
| Ekspor Excel | Ada | CSV | Celah kecil |
| Template WhatsApp | Bisa diedit | 8 templat tetap di kode | Celah kecil |
| Mode demo dan data uji | Tanda `is_demo` di database yang sama | Database terpisah, banner, reset aman, 49 skenario QA | Baru jauh lebih aman |
| Panduan dan tur | Halaman panduan | Sambutan, tur bertahap, panduan per peran, petunjuk "?" | Baru lebih lengkap |
| Ruang kerja mentor | Daftar student dan sesi | Student, progres, laporan, waktu mengajar | Baru lebih lengkap |
| Audit | Log aktivitas | Log yang tidak bisa diubah dan dilihat per halaman | Baru lebih kuat; belum ada riwayat per rekaman |

## 5. Alur pengguna dan alur sistem

### Alur pengguna (Admin, harian)

| Langkah | Lama | Baru |
|---|---|---|
| Mulai hari | Dashboard dengan daftar peringatan | Beranda dengan 20 sampai 30 kartu peringatan tanpa pengelompokan prioritas yang kuat |
| Lead masuk | Lead baru, follow-up otomatis besok | Sama, ditambah peringatan duplikat |
| Follow-up | "+ Catat" di lead | Catat komunikasi dengan kanal, hasil, tanggal berikutnya; antrean terpisah |
| Won | Satu dialog: student, paket, mentor | Satu halaman dengan opsi sekalian enrollment |
| Pembayaran | Input, Finance verifikasi, aktif otomatis | Sama, tanpa pengaman nominal |
| Jadwal | Ajukan atau jadwalkan, peringatan bisa dipaksa | Ditolak bila bentrok; tidak ada peringatan masa aktif |
| Penutupan | Closing, rating, sertifikat | Laporan akhir, status Completed |

### Alur sistem

| Aspek | Lama | Baru |
|---|---|---|
| Identitas rekaman | ID mudah dibaca: LEAD-001, ENR-001, PAY-001 | Nomor urut biasa (#12) |
| Status | 7 lead, 7 enrollment, 6 sesi (termasuk NO_SHOW dan REQUESTED), pembayaran tidak sama dengan Book | Sesuai Book: 7, 7, 4, 4; mentor mengajukan lewat penanda |
| Pengaman | Peringatan yang bisa dipaksa untuk Admin, dicatat di log | Tolak tegas untuk bentrok dan data uang; peringatan untuk risiko pembayaran |
| Data uang | Pembayaran Verified bisa diubah dan dihapus PMO; payroll bisa dibatalkan PMO | Trigger database menolak ubah dan hapus; koreksi berupa baris baru |
| Penghapusan | PMO bisa menghapus lead, student, enrollment, sesi | Tidak ada jalur hapus untuk tabel uang dan audit |
| Honor | Satu angka per mentor, berlaku untuk semua sesi | Tarif tier bertanggal efektif, disimpan di sesi saat Completed |
| Keamanan sesi login | Cookie HttpOnly, SameSite Strict | Token CSRF pada semua POST, pembatasan percobaan login, CSP ketat |
| Struktur kode | Satu berkas API 892 baris | Service per domain, tampilan, tes per fase |

**Interpretasi:** filosofi pengaman berbeda. Sistem lama memperlakukan hampir semua aturan sebagai peringatan yang bisa dilewati dengan jejak. Itu nyaman, tetapi untuk uang dan data yang sudah final cenderung rawan salah. Sistem baru menolak tegas. Itu aman, tetapi untuk aturan non-uang (masa aktif, kuota) terasa kaku dan memperlambat Admin. Rekomendasi 3 di bawah memadukan keduanya.

## 6. Kebutuhan aktual stakeholder

### Sumber bukti kebutuhan

1. **Keputusan Mas Radev** dalam sesi ini: harga tidak selalu tetap dan bisa diubah PMO atau Finance; tarif honor berbeda per tier; Admin tidak boleh mengetahui honor dan rekening; honor otomatis dari laporan sesi lalu mentor mengajukan; mentor bisa mengajar sebagian sesi; jadwal ditentukan student dan mentor lalu Admin mencatat; sistem berdiri sendiri dulu sebelum masuk Portal.
2. **Spreadsheet kerja tim (tab `PRIVATE`)**, yang menunjukkan cara kerja sebenarnya hari ini.
3. **Operational Book** sebagai sumber aturan.

### Yang terlihat dari spreadsheet kerja tim

| Pengamatan | Artinya untuk sistem |
|---|---|
| Satu baris memuat lead, student, enrollment, pembayaran, dan progres kelas | Tim berpikir "satu orang, satu baris". Sistem baru memecah tiga entitas dan harus tetap terasa sederhana |
| Ada dua kosakata status (NEW LEADS, SUDAH TANYA-TANYA, CLOSING dan di samping Inquiry, Follow up, Deal, Drop) | Perlu satu kosakata dan tabel padanan untuk pelatihan |
| Nomor telepon dalam banyak format, ada yang tanpa angka 0 di depan atau terpotong | Normalisasi nomor sangat dibutuhkan (sudah ada di sistem baru) |
| Kelas berstatus FINISHED dengan sisa sesi, kolom Indikator selalu "Sesi Habis", log sesi kosong | Perhitungan manual tidak dipercaya; sesi tidak tercatat. Sistem menghitung otomatis dan memaksa pencatatan |
| Harga paket 10 sesi muncul dengan dua angka berbeda | Harga harus dikunci per enrollment dan diubah lewat jalur resmi (sudah ada) |
| Nama mentor hanya nama depan, ada gabungan dua nama pada satu baris | Perlu data mentor yang rapi dan mentor tamu per sesi (sudah ada di baru) |
| Tab lain pada berkas yang sama dipakai untuk lead produk berbeda (Project Hub) dan status dari iklan (Initiate Checkout) | Tim marketing bekerja lintas produk. Sistem Private-saja akan terasa terpisah dari kerja harian mereka |

### Pemetaan kebutuhan ke kedua sistem

| Kebutuhan | Lama | Baru |
|---|---|---|
| Tarif honor per tier, ubah lewat persetujuan | Tidak | Ya |
| Admin tidak melihat honor dan rekening | Sebagian | Ya, diuji |
| Mentor mengajukan honor, Finance memutuskan | Tidak (payroll otomatis) | Ya |
| Mentor tamu per sesi | Tidak | Ya |
| Jadwal bebas bentrok pada satu akun Zoom | Ya (dengan paksa) | Ya (tegas) |
| Aturan berubah tanpa mengubah enrollment lama | Ya | Ya |
| Cetak dokumen untuk student (invoice, kwitansi, sertifikat) | Ya | Tidak |
| Kerja harian Admin cepat (cari, ulang kontak, satu klik) | Sebagian | Sebagian |
| Tim non-teknis bisa memakai tanpa pelatihan | Panduan halaman | Tur, panduan, mode demo; label masih campur Inggris |
| Aman dicoba tanpa merusak data | Tanda demo di database yang sama | Database terpisah |
| Siap diintegrasikan ke Portal | Tidak searah | Searah |

### Temuan kritis: harga dan aturan DP bertentangan antar sumber

| Sumber | Sesi < 5 | 5 sesi | 10 sesi | 20 sesi | DP |
|---|---|---|---|---|---|
| Operational Book (Drive, tertulis Versi 1.0) | Rp370.000/sesi | Rp1.750.000 | Rp3.000.000 | **Rp5.400.000** | 5 sesi lunas di awal; 10 dan 20 sesi DP 50% |
| Keputusan Mas Radev 24 Sep 2026 (skrip dan CLAUDE.md di repo lama, disebut sama dengan situs Academy dan KB Deva) | **Rp350.000/sesi** | Rp1.750.000 | Rp3.000.000 | **Rp5.000.000** | **5 sesi juga DP 50%, lunas sebelum sesi ke-3**; 10 dan 20 sesi seperti Book |
| Praktik pada spreadsheet kerja tim | Rp350.000 | Rp1.750.000, dengan DP Rp875.000 (50%) | Rp3.000.000 dan Rp3.500.000 | Rp5.000.000 | Mengikuti keputusan 24 Sep |
| Sistem baru saat ini (dari Book) | 370.000 | 1.750.000 lunas di awal | 3.000.000 | 5.400.000 | Mengikuti Book |

**Fakta:** repo lama menulis "Operational Book v2" sedangkan dokumen Drive yang saya baca tertulis "Versi 1.0". Saya tidak bisa menentukan dokumen mana yang lebih baru. **Interpretasi:** bukti praktik (DP 50% untuk paket 5 sesi, harga 350 ribu dan 5 juta) mendukung keputusan 24 Sep, jadi sistem baru kemungkinan memakai aturan yang sudah usang. Saya sebelumnya menyebut selisih harga ini sebagai kemungkinan data kotor. Itu keliru: ada keputusan resmi di baliknya. **Perlu keputusan:** angka mana yang berlaku, lalu perbarui Book, konfigurasi, demo, dan panduan secara serentak. Karena harga dikonfigurasi lewat usulan dua pihak, perubahannya tidak perlu mengubah kode, tetapi aturan DP paket 5 sesi, data demo, dan teks panduan memerlukan penyesuaian.

## 7. Rekomendasi

Prinsip: bawa kekuatan sistem lama yang terbukti berguna ke sistem baru, jangan membawa kontrol yang longgar.

### Tujuan 1. Mudah digunakan oleh tim non-teknis

| # | Rekomendasi | Alasan (bukti) | Usaha |
|---|---|---|---|
| U1 | **Pakai bahasa tim.** Tampilkan label status dalam bahasa Indonesia ("Menunggu Keputusan", "Mencari Mentor") dengan istilah resmi Book di petunjuk "?". Sediakan tabel padanan dengan istilah di spreadsheet (SUDAH TANYA-TANYA, CLOSING) | Label saat ini campur Inggris; spreadsheet tim memakai bahasa lain | S |
| U2 | **Beranda "Hari ini".** Tiga bagian: Kerjakan sekarang (maksimal 5), Pantau, dan Angka. Kelompokkan peringatan sejenis ("4 follow-up terlewat" satu kartu yang bisa dibuka) | Beranda Admin demo memuat sekitar 20 kartu tanpa pengelompokan | M |
| U3 | **Pencarian cepat** (Ctrl+K dan kotak di atas) untuk nama, nomor, ID. Hasil menuju halaman student yang memuat lead, enrollment, pembayaran, sesi | Sistem lama punya; PRD menargetkan pertanyaan status ke Admin turun 50% | M |
| U4 | **Wizard "Daftarkan student"** dengan indikator langkah: lead, student, paket dan mentor, bukti bayar. Tidak ada kebingungan di antara tiga halaman | Spreadsheet menganggap satu baris; sistem memecah tiga entitas | M |
| U5 | **Catat cepat komunikasi:** tombol hasil siap pakai (Dibalas, Belum dibalas, Minta jadwal ulang, Tidak jadi) dan tanggal follow-up bawaan | Mengurangi pengetikan; Admin sering mengulang kontak | S |
| U6 | **Templat WhatsApp bisa diedit PMO** plus tombol "Salin pesan" selain buka WhatsApp | Sistem lama punya; di mode demo tautan WhatsApp mati sehingga pesan tak bisa dilihat | S |
| U7 | **Peran Marketing** (CRM saja: lead, follow-up, laporan) sebagai peran terpisah dari Admin | Tim marketing hanya butuh CRM; menu 9 item membingungkan; prinsip akses minimum | M (butuh keputusan) |
| U8 | **Kosongkan layar kosong dengan petunjuk langkah berikut** ("Belum ada lead. Klik Lead baru atau Impor CSV") | Pengguna baru tidak tahu harus mulai dari mana | S |
| U9 | **Cetak dokumen:** invoice, kwitansi, slip honor, laporan progres, sertifikat, dengan templat kop Devata | Sistem lama punya; Admin dan Finance memakainya setiap hari | L |
| U10 | **Halaman pengaturan** (Zoom, ambang peringatan, templat, nama organisasi) dan **ganti kata sandi sendiri** | Saat ini hanya lewat tabel database | M |

### Tujuan 2. Mencegah human error

| # | Rekomendasi | Alasan (bukti) | Usaha |
|---|---|---|---|
| H1 | **Putuskan harga dan DP, lalu satukan** Book, konfigurasi, demo, dan panduan | Tiga sumber bertentangan (bagian 6) | S setelah keputusan |
| H2 | **Pengaman nominal pembayaran:** peringatan bila melebihi sisa tagihan, ditolak bila bukan kelipatan masuk akal, hitung otomatis tipe DP atau pelunasan | Sistem lama punya; sistem baru tidak | S |
| H3 | **Dialog konfirmasi yang menjelaskan akibat** untuk tindakan tidak bisa dibatalkan: verifikasi pembayaran, bayar honor, konversi, batalkan sesi, tandai Expired. Contoh: "Verifikasi Rp1.750.000 untuk Rafi, enrollment #12. Setelah ini tidak bisa diubah." | Tidak ada konfirmasi sama sekali di sistem baru | S |
| H4 | **Peringatan lunak yang bisa dilewati dengan alasan dan tercatat** untuk aturan non-uang: sesi di luar masa aktif, kuota hampir habis, risiko pembayaran. Tetap **tegas** untuk bentrok Zoom, data uang, dan data terkunci | Memadukan kenyamanan sistem lama dan keamanan sistem baru | M |
| H5 | **Satu student, satu enrollment aktif per paket:** peringatan bila Admin membuat enrollment ganda | Pencegahan salah ketik yang umum | S |
| H6 | **Layar verifikasi Finance** menampilkan nominal, bukti, sisa tagihan, dan riwayat pembayaran dalam satu layar, dengan daftar periksa singkat | Mengurangi salah verifikasi | S |
| H7 | **Riwayat per rekaman** (tab Riwayat di lead, student, enrollment, sesi) bersumber dari audit log | Pertanyaan "siapa mengubah ini" tidak perlu membuka halaman audit global | M |
| H8 | **Cadangan otomatis harian** dengan tombol unduh dan pengujian pemulihan | Sistem lama punya; skrip manual mudah terlupa | S |
| H9 | **Impor aktif dari spreadsheet kerja** dengan pratinjau dan laporan baris bermasalah (nomor, harga, status tidak dikenal, mentor ganda) | Spreadsheet memuat data tidak konsisten; ketik ulang menambah salah | L |
| H10 | **Pemeriksaan data otomatis** (misalnya "enrollment Completed dengan sisa sesi", "pembayaran Verified tanpa enrollment Active") di halaman Kasus | Spreadsheet memuat kondisi seperti ini tanpa disadari | M |
| H11 | **Ganti kata sandi dan batas waktu sesi login;** kata sandi awal acak yang wajib diganti | Sistem lama punya | S |

### Tujuan 3. Efisien dalam penggunaan

| # | Rekomendasi | Alasan (bukti) | Usaha |
|---|---|---|---|
| E1 | **Aksi massal:** Finance verifikasi beberapa pembayaran sekaligus; bayar honor satu per mentor per periode dengan referensi batch; Admin menunda follow-up banyak lead | Sistem lama punya payroll massal | M |
| E2 | **Rekap honor bulanan per mentor** (jumlah sesi, total, info transfer yang disalin) hanya untuk Finance | Sistem lama menyederhanakan penutupan bulan | M |
| E3 | **Tampilan tersimpan** (Lead saya, Perlu follow-up minggu ini, Enrollment berisiko) dengan urutan bawaan yang masuk akal | Mengurangi penyaringan berulang | S |
| E4 | **Student 360:** satu halaman memuat semua riwayat dan aksi cepat (jadwalkan, catat bayar, kirim pesan) | Mengurangi perpindahan halaman | M |
| E5 | **Ekspor Excel** untuk Finance dan PMO selain CSV | Kebiasaan tim memakai spreadsheet | S |
| E6 | **Pengingat siap kirim:** daftar student yang mendekati batas pelunasan dan masa aktif, dengan pesan terisi dan tombol salin. Tidak mengirim otomatis | Book membebankan pengingat pelunasan kepada Admin | M |
| E7 | **Penerimaan lead otomatis** dari iklan dan chat (Meta, Cekat) ke CRM | Tim marketing bekerja lintas produk dan dari iklan | L (P2) |
| E8 | **Ukur hasil pilot:** waktu ke kontak pertama, persentase laporan H+1, jumlah pertanyaan status ke Admin, bentrok Zoom yang lolos | Metrik di PRD dan backlog | S |

### Urutan yang disarankan

1. **Segera (sebelum pilot):** H1 (keputusan harga), H2, H3, H8, H11, U1, U8. Semua kecil, mengurangi risiko terbesar.
2. **Minggu pertama pilot:** U2, U3, U5, U6, U10, H4, H5, H6, E3.
3. **Setelah pilot berjalan:** U9 (cetak), U4, U7 (bila disetujui), H7, H10, E1, E2, E4, E5, E6.
4. **Kemudian:** H9 (impor aktif), E7 (integrasi iklan), integrasi Portal.

## 8. Yang tidak direkomendasikan

- **Menggabungkan kode** kedua aplikasi. Stack berbeda, model data berbeda (pengaman, tier, mentor tamu), dan biayanya lebih besar daripada memindahkan fitur satu per satu.
- **Menambah status NO_SHOW dan REQUESTED.** Keputusan K7 dan Book tidak membutuhkannya.
- **Mengembalikan jalur hapus atau ubah untuk pembayaran Verified.** Kontrol ini justru kekuatan sistem baru.
- **Membangun portal student sekarang.** Biaya tinggi dan kebutuhan belum terbukti (PRD temuan 8).

## 9. Pertanyaan terbuka (rekomendasi di atas sudah diterapkan, lihat docs/12-peningkatan.md) yang memengaruhi rekomendasi

1. Angka harga dan aturan DP mana yang berlaku (bagian 6)? Dokumen Book mana yang terbaru: "v1.0" di Drive atau "v2" yang dirujuk repo lama?
2. Siapa "tim marketing" dalam peran sistem: Admin yang sama, atau perlu peran Marketing dengan akses CRM saja?
3. Apakah cetak invoice, kwitansi, slip honor, dan sertifikat harus ada sebelum pilot atau setelahnya?
4. Apakah Finance menghendaki bayar honor massal per mentor per bulan, atau tetap per pengajuan?
5. Apakah tim ingin menerima lead dari iklan dan chat ke CRM ini, atau CRM Private tetap terpisah?
6. Apakah peran Owner yang Mas Radev sebutkan perlu dibuat sekarang untuk persetujuan konfigurasi?

# 01. Keputusan, Konflik Sumber, dan Pertanyaan Terbuka

## A. Keputusan terkonfirmasi

| ID | Keputusan | Dikonfirmasi | Dampak |
|---|---|---|---|
| D-01 | Rilis pertama memiliki **portal student penuh**: kurikulum, acknowledgement, jadwal, pembayaran termasuk unggah bukti, progres, dan komunikasi mentor-student. | Anda, sesi ini | Mengubah non-goal MVP Rev. 2. Menambah akun student, penyimpanan berkas, dan chat. Lihat CF-01, OQ-08, OQ-09. |
| D-02 | **Aturan lama berlaku**; ketentuan terbaru/Operational Book disimpan dan diberlakukan lewat usulan bertanggal efektif. | Anda, sesi ini | Nilai awal konfigurasi memakai aturan lama (BR-PKG-01). |
| D-03 | Harga paket 5 sesi **Rp1.750.000**. | Anda, sesi ini | Menyelesaikan selisih Rp1.850.000 di lampiran. |
| D-04 | **Management/Owner menyetujui**; PMO dan Finance **mengusulkan** perubahan harga, tarif honor, dan rekening tujuan bayar. | Anda, sesi ini | Menggantikan maker-checker PMO-Finance (C1) dan peran edit langsung Management (PRD v1.0). |
| D-05 | Honor mentor **per tier mentor**. | Anda, sesi ini | Perlu tabel tier, tarif per tier bertanggal efektif, tier mentor beririwayat. Nilai tier: OQ-01. |
| D-06 | Dibangun **mandiri dahulu mengikuti stack Devata Portal**, lalu diintegrasikan. | Anda, sesi ini | Stack Portal harus diaudit dahulu (OQ-18). Logika inti dipisah sebagai fungsi murni. |

Keputusan lain dari repo (K-xx) yang tidak bertentangan dengan D-xx tetap berlaku [SUMBER]: K3 pembayaran manual, K4 tanpa gateway, K9 harga sesi sudah termasuk honor, K10 Admin tidak melihat honor dan rekening, K12 pembayaran dicatat Admin lalu diverifikasi Finance, K16 dua set ketentuan paket, K17/K18 laporan sesi hanya diisi mentor dan dibaca Admin.

## B. Konflik antar sumber (perlu disadari, sebagian sudah diselesaikan)

| ID | Konflik | Sumber A | Sumber B | Status |
|---|---|---|---|---|
| CF-01 | Akses student | PRD v1.0: portal student (ST-01 s.d. ST-07) | Repo K3/Rev. 2: tanpa akun student, persetujuan dicatat Admin | **Selesai: D-01.** Dokumen repo perlu diselaraskan. |
| CF-02 | Wewenang konfigurasi | PRD v1.0: Management mengubah | Repo C1: PMO dan Finance saling menyetujui | **Selesai: D-04.** |
| CF-03 | Harga & DP paket | Aturan lama (350rb, 5jt, 5 sesi DP) | Ketentuan terbaru/Book (370rb, 5,4jt, 5 sesi lunas) | **Selesai: D-02, D-03.** Harga publik Academy/KB perlu disamakan (OQ-19). |
| CF-04 | Dasar honor | PRD v1.0: satu tarif bertanggal efektif | Repo K8: per tier | **Selesai: D-05.** |
| CF-05 | Set status honor | PRD v1.0: Eligible, Submitted, Under Review, Approved, Rejected, Paid | Repo C9: Eligible, Requested, Rejected, Paid | **Terbuka: OQ-21.** Blueprint memakai set PRD karena FI-03 (setujui) dan FI-04 (catat bayar) adalah dua kebutuhan terpisah. [USULAN] |
| CF-06 | Kurikulum sebelum enrollment | PRD: kurikulum bagian enrollment dan student acknowledge di portal | Repo: kurikulum dibuat sebelum bayar, student belum punya akun | **Terbuka: OQ-08.** Kurikulum melekat ke lead sampai enrollment dibuat. [USULAN] |
| CF-07 | Peran Management di PRD vs repo | PRD: baca dashboard + edit konfigurasi | Repo: tidak ada peran Management | **Selesai: D-04** (Management menyetujui dan membaca). |
| CF-08 | Status sesi | PRD: SCHEDULED, COMPLETED, RESCHEDULED, CANCELLED | Spreadsheet lama: NO_SHOW, REQUESTED | PRD dipakai; no-show = Cancelled dengan alasan (OQ-02). Penanda `needs_confirm` untuk jadwal yang diajukan mentor. [SUMBER] |
| CF-09 | Mentor boleh ajukan honor kapan saja | PRD | Repo K11: ada pengaturan minimum/batas | Dibuat pengaturan, nilai awal tanpa batas (OQ-05). |
| CF-10 | Chat | PRD: konteks komunikasi wajib, boleh reuse chat Portal | Repo: WhatsApp saja | D-01 mewajibkan konteks komunikasi di sistem (OQ-09). |

## C. Pertanyaan terbuka

Kolom **Blocking** menunjukkan tahap yang tidak boleh dimulai sebelum dijawab. Tidak ada jawaban yang boleh diisi tim tanpa konfirmasi pemilik.

| ID | Pertanyaan | Pemilik keputusan | Blocking | Perilaku sementara di blueprint |
|---|---|---|---|---|
| OQ-01 | Berapa tier mentor, nominal tarif per tier per sesi 2 jam, kriteria naik/turun, siapa yang menetapkan, apakah online dan offline dibedakan, dan batas margin minimum per sesi? | Owner, Finance | Pilot | Nilai di wireframe hanyalah contoh fiktif. |
| OQ-02 | Konsekuensi no-show student dan mentor terhadap kuota dan honor? | Owner | Penegakan otomatis | Dicatat sebagai Cancelled dengan alasan; tanpa efek kuota/honor otomatis. |
| OQ-03 | Bila pelunasan kurang, sesi berikutnya hanya diberi peringatan atau diblokir? | Owner | Pemblokiran | Peringatan + penanda payment-at-risk. |
| OQ-04 | Bila DP kurang dari 50%, apakah enrollment boleh Active dengan sesi proporsional? | Owner | Aktivasi DP kurang | Tetap Waiting Payment; perhitungan proporsional hanya ditampilkan. |
| OQ-05 | Siklus honor: minimum nominal, tanggal potong, dibayar per pengajuan atau digabung bulanan? | Finance | Tidak | Tanpa batas, per pengajuan. |
| OQ-06 | Kebijakan unggah bukti bayar: jenis berkas, ukuran maksimum, masa simpan, siapa boleh melihat, SLA verifikasi Finance? | Finance, Security | Rilis 1 | Perlu keputusan sebelum fase pembayaran. |
| OQ-07 | Kanal notifikasi ke student (email, WhatsApp, dalam aplikasi) dan kebijakan frekuensi? | PMO, Admin | Rilis 1 | Hanya dalam aplikasi; WhatsApp manual lewat tautan. |
| OQ-08 | Kapan akun student dibuat (saat lead dikonversi, saat draf kurikulum, atau saat pilih paket), oleh siapa, login lewat apa (email, nomor HP), pemulihan sandi? | Owner, Admin | Rilis 1 | [USULAN] akun dibuat Admin saat draf kurikulum perlu acknowledgement. |
| OQ-09 | Chat student-mentor: dibangun baru, memakai chat Portal, atau tautan eksternal? Retensi pesan, moderasi, akses Admin? | Owner, Architect | Rilis 1 | Konteks percakapan per enrollment; implementasi menunggu audit Portal. |
| OQ-10 | Sesi offline: penyesuaian harga dan prosedur? | Owner | Tidak | Hanya online. |
| OQ-11 | Sertifikat dan akses komunitas: manual dengan daftar periksa atau otomatis? | PMO | Tidak | Daftar periksa manual. |
| OQ-12 | Volume student dan sesi per bulan, jumlah pengguna serentak, hosting, pemilik cadangan dan pemeliharaan? | Owner, DevOps | Pilot | Diukur pada tahap 0. |
| OQ-13 | Apakah akun Zoom Private hanya satu (kapasitas 1 sesi pada satu waktu)? | Admin | Tahap jadwal | Kapasitas diset 1 dan dapat diubah. |
| OQ-14 | Alur pengecualian refund (bila Devata tidak dapat memberi layanan): siapa memutuskan dan siapa membayar? | Owner, Finance | Tidak | Di luar sistem; hanya catatan kasus. |
| OQ-15 | Berapa kali reschedule dianggap berulang dan perlu ditinjau? | PMO | Tidak | Ambang 3 kali [USULAN]. |
| OQ-16 | Paket di bawah 5 sesi dibatasi 1 sampai 4 sesi? | Admin | Tidak | 1 sampai 4 [USULAN dari repo C5]. |
| OQ-17 | Aturan perpanjangan masa aktif enrollment? | Owner | Tidak | Tidak ada perpanjangan otomatis; PMO mencatat keputusan. |
| OQ-18 | Hasil audit Devata Portal: stack (disebut PHP/MySQL), autentikasi, chat, modul keuangan, aturan deploy. | Architect | Desain teknis final | Arsitektur ditulis netral stack dengan logika inti terpisah. |
| OQ-19 | Harga publik di Academy dan KB chatbot berbeda dari harga aktif. Siapa menyamakan dan kapan? | Owner | Tidak | Di luar sistem. |
| OQ-20 | Perlu atribut tingkat keahlian mentor untuk matching (terpisah dari tier)? | Admin | Tidak | Tidak ada. |
| OQ-21 | Set status honor mana yang dipakai (CF-05)? | Finance | Fase honor | Set PRD v1.0. |
| OQ-22 | Siapa yang menyetujui bila Owner berhalangan (delegasi)? | Owner | Pilot | Usulan menunggu; tidak ada jalur pintas. |
| OQ-23 | Perlindungan data pribadi: data apa yang dikumpulkan, dasar persetujuan, retensi, hak hapus (UU PDP)? | Owner, Legal | Rilis 1 | Perlu kajian hukum. |
| OQ-24 | Siapa Product Owner, PIC admin, dan penerima pelatihan untuk pilot? | Owner | Pilot | Belum ditetapkan. |

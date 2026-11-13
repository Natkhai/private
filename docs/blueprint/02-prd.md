# 02. PRD Private Module (Blueprint)

## 1. Tujuan produk

Satu sistem operasional Private dari lead sampai selesai: intake, matching mentor, kurikulum, pembayaran, jadwal, laporan sesi, honor mentor, monitoring, dan penutupan; dengan tampilan sesuai peran, termasuk portal student (D-01).

### Masalah
Operasi Private hidup di WhatsApp dan spreadsheet. Jadwal disepakati mentor-student, sehingga PMO dan Finance baru tahu setelah bertanya ke Admin. Status program, pelunasan, laporan, dan honor tidak punya satu sumber data (Book bab 1 dan 13; repo K3).

### Tujuan terukur
| ID | Tujuan | Indikator | Target (hipotesis, dikonfirmasi tahap 0) |
|---|---|---|---|
| G1 | Satu sumber data | Pertanyaan status ke Admin per minggu | turun minimal 50% dari baseline |
| G2 | Tanpa bentrok Zoom | Bentrok yang lolos | 0 |
| G3 | Laporan tepat waktu | Laporan masuk H+1 | minimal 90% |
| G4 | Honor tanpa rekap manual | Payroll ditutup tanpa spreadsheet pembantu | 100% |
| G5 | Sesi tercatat sebelum berlangsung | Persentase sesi | 100% |
| G6 | Student mandiri | Student mengakses jadwal/pembayaran tanpa bertanya | diukur di pilot (baseline OQ-12) |

### Non-goal rilis 1
Buku besar/ERP penuh; gateway pembayaran dan rekonsiliasi bank; pembuatan meeting Zoom otomatis; matching mentor berbasis AI; sertifikat dan komunitas otomatis; aplikasi mobile; pemblokiran sesi otomatis saat pelunasan kurang (OQ-03); aturan no-show otomatis (OQ-02).

## 2. Peran

| Kode | Peran | Fokus | Catatan |
|---|---|---|---|
| STU | Student | Mengikuti program | Akun dibuat per OQ-08 |
| MEN | Mentor | Mengajar, laporan, ajukan honor | |
| ADM | Admin | Lead sampai enrollment aktif, jadwal, catat bayar, closing | Tidak melihat honor/rekening (K10) |
| FIN | Finance | Verifikasi bayar student, review dan bayar honor | Mengusulkan konfigurasi (D-04) |
| PMO | PMO | Monitoring, keputusan kasus | Mengusulkan konfigurasi (D-04) |
| MGT | Management/Owner | Menyetujui konfigurasi, membaca dashboard | D-04 |
| MKT | Marketing | CRM lead saja | Tanpa konversi ke enrollment [SUMBER K18] |

## 3. Kebutuhan fungsional

Format: **ID**, uraian, **sumber** (PRD v1.0 atau repo), **prioritas** (P0 rilis 1, P1 menyusul).

### AUTH Akun dan sesi
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-AUTH-01 | Login dengan peran; hak akses ditegakkan di server | PRD §5 | P0 |
| FR-AUTH-02 | Ganti dan pulihkan sandi; sandi awal wajib diganti; batas waktu sesi | repo H11 | P0 |
| FR-AUTH-03 | Pembuatan akun student sesuai OQ-08 | D-01 | P0 |
| FR-AUTH-04 | Pembatasan percobaan login | repo | P0 |

### CRM Lead
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-CRM-01 | Buat dan ubah lead: kebutuhan, tujuan, software/skill, PIC, tindakan berikutnya, tanggal follow-up | AD-01 | P0 |
| FR-CRM-02 | Status lead: New, Contacted, Assessment, Mentor Matching, Waiting Decision, Won, Lost (Lost wajib alasan) | Book | P0 |
| FR-CRM-03 | Filter status dan tanggal follow-up; follow-up terlewat menjadi peringatan | AD-01-3 | P0 |
| FR-CRM-04 | Konversi lead ke enrollment tanpa kehilangan riwayat | AD-01-4 | P0 |
| FR-CRM-05 | Catat cepat komunikasi dan templat WhatsApp (salin, tanpa kirim otomatis) | repo U5, U6 | P1 |

### MAT Mentor dan matching
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-MAT-01 | Database mentor: identitas, keahlian, status, kapasitas, ketersediaan | AD-02, §13 | P0 |
| FR-MAT-02 | Filter keahlian, status, beban, ketersediaan; rekomendasikan mentor ke lead | AD-02 | P0 |
| FR-MAT-03 | Tier, tarif, honor, dan rekening tidak tampil ke Admin; urutan daftar tidak dapat memakai tier | K10 | P0 |
| FR-MAT-04 | Ganti mentor utama dengan alasan wajib dan persetujuan student; riwayat penugasan | PRD §7.5 | P0 |
| FR-MAT-05 | Mentor tamu untuk satu sesi dengan alasan resmi | repo K8 | P1 |

### CUR Kurikulum
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-CUR-01 | Mentor membuat draf: tujuan, topik, capaian, estimasi sesi, paket rekomendasi, catatan | ME-02 | P0 |
| FR-CUR-02 | Mentor mengirim draf untuk acknowledgement | ME-02-3 | P0 |
| FR-CUR-03 | Student melihat draf dan menekan Acknowledge; cap waktu dan identitas tercatat; student tidak dapat mengubah isi | ST-03 | P0 |
| FR-CUR-04 | Setelah acknowledgement, mentor mengonfirmasi menjadi rencana aktif | ST-03-4 | P0 |
| FR-CUR-05 | Perubahan setelah konfirmasi menjadi revisi baru; revisi lama tersimpan | ME-02-5 | P0 |
| FR-CUR-06 | Catatan mentor memiliki visibilitas per kolom ke student | PRD §9 | P1 |

### ENR Enrollment
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-ENR-01 | Buat enrollment dari lead Won: student, mentor, paket | AD-03 | P0 |
| FR-ENR-02 | Simpan snapshot harga, kuota, masa aktif, aturan DP | AD-03-3 | P0 |
| FR-ENR-03 | Hitung tanggal mulai/berakhir sesuai paket | AD-03-4 | P0 |
| FR-ENR-04 | Peringatan enrollment ganda | repo H5 | P0 |
| FR-ENR-05 | Ringkasan 360 enrollment (jadwal, bayar, laporan, riwayat) | repo E4 | P1 |
| FR-ENR-06 | Tahan (On Hold), batalkan, kedaluwarsa dengan alasan tercatat | Book | P0 |

### SCH Jadwal
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-SCH-01 | Mentor dan student menyepakati jadwal; jadwal terkonfirmasi tercatat di sistem | §7.2 | P0 |
| FR-SCH-02 | Tolak jadwal yang bentrok pada akun Zoom Private, tampilkan sesi penyebab; mentor dan student yang sama tidak boleh ganda | A4 | P0 |
| FR-SCH-03 | Mentor mengajukan jadwal; Admin mengonfirmasi (penanda needs_confirm) | repo C10 | P0 |
| FR-SCH-04 | Reschedule: sesi lama Rescheduled menunjuk sesi baru, alasan wajib, riwayat terjaga | §7.2 | P0 |
| FR-SCH-05 | Peringatan lunak (masa aktif, batas bayar) dengan alasan tercatat | repo H4 | P1 |
| FR-SCH-06 | Student melihat jadwal, status, tautan Zoom, riwayat reschedule | ST-04 | P0 |

### RPT Laporan dan penilaian
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-RPT-01 | Mentor mengisi laporan sesi (topik, progres, langkah berikutnya, catatan) maksimal H+1; hanya mentor pengajar | ME-04, K17 | P0 |
| FR-RPT-02 | Laporan terkirim membuat sesi Completed; Admin hanya membaca | K17 | P0 |
| FR-RPT-03 | Laporan terlambat tampil ke mentor, Admin, PMO | ME-04-4 | P0 |
| FR-RPT-04 | Student melihat laporan yang dibagikan; catatan internal tersembunyi | ST-06 | P0 |
| FR-RPT-05 | Penilaian akhir saat tahap penutupan | ME-05 | P1 |

### PAY Pembayaran student
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-PAY-01 | Setelah paket ditetapkan, student melihat nominal, aturan, batas bayar, dan tujuan pembayaran | ST-05, AD-04 | P0 |
| FR-PAY-02 | Student mengunggah bukti bayar; Admin dapat mencatat atas nama student; status awal Pending | D-01, K12 | P0 |
| FR-PAY-03 | Finance memverifikasi atau menolak (alasan wajib); pelaku dan waktu tercatat; Verified tidak dapat diubah, koreksi lewat catatan baru | FI-01 | P0 |
| FR-PAY-04 | Status pembayaran dihitung dari pembayaran Verified: Pending, DP Paid, Partially Paid, Paid | §10.2 | P0 |
| FR-PAY-05 | Aktivasi enrollment saat syarat awal terpenuhi (BR-PAY-02) | repo F1 | P0 |
| FR-PAY-06 | Finance melihat sisa tagihan dan batas pelunasan | FI-02 | P0 |
| FR-PAY-07 | Validasi nominal dan peringatan pembayaran dobel | repo H2 | P1 |
| FR-PAY-08 | Student tidak melihat catatan internal verifikasi | ST-05-5 | P0 |

### HON Honor
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-HON-01 | Sesi Completed membuat honor eligible dengan tarif tier pada tanggal sesi (snapshot) | §11, D-05 | P0 |
| FR-HON-02 | Mentor memilih satu atau beberapa sesi eligible dan mengajukan; nominal tidak dapat diubah | ME-06 | P0 |
| FR-HON-03 | Finance meninjau (sesi selesai, laporan ada, tarif benar), menyetujui atau menolak dengan alasan | FI-03 | P0 |
| FR-HON-04 | Finance mencatat pembayaran (tanggal, referensi); Paid tidak dapat diubah | FI-04 | P0 |
| FR-HON-05 | Rekap honor per mentor dan ekspor; rekening hanya Finance, pembukaan tercatat | repo E2 | P1 |
| FR-HON-06 | Mentor tanpa tier: sesi tetap berjalan, honor tertahan, peringatan ke Finance/PMO | repo C6 | P0 |
| FR-HON-07 | Penolakan melepas sesi sehingga dapat diajukan ulang | repo C7 | P0 |

### CFG Konfigurasi
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-CFG-01 | PMO atau Finance membuat usulan (nilai baru, tanggal efektif, alasan) | D-04 | P0 |
| FR-CFG-02 | Management/Owner menyetujui atau menolak (alasan wajib); tidak berlaku mundur | D-04, PM-02 | P0 |
| FR-CFG-03 | Objek: harga/kuota/masa aktif/aturan DP paket, tarif tier, tier mentor, tujuan pembayaran | PRD, K8 | P0 |
| FR-CFG-04 | Dua set ketentuan paket tersimpan; aturan lama aktif | D-02, K16 | P0 |
| FR-CFG-05 | Matriks margin per tier dan paket dengan peringatan | repo F4 | P1 |
| FR-CFG-06 | Pengaturan sistem (batas pasif, batas laporan, peringatan kedaluwarsa, kapasitas Zoom) | repo U10 | P1 |

### STU Portal student
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-STU-01 | Beranda My Private: tujuan, mentor, sesi berikutnya, status bayar | ST-01, ST-02 | P0 |
| FR-STU-02 | Profil mentor yang ditugaskan; tanpa beban kerja, ketersediaan, honor, bank | ST-02 | P0 |
| FR-STU-03 | Hanya data milik student sendiri | ST-01-2 | P0 |
| FR-STU-04 | Progres dan penilaian akhir | ST-06 | P0 |

### CHT Komunikasi
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-CHT-01 | Satu konteks komunikasi per enrollment (student, mentor); Admin punya akses intervensi | ST-07 | P0 |
| FR-CHT-02 | Akses admin tercatat; retensi sesuai OQ-09 | OQ-09 | P0 |

### MON Monitoring dan penutupan
| ID | Kebutuhan | Sumber | P |
|---|---|---|---|
| FR-MON-01 | Dashboard PMO: enrollment per status, sesi, laporan terlambat, kedaluwarsa, pasif, beban mentor | PM-01 | P0 |
| FR-MON-02 | Dashboard Management baca saja: KPI dan pengecualian | PM-03 | P0 |
| FR-MON-03 | Keputusan kasus PMO (kedaluwarsa, pasif, reschedule berulang) | repo P2 | P0 |
| FR-MON-04 | Closing review: semua sesi selesai, penilaian akhir, hasil, keputusan lanjutan; Completed | AD-06 | P0 |
| FR-MON-05 | Pemeriksaan data otomatis dan metrik pilot | repo H10, E8 | P1 |
| FR-AUD-01 | Log audit untuk aksi penting; tidak dapat dihapus dari antarmuka | X1 | P0 |
| FR-DOC-01 | Cetak invoice, kwitansi, slip honor, laporan progres, sertifikat bernomor | repo U9 | P1 |

## 4. Kebutuhan non-fungsional

Angka bertanda [USULAN] adalah titik awal yang harus dikonfirmasi setelah volume diukur (OQ-12).

| ID | Kebutuhan |
|---|---|
| NFR-SEC-01 | Hak akses ditegakkan di server per peran dan per kolom (dokumen 07); respons API tidak pernah memuat kolom terlarang |
| NFR-SEC-02 | Rekening mentor terenkripsi; pembukaan tercatat di audit |
| NFR-SEC-03 | Berkas bukti bayar disimpan di luar akses publik, diunduh lewat tautan bertoken berumur pendek |
| NFR-SEC-04 | Sandi di-hash dengan algoritma modern; pembatasan percobaan login; HTTPS wajib |
| NFR-PRV-01 | Pengumpulan data pribadi mengikuti kajian OQ-23 |
| NFR-DAT-01 | Tidak ada penghapusan permanen data operasional; arsip atau nonaktifkan |
| NFR-DAT-02 | Nilai uang dan tarif historis tidak berubah ketika konfigurasi berubah (snapshot) |
| NFR-DAT-03 | Cadangan harian otomatis dan uji pemulihan berkala |
| NFR-PERF-01 | [USULAN] Halaman daftar terbuka dalam 2 detik untuk volume pilot |
| NFR-AVL-01 | [USULAN] Ketersediaan jam kerja operasional; target pasti setelah OQ-12 |
| NFR-AUD-01 | Setiap perubahan status, uang, konfigurasi, dan penggantian mentor memiliki pelaku, waktu, nilai lama dan baru |
| NFR-UX-01 | Layar responsif untuk desktop dan ponsel (portal student diutamakan ponsel) |
| NFR-UX-02 | Bahasa antarmuka Indonesia; istilah mengikuti Operational Book |
| NFR-INT-01 | Logika uang, jadwal, dan honor berupa fungsi murni dengan tes otomatis sebagai kontrak pemindahan ke Portal |
| NFR-INT-02 | Kolom `portal_user_id` pada user, mentor, student |
| NFR-OPS-01 | Pemantauan galat dan log aplikasi; prosedur pemulihan terdokumentasi |

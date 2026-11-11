# Penerapan rekomendasi dokumen 10

Dikerjakan 9 Nov 2026. Semua item U, H, dan E di `docs/10-perbandingan-dan-rekomendasi.md` diterapkan, diuji di `tests/fase4.php`, dan punya skenario QA demo.

| Item | Wujud | Berkas utama |
|---|---|---|
| H1 | Dua set ketentuan paket (K16) | `PackageRules`, `/ketentuan` |
| H2 | Nominal: minimal Rp10.000, kelipatan Rp1.000, melebihi sisa tagihan butuh konfirmasi, tipe otomatis | `PaymentSvc::guard` |
| H3 | Dialog konfirmasi untuk tindakan tak terbatalkan | `data-confirm`, `app.js` |
| H4 | Peringatan lunak (masa aktif, batas bayar) dengan alasan tercatat; bentrok tetap tegas | `SessionSvc::softWarnings` |
| H5 | Enrollment ganda | `EnrollSvc::duplicateOf` |
| H6 | Layar verifikasi Finance dan daftar periksa | `views/pay_queue.php` |
| H7 | Riwayat per rekaman | `Audit::forRecord`, `views/_history.php` |
| H8 | Cadangan harian otomatis, unduh, uji pemulihan | `Backup`, `/sistem` |
| H9 | Impor .xlsx dan padanan status spreadsheet | `Xlsx`, `LeadSvc::SHEET_STATUS` |
| H10 | Pemeriksaan data otomatis | `DataChecks`, `/cases` |
| H11 | Ganti sandi, sandi awal acak wajib ganti, batas waktu sesi | `AccountCtl`, `Auth` |
| U1 | Label bahasa tim, istilah Book di petunjuk, padanan di Panduan | `STATUS_LABEL`, `STATUS_BOOK` |
| U2 | Beranda Hari ini | `views/dashboard.php` |
| U3 | Pencarian cepat (tombol /) | `SearchSvc` |
| U4 | Indikator langkah mendaftarkan student | `views/_steps.php` |
| U5 | Catat cepat komunikasi | `LeadSvc::QUICK` |
| U6 | Templat WhatsApp bisa disunting PMO, tombol Salin | `WaTpl`, `/sistem` |
| U7 | Peran Marketing (CRM saja), migrasi database lama | `Schema::migrateRoles` |
| U8 | Layar kosong berpetunjuk | `empty_state()` |
| U9 | Invoice, kwitansi, slip honor, laporan progres, sertifikat bernomor tetap | `PrintCtl` |
| U10 | Pengaturan sistem | `SysCtl` |
| E1 | Verifikasi, bayar honor, dan tunda follow-up massal | `verifyBatch`, `payBatch`, `snooze` |
| E2 | Rekap honor per mentor dengan info transfer (Finance saja) | `HonorCtl::recap` |
| E3 | Tampilan cepat lead dan enrollment | chip di Pipeline dan Enrollment |
| E4 | Ringkasan 360 student dan aksi cepat | `views/students_show.php` |
| E5 | Ekspor Excel | `Xlsx`, `?fmt=xlsx` |
| E6 | Pengingat siap kirim | `ReminderSvc`, `/pengingat` |
| E7 | Penerimaan lead otomatis bertoken | `IntakeCtl` |
| E8 | Hasil pilot | `MetricsSvc`, `/metrik` |

Batas yang jujur: kop dokumen cetak hanya memuat nama organisasi; impor spreadsheet hanya untuk lead (kolom enrollment tab PRIVATE belum diketahui); integrasi Portal dan peran Owner belum dibuat.

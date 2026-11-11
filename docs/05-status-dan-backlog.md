# Status, penyimpangan, dan backlog

Per 5 Nov 2026. Acuan: `docs/02-prd-mvp.md`.

## Status tahapan

| Tahap | Isi | Status |
|---|---|---|
| 0. Validasi flow | Dry-run tiga kasus nyata, inventaris volume, baseline pertanyaan ke admin, definisi tier | **Belum dilakukan.** Wajib sebelum pilot. |
| 1. Fondasi + pipeline admin | Login, peran, audit, konfigurasi dua pihak, tier dan mentor, lead, enrollment, rencana belajar | Selesai (diuji) |
| 2. Pembayaran + sesi | Input Admin, verifikasi Finance, aktivasi, jadwal, bentrok Zoom, reschedule, cancel, laporan | Selesai (diuji) |
| 3. Honor + monitoring | Tarif tier, pengajuan, review, Paid, rekap CSV, dashboard, alert | Selesai (diuji) |
| Pilot | Dipakai paralel dengan WhatsApp 3 sampai 4 minggu | Belum |
| 4. Rilis 1.1 (P1) | Lihat backlog di bawah | Sebagian |
| 5. Integrasi Portal | `docs/07-integrasi-portal.md` | Setelah flow dinyatakan pasti |

## Cakupan MVP terhadap story P0

Admin A1 sampai A6, Mentor M1 sampai M3, Finance F1 sampai F5, PMO P1 dan P2, lintas peran X1 sampai X3: **seluruhnya ada**, kecuali yang tercantum di penyimpangan.

## Penyimpangan dan batasan yang diketahui

1. **Unggah bukti bayar belum ada.** Bukti berupa tautan atau referensi (Drive). Unggah berkas menyusul bersama kebijakan penyimpanan.
2. **Notifikasi hanya di dalam aplikasi** (alert di Beranda). Tidak ada WhatsApp atau email, sesuai non-goal MVP dan karena kebijakan kirim belum diputuskan.
3. **DP kurang dari 50%:** enrollment tetap Waiting Payment. Perhitungan sesi proporsional ada dan tampil, tetapi belum ada alur "aktifkan dengan DP kurang" (asumsi C4).
4. **Pengaturan sistem** (`zoom_capacity`, `session_minutes`, `expiry_warning_days`, `passive_days`, `report_deadline_days`, `honor_min_request`) hanya bisa diubah di tabel `settings`. Belum ada halaman pengaturan. Perubahan harga, tarif, dan margin minimum sudah lewat Konfigurasi.
5. **Reset kata sandi** belum ada layar. PMO dapat membuat pengguna baru dan menonaktifkan yang lama.
6. **Closing review** minimal: mentor mengisi laporan akhir, Admin menandai Completed. Belum ada checklist sertifikat dan komunitas.
7. **Catatan komunikasi per lead dan enrollment** (P1) belum ada. Riwayat perubahan lead tampil dari audit log.
8. **Laporan margin per enrollment** (P1) belum ada. Yang ada: matriks margin per tier dan paket.
9. **Sesi offline:** tersedia sebagai mode, tetapi penyesuaian harga belum diatur.
10. **SQLite** cukup untuk volume Private yang kecil dan satu server. Bila pemakaian serentak membesar, pindah ke MySQL saat integrasi Portal.
11. **Pembatasan percobaan login** sederhana (10 kali per 10 menit per akun atau IP). Pasang HTTPS dan, bila perlu, pembatasan di server web.
12. **Reschedule berulang** belum ditandai otomatis untuk ditinjau Admin dan PMO (Book bab 11).

## Pertanyaan terbuka

Blocking sebelum pilot:
1. Nilai tier saat ini (berapa tier dan nominalnya), kriteria naik atau turun tier, siapa yang menetapkan, apakah online dan offline dibedakan, dan batas margin minimum per sesi.
2. Konfirmasi maker-checker (C1): bila salah satu pihak berhalangan, perubahan menunggu atau perlu akun Owner?
3. Konfirmasi asumsi C2 (tier disembunyikan dari Admin) dan C3 (PMO melihat rekening tersamar).

Tidak memblokir:
4. Aturan siklus honor: batas pengajuan, nominal minimum, dibayar per pengajuan atau digabung per bulan.
5. Sesi offline dan penyesuaian harga.
6. Harga publik di Academy dan KB chatbot perlu disamakan dengan Book atau sebaliknya.
7. Volume student dan sesi (diukur di Tahap 0).
8. Pemilik sistem setelah rilis: pemeliharaan, cadangan, akun, hosting.
9. Apakah Admin butuh penanda tingkat keahlian mentor untuk matching (atribut terpisah dari tier).

## Backlog (urut kira-kira)

**P1 (setelah pilot):** halaman pengaturan sistem, unggah bukti bayar, catatan komunikasi, laporan margin per enrollment, penandaan reschedule berulang, reset kata sandi, impor enrollment aktif dari spreadsheet, notifikasi WhatsApp ke tim internal (bukan student).

**P2:** tautan baca saja untuk student lalu akun, chat, integrasi Portal (SSO, identitas), aturan no-show, pemblokiran sesi saat pelunasan kurang, perpanjangan masa aktif, sertifikat dan komunitas otomatis, peran Owner.

## Metrik pilot (hipotesis)

100% sesi tercatat sebelum berlangsung, 0 bentrok Zoom lolos, minimal 90% laporan masuk dalam H+1, Finance menutup payroll tanpa spreadsheet pembantu, dan pertanyaan status ke Admin turun minimal 50% dari baseline (baseline diukur di Tahap 0).

# Analisis spreadsheet PRIVATE_MANAGEMENT_DATABASE_V1.1 dan pembaruan CRM

Sumber: spreadsheet manajemen Private (V1.1). Isinya masih templat kosong, jadi tidak ada data bisnis yang bisa ditambang. Nilainya ada di kamus data dan daftar KPI, dan itu yang dipetakan di bawah. Hirarki tetap: Operational Book, PRD, lalu kode.

## Pemetaan sheet ke sistem
| Sheet | Di sistem |
|---|---|
| CRM / lead | `/leads` papan dan tabel, follow-up, laporan, impor dan ekspor CSV |
| Student | `/students` (profil, riwayat enrollment, catatan interaksi) |
| Enrollment | `/enrollments` dengan saran pesan WhatsApp |
| Jadwal / Zoom | `/sessions` tampilan pekan dan daftar, deteksi bentrok, ekspor .ics, Meeting ID |
| Dashboard | Beranda: KPI per peran, pipeline, sesi 7 hari, alert dengan tombol WhatsApp |

## Fungsi CRM
Papan 7 tahap dengan tarik-lepas, antrean follow-up (terlewat, hari ini, 7 hari, tanpa jadwal, mengendap), deteksi duplikat (WhatsApp dan email), nomor WA dinormalisasi, 8 templat WhatsApp (tautan wa.me, kirim manual), linimasa lead, konversi lead ke student (menautkan alumni), laporan (corong, kinerja sumber, alasan Lost, kecepatan respons, umur tahap, per PIC), nilai pipeline hanya dari paket tetap.

## Selisih sheet vs Book (belum diubah, perlu keputusan Mas Radev)
1. Status enrollment di sheet (PENDING/CONFIRMED) berbeda dari Book (Draft, Waiting Payment, Active, ...). Sistem mengikuti Book.
2. Sheet punya status sesi NO_SHOW. Diputuskan tidak diperlukan (K7): jadwal dipindah atas kesepakatan.
3. Sheet memisahkan ZOOM BOOKING sebagai entitas; sistem menyimpan Meeting ID di sesi dan mencegah bentrok. Perlu entitas sendiri?
4. Harga di sheet berupa teks ("Rp370,000"); sistem memakai angka dari konfigurasi paket.
5. Lead WON tanpa student di sheet; sistem menandainya "belum dikonversi".
6. Nomor telepon tanpa 0 di depan; sistem menormalisasi ke format 62.

## Batas
Pengiriman WhatsApp tetap manual (tautan). Tidak ada integrasi API WA. Pengujian visual dilakukan di Chromium; peluncur Windows belum dijalankan di Windows.

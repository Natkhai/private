# Tinjauan atas PRD Private Module v1.0

Dokumen yang ditinjau: PRD Private Module v1.0 (Devata Portal). Tinjauan ini dibuat 4 Nov 2026 sebagai bahan diskusi sebelum membangun sistem baru. Fakta, asumsi, dan rekomendasi dipisahkan.

## Ringkasan

PRD jelas tentang domain (peran, siklus hidup, aturan paket, honor) dan disiplin pada prinsip "bangun yang minimum". Kelemahannya: menganggap sistem lama tidak ada, memuat beberapa inkonsistensi internal, dan menaruh banyak halaman pada prioritas P0 padahal masalah nyata ada di sisi internal.

## Yang kuat

- Pemisahan tugas (Admin, Finance, PMO, Management) dan prinsip akses minimum.
- Snapshot harga di enrollment dan tarif honor yang tidak berubah mundur.
- Audit untuk tindakan penting, revisi kurikulum bertingkat, riwayat penugasan mentor.
- Open decisions yang jujur (no-show, pemblokiran sesi, chat) dan tidak dikarang.

## Temuan (urut dari yang paling berisiko)

1. **Harga.** Harga di PRD cocok dengan Operational Book v1.0 (Rp370.000 per sesi untuk kurang dari 5 sesi, Rp5.400.000 untuk 20 sesi). Harga publik di Academy dan KB chatbot (Rp350.000 dan Rp5.000.000) berbeda dan perlu disamakan oleh tim pemilik. Catatan: pada tinjauan awal saya sempat menduga PRD memakai Book versi lama; dugaan itu keliru setelah Book dibaca.
2. **Sistem lama diabaikan.** PRD tidak memuat analisis kesenjangan terhadap aplikasi yang ada. Mas Radev kemudian menjelaskan aplikasi lama belum dipakai (trial), jadi memulai baru adalah keputusan yang tepat.
3. **Kurikulum sebelum enrollment.** Model data menyebut kurikulum milik enrollment, tetapi kurikulum dibuat sebelum bayar, sebelum enrollment. Student juga diminta acknowledge di portal padahal lead boleh belum punya akun, sehingga akun dipaksa sebelum membayar. Solusi MVP: persetujuan dicatat Admin setelah komunikasi WhatsApp.
4. **Status Completed.** Didefinisikan sebagai "sesi selesai dan laporan lengkap", tetapi KPI "Overdue Report" menghitung "Completed tanpa laporan". Keduanya tidak bisa benar bersamaan. MVP: Completed hanya setelah laporan; keterlambatan dihitung dari sesi Scheduled yang lewat H+1.
5. **Izin per kolom.** Admin R/W pada Mentor Database, tetapi data bank dan tarif hanya untuk Finance dan Management. Perlu izin per kolom, bukan per halaman.
6. **PMO baca saja** tetapi kasus kedaluwarsa dirujuk ke review PMO. PMO tidak bisa bertindak. MVP: PMO mencatat keputusan kasus.
7. **REQUESTED dan NO_SHOW dihapus.** Mekanisme mentor mengajukan jadwal lalu Admin mengonfirmasi slot Zoom hilang dari daftar status. MVP memakai penanda `needs_confirm` tanpa menambah status resmi. No-show diputuskan "abaikan dulu".
8. **Portal student** adalah bagian termahal (akun, data pribadi, unggah bukti, beban dukungan) dan kebutuhannya belum terbukti. Alternatif murah bila perlu: tautan baca saja bertoken.
9. **Honor.** PRD menambah alur pengajuan dan review. Jawaban Mas Radev: otomatis dari laporan, mentor mengajukan, Finance memutuskan. Kontrol yang benar-benar dibutuhkan: kunci baris Paid, tarif bertanggal efektif, dan persetujuan oleh Finance.
10. **Membangun di Portal terlalu dini.** Portal V20 berstruktur flat, skema runtime, agent tidak boleh menulis DB produksi, dan deploy satu file per satu. Memasukkan puluhan halaman baru memperbesar risiko. Itu alasan pengembangan mandiri dulu.

## Yang belum ada di PRD

Metrik keberhasilan proyek, kebutuhan non-fungsional (volume, cadangan, perlindungan data pribadi dan rekening), kanal notifikasi (14 pemicu tanpa kanal), dan sumber migrasi yang menyebut spreadsheet tetapi bukan aplikasi lama.

## Pertanyaan yang diajukan dan jawabannya

Jawaban Mas Radev ada di `docs/01-keputusan.md` (K1 sampai K14).

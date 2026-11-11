# Memindahkan ke Devata Portal

Rencana Mas Radev (K7): bangun mandiri, pastikan flow, lalu masukkan ke Portal karena Private bagian dari Academy. Berkas ini menyiapkan pemetaan. **Jangan mulai integrasi sebelum Mas Radev menyatakan flow pasti** (setelah pilot).

Aset yang dipindahkan adalah **flow yang sudah teruji dan tes sebagai kontrak**, bukan kode. Portal V20 berbasis PHP/MySQL, jadi logika dalam PHP di repo ini relatif mudah disalin, tetapi struktur Portal (flat web root, skema runtime, deploy file demi file, agent tidak boleh menulis DB produksi) menuntut kehati-hatian.

## Pemetaan konsep

| Private Module | Portal V20 | Catatan |
|---|---|---|
| `users` (peran admin, mentor, finance, pmo) | `users` dan sistem peran Portal | Jangan membuat identitas ganda. Kolom `portal_user_id` sudah disiapkan di `mentors` dan `students`. |
| `mentors` | Mentor Portal (`users.is_mentor`, `mentors`) | Mentor Private mungkin sudah user Portal. Honor Private terpisah dari royalti kursus. |
| `students` | `users` Portal | Student yang sudah punya akun dipetakan, tidak diduplikasi. |
| `enrollments`, `sessions`, `payments` | Tabel baru berawalan `private_` | Dibuat lewat pola migrasi runtime Portal (cek `information_schema`, tanpa file `.sql`). Tabel uang tidak boleh `TRUNCATE`, `DELETE`, atau `DROP`. |
| `config_proposals` | Tabel baru atau `site_settings` bertanggal efektif | Pertahankan maker-checker dan tidak berlaku mundur. |
| `audit_log` | Log aktivitas Portal | Pertahankan sifat hanya-tambah dan penyamaran untuk Admin. |
| Pembayaran Admin lalu Finance | Pembayaran kursus Portal (`course_transactions`) memakai Duitku | Hanya bila Private nanti dijual lewat checkout; omzet Private jangan tercatat ganda. |
| Honor | Terpisah dari royalti mentor | Pembayaran honor Private bukan royalti kursus. |

## Logika yang dipindahkan (fungsi murni, ada tes)

`Payment::plan`, `Config::effective` dan `Config::decide`, `Config::marginMatrix`, `HonorSvc::resolve` dan `snapshot`, `SessionSvc::conflicts`, `EnrollSvc::syncPayment`, `Dates::addMonths`. Jalankan `tests/run.php` sebagai acuan perilaku. Setelah dipindah, tulis ulang tes yang sama terhadap implementasi Portal.

## Pengaman Portal yang harus dihormati

- Pekerjaan produksi lewat jalur yang ada. Jangan membuat halaman "runner" yang mengeksekusi skrip lewat HTTP.
- Tabel yang menyimpan uang atau hak akses tidak dihapus atau dikosongkan oleh agent.
- Tidak ada `INSERT` konten dengan id eksplisit. Selalu auto-increment.
- Setiap file PHP yang menulis data wajib memakai `require_role()`.
- `catch` yang hanya `error_log` wajib berprefiks khas agar mudah dicari (contoh `[PRIVATE-MODULE]`, sudah dipakai di `public/index.php`).
- Pengaturan data bank mentor di Portal harus tetap terpisah dari peran admin Portal yang luas.
- Perbarui knowledge AI Portal (`includes/ai_kb_devata.md`) bila aturan Private berubah.

## Sebelum mulai

1. Mas Radev menyatakan flow pasti setelah pilot.
2. Audit struktur Portal dan buat pemetaan konsep ke entitas (bagian 26 PRD v1.0 mensyaratkan ini).
3. Tentukan hosting data bank dan enkripsi di Portal (kunci terpisah dari `.env` aplikasi lain).
4. Rencanakan migrasi data dari SQLite ke MySQL dan uji dengan data fiktif lebih dulu.

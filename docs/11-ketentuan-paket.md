# Ketentuan paket Private: aturan lama (berlaku) dan ketentuan terbaru (belum dilaksanakan)

Keputusan Mas Radev (K16): **aturan lama masih berlaku, ketentuan terbaru belum dilaksanakan, dan keduanya disimpan.** Kode: `src/PackageRules.php`. Halaman: menu Ketentuan paket (`/ketentuan`).

## Aturan lama (BERLAKU SEKARANG)
Sumber: keputusan Mas Radev 24 Sep 2026 (sama dengan situs Academy dan KB Deva) dan praktik tim pada spreadsheet kerja. Catatan: pemetaan "aturan lama = keputusan 24 Sep" adalah kesimpulan dari bukti (repo `private-devata`, spreadsheet), bukan pernyataan langsung, dan perlu dikonfirmasi.

| Paket | Harga | Pembayaran | Masa aktif |
|---|---|---|---|
| < 5 sesi (fleksibel) | Rp350.000 per sesi | Lunas di awal | 3 bulan |
| 5 sesi | Rp1.750.000 | DP 50%, lunas sebelum sesi ke-3 | 3 bulan |
| 10 sesi | Rp3.000.000 | DP 50%, lunas sebelum sesi ke-6 | 6 bulan |
| 20 sesi | Rp5.000.000 | DP 50%, lunas sebelum sesi ke-11 | 12 bulan |

## Ketentuan terbaru (BELUM DILAKSANAKAN)
Sumber: lampiran dari Mas Radev (Nov 2026), sejalan dengan Operational Book yang tertulis Versi 1.0.

| Paket | Harga | Pembayaran | Masa aktif |
|---|---|---|---|
| < 5 sesi (fleksibel) | Rp370.000 per sesi | Lunas di awal | 3 bulan |
| 5 sesi | Rp350.000 per sesi = Rp1.750.000 (lihat catatan) | Lunas di awal | 3 bulan |
| 10 sesi | Rp300.000 per sesi = Rp3.000.000 | Dapat dicicil 2x (DP 50%), lunas sebelum sesi ke-6 | 6 bulan |
| 20 sesi | Rp270.000 per sesi = Rp5.400.000 | Dapat dicicil 2x (DP 50%), lunas sebelum sesi ke-11 | 12 bulan |

Yang didapat student (lampiran): free konsultasi kebutuhan Private via Zoom (materi, jadwal, mentor), kurikulum berdasarkan kebutuhan student, cicilan 2x khusus paket 10 dan 20 sesi, diskusi dengan mentor di luar sesi, sertifikat, dan grup eksklusif member Devata. Satu sesi = 2 jam, online lewat Zoom Private.

**Catatan yang perlu dikonfirmasi:** lampiran menuliskan paket 5 sesi (Rp350.000 per sesi) sebagai Rp1.850.000. Hasil kali 5 x Rp350.000 adalah Rp1.750.000 dan Operational Book juga menulis Rp1.750.000. Disimpan Rp1.750.000 sampai ada konfirmasi.

## Cara kerja di sistem
- Yang berlaku di sistem tetap konfigurasi paket bertanggal efektif (`Config`). Data awal (seed) memuat **aturan lama**. Basis data yang dibuat sebelum K16 diselaraskan sekali ke aturan lama lewat set awal bertanda `bootstrap=2` (enrollment lama tidak berubah).
- Memberlakukan ketentuan terbaru: PMO atau Finance klik "Usulkan ketentuan terbaru" dan memilih tanggal berlaku. Sistem membuat usulan untuk tiap paket yang berbeda. Pihak lain (peran berbeda dari pengusul) menyetujui di Konfigurasi. Tidak ada jalur pintas.
- Harga dan aturan DP di enrollment yang sudah dibuat tidak berubah (snapshot). Perubahan hanya untuk enrollment baru setelah tanggal efektif.
- Bila ketentuan terbaru nanti diubah lagi, ubah `PackageRules::sets()`, `docs/11` ini, dan Operational Book.

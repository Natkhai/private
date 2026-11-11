# Mode demo, data demo, dan skenario QA

Tujuan: sistem bisa dicoba dan divalidasi dengan data fiktif tanpa risiko mengubah data operasional.

## Di mana bedanya demo dan operasional
| | Operasional | Demo |
|---|---|---|
| Peluncur Windows | `MULAI.bat` | `MULAI-DEMO.bat` |
| Peluncur Linux, Codespaces | `./mulai.sh` | `./mulai-demo.sh` |
| Berkas database | `data/private-module.db` | `data/demo.db` |
| Variabel | tanpa `PM_MODE` | `PM_MODE=demo` |
| Banner dan menu Skenario uji | tidak ada | ada |
| Tautan WhatsApp | aktif (kirim manual) | dimatikan |

Tiga pengaman:
1. **Berkas terpisah.** Mode demo menolak membuka `private-module.db` (galat jelas). Data demo tidak mungkin tercampur karena berada di berkas lain (`src/Demo.php`).
2. **Penanda.** Database yang diisi seeder membawa `settings.demo_data=1`. Banner dan pematian WhatsApp mengikuti penanda ini, bukan hanya variabel lingkungan.
3. **Reset hanya untuk database bertanda demo.** Seeder menolak database berisi pengguna tanpa penanda; reset menolak database tanpa penanda atau berkas operasional.

Tidak ada pengiriman otomatis di sistem. Satu-satunya jalur keluar adalah tautan `wa.me` yang diklik manual, dan itu dimatikan di mode demo.

## Perintah
```bash
PM_MODE=demo php bin/seed-demo.php     # isi database demo kosong
PM_MODE=demo php bin/reset-demo.php    # hapus dan isi ulang database demo
```
Di aplikasi: PMO, menu Skenario uji, bagian "Isi ulang data demo" (wajib mengetik RESET).

## Identitas fiktif
Nama berakhiran "(demo)", email `@contoh.invalid` (domain cadangan RFC 2606), nomor `08120000NNNN`, rekening `DEMO-...`. Pola nomor tidak dijamin bukan milik siapa pun, tetapi tidak ada pesan yang dikirim ke nomor mana pun.

## Data demo
33 lead dengan ketujuh status resmi, 14 enrollment, sekitar 40 sesi, pembayaran Verified, Pending, dan Rejected, honor Requested, Paid, dan Rejected, empat mentor (satu tanpa tier), dan tiga usulan konfigurasi. Riwayat dibuat lewat service yang sama dengan produksi memakai jam palsu, lalu jam dipulihkan. Tanggal relatif terhadap hari ini, jadi "follow-up terlewat" dan "masa aktif habis" selalu benar kapan pun seeder dijalankan.

Status lead di permintaan awal dipetakan ke 7 status resmi: Interested = Assessment; Pending dan Follow-up = Waiting Decision; Unresponsive = Lost dengan alasan "Tidak merespons"; Overdue dan Duplikat adalah kondisi, bukan status.

## Skenario QA
Katalog di `src/DemoScenarios.php` (70 skenario) dan ditampilkan di menu Skenario uji: kode, akun yang dipakai, langkah, hasil yang diharapkan, dan tautan ke data. Hasil yang diharapkan diverifikasi otomatis oleh `php tests/run.php` Fase 3, jadi katalog tidak boleh berbeda dari perilaku sistem.

## Definisi metrik Laporan CRM
Lihat `LeadSvc::analytics`. Win rate, Time to Won, dan semua angka mengikuti periode; kondisi pipeline saat ini ada di halaman Pipeline lead. Perubahan ini dicatat sebagai K11 di `docs/01-keputusan.md`.


## Tambahan 10 Nov 2026: kode tetap dan impor data lama

Enam skenario baru (KOD-01, KOD-02, IMP-01 sampai IMP-04) menguji kode bergaya lama dan impor tiga jenis berkas fiktif. Berkas contoh diunduh dari menu Impor data lama (PMO atau Finance) dan dibuat oleh `DemoLegacy`, jadi tidak ada berkas data di repo. Total skenario: 70.

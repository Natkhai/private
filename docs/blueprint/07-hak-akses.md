# 07. Hak Akses

R = baca, W = tulis/ubah, A = setujui, S = ajukan, K = acknowledge, "own" = milik sendiri, "asg" = yang ditugaskan.

## Matriks fitur
| Data / fitur | STU | MEN | ADM | FIN | PMO | MGT | MKT |
|---|---|---|---|---|---|---|---|
| Lead / CRM | - | - | RW | - | R | R | RW (tanpa konversi) |
| Database mentor (dasar) | - | R own | RW | R | R | R | - |
| Ketersediaan mentor | - | - | RW | - | R | - | - |
| Draf kurikulum | K | RW asg | R | - | R | R | - |
| Kurikulum terkonfirmasi | R own | R asg | RW | - | R | R | - |
| Enrollment | R own | R asg | RW | R terkait | R | R | - |
| Jadwal sesi | R own | RW asg | RW | R | R | R | - |
| Laporan sesi | R own (dibagikan) | RW own | R | R | R | R | - |
| Pembayaran student | R own + unggah | - | RW (catat) | RW (verifikasi) | R | R | - |
| Honor mentor | - | S own, R own | - | RW | R | R | - |
| Tier & tarif | - | R tarif sendiri | - | R | RW (usul) | A | - |
| Rekening mentor | - | RW own | - | RW | R tersamar | - | - |
| Harga/paket | R paket sendiri | - | R | RW (usul) | RW (usul) | A | - |
| Tujuan pembayaran | R (setelah paket) | - | R | RW (usul) | RW (usul) | A | - |
| Chat enrollment | RW own | RW asg | RW (intervensi, tercatat) | - | - | - | - |
| Dashboard | R own | R asg | R | R | R | R | - |
| Keputusan kasus | - | - | R | - | RW | R | - |
| Pengaturan sistem | - | - | - | - | RW | R | - |
| Audit | - | - | R (disamarkan) | R | R | R | - |

Catatan: Konfigurasi disetujui hanya oleh MGT (D-04). Pengusul tidak otomatis menjadi penyetuju.

## Izin per kolom (kritis)
| Kolom/data | Dilarang untuk | Alasan |
|---|---|---|
| tier, tarif, honor, rekening | ADM, MKT, STU | K10 |
| ketersediaan & beban mentor | STU | PRD ST-02-2 |
| catatan internal verifikasi bayar | STU, ADM | ST-05-5 |
| catatan internal mentor | STU | ST-06-3 |
| rekening lengkap | semua kecuali FIN dan pemilik mentor | C3 |
| harga paket orang lain | STU | minimum akses |

## Jalur kebocoran yang wajib diuji
1. KPI dan dashboard yang menjumlahkan honor.
2. Audit log (nilai keuangan disamarkan untuk ADM).
3. Ekspor CSV/XLSX.
4. Detail sesi (kolom honor) dan pesan galat.
5. Filter, pencarian, dan pengurutan daftar mentor (tidak boleh berdasar tier/tarif).
6. Pencarian kode (`PRL-`, `MNT` keuangan) untuk peran tak berhak.
7. ID berurutan yang dapat ditebak: setiap akses memeriksa pemilik, bukan hanya peran.

## Pemisahan tugas
| Dilarang | Alasan |
|---|---|
| ADM memverifikasi uang | K12 |
| FIN/PMO menyetujui usulannya sendiri | D-04 |
| MEN mengubah nominal honor | BR-HON-05 |
| STU mengedit kurikulum | BR-CUR-01 |
| ADM mengisi laporan sesi | BR-HON-03 |

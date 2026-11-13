# 09. Rencana Pengujian

## 1. Strategi
| Lapis | Tujuan | Alat/cara |
|---|---|---|
| Unit domain | Aturan uang, jadwal, honor, status | Tes otomatis atas fungsi murni; kontrak pemindahan |
| Integrasi | Transaksi, status berantai, audit | Tes layanan dengan database uji |
| Kontrak akses | Kolom terlarang tidak muncul | Tes per endpoint per peran |
| UI/E2E | Alur lintas peran | Skrip E2E untuk alur kritis |
| UAT | Pemilik proses menyetujui | Skenario per peran dengan data fiktif |
| Keamanan | RBAC, unggahan, sesi | Tinjauan dan uji penetrasi dasar |
| Pilot | Metrik sasaran tercapai | 3 sampai 4 minggu paralel WhatsApp |

## 2. Test case inti
| ID | Aturan | Skenario | Hasil yang diharapkan |
|---|---|---|---|
| TC-PKG-01 | BR-PKG-05 | Ubah harga paket setelah enrollment dibuat | Enrollment lama tidak berubah |
| TC-PAY-01 | BR-PAY-02 | Paket 10 sesi, Verified 50% | Enrollment Active, status DP Paid |
| TC-PAY-02 | BR-PAY-02 | Paket 5 sesi (aturan lama), Verified 49% | Tetap Waiting Payment, peringatan |
| TC-PAY-03 | BR-PAY-03 | Admin mencoba memverifikasi | Ditolak 403 |
| TC-PAY-04 | BR-PAY-04 | Ubah pembayaran Verified | Ditolak; hanya catatan koreksi |
| TC-PAY-05 | BR-PAY-06 | Nominal Rp9.000 / bukan kelipatan 1.000 | Ditolak dengan pesan jelas |
| TC-PAY-06 | BR-PAY-08 | Student membuka pembayaran | Catatan internal tidak ada di respons |
| TC-SCH-01 | BR-SCH-02 | Jadwal tumpang tindih Zoom | Ditolak, sesi penyebab ditampilkan |
| TC-SCH-02 | BR-SCH-03 | Mentor yang sama dua sesi sejam sama | Ditolak |
| TC-SCH-03 | BR-SCH-04 | Reschedule | Sesi lama Rescheduled menunjuk sesi baru; alasan wajib |
| TC-SCH-04 | BR-SCH-06 | Tanpa respons 7 hari | Penanda Pasif, tidak berubah status |
| TC-RPT-01 | BR-HON-02 | Isi laporan sebelum sesi mulai | Ditolak |
| TC-RPT-02 | BR-HON-03 | Admin mengisi laporan | Ditolak 403 |
| TC-HON-01 | BR-HON-04 | Sesi Completed | Honor Eligible dengan tarif tier tanggal sesi |
| TC-HON-02 | BR-HON-04 | Tarif tier diubah sesudahnya | Honor historis tetap |
| TC-HON-03 | BR-HON-05 | Mentor mengubah nominal | Ditolak |
| TC-HON-04 | BR-HON-05 | Sesi sudah diajukan diajukan lagi | Ditolak |
| TC-HON-05 | BR-HON-06 | Finance menolak | Alasan wajib; sesi kembali Eligible |
| TC-HON-06 | BR-HON-06 | Ubah honor Paid | Ditolak |
| TC-HON-07 | BR-HON-07 | Mentor tanpa tier | Honor tertahan, peringatan terkirim |
| TC-CUR-01 | BR-CUR-01 | Student mengedit kurikulum | Ditolak |
| TC-CUR-02 | BR-CUR-02 | Acknowledge | Cap waktu + identitas tercatat di audit |
| TC-CUR-03 | BR-CUR-04 | Ubah kurikulum terkonfirmasi | Terbentuk revisi baru; lama tersimpan |
| TC-CFG-01 | BR-CFG-01 | Pengusul menyetujui sendiri | Ditolak |
| TC-CFG-02 | BR-CFG-01 | PMO/Finance menyetujui usulan | Ditolak; hanya Management |
| TC-CFG-03 | BR-CFG-02 | Persetujuan sesudah tanggal efektif | Berlaku sejak persetujuan, tidak mundur |
| TC-MEN-01 | BR-MEN-03 | Ganti mentor | Sesi lama tetap milik mentor lama; sesi baru mentor baru |
| TC-MEN-02 | BR-MEN-01 | Ganti mentor tanpa alasan | Ditolak |
| TC-SEC-01 | NFR-SEC-01 | Admin memanggil semua endpoint | Tidak ada tier/tarif/honor/rekening |
| TC-SEC-02 | NFR-SEC-01 | Student mengakses ENR milik student lain | 403/404 |
| TC-SEC-03 | NFR-SEC-02 | Finance membuka rekening | Tercatat di audit |
| TC-SEC-04 | NFR-SEC-03 | Unggah berkas tipe terlarang/terlalu besar | Ditolak |
| TC-DAT-01 | BR-DAT-01 | Impor/pembuatan dua baris dengan kode sama | Ditolak |
| TC-DAT-02 | BR-DAT-02 | Hapus enrollment | Tidak tersedia; hanya arsip |
| TC-DAT-03 | BR-DAT-04 | Konversi lead | Lead tetap terhubung dan tersimpan |
| TC-MON-01 | FR-MON-01 | Laporan lewat H+1 | Muncul di dashboard PMO dan peringatan |
| TC-ENR-01 | FR-ENR-04 | Enrollment ganda untuk student sama | Peringatan sebelum simpan |

## 3. UAT per peran
Setiap skenario dijalankan oleh pemilik proses dengan data fiktif lalu dicatat lulus/gagal beserta bukti. Gate: semua skenario P0 lulus, tidak ada temuan severity tinggi.

| Peran | Skenario |
|---|---|
| ADM | Lead sampai Won, enrollment, jadwal bentrok, catat pembayaran |
| MEN | Draf kurikulum, laporan sesi H+1, pengajuan honor |
| STU | Acknowledge, lihat jadwal, unggah bukti, baca progres, chat |
| FIN | Verifikasi, tolak, tinjau dan bayar honor |
| PMO | Dashboard, keputusan kasus, usulan konfigurasi |
| MGT | Setujui/tolak usulan, baca ikhtisar |

## 4. Kriteria keluar
- Tahap fungsional: semua TC-P0 lulus di CI.
- Pra-pilot: UAT lulus, kontrak akses lulus, uji pemulihan cadangan berhasil.
- Pilot: metrik G1 sampai G5 tercapai dua minggu berturut-turut.

## 5. Data uji
Data fiktif (nama berakhiran "(demo)", email `@contoh.invalid`); tanggal relatif hari ini agar peringatan selalu benar.

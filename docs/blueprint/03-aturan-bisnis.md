# 03. Katalog Aturan Bisnis

Sumber: Operational Book v1.0 [B], PRD v1.0 [P], repo [R], keputusan sesi ini [D].

## Paket dan harga (BR-PKG)
| ID | Aturan | Sumber |
|---|---|---|
| BR-PKG-01 | **Aturan berlaku saat ini (aturan lama)**: <5 sesi Rp350.000/sesi, lunas di awal, 3 bulan; 5 sesi Rp1.750.000, DP 50% lunas sebelum sesi ke-3, 3 bulan; 10 sesi Rp3.000.000, DP 50% lunas sebelum sesi ke-6, 6 bulan; 20 sesi Rp5.000.000, DP 50% lunas sebelum sesi ke-11, 12 bulan. | R `docs/11`, D-02, D-03 |
| BR-PKG-02 | **Ketentuan terbaru (tersimpan, belum berlaku)**: <5 sesi Rp370.000/sesi lunas awal; 5 sesi Rp1.750.000 lunas awal; 10 sesi Rp3.000.000 cicil 2x lunas sebelum sesi 6; 20 sesi Rp5.400.000 cicil 2x lunas sebelum sesi 11. Masa aktif sama. | R `docs/11`, B |
| BR-PKG-03 | Satu sesi = 2 jam, online lewat akun Zoom Private. | B |
| BR-PKG-04 | Jumlah sesi direkomendasikan mentor/Admin; keputusan akhir di student. | B, P |
| BR-PKG-05 | Saat enrollment dibuat, harga, kuota, masa aktif, dan aturan DP disalin (snapshot). Perubahan konfigurasi tidak mengubah enrollment yang ada. | P, R |
| BR-PKG-06 | Refund umumnya tidak tersedia. Prioritas penyelesaian: reschedule, penyesuaian program, penggantian mentor. Refund hanya bila Devata tidak dapat memberi layanan (proses: OQ-14). | B, P |
| BR-PKG-07 | Paket <5 sesi dibatasi 1 sampai 4 sesi (OQ-16). | R [USULAN] |

## Pembayaran (BR-PAY)
| ID | Aturan | Sumber |
|---|---|---|
| BR-PAY-01 | Status pembayaran dihitung dari pembayaran Verified: Pending, DP Paid, Partially Paid, Paid. Tidak diketik manual. | P, R |
| BR-PAY-02 | Enrollment menjadi Active bila syarat awal terpenuhi: lunas (paket lunas di awal) atau DP minimal 50% (paket cicil). Di bawah itu tetap Waiting Payment (OQ-04). | P, R |
| BR-PAY-03 | Pembayaran dicatat Pending (oleh student lewat unggah bukti atau Admin atas nama student); hanya Finance yang memverifikasi. Admin tidak dapat memverifikasi. | K12, D-01 |
| BR-PAY-04 | Verified tidak dapat diubah; koreksi lewat catatan koreksi baru. Rejected wajib beralasan. | P, R |
| BR-PAY-05 | Pelunasan kurang menghasilkan peringatan dan penanda payment-at-risk; pemblokiran sesi belum diputuskan (OQ-03). | P |
| BR-PAY-06 | Nominal pembayaran minimal Rp10.000 dan kelipatan Rp1.000; melebihi sisa tagihan butuh konfirmasi. | R H2 [SUMBER] |
| BR-PAY-07 | Tujuan pembayaran berasal dari konfigurasi yang disetujui Owner; hanya tampil setelah paket ditetapkan. | D-04 |
| BR-PAY-08 | Catatan internal Finance tidak tampil ke student. | P |

## Jadwal (BR-SCH)
| ID | Aturan | Sumber |
|---|---|---|
| BR-SCH-01 | Jadwal disepakati mentor dan student, lalu dicatat di sistem. | B |
| BR-SCH-02 | Admin bertanggung jawab atas ketersediaan akun Zoom Private; sistem menolak overlap pada akun tersebut (kapasitas OQ-13). | B, R |
| BR-SCH-03 | Mentor atau student tidak boleh memiliki dua sesi di jam yang sama. | R |
| BR-SCH-04 | Reschedule dengan kesepakatan; sistem menyimpan jadwal terakhir dan riwayat. | B, P |
| BR-SCH-05 | Reschedule berulang ditinjau Admin dan PMO (ambang OQ-15). | B |
| BR-SCH-06 | Student pasif bila tidak merespons terkait jadwal 7 hari berturut-turut; urutan tindak lanjut mentor, Admin, PMO. | B, P |
| BR-SCH-07 | Tidak ada status NO_SHOW; no-show dicatat sebagai Cancelled dengan alasan (OQ-02). | R |

## Laporan dan honor (BR-HON)
| ID | Aturan | Sumber |
|---|---|---|
| BR-HON-01 | Sesi valid untuk honor bila terlaksana dan laporan mentor terkirim. | B, P |
| BR-HON-02 | Batas laporan maksimal H+1 setelah sesi. Laporan tidak dapat diisi sebelum sesi dimulai. | B, R |
| BR-HON-03 | Laporan hanya dibuat oleh mentor pengajar; Admin hanya membaca. | K17 |
| BR-HON-04 | Honor per sesi = tarif tier mentor pada tanggal sesi, disimpan sebagai snapshot saat sesi Completed. Perubahan tarif tidak mengubah honor historis. | D-05, P |
| BR-HON-05 | Mentor dapat mengajukan satu atau banyak sesi eligible kapan saja (dapat dibatasi OQ-05); sesi yang sudah diajukan tidak dapat diajukan lagi; nominal tidak dapat diubah. | P |
| BR-HON-06 | Finance meninjau lalu menyetujui atau menolak (alasan wajib); penolakan melepas sesi. Pembayaran dicatat terpisah; Paid tidak dapat diubah. | P, R |
| BR-HON-07 | Mentor tanpa tier: honor tertahan, peringatan ke Finance dan PMO. | R |
| BR-HON-08 | Harga sesi student sudah termasuk honor mentor. | K9 |
| BR-HON-09 | Honor mengikuti mentor pengajar sesi (termasuk mentor tamu) [USULAN, perlu konfirmasi]. | R |

## Kurikulum (BR-CUR)
| ID | Aturan | Sumber |
|---|---|---|
| BR-CUR-01 | Draf dibuat mentor sebelum pembayaran; student hanya acknowledge, tidak mengedit. | P |
| BR-CUR-02 | Acknowledgement mencatat identitas dan waktu. | P |
| BR-CUR-03 | Kurikulum aktif hanya setelah acknowledgement dan konfirmasi mentor. | P |
| BR-CUR-04 | Kurikulum terkonfirmasi tidak ditimpa; perubahan menjadi revisi baru yang melewati alur yang sama. | P |

## Mentor (BR-MEN)
| ID | Aturan | Sumber |
|---|---|---|
| BR-MEN-01 | Mentor dapat diganti bila tidak tersedia/mengundurkan diri, kebutuhan berubah, tidak cocok, atau kualitas layanan; alasan wajib. | B, P |
| BR-MEN-02 | Student mengetahui dan menyetujui penggantian. | B |
| BR-MEN-03 | Sesi lama tetap milik mentor yang mengajar; sesi baru memakai mentor baru. | P |
| BR-MEN-04 | Penggantian mentor dapat mengubah biaya (tier berbeda); PMO menerima catatan dampak margin. | R |
| BR-MEN-05 | Data ketersediaan dan beban hanya untuk Admin/PMO; student hanya melihat ringkasan profil. | P |

## Konfigurasi (BR-CFG)
| ID | Aturan | Sumber |
|---|---|---|
| BR-CFG-01 | PMO atau Finance mengusulkan; Management/Owner menyetujui. | D-04 |
| BR-CFG-02 | Usulan wajib punya tanggal efektif dan alasan; tidak berlaku mundur; bila persetujuan melewati tanggal efektif, berlaku sejak persetujuan. | R |
| BR-CFG-03 | Seluruh langkah masuk audit (pengusul, penyetuju, nilai lama dan baru). | P |
| BR-CFG-04 | Peringatan margin negatif atau di bawah batas (bukan pemblokir). | R |

## Data (BR-DAT)
| ID | Aturan | Sumber |
|---|---|---|
| BR-DAT-01 | Kode `PREFIX-NNN` unik, permanen, tidak dipakai ulang, diambil dari penghitung per prefix. | R |
| BR-DAT-02 | Tidak ada penghapusan permanen; arsip. | R |
| BR-DAT-03 | Student yang mengambil program baru memperoleh enrollment baru. | B |
| BR-DAT-04 | Lead tetap tersimpan dan terhubung setelah konversi. | P |

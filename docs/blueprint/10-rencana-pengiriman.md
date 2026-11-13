# 10. Rencana Pengiriman

Estimasi waktu sengaja tidak ditulis: butuh volume (OQ-12), ukuran tim, dan hasil audit Portal (OQ-18). Urutan dan gate ditetapkan; durasi diisi PM setelah informasi itu ada.

## 1. Tahapan
| Tahap | Isi | Keluaran | Gate keluar | Bergantung pada |
|---|---|---|---|---|
| 0. Validasi | Dry-run 3 kasus nyata (paket <5, paket 10 dengan DP, ganti mentor); inventaris volume; baseline pertanyaan status; audit Portal; jawab OQ blocking | Dokumen terkonfirmasi, baseline | Owner menyetujui alur dan OQ blocking terjawab | OQ-01, 06, 08, 09, 12, 18, 23, 24 |
| 1. Fondasi | Identitas dan peran, kode, audit, konfigurasi + persetujuan Owner, paket, tier, mentor, CRM | Lead sampai Waiting Payment | TC-CFG, TC-SEC, TC-DAT lulus | Tahap 0 |
| 2. Inti operasi | Enrollment, kurikulum + acknowledgement, jadwal + bentrok, pembayaran + unggah, verifikasi | Enrollment Active sampai sesi berjalan | TC-PAY, TC-SCH, TC-CUR lulus | Tahap 1 |
| 3. Portal student | Beranda, kurikulum, jadwal, pembayaran, progres, chat | Student mandiri | UAT STU lulus, uji ponsel | Tahap 2, OQ-09 |
| 4. Honor & monitoring | Laporan, honor, dashboard, kasus, metrik, audit | MVP lengkap | TC-HON, TC-MON lulus | Tahap 2 |
| Pilot | Paralel WhatsApp, evaluasi mingguan | Keputusan lanjut/ubah | Metrik G1 sampai G5 dua minggu berturut | Tahap 3-4 |
| 5. Penyempurnaan | Closing lengkap, dokumen cetak, impor, notifikasi, ekspor | Rilis 1.1 | Sesuai hasil pilot | Pilot |
| 6. Integrasi Portal | SSO, identitas, chat Portal | Private di Portal | Flow dinyatakan pasti Owner | OQ-18 |

## 2. Tim dan tanggung jawab
| Peran | Tanggung jawab |
|---|---|
| Product Owner (Owner Devata) | Keputusan bisnis, persetujuan konfigurasi, jawaban OQ |
| Product Manager | PRD, prioritas, traceability, backlog |
| Business Analyst | Aturan bisnis, flowchart, UAT |
| Software Architect | Arsitektur, ADR, audit Portal, kontrak API |
| UX/UI Designer | Wireframe, prototipe, aksesibilitas |
| Backend Engineer | Domain, API, basis data, audit |
| Frontend Engineer | UI per peran, portal student |
| QA Engineer | Rencana tes, otomasi, UAT |
| Security Engineer | Model akses, berkas, enkripsi, kajian data pribadi |
| DevOps | Lingkungan, CI/CD, cadangan, pemantauan |
| Project Manager | Jadwal, risiko, gate |

## 3. RACI (R pelaksana, A akuntabel, C konsultasi, I diinformasikan)
| Artefak/keputusan | PO | PM | BA | Arch | UX | Dev | QA | Sec | DevOps |
|---|---|---|---|---|---|---|---|---|---|
| Jawaban OQ | A | R | C | C | I | I | I | C | I |
| PRD & prioritas | A | R | C | C | C | I | I | I | I |
| Aturan bisnis & flow | A | C | R | C | C | I | C | I | I |
| Arsitektur & ADR | I | C | C | A/R | I | C | I | C | C |
| Wireframe | A | C | C | I | R | C | I | I | I |
| Implementasi | I | A | C | C | C | R | C | C | I |
| Tes & UAT | A | C | R | I | I | C | R | C | I |
| Keamanan & privasi | A | C | I | R | I | C | C | R | C |
| Rilis & pemulihan | A | R | I | C | I | C | C | C | R |

## 4. Definition of Ready
- Masalah, peran, aturan bisnis, dan pemilik keputusan tertulis dan tidak bergantung pada OQ terbuka.
- Acceptance criteria dapat diuji dan punya TC.
- Hak akses dan data sensitif dipetakan.
- Layar dan alur terkait ada di wireframe.

## 5. Definition of Done
- Acceptance criteria dan TC lulus; kontrak akses lulus.
- Audit dan snapshot terverifikasi untuk perubahan uang/status.
- UAT pemilik proses menyetujui.
- Dokumen (PRD, aturan, flow, traceability) diperbarui.
- Dapat dipulihkan (cadangan) dan ada catatan rollback.

## 6. Risiko
| ID | Risiko | Dampak | Mitigasi | Pemilik |
|---|---|---|---|---|
| R1 | Flow belum pasti sebelum kode (mengulang percobaan lama) | Pembangunan ulang | Tahap 0 wajib, 3 kasus nyata | PM |
| R2 | Tim tetap memakai WhatsApp | Sistem kosong | Pilot paralel, satu PIC admin, metrik "tercatat sebelum berlangsung" | PO |
| R3 | Cakupan melebar (chat, notifikasi, sertifikat) | Terlambat | Non-goal eksplisit, setiap tambahan menyingkirkan sesuatu | PM |
| R4 | Aturan uang salah | Kerugian, sengketa | Tes domain, snapshot, audit | Arsitek |
| R5 | Kebocoran data honor/rekening | Konflik internal | Izin per kolom, tes kontrak | Security |
| R6 | Persetujuan Owner macet | Konfigurasi tertahan | Delegasi (OQ-22), tanggal efektif memberi jeda | PO |
| R7 | Portal student menambah beban dukungan dan privasi | Biaya | Pelatihan, FAQ, kajian OQ-23, rilis bertahap | PM |
| R8 | Penyimpanan bukti bayar tidak aman | Kebocoran | OQ-06, penyimpanan non-publik, tautan bertoken | Security |
| R9 | Stack Portal berbeda dari asumsi | Pengerjaan ulang | Audit OQ-18 sebelum desain teknis final | Arsitek |
| R10 | Dibangun dua kali (mandiri lalu Portal) | Biaya | Logika murni + tes sebagai aset | Arsitek |
| R11 | Dokumen sumber bertentangan | Salah implementasi | Register CF-xx dan keputusan D-xx | PM |

## 7. Kriteria rilis
Gate 1 UAT internal, Gate 2 pilot, Gate 3 integrasi Portal (lihat menu Validasi produk di aplikasi).

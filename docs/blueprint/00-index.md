# Blueprint Sistem Private Devata

Paket dokumen untuk membangun sistem Private (layanan mentoring 1-on-1) dari lead sampai selesai. Setiap dokumen saling menaut lewat ID yang sama sehingga perubahan di satu tempat dapat ditelusuri ke tempat lain.

## Peta dokumen

| No | Dokumen | Pemilik | Isi | Menaut ke |
|---|---|---|---|---|
| 01 | `01-keputusan-dan-pertanyaan.md` | Product Owner | Keputusan terkonfirmasi (D-xx), konflik antar sumber (CF-xx), pertanyaan terbuka (OQ-xx) | semua |
| 02 | `02-prd.md` | Product Manager | Tujuan, ruang lingkup, peran, kebutuhan fungsional (FR) dan non-fungsional (NFR) | 01, 03, 09, 11 |
| 03 | `03-aturan-bisnis.md` | Business Analyst | Katalog aturan bisnis (BR-xx) | 02, 04, 05, 11 |
| 04 | `04-flowchart.md` | Business Analyst | Alur proses F1 sampai F10 (Mermaid) | 02, 03, 05, 09 |
| 05 | `05-status-dan-transisi.md` | Business Analyst | Mesin status semua entitas | 03, 04, 06 |
| 06 | `06-arsitektur.md` | Software Architect | Konteks, modul, ERD, API, keamanan, integrasi, deployment | 05, 07, 08 |
| 07 | `07-hak-akses.md` | Architect + Security | Matriks peran, izin per kolom, aturan kebocoran data | 02, 06, 11 |
| 08 | `08-ux-wireframe.md` | UX Designer | Arsitektur informasi, inventaris layar (SCR-xx), pola UI | 02, 04, 09 |
| 09 | `09-rencana-pengujian.md` | QA Lead | Strategi tes, test case (TC-xx), UAT | 02, 03, 11 |
| 10 | `10-rencana-pengiriman.md` | Project Manager | Tahap, RACI, risiko, Definition of Ready/Done, kriteria rilis | semua |
| 11 | `11-traceability.md` | Product Manager | FR ke layar, alur, aturan, tes | semua |

## Konvensi ID

| Awalan | Arti | Contoh |
|---|---|---|
| D | Keputusan terkonfirmasi | D-04 |
| CF | Konflik antar sumber | CF-02 |
| OQ | Pertanyaan terbuka | OQ-01 |
| BR | Aturan bisnis | BR-PAY-03 |
| FR | Kebutuhan fungsional | FR-HON-02 |
| NFR | Kebutuhan non-fungsional | NFR-SEC-01 |
| F | Flowchart | F6 |
| SCR | Layar | SCR-ADM-05 |
| TC | Test case | TC-PAY-04 |
| Kode data | Rujukan baris di sistem | LEAD-001, STD-001, ENR-001, SES-001, PAY-001, PRL-001, MNT-001 |

## Sumber dan tingkat kepercayaan

1. **Operational Book Private Devata v1.0** (PDF): sumber kebenaran aturan bisnis.
2. **PRD Private Module v1.0** (docx): kebutuhan produk, termasuk portal student.
3. **Repo `Natkhai/private`, folder `docs/`**: keputusan Mas Radev K1 sampai K18, PRD MVP Rev. 2, ketentuan paket, analisis spreadsheet.
4. **Jawaban Anda pada sesi ini**: keputusan D-01 sampai D-06, mengalahkan sumber lain bila bertentangan.

Tanda dalam dokumen:

- **[KONFIRMASI]** sudah dikonfirmasi pemilik.
- **[SUMBER]** tertulis di dokumen sumber.
- **[USULAN]** usulan tim blueprint, belum dikonfirmasi, tidak boleh dianggap benar.
- **[TERBUKA]** belum ada keputusan; lihat OQ-xx.

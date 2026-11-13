# 11. Matriks Traceability

Rantai: kebutuhan pengguna -> FR -> aturan bisnis -> alur -> layar -> test case.

| FR | Aturan | Alur | Layar | Test |
|---|---|---|---|---|
| FR-AUTH-01..04 | - | - | SCR-X-03 | TC-SEC-01,02 |
| FR-CRM-01..05 | BR-DAT-04 | F2 | SCR-ADM-02 | TC-DAT-03 |
| FR-MAT-01..03 | BR-MEN-05 | F2 | SCR-ADM-03 | TC-SEC-01 |
| FR-MAT-04,05 | BR-MEN-01..04 | F8 | SCR-ADM-04 | TC-MEN-01,02 |
| FR-CUR-01..05 | BR-CUR-01..04 | F3 | SCR-MEN-02, SCR-STU-02 | TC-CUR-01..03 |
| FR-ENR-01..04 | BR-PKG-05, BR-DAT-03 | F2 | SCR-ADM-04 | TC-PKG-01, TC-ENR-01 |
| FR-ENR-06 | - | F9 | SCR-ADM-04, SCR-PMO-02 | TC-SCH-04 |
| FR-SCH-01..05 | BR-SCH-01..07 | F5 | SCR-ADM-05, SCR-MEN-03 | TC-SCH-01..04 |
| FR-SCH-06 | BR-SCH-04 | F5 | SCR-STU-03 | TC-SEC-02 |
| FR-RPT-01..03 | BR-HON-01..03 | F6 | SCR-MEN-03, SCR-ADM-05 | TC-RPT-01,02, TC-MON-01 |
| FR-RPT-04, FR-STU-01..04 | BR-MEN-05 | F6 | SCR-STU-01,05 | TC-SEC-02 |
| FR-RPT-05, FR-MON-04 | - | F10 | SCR-MEN-04, SCR-ADM-04 | UAT |
| FR-PAY-01..08 | BR-PAY-01..08 | F4 | SCR-STU-04, SCR-ADM-06, SCR-FIN-02 | TC-PAY-01..06, TC-SEC-04 |
| FR-HON-01..07 | BR-HON-04..09 | F6 | SCR-MEN-05, SCR-FIN-03 | TC-HON-01..07 |
| FR-CFG-01..06 | BR-CFG-01..04, BR-PKG-01,02 | F7 | SCR-CFG-01,02 | TC-CFG-01..03 |
| FR-CHT-01,02 | - | F5, F8 | SCR-STU-06 | UAT |
| FR-MON-01..03 | BR-SCH-05,06 | F9 | SCR-PMO-01,02, SCR-MGT-01 | TC-MON-01 |
| FR-AUD-01 | BR-CFG-03 | semua | SCR-X-03 | TC-SEC-03 |
| FR-DOC-01 | - | F10 | SCR-ADM-04 | UAT |

## Pemeriksaan konsistensi
1. Setiap FR P0 harus punya minimal satu layar dan satu tes.
2. Setiap aturan BR harus muncul di minimal satu alur.
3. Setiap alur harus memiliki layar untuk setiap langkah manusia.
4. Setiap OQ blocking harus muncul sebagai syarat gate di dokumen 10.
5. Perubahan pada status (dokumen 05) wajib memperbarui alur (04), aturan (03), dan tes (09).

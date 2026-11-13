# Framework Pengembangan Private Module

Dokumen ini memetakan Design Thinking ke SDLC agar kebutuhan pengguna, keputusan bisnis, implementasi, dan pengujian dapat ditelusuri.

## 1. Design Thinking

### Empathize

Sumber pemahaman pengguna:

- Operational Book Private Devata.
- PRD MVP Revisi 2.
- Keputusan K1–K18.
- Analisis spreadsheet dan aplikasi lama.
- Dry-run dengan Admin, Mentor, Finance, PMO, dan Marketing.

Kebutuhan utama tiap peran:

| Peran | Pekerjaan utama | Pain point |
|---|---|---|
| Admin | Lead sampai enrollment aktif | Informasi ada di WhatsApp, banyak follow-up manual |
| Mentor | Mengajar, membuat laporan, mengajukan honor | Laporan dan honor direkap ulang |
| Finance | Verifikasi pembayaran dan membayar honor | Sumber transaksi dan payroll terpisah |
| PMO | Memantau risiko dan menjaga konfigurasi | Mengetahui masalah setelah terlambat |
| Marketing | Mengelola CRM | Tidak ada pipeline dan next action bersama |

### Define

Problem statement:

> Tim Private membutuhkan satu catatan operasional yang dapat dipercaya agar status lead, enrollment, jadwal, pembayaran, laporan sesi, dan honor diketahui tanpa bertanya ulang ke Admin, dengan tetap menjaga pemisahan akses keuangan dan kebiasaan komunikasi melalui WhatsApp.

How Might We:

> Bagaimana kita dapat membuat setiap peran mengetahui tindakan berikutnya dan status terbaru dalam kurang dari satu menit, tanpa membocorkan data yang tidak dibutuhkan?

### Ideate

Solusi yang diprioritaskan:

1. Beranda berbasis tindakan untuk setiap peran.
2. Kode tetap `LEAD`, `STD`, `ENR`, `SES`, `PAY`, dan `PRL`.
3. Pencarian cepat lintas entitas yang menghormati hak akses.
4. Validasi bentrok Zoom dan peringatan operasional.
5. Maker-checker PMO–Finance untuk konfigurasi uang.
6. Honor otomatis dari laporan sesi dan tier mentor.
7. Audit trail dan snapshot nilai historis.

### Prototype

Prototype memakai data fiktif dan pergantian akun. Prototype tidak menyentuh data riil, tidak mengirim WhatsApp, dan belum menjadi sistem produksi.

### Test

Prototype diuji melalui:

- UAT per peran.
- Tes aturan bisnis pembayaran, jadwal, dan honor.
- Tes kontrak keamanan agar Admin tidak menerima data tier, tarif, honor, atau rekening mentor.
- Pilot paralel dengan WhatsApp selama 3–4 minggu.

## 2. SDLC

| Fase | Exit criteria | Artefak |
|---|---|---|
| Planning | Scope, goal, non-goal, risiko, dan pemilik disepakati | PRD MVP Rev. 2 |
| Analysis | Aturan bisnis, role, izin, data, dan proses disepakati | Operational Book dan keputusan K1–K18 |
| Design | IA, wireframe, data model, status, dan audit disetujui | Prototype |
| Development | Requirement P0 terimplementasi dengan akses server-side | Backlog dan kode |
| Testing | Unit, integration, security contract, dan UAT lulus | Laporan tes dan UAT |
| Deployment | Pilot disetujui dan prosedur backup/rollback siap | Runbook pilot |
| Maintenance | Metrik, audit, backup, dan backlog perbaikan berjalan | Laporan mingguan |

## 3. Gate

### Gate UAT internal

- Semua acceptance criteria P0 lulus.
- Tes akses data sensitif lulus.
- Tidak ada temuan severity tinggi.
- Pemilik proses menyetujui alur.

### Gate pilot

- UAT internal lulus.
- Tiga kasus dry-run selesai: paket fleksibel, paket 10 sesi dengan DP, dan penggantian mentor.
- Nilai tier dan maker-checker dikonfirmasi.
- Backup dan pemulihan diuji.

### Gate integrasi Portal

- Pilot mencapai target selama dua minggu berturut.
- Tidak ada perubahan flow besar selama dua minggu.
- Mapping identitas, peran, dan data Portal disetujui.

## 4. Traceability

Setiap perubahan wajib memiliki rantai:

`User need → Requirement → Acceptance criteria → UI/API → Test case → UAT evidence`

Perubahan yang tidak memiliki rantai tersebut tidak masuk sprint implementasi.

## 5. Metrik keberhasilan

- 100% sesi tercatat sebelum berlangsung.
- 0 bentrok Zoom lolos.
- Minimal 90% laporan masuk dalam H+1.
- Finance menutup payroll tanpa spreadsheet pembantu.
- Pertanyaan status ke Admin turun minimal 50%.

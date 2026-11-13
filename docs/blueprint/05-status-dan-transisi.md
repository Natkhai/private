# 05. Status dan Transisi

Hanya status resmi dari Book/PRD. Kondisi turunan (Overdue, Passive, At Risk, Expiring, Conflict, Needs Confirm) adalah **penanda**, bukan status.

## Lead
```mermaid
stateDiagram-v2
  [*] --> NEW
  NEW --> CONTACTED
  CONTACTED --> ASSESSMENT
  ASSESSMENT --> MENTOR_MATCHING
  MENTOR_MATCHING --> WAITING_DECISION
  WAITING_DECISION --> WON
  NEW --> LOST
  CONTACTED --> LOST
  ASSESSMENT --> LOST
  MENTOR_MATCHING --> LOST
  WAITING_DECISION --> LOST
  LOST --> CONTACTED: dibuka kembali (dicatat)
```
Lost wajib alasan. Won membuka konversi ke enrollment. Pembukaan kembali Lost [USULAN].

## Enrollment
```mermaid
stateDiagram-v2
  [*] --> DRAFT
  DRAFT --> WAITING_PAYMENT: paket + mentor ditetapkan
  WAITING_PAYMENT --> ACTIVE: syarat awal Verified
  ACTIVE --> ON_HOLD: keputusan PMO/Admin
  ON_HOLD --> ACTIVE
  ACTIVE --> COMPLETED: closing lengkap
  ACTIVE --> EXPIRED: masa aktif habis
  DRAFT --> CANCELLED
  WAITING_PAYMENT --> CANCELLED
  ACTIVE --> CANCELLED
```

## Sesi
```mermaid
stateDiagram-v2
  [*] --> SCHEDULED: dikonfirmasi Admin
  SCHEDULED --> RESCHEDULED: sesi baru menggantikan
  SCHEDULED --> CANCELLED: alasan wajib
  SCHEDULED --> COMPLETED: terlaksana + laporan terkirim
```
`needs_confirm` aktif saat jadwal diajukan mentor dan belum dikonfirmasi Admin. Laporan terlambat = sesi lewat H+1 tanpa laporan.

## Pembayaran (transaksi) dan status bayar enrollment
```mermaid
stateDiagram-v2
  [*] --> PENDING_TX
  PENDING_TX --> VERIFIED: Finance
  PENDING_TX --> REJECTED: Finance + alasan
```
Status bayar enrollment (dihitung): `Pending` -> `DP Paid` / `Partially Paid` -> `Paid` berdasarkan total Verified terhadap harga snapshot dan aturan DP.

## Honor (CF-05, OQ-21)
```mermaid
stateDiagram-v2
  [*] --> ELIGIBLE: sesi Completed + tier ada
  ELIGIBLE --> SUBMITTED: mentor mengajukan
  SUBMITTED --> UNDER_REVIEW: Finance membuka
  UNDER_REVIEW --> APPROVED
  UNDER_REVIEW --> REJECTED: alasan wajib
  REJECTED --> ELIGIBLE: sesi dilepas
  APPROVED --> PAID: tanggal + referensi, final
```

## Kurikulum
```mermaid
stateDiagram-v2
  [*] --> DRAFT
  DRAFT --> SUBMITTED: mentor kirim
  SUBMITTED --> ACKNOWLEDGED: student
  ACKNOWLEDGED --> CONFIRMED: mentor
  CONFIRMED --> SUPERSEDED: revisi baru dikonfirmasi
```

## Usulan konfigurasi
```mermaid
stateDiagram-v2
  [*] --> PROPOSED: PMO/Finance
  PROPOSED --> APPROVED: Owner
  PROPOSED --> REJECTED: Owner + alasan
  APPROVED --> EFFECTIVE: tanggal efektif tercapai
  EFFECTIVE --> SUPERSEDED: usulan baru berlaku
```

## Keterkaitan status antar entitas
| Pemicu | Efek |
|---|---|
| Pembayaran Verified memenuhi syarat awal | Enrollment WAITING_PAYMENT -> ACTIVE |
| Laporan sesi terkirim | Sesi -> COMPLETED; honor ELIGIBLE (bila tier ada) |
| Semua sesi selesai + penilaian akhir | Enrollment siap closing |
| Closing lengkap | Enrollment COMPLETED |
| Masa aktif habis | Enrollment EXPIRED + kasus PMO bila ada sisa sesi |
| Lead WON | Konversi diizinkan; lead tidak dihapus |
| Usulan konfigurasi APPROVED | Berlaku untuk enrollment/sesi baru setelah tanggal efektif |

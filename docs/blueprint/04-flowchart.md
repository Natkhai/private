# 04. Flowchart Proses

Semua diagram memakai Mermaid (tampil di GitHub dan editor Markdown modern). Versi interaktif ada di aplikasi wireframe: menu **Blueprint**, tab Flowchart.

## F1. Siklus hidup end-to-end

```mermaid
flowchart TD
  A([Lead masuk]) --> B[ADM: catat lead LEAD-xxx]
  B --> C[ADM: asesmen + konsultasi gratis]
  C --> D[ADM: mentor matching]
  D --> E[MEN + STU: diskusi arah belajar]
  E --> F[MEN: draf kurikulum]
  F --> G{STU acknowledge?}
  G -- belum --> E
  G -- ya --> H[MEN: konfirmasi kurikulum]
  H --> I[STU memilih paket]
  I --> J[ADM: buat enrollment ENR-xxx, snapshot paket]
  J --> K[Status: Waiting Payment]
  K --> L[STU bayar + unggah bukti]
  L --> M{FIN verifikasi?}
  M -- ditolak --> L
  M -- Verified, syarat awal terpenuhi --> N[Status: Active]
  N --> O[Sesi dijadwalkan dan dilaksanakan]
  O --> P[MEN: laporan sesi maks H+1]
  P --> Q[Honor eligible -> pengajuan -> FIN]
  O --> R{Semua sesi selesai?}
  R -- belum --> O
  R -- ya --> S[MEN: penilaian akhir]
  S --> T[ADM + STU: closing review]
  T --> U([Completed])
```

## F2. Lead menjadi enrollment

```mermaid
flowchart LR
  subgraph MKT_ADM[Marketing / Admin]
    a1[Lead New] --> a2[Contacted]
    a2 --> a3[Assessment]
    a3 --> a4[Mentor Matching]
    a4 --> a5[Waiting Decision]
  end
  a5 --> d{Keputusan lead}
  d -- tidak lanjut --> lost[Lost + alasan wajib]
  d -- lanjut --> won[Won]
  won --> chk{Enrollment ganda?}
  chk -- ya, bukan program baru --> stop[Batal / tinjau ENR lama]
  chk -- tidak --> acct[ADM: buat akun student OQ-08]
  acct --> enr[ADM: buat enrollment, pilih paket + mentor]
  enr --> snap[Sistem: snapshot harga, kuota, masa aktif, aturan DP]
  snap --> wp[Waiting Payment + info bayar tampil ke STU]
```

## F3. Kurikulum dan revisi

```mermaid
flowchart TD
  m1[MEN: buat draf v1] --> m2[MEN: kirim untuk acknowledgement]
  m2 --> s1{STU acknowledge}
  s1 -- minta ubah lewat diskusi --> m1
  s1 -- Acknowledge: cap waktu + identitas --> m3[MEN melihat acknowledged]
  m3 --> m4[MEN: konfirmasi jadi rencana aktif]
  m4 --> act([Kurikulum aktif vN])
  act --> chg{Kebutuhan berubah?}
  chg -- ya --> m5[MEN: buat revisi v+1, versi lama tetap]
  m5 --> m2
  chg -- tidak --> act
```

## F4. Pembayaran student

```mermaid
flowchart TD
  p0[Paket ditetapkan] --> p1[STU melihat nominal, aturan, batas, tujuan bayar]
  p1 --> p2{Siapa mencatat?}
  p2 -- STU --> p3[STU unggah bukti]
  p2 -- ADM atas nama STU --> p4[ADM catat pembayaran]
  p3 --> p5[Status Pending]
  p4 --> p5
  p5 --> p6{FIN verifikasi: jumlah, tanggal, bukti, dobel}
  p6 -- Rejected + alasan --> p7[STU diberi tahu, unggah ulang]
  p7 --> p5
  p6 -- Verified --> p8[Sistem hitung status bayar]
  p8 --> p9{Syarat awal terpenuhi?}
  p9 -- tidak --> p10[Tetap Waiting Payment, peringatan]
  p9 -- ya --> p11[Enrollment Active]
  p11 --> p12{Ada saldo? DP Paid}
  p12 -- ya --> p13[Pantau batas pelunasan: payment-at-risk bila mendekati]
  p13 --> p5
  p12 -- tidak --> p14([Paid])
```

## F5. Penjadwalan, reschedule, bentrok Zoom

```mermaid
flowchart TD
  s1[MEN + STU sepakat jadwal via chat] --> s2[MEN ajukan jadwal / ADM input]
  s2 --> s3{Zoom bentrok, mentor atau student ganda?}
  s3 -- ya --> s4[Tolak + tampilkan sesi penyebab] --> s2
  s3 -- tidak --> s5{Peringatan lunak: masa aktif, batas bayar?}
  s5 -- ya --> s6[Lanjut dengan alasan tercatat]
  s5 -- tidak --> s7
  s6 --> s7[ADM konfirmasi -> Scheduled]
  s7 --> s8[STU dan MEN melihat jadwal + tautan Zoom]
  s8 --> s9{Perlu ubah?}
  s9 -- ya --> s10[Alasan wajib; sesi lama Rescheduled menunjuk sesi baru]
  s10 --> s3
  s10 --> s11{Reschedule berulang?}
  s11 -- ya --> s12[Kasus PMO + ADM]
  s9 -- batal --> s13[Cancelled + alasan]
  s9 -- terlaksana --> s14[Menunggu laporan -> F6]
```

## F6. Laporan sesi sampai honor dibayar

```mermaid
flowchart TD
  h1[Sesi terlaksana] --> h2[MEN isi laporan maks H+1]
  h2 --> h3{Laporan terkirim?}
  h3 -- belum, lewat H+1 --> h4[Peringatan ke MEN, ADM, PMO] --> h2
  h3 -- ya --> h5[Sesi Completed]
  h5 --> h6{Mentor punya tier?}
  h6 -- tidak --> h7[Honor tertahan + peringatan FIN, PMO] --> h6
  h6 -- ya --> h8[Snapshot tarif tier pada tanggal sesi -> Eligible]
  h8 --> h9[MEN pilih 1..n sesi -> Submitted]
  h9 --> h10[FIN: Under Review, cek sesi selesai, laporan ada, tarif]
  h10 --> h11{Keputusan}
  h11 -- Rejected + alasan --> h12[Sesi dilepas, bisa diajukan ulang] --> h8
  h11 -- Approved --> h13[FIN catat pembayaran: tanggal + referensi]
  h13 --> h14([Paid, tidak dapat diubah])
```

## F7. Perubahan konfigurasi (D-04)

```mermaid
flowchart TD
  c1[PMO atau FIN buat usulan: objek, nilai baru, tanggal efektif, alasan] --> c2[Status Proposed + audit]
  c2 --> c3{Owner meninjau}
  c3 -- Rejected + alasan --> c4([Ditolak, tercatat])
  c3 -- Approved --> c5{Tanggal efektif sudah lewat?}
  c5 -- ya --> c6[Berlaku sejak tanggal persetujuan]
  c5 -- tidak --> c7[Berlaku pada tanggal efektif]
  c6 --> c8[Hanya enrollment/sesi baru; riwayat tidak berubah]
  c7 --> c8
  c8 --> c9[Audit: pengusul, penyetuju, nilai lama dan baru]
```

## F8. Penggantian mentor

```mermaid
flowchart TD
  r1[Pemicu: mentor tidak tersedia, kebutuhan berubah, tidak cocok, kualitas] --> r2[ADM pilih mentor pengganti via matching]
  r2 --> r3[Alasan wajib]
  r3 --> r4{STU setuju?}
  r4 -- tidak --> r2
  r4 -- ya --> r5[Penugasan lama ditutup, baru dibuka]
  r5 --> r6[Sesi lama tetap milik mentor lama]
  r5 --> r7[Sesi mendatang pakai mentor baru]
  r5 --> r8[Catatan dampak margin ke PMO]
  r5 --> r9[Konteks chat diteruskan; kurikulum ditinjau MEN baru]
```

## F9. Student pasif dan masa aktif

```mermaid
flowchart TD
  a1[Tanpa respons jadwal 7 hari] --> a2[Peringatan Pasif]
  a2 --> a3[MEN follow-up lebih dulu]
  a3 --> a4{Merespons?}
  a4 -- ya --> a5([Normal])
  a4 -- tidak --> a6[ADM follow-up]
  a6 --> a7{Merespons?}
  a7 -- ya --> a5
  a7 -- tidak --> a8[PMO: catat keputusan kasus]
  e1[Masa aktif < ambang peringatan, sisa sesi] --> a8
  a8 --> a9{Keputusan}
  a9 -- tahan --> a10[On Hold]
  a9 -- lanjut dikoordinasi --> a11[Jadwal baru]
  a9 -- biarkan --> a12[Expired saat masa aktif habis]
```

## F10. Closing dan penyelesaian

```mermaid
flowchart TD
  z1[Semua sesi Completed atau terselesaikan] --> z2[MEN: penilaian akhir]
  z2 --> z3[STU melihat penilaian akhir]
  z2 --> z4[ADM: closing review dengan STU]
  z4 --> z5{Checklist lengkap? sesi, penilaian, pembayaran lunas}
  z5 -- belum --> z4
  z5 -- ya --> z6[Catat hasil, umpan balik, keputusan lanjutan]
  z6 --> z7[Completed]
  z7 --> z8[Daftar periksa sertifikat dan komunitas OQ-11]
```

export const leads = [
  { code: 'LEAD-041', name: 'Rafi Anggara', need: 'Portofolio desain', skill: 'Figma', status: 'Won', pic: 'Sari', next: 'Buat enrollment', fu: 'Hari ini' },
  { code: 'LEAD-040', name: 'Maya Putri', need: 'Tugas akhir', skill: 'SPSS', status: 'Mentor Matching', pic: 'Sari', next: 'Pilih mentor', fu: 'Hari ini' },
  { code: 'LEAD-039', name: 'Andi Kurnia', need: 'Persiapan ujian', skill: 'AutoCAD', status: 'Waiting Decision', pic: 'Rio', next: 'Telepon ulang', fu: '2 hari lagi' },
  { code: 'LEAD-038', name: 'Lina Sari', need: 'Konsultasi proyek', skill: 'Blender', status: 'New', pic: 'Rio', next: 'Kontak pertama', fu: 'Terlewat 1 hari' },
  { code: 'LEAD-037', name: 'Dewa Pratama', need: 'Belajar software', skill: 'Excel', status: 'Contacted', pic: 'Sari', next: 'Kirim info paket', fu: '3 hari lagi' },
  { code: 'LEAD-036', name: 'Nia Oktavia', need: 'Pengembangan skill', skill: 'Illustrator', status: 'Assessment', pic: 'Rio', next: 'Konsultasi Zoom', fu: 'Besok' },
  { code: 'LEAD-035', name: 'Tomi Rahman', need: 'Belajar software', skill: 'Excel', status: 'Lost', pic: 'Sari', next: '-', fu: '-' },
]
export const enrollments = [
  { code: 'ENR-001', student: 'Natasha (demo)', std: 'STD-001', mentor: 'Budi Santoso', pkg: '10 sesi', status: 'Active', pay: 'DP Paid', done: 2, quota: 10, end: '12 Sep 2026', flag: 'Pelunasan sebelum sesi 6' },
  { code: 'ENR-002', student: 'Dimas (demo)', std: 'STD-002', mentor: 'Budi Santoso', pkg: '5 sesi', status: 'Active', pay: 'Paid', done: 3, quota: 5, end: '10 Jun 2026', flag: 'Pasif 7 hari' },
  { code: 'ENR-003', student: 'Sinta (demo)', std: 'STD-003', mentor: 'Citra Dewi', pkg: '10 sesi', status: 'Active', pay: 'Paid', done: 9, quota: 10, end: '28 Nov 2026', flag: 'Mendekati kedaluwarsa' },
  { code: 'ENR-004', student: 'Rafi Anggara', std: 'STD-004', mentor: 'Budi Santoso', pkg: '5 sesi', status: 'Waiting Payment', pay: 'Pending', done: 0, quota: 5, end: '-', flag: '' },
]
export const mentors = [
  { code: 'MNT-001', name: 'Budi Santoso', skills: 'Statistik, SPSS, Metodologi', status: 'Active', load: 3, cap: 5, avail: 'Malam & akhir pekan' },
  { code: 'MNT-002', name: 'Citra Dewi', skills: 'Statistik, R, Python', status: 'Active', load: 5, cap: 5, avail: 'Hari kerja' },
  { code: 'MNT-003', name: 'Eko Pratama', skills: 'SPSS, Excel', status: 'Active', load: 1, cap: 4, avail: 'Fleksibel' },
  { code: 'MNT-004', name: 'Fajar Nugroho', skills: 'Figma, UI Design', status: 'Inactive', load: 0, cap: 3, avail: '-' },
]
export const sessions = [
  { code: 'SES-007', enr: 'ENR-001', student: 'Natasha', mentor: 'Budi', n: 3, when: '28 Mar 2026 19:00-21:00', status: 'Scheduled', zoom: 'Konflik', report: '-', confirm: true },
  { code: 'SES-008', enr: 'ENR-003', student: 'Sinta', mentor: 'Citra', n: 10, when: '28 Mar 2026 19:00-21:00', status: 'Scheduled', zoom: 'Konflik', report: '-', confirm: false },
  { code: 'SES-006', enr: 'ENR-001', student: 'Natasha', mentor: 'Budi', n: 2, when: '19 Mar 2026 19:00-21:00', status: 'Scheduled', zoom: 'OK', report: 'Terlambat', confirm: false },
  { code: 'SES-005', enr: 'ENR-001', student: 'Natasha', mentor: 'Budi', n: 1, when: '12 Mar 2026 19:00-21:00', status: 'Completed', zoom: 'OK', report: 'Ada', confirm: false },
  { code: 'SES-004', enr: 'ENR-002', student: 'Dimas', mentor: 'Budi', n: 3, when: '10 Mar 2026 16:00-18:00', status: 'Completed', zoom: 'OK', report: 'Ada', confirm: false },
]
export const payments = [
  { code: 'PAY-004', enr: 'ENR-004', student: 'Rafi Anggara', amt: 1750000, date: '23 Mar 2026', kind: 'Penuh', status: 'Pending', by: 'Sari' },
  { code: 'PAY-003', enr: 'ENR-001', student: 'Natasha', amt: 1500000, date: '01 Mar 2026', kind: 'DP', status: 'Verified', by: 'Sari' },
  { code: 'PAY-002', enr: 'ENR-002', student: 'Dimas', amt: 1750000, date: '20 Feb 2026', kind: 'Penuh', status: 'Verified', by: 'Rio' },
  { code: 'PAY-005', enr: 'ENR-003', student: 'Sinta', amt: 1500000, date: '22 Mar 2026', kind: 'Pelunasan', status: 'Pending', by: 'Sari' },
]
export const prl = [
  { code: 'PRL-013', mentor: 'Eko Pratama', n: 2, amt: 700000, status: 'Approved', date: '22 Mar 2026' },
  { code: 'PRL-012', mentor: 'Budi Santoso', n: 3, amt: 1050000, status: 'Submitted', date: '22 Mar 2026' },
  { code: 'PRL-011', mentor: 'Budi Santoso', n: 2, amt: 700000, status: 'Paid', date: '10 Mar 2026' },
  { code: 'PRL-009', mentor: 'Citra Dewi', n: 1, amt: 350000, status: 'Rejected', date: '05 Mar 2026' },
]
export const searchable: { code: string; label: string; kind: string; roles: string[] }[] = [
  ...leads.map((l) => ({ code: l.code, label: l.name, kind: 'Lead', roles: ['Admin', 'PMO', 'Marketing', 'Finance'] })),
  ...enrollments.map((e) => ({ code: e.code, label: `${e.student} · ${e.pkg}`, kind: 'Enrollment', roles: ['Admin', 'PMO', 'Finance', 'Mentor'] })),
  ...mentors.map((m) => ({ code: m.code, label: m.name, kind: 'Mentor', roles: ['Admin', 'PMO', 'Finance'] })),
  ...sessions.map((s) => ({ code: s.code, label: `${s.student} sesi ${s.n}`, kind: 'Sesi', roles: ['Admin', 'PMO', 'Finance', 'Mentor'] })),
  ...payments.map((p) => ({ code: p.code, label: `${p.student}`, kind: 'Pembayaran', roles: ['Admin', 'PMO', 'Finance'] })),
  ...prl.map((p) => ({ code: p.code, label: p.mentor, kind: 'Pengajuan honor', roles: ['Finance', 'PMO', 'Mentor'] })),
]
// "enr 4" -> "ENR-004"
export const normCode = (q: string) => {
  const m = q.trim().toUpperCase().match(/^([A-Z]{3,4})[\s-]*0*(\d{1,4})$/)
  return m ? `${m[1]}-${m[2].padStart(3, '0')}` : null
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Clock,
  KeyRound,
  AlertTriangle,
  Play,
  Square,
  Users,
  Search,
  Calendar,
  Sparkles,
  X,
  FileCheck,
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const {
    currentUser,
    courses,
    attendanceSessions,
    studentAttendance,
    openAttendanceSession,
    closeAttendanceSession,
    markAttendanceByToken,
    updateStudentAttendanceStatus,
  } = useApp();

  // Student input state
  const [pinInput, setPinInput] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  // Lecturer open session modal states
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [meetingNumber, setMeetingNumber] = useState(7);
  const [topic, setTopic] = useState('Implementasi Continuous Deployment & Unit Testing');

  // Filter for lecturer attendance table
  const [selectedSessionFilter, setSelectedSessionFilter] = useState<string>(attendanceSessions[0]?.id || '');

  const handleStudentAttendanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    const res = markAttendanceByToken(pinInput.trim());
    if (res.success) {
      setFeedbackMsg({ text: res.message, isError: false });
      setPinInput('');
    } else {
      setFeedbackMsg({ text: res.message, isError: true });
    }
  };

  const handleOpenSessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSession = openAttendanceSession(courseId, Number(meetingNumber), topic);
    setSelectedSessionFilter(newSession.id);
    setShowOpenModal(false);
  };

  // Student specific calculations
  const myAttendance = studentAttendance.filter(a => a.studentId === currentUser?.id);
  const activeSessions = attendanceSessions.filter(s => s.isOpen);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Sistem Presensi & Kehadiran Perkuliahan
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.role === 'mahasiswa'
              ? 'Verifikasi kehadiran perkuliahan mandiri menggunakan kode token presensi dari dosen'
              : 'Buka sesi presensi perkuliahan, generate PIN token, dan pantau kehadiran mahasiswa'}
          </p>
        </div>

        {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
          <button
            onClick={() => setShowOpenModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Buka Sesi Presensi Baru</span>
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/* 1. STUDENT VIEW: INPUT TOKEN PIN & COURSE ATTENDANCE SUMMARY */}
      {/* ============================================================ */}
      {currentUser?.role === 'mahasiswa' && (
        <div className="space-y-6">
          {/* Token PIN Submission Card */}
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-xl relative overflow-hidden">
            <div className="max-w-xl space-y-4 relative z-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
                <KeyRound className="w-3.5 h-3.5" />
                <span>PRESENSI PERKULIAHAN REAL-TIME</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-serif">
                Masukkan Kode PIN Presensi Dosen
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Dosen Anda akan memberikan 6 digit kode PIN acak saat perkuliahan berlangsung. Masukkan kode tersebut sebelum batas waktu sesi berakhir.
              </p>

              {/* Form Input */}
              <form onSubmit={handleStudentAttendanceSubmit} className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="text"
                    maxLength={8}
                    value={pinInput}
                    onChange={e => setPinInput(e.target.value)}
                    placeholder="Contoh: 782910"
                    className="px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-amber-400 text-base font-mono font-bold tracking-widest placeholder-slate-600 focus:outline-none focus:border-amber-400 w-full sm:w-64 text-center sm:text-left"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
                  >
                    Kirim Presensi Sekarang
                  </button>
                </div>

                {feedbackMsg && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                      feedbackMsg.isError
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    <span>{feedbackMsg.text}</span>
                  </div>
                )}
              </form>

              {/* Active Sessions Hint */}
              {activeSessions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-amber-300 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>
                    Sesi Aktif Sekarang: <strong>{activeSessions[0].courseName} (Pertemuan {activeSessions[0].meetingNumber})</strong>
                  </span>
                </div>
              )}
            </div>

            <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Attendance Percentage per Course Cards */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Rekapitulasi Persentase Kehadiran per Mata Kuliah
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map(c => {
                const courseAtts = myAttendance.filter(a => a.courseId === c.id);
                const hadirCount = courseAtts.filter(a => a.status === 'Hadir').length;
                const totalCompleted = c.completedMeetings || 1;
                const rate = Math.round((hadirCount / totalCompleted) * 100);
                const isSafe = rate >= 75;

                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded">
                        {c.code}
                      </span>
                      <span
                        className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                          isSafe
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {rate}% Kehadiran
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">{c.name}</h4>

                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isSafe ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${rate}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                      <span>Tercatat Hadir: <strong>{hadirCount}</strong> dari {totalCompleted} Sesi</span>
                      <span className={isSafe ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                        {isSafe ? 'Syarat UAS Terpenuhi' : 'Peringatan UAS (<75%)'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Student's Personal Attendance History Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Riwayat Presensi Pribadi Anda
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Pertemuan</th>
                    <th className="p-3">Mata Kuliah</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Waktu Presensi</th>
                    <th className="p-3">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myAttendance.map(att => (
                    <tr key={att.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold">Pertemuan {att.meetingNumber}</td>
                      <td className="p-3 font-semibold text-slate-800">
                        {courses.find(c => c.id === att.courseId)?.name || 'Mata Kuliah'}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            att.status === 'Hadir'
                              ? 'bg-emerald-100 text-emerald-800'
                              : att.status === 'Izin'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {att.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500">{att.timestamp || '08:05 WIB'}</td>
                      <td className="p-3 text-slate-500 text-[11px]">{att.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. LECTURER & ADMIN VIEW: SESSIONS CONTROLS & LIVE ROSTER */}
      {/* ============================================================ */}
      {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
        <div className="space-y-6">
          {/* Active Sessions Cards */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Sesi Presensi Perkuliahan Sedang Berjalan
            </h3>

            {activeSessions.length === 0 ? (
              <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-400">
                Tidak ada sesi presensi yang sedang aktif. Klik tombol "Buka Sesi Presensi Baru" di atas untuk membuka kelas.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeSessions.map(session => (
                  <div
                    key={session.id}
                    className="bg-white rounded-3xl border-2 border-emerald-400 p-6 shadow-md space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Sesi Terbuka</span>
                      </span>
                      <span className="text-xs text-slate-400">Pertemuan {session.meetingNumber}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{session.courseName}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">{session.topic}</div>
                    </div>

                    {/* Prominent PIN Token Card */}
                    <div className="p-4 bg-slate-950 text-white rounded-2xl text-center space-y-1">
                      <div className="text-[10px] text-amber-400 uppercase font-bold tracking-widest">
                        KODE TOKEN PIN MAHASISWA
                      </div>
                      <div className="text-3xl sm:text-4xl font-mono font-black text-amber-300 tracking-widest">
                        {session.token}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Bagikan kode ini kepada mahasiswa di kelas
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-600 font-semibold">
                        Tercatat Hadir: <strong className="text-emerald-600">{session.presentCount}</strong> / {session.totalStudents} Mahasiswa
                      </span>
                      <button
                        onClick={() => closeAttendanceSession(session.id)}
                        className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
                      >
                        <Square className="w-3.5 h-3.5" />
                        <span>Tutup Sesi Presensi</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Student Roster Table for Selected Session */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Daftar Kehadiran Mahasiswa
                </h3>
                <p className="text-xs text-slate-500">
                  Dosen dapat mengubah status kehadiran mahasiswa secara manual
                </p>
              </div>

              <select
                value={selectedSessionFilter}
                onChange={e => setSelectedSessionFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800"
              >
                {attendanceSessions.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.courseName} (Pertemuan {s.meetingNumber})
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Nama Mahasiswa</th>
                    <th className="p-3">NIM</th>
                    <th className="p-3">Status Saat Ini</th>
                    <th className="p-3">Waktu Masuk</th>
                    <th className="p-3">Aksi Ubah Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentAttendance
                    .filter(a => !selectedSessionFilter || a.sessionId === selectedSessionFilter)
                    .map(item => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-900">{item.studentName}</td>
                        <td className="p-3 font-mono text-slate-500">{item.studentNim}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              item.status === 'Hadir'
                                ? 'bg-emerald-100 text-emerald-800'
                                : item.status === 'Izin'
                                ? 'bg-blue-100 text-blue-800'
                                : item.status === 'Sakit'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500 font-mono text-[11px]">
                          {item.timestamp || '08:05:12 WIB'}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5">
                            <button
                              onClick={() => updateStudentAttendanceStatus(item.id, 'Hadir')}
                              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold"
                            >
                              Hadir
                            </button>
                            <button
                              onClick={() => updateStudentAttendanceStatus(item.id, 'Izin')}
                              className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-[10px] font-bold"
                            >
                              Izin
                            </button>
                            <button
                              onClick={() => updateStudentAttendanceStatus(item.id, 'Sakit')}
                              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-bold"
                            >
                              Sakit
                            </button>
                            <button
                              onClick={() => updateStudentAttendanceStatus(item.id, 'Alpa')}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[10px] font-bold"
                            >
                              Alpa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Lecturer Open New Session */}
      {showOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <Play className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>Buka Sesi Presensi Baru</span>
              </div>
              <button
                onClick={() => setShowOpenModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOpenSessionSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Mata Kuliah *</label>
                <select
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pertemuan Ke- *</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={meetingNumber}
                  onChange={e => setMeetingNumber(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topik Bahasan Kuliah *</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Contoh: Hands-on Lab Docker & Kubernetes Cluster"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                Sistem akan membuat <strong>Token PIN 6 Digit Acak</strong>. Mahasiswa dapat memasukkan kode tersebut untuk mencatat status Hadir.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOpenModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Buka Sesi Presensi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

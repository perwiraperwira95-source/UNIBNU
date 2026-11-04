import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  FileText,
  ClipboardList,
  Award,
  CheckCircle2,
  Users,
  Clock,
  ArrowRight,
  Plus,
  Play,
  Layers,
  Sparkles,
  Calendar,
} from 'lucide-react';

export const LecturerDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    materials,
    assignments,
    submissions,
    exams,
    attendanceSessions,
    openAttendanceSession,
    navigateToCourseDetail,
    setActivePage,
  } = useApp();

  const [showQuickAttendanceModal, setShowQuickAttendanceModal] = useState(false);
  const [selectedCourseForAttendance, setSelectedCourseForAttendance] = useState(courses[0]?.id || '');
  const [meetingNum, setMeetingNum] = useState(7);
  const [topic, setTopic] = useState('Implementasi Praktikum & Review Sesi');

  // Filter courses taught by this lecturer (or default to all if admin/demo)
  const myCourses = courses.filter(
    c => c.lecturerId === currentUser?.id || c.lecturerName.includes(currentUser?.name || '')
  );
  const displayedCourses = myCourses.length > 0 ? myCourses : courses;

  // Submissions needing grading
  const pendingSubmissions = submissions.filter(s => s.status === 'Menunggu Dinilai');

  // Active attendance sessions
  const activeSessions = attendanceSessions.filter(s => s.isOpen);

  const handleOpenQuickAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    openAttendanceSession(selectedCourseForAttendance, meetingNum, topic);
    setShowQuickAttendanceModal(false);
    setActivePage('attendance');
  };

  return (
    <div className="space-y-6">
      {/* Lecturer Greeting Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>PORTAL DOSEN PENGAMPU • SEMESTER GASAL 2026/2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Selamat Datang, {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              NIDN: <strong className="text-amber-400 font-mono">{currentUser?.identifier}</strong> | {currentUser?.faculty} ({currentUser?.studyProgram})
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setShowQuickAttendanceModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all flex items-center space-x-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Buka Presensi Kelas</span>
            </button>
            <button
              onClick={() => setActivePage('materials')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-all flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Unggah Materi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards for Lecturer */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => setActivePage('courses')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mata Kuliah Diampu</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-serif">
            {displayedCourses.length} <span className="text-xs font-normal text-slate-500">Mata Kuliah</span>
          </div>
          <div className="mt-1 text-[11px] text-blue-600 font-medium">
            Semester Gasal 2026/2027
          </div>
        </div>

        <div
          onClick={() => setActivePage('assignments')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Perlu Dinilai</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 font-serif">
            {pendingSubmissions.length} <span className="text-xs font-normal text-slate-500">Tugas Mahasiswa</span>
          </div>
          <div className="mt-1 text-[11px] text-rose-600 font-semibold">
            Menunggu feedback & skor dosen
          </div>
        </div>

        <div
          onClick={() => setActivePage('exams')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ujian & Kuis CBT</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-serif">
            {exams.length} <span className="text-xs font-normal text-slate-500">Paket Soal</span>
          </div>
          <div className="mt-1 text-[11px] text-indigo-600 font-medium">
            {exams.filter(e => e.status === 'Aktif').length} Ujian Aktif Sekarang
          </div>
        </div>

        <div
          onClick={() => setActivePage('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sesi Presensi Aktif</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-serif">
            {activeSessions.length} <span className="text-xs font-normal text-slate-500">Kelas Dibuka</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">
            Token PIN dapat diakses mahasiswa
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif">Mata Kuliah yang Diampu</h2>
            <p className="text-xs text-slate-500">Klik mata kuliah untuk mengelola materi, tugas, dan presensi</p>
          </div>
          <button
            onClick={() => setActivePage('courses')}
            className="text-xs text-amber-700 hover:text-amber-800 font-bold"
          >
            Lihat Semua &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map(course => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-36 relative overflow-hidden bg-slate-900">
                  <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 font-bold rounded text-[11px] border border-amber-400/30">
                    {course.code}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white font-medium rounded text-[11px]">
                    {course.sks} SKS
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1 mb-1">
                    {course.name}
                  </h3>
                  <div className="text-xs text-slate-500 mb-3 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.day}, {course.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Progress pertemuan */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">Realisasi Pertemuan</span>
                      <span className="font-bold text-slate-800">
                        {course.completedMeetings} / {course.totalMeetings} Sesi
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full"
                        style={{ width: `${(course.completedMeetings / course.totalMeetings) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{course.studentsEnrolled} Mahasiswa</span>
                </span>
                <button
                  onClick={() => navigateToCourseDetail(course.id)}
                  className="font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
                >
                  <span>Buka Kelas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Pending Submissions & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Pending Submissions to Grade (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Tugas Mahasiswa yang Perlu Dinilai</h3>
              <p className="text-xs text-slate-500">Evaluasi dan berikan feedback konstruktif</p>
            </div>
            <button
              onClick={() => setActivePage('assignments')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Lihat Semua &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {pendingSubmissions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                Semua tugas telah dinilai. Kerja bagus!
              </div>
            ) : (
              pendingSubmissions.map(sub => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-slate-800 text-xs">{sub.studentName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">NIM: {sub.studentNim}</div>
                    <div className="text-xs text-amber-900 mt-1 font-medium">{sub.fileName}</div>
                  </div>
                  <button
                    onClick={() => setActivePage('assignments')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs self-start sm:self-center transition-colors"
                  >
                    Beri Nilai & Feedback
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Schedule & Academic Notices (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm">Jadwal Mengajar Pekan Ini</h3>
            <span className="text-[10px] text-slate-400">Genap 2026/2027</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Rekayasa Perangkat Lunak Modern</span>
                <span className="text-amber-700">Senin, 08:00 WIB</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Lab Komputasi A-201 & Cloud Meet</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Kecerdasan Buatan & ML</span>
                <span className="text-amber-700">Rabu, 10:45 WIB</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Gedung Ibnu Sina R.402</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Keamanan Siber & Kriptografi</span>
                <span className="text-amber-700">Kamis, 13:30 WIB</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">Lab Cyber Security B-105</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Buka Sesi Presensi Cepat */}
      {showQuickAttendanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <Play className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span>Buka Sesi Presensi Baru</span>
              </div>
              <button
                onClick={() => setShowQuickAttendanceModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOpenQuickAttendance} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Mata Kuliah</label>
                <select
                  value={selectedCourseForAttendance}
                  onChange={e => setSelectedCourseForAttendance(e.target.value)}
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
                <label className="block font-semibold text-slate-700 mb-1">Pertemuan Ke-</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={meetingNum}
                  onChange={e => setMeetingNum(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topik Perkuliahan</label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Contoh: Arsitektur Microservices & CI/CD"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed text-[11px]">
                Sistem akan membuat <strong>Kode PIN 6 Digit Acak</strong>. Mahasiswa dapat memasukkan kode tersebut di menu Presensi untuk mencatat kehadiran secara langsung.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuickAttendanceModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Aktifkan Sesi Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

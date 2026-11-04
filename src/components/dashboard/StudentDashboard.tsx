import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  AlertTriangle,
  Megaphone,
  Download,
  Play,
  FileCheck,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    assignments,
    submissions,
    exams,
    studentAttendance,
    attendanceSessions,
    announcements,
    navigateToCourseDetail,
    navigateToExamRunner,
    setActivePage,
  } = useApp();

  const [courseFilter, setCourseFilter] = useState<'all' | 'pinned' | 'gasal'>('all');

  // Submissions by this student
  const mySubmissions = submissions.filter(s => s.studentId === currentUser?.id);
  const submittedAssignmentIds = new Set(mySubmissions.map(s => s.assignmentId));
  const pendingAssignments = assignments.filter(a => !submittedAssignmentIds.has(a.id));

  // Active CBT exams
  const activeExams = exams.filter(e => e.status === 'Aktif');

  // Active attendance session available right now
  const openAttendanceSessions = attendanceSessions.filter(s => s.isOpen);
  const myAttendanceRecords = studentAttendance.filter(a => a.studentId === currentUser?.id);
  const totalAttended = myAttendanceRecords.filter(a => a.status === 'Hadir').length;
  const attendanceRate = totalAttended > 0 ? ((totalAttended / (myAttendanceRecords.length || 1)) * 100).toFixed(1) : '100';

  return (
    <div className="space-y-6">
      {/* ============================================================ */}
      {/* 1. STUDENT BANNER (INSPIRED BY UNIVERSITY LMS LEARNINGZONE) */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 border border-amber-500/30 text-white shadow-xl min-h-[180px] flex items-center">
        {/* Campus architectural background */}
        <div className="absolute inset-0 z-0">
          <img
            src={UNIVERSITY_INFO.campusHero}
            alt="Kampus Ibnu Rusman"
            className="w-full h-full object-cover filter brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-400 p-0.5 bg-slate-800 shadow-xl flex-shrink-0"
            />
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider mb-1">
                <span>Mahasiswa Aktif</span>
                <span>•</span>
                <span>Semester {currentUser?.semester || 6}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif text-white tracking-wide">
                Ruang Belajar {currentUser?.name}
              </h1>
              <div className="text-xs text-slate-300 font-mono mt-0.5 flex flex-wrap gap-x-3">
                <span>NIM: <strong className="text-amber-300">{currentUser?.identifier}</strong></span>
                <span>{currentUser?.studyProgram}</span>
                <span>TA 2026/2027 Gasal</span>
              </div>
            </div>
          </div>

          {/* Academic Key Metric Badges */}
          <div className="flex items-center space-x-3 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/80 self-start md:self-auto">
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400">IPK Kumulatif</div>
              <div className="text-xl font-extrabold text-amber-400 font-serif">{currentUser?.ipk || '3.86'}</div>
            </div>
            <div className="text-center px-3 border-r border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total SKS</div>
              <div className="text-xl font-extrabold text-white font-serif">{currentUser?.totalSks || 114}</div>
            </div>
            <div className="text-center px-3">
              <div className="text-[10px] uppercase font-bold text-slate-400">Kehadiran</div>
              <div className="text-xl font-extrabold text-emerald-400 font-serif">{attendanceRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. ALERT BANNER: ACTIVE EXAM & ATTENDANCE NOTICE */}
      {/* ============================================================ */}
      {openAttendanceSessions.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-900/90 to-slate-900 border border-emerald-500/50 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg animate-pulse-slow">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-emerald-300">
                Presensi Dibuka: {openAttendanceSessions[0].courseName} (Pertemuan {openAttendanceSessions[0].meetingNumber})
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Gunakan kode PIN presensi dari dosen untuk mencatat kehadiran Anda.
              </div>
            </div>
          </div>
          <button
            onClick={() => setActivePage('attendance')}
            className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-md transition-all"
          >
            Input Kode Presensi &rarr;
          </button>
        </div>
      )}

      {activeExams.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950 to-slate-900 border border-amber-500/50 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-amber-300">
                Ujian Daring CBT Sedang Berlangsung: {activeExams[0].title}
              </div>
              <div className="text-xs text-slate-300 mt-0.5">
                Mata Kuliah: {activeExams[0].courseName} • Durasi: {activeExams[0].durationMinutes} Menit
              </div>
            </div>
          </div>
          <button
            onClick={() => navigateToExamRunner(activeExams[0].id)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-md shadow-amber-500/20 flex items-center space-x-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Mulai Kerjakan Ujian CBT</span>
          </button>
        </div>
      )}

      {/* ============================================================ */}
      {/* 3. MAIN DASHBOARD CONTENT: COURSES GRID (LEFT) + WIDGETS (RIGHT) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: My Courses (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            {/* Header & Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 font-serif">Mata Kuliah Semester Ini</h2>
                <p className="text-xs text-slate-500">Daftar kelas aktif yang Anda ambil</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setCourseFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    courseFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua ({courses.length})
                </button>
                <button
                  onClick={() => setCourseFilter('pinned')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    courseFilter === 'pinned' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Favorit (3)
                </button>
              </div>
            </div>

            {/* Courses Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              {courses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="h-32 relative overflow-hidden bg-slate-900">
                      <img
                        src={course.thumbnail}
                        alt={course.name}
                        className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 font-bold rounded text-[10px] border border-amber-400/30">
                        {course.code}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white font-medium rounded text-[10px]">
                        {course.sks} SKS
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 mb-1 group-hover:text-amber-800 transition-colors">
                        {course.name}
                      </h3>
                      <div className="text-[11px] text-slate-500 mb-2 truncate">
                        Dosen: {course.lecturerName}
                      </div>
                      <div className="text-[11px] text-slate-600 flex items-center space-x-1 mb-3">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{course.day}, {course.time}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">Progress Pembelajaran</span>
                          <span className="font-bold text-slate-700">
                            {course.completedMeetings}/{course.totalMeetings} Sesi
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full"
                            style={{ width: `${(course.completedMeetings / course.totalMeetings) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card bottom actions */}
                  <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setActivePage('materials')}
                      className="text-slate-500 hover:text-amber-700 font-medium text-[11px]"
                    >
                      Materi & Modul
                    </button>
                    <button
                      onClick={() => navigateToCourseDetail(course.id)}
                      className="font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
                    >
                      <span>Masuk Kelas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Widgets (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Urgent Assignments Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <ClipboardList className="w-4 h-4 text-rose-500" />
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Tugas Perlu Dikerjakan</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
                {pendingAssignments.length} Tugas
              </span>
            </div>

            <div className="space-y-2.5">
              {pendingAssignments.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                  Semua tugas telah Anda selesaikan!
                </div>
              ) : (
                pendingAssignments.map(asg => (
                  <div
                    key={asg.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-amber-300 transition-all text-xs"
                  >
                    <div className="font-bold text-slate-800 line-clamp-1">{asg.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{asg.courseName}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] text-rose-600 font-semibold flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Deadline: {new Date(asg.deadline).toLocaleDateString('id-ID')}</span>
                      </span>
                      <button
                        onClick={() => setActivePage('assignments')}
                        className="text-[11px] text-amber-700 hover:text-amber-800 font-bold"
                      >
                        Kumpulkan &rarr;
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Calendar & Today's Schedule Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Jadwal Kuliah Hari Ini</h3>
              </div>
              <button
                onClick={() => setActivePage('schedule')}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
              >
                Kalender &rarr;
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
                <div className="font-bold text-amber-950">Rekayasa Perangkat Lunak Modern</div>
                <div className="text-[11px] text-amber-800 mt-0.5">08:00 - 10:30 WIB • Lab Komputasi A-201</div>
                <div className="text-[10px] text-amber-700 mt-1 font-medium">Dosen: Dr. Ir. Ahmad Rusydi, M.Kom</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="font-bold text-slate-800">Manajemen Inovasi & Kewirausahaan</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Besok, Selasa 08:00 WIB • Aud. Lt. 3</div>
              </div>
            </div>
          </div>

          {/* Campus Announcements Widget */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-4 h-4 text-sky-600" />
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Warta Kampus Terkini</h3>
              </div>
              <button
                onClick={() => setActivePage('announcements')}
                className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold"
              >
                Semua &rarr;
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {announcements.slice(0, 2).map(anc => (
                <div
                  key={anc.id}
                  onClick={() => setActivePage('announcements')}
                  className="p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                >
                  <div className="text-[10px] text-sky-600 font-bold uppercase">{anc.category}</div>
                  <div className="font-bold text-slate-800 line-clamp-1 mt-0.5">{anc.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{anc.publishedDate}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

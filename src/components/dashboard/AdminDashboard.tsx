import React from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  Building2,
  CheckCircle2,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Megaphone,
  Server,
  Layers,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    users,
    faculties,
    studyPrograms,
    courses,
    activityLogs,
    setActivePage,
  } = useApp();

  const studentsCount = users.filter(u => u.role === 'mahasiswa').length;
  const lecturersCount = users.filter(u => u.role === 'dosen').length;

  return (
    <div className="space-y-6">
      {/* Welcome Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-amber-500/30 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>KONSOL ADMINISTRATOR UTAMA KAMPUS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Selamat Datang, {currentUser?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Anda memiliki hak akses penuh dalam pengelolaan sivitas akademika, kurikulum, pangkalan data, dan pengawasan pembelajaran daring {UNIVERSITY_INFO.name}.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActivePage('admin-students')}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-amber-400/20 transition-all flex items-center space-x-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Kelola Mahasiswa</span>
            </button>
            <button
              onClick={() => setActivePage('admin-courses')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs border border-slate-700 transition-all flex items-center space-x-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Kelola Mata Kuliah</span>
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => setActivePage('admin-students')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mahasiswa Terdaftar</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {studentsCount} <span className="text-xs font-normal text-slate-500">Orang</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-medium flex items-center space-x-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Berstatus Aktif</span>
          </div>
        </div>

        <div
          onClick={() => setActivePage('admin-lecturers')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Dosen Pengampu</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {lecturersCount} <span className="text-xs font-normal text-slate-500">Dosen</span>
          </div>
          <div className="mt-2 text-[11px] text-sky-600 font-medium flex items-center space-x-1">
            <span>NIDN Terverifikasi PDDIKTI</span>
          </div>
        </div>

        <div
          onClick={() => setActivePage('admin-courses')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mata Kuliah Aktif</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {courses.length} <span className="text-xs font-normal text-slate-500">Kelas</span>
          </div>
          <div className="mt-2 text-[11px] text-amber-700 font-medium flex items-center space-x-1">
            <span>Semester Gasal 2026/2027</span>
          </div>
        </div>

        <div
          onClick={() => setActivePage('admin-departments')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fakultas & Prodi</span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
            {faculties.length} <span className="text-xs font-normal text-slate-500">Fakultas</span> / {studyPrograms.length} <span className="text-xs font-normal text-slate-500">Prodi</span>
          </div>
          <div className="mt-2 text-[11px] text-purple-600 font-medium flex items-center space-x-1">
            <span>Akreditasi Unggul</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Fast Management Actions & Real-Time System Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Management Control Panels (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Manajemen Master Data Terpadu</h3>
                <p className="text-xs text-slate-500">Akses cepat menu pengelolaan database akademik</p>
              </div>
              <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded-full">
                Database Terhubung
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setActivePage('admin-students')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-white text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <div className="font-bold text-sm text-slate-800">Master Mahasiswa</div>
                <div className="text-xs text-slate-500 mt-0.5">Tambah mahasiswa, edit data NIM, reset status</div>
              </button>

              <button
                onClick={() => setActivePage('admin-lecturers')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-white text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-2">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <div className="font-bold text-sm text-slate-800">Master Dosen</div>
                <div className="text-xs text-slate-500 mt-0.5">NIDN, penetapan mata kuliah yang diampu, gelar</div>
              </button>

              <button
                onClick={() => setActivePage('admin-courses')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-white text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <div className="font-bold text-sm text-slate-800">Mata Kuliah & Kelas</div>
                <div className="text-xs text-slate-500 mt-0.5">Kode MK, bobot SKS, jadwal hari & ruang kuliah</div>
              </button>

              <button
                onClick={() => setActivePage('admin-departments')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-white text-left transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition-colors" />
                </div>
                <div className="font-bold text-sm text-slate-800">Fakultas & Program Studi</div>
                <div className="text-xs text-slate-500 mt-0.5">Pusat fakultas, gelar lulusan, dekan & kaprodi</div>
              </button>
            </div>
          </div>

          {/* Server & System Health Status */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold">Kondisi Infrastruktur Cloud LMS</h3>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-bold">
                NORMAL (99.98% Uptime)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase">Latency Server</div>
                <div className="text-base font-extrabold text-emerald-400 mt-0.5">24 ms</div>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase">Database Queries</div>
                <div className="text-base font-extrabold text-amber-400 mt-0.5">Optimal</div>
              </div>
              <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase">Security Firewall</div>
                <div className="text-base font-extrabold text-sky-400 mt-0.5">Zero-Trust</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Activity Log Feed (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Log Aktivitas Pembelajaran</h3>
              </div>
              <span className="text-[10px] text-slate-400">Real-time</span>
            </div>

            <div className="space-y-3">
              {activityLogs.slice(0, 6).map(log => (
                <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800 truncate max-w-[170px]">{log.userName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{log.action}</p>
                  <div className="mt-1 flex items-center space-x-2 text-[10px] text-slate-400">
                    <span className="uppercase font-semibold text-amber-700">{log.userRole}</span>
                    <span>•</span>
                    <span className="font-mono">{log.ipAddress || '180.252.12.89'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Total {activityLogs.length} aktivitas tercatat</span>
            <button
              onClick={() => setActivePage('profile')}
              className="text-amber-700 hover:text-amber-800 font-semibold"
            >
              Lihat Log Lengkap &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

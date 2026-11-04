import React from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO, INITIAL_FACULTIES } from '../../data/mockData';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  BookOpen,
  Award,
  Users,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  MonitorCheck,
  Layers,
  MessageSquare,
  Building,
  Quote,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setActivePage, loginAs, announcements } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (MAJESTIC ARCHITECTURE, LOGO, PROMINENT TITLE) */}
      {/* ============================================================ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Dark Navy & Gold Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={UNIVERSITY_INFO.campusHero}
            alt="Kampus Universitas Ibnu Rusman"
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transform hover:scale-100 transition-transform duration-1000"
          />
          {/* Subtle Islamic geometric pattern overlay & rich navy-to-transparent gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-slate-950/90" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* System Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg mb-6">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span className="uppercase tracking-widest">{UNIVERSITY_INFO.systemTitle}</span>
          </div>

          {/* UNIVERSITY LOGO PLACED PROMINENTLY ABOVE THE UNIVERSITY NAME */}
          <div className="relative group mb-5">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-400/90 shadow-2xl bg-slate-900/90 p-1 flex items-center justify-center backdrop-blur-sm">
              <img
                src={UNIVERSITY_INFO.logo}
                alt={`Logo ${UNIVERSITY_INFO.name}`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* LARGE, CLEAR, PROMINENT UNIVERSITY NAME (IN THE CENTER) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black tracking-wider text-white uppercase drop-shadow-xl mb-3 leading-tight">
            <span className="bg-gradient-to-b from-white via-slate-100 to-amber-100 bg-clip-text text-transparent">
              {UNIVERSITY_INFO.name}
            </span>
          </h1>

          {/* OFFICIAL SLOGAN */}
          <p className="text-base sm:text-xl md:text-2xl text-amber-300 font-serif font-medium italic tracking-wide drop-shadow-md max-w-3xl mb-8">
            "{UNIVERSITY_INFO.slogan}"
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal">
            Platform pembelajaran daring terpadu sivitas akademika Universitas Ibnu Rusman. 
            Menghubungkan <span className="text-amber-300 font-semibold">Admin</span>, <span className="text-sky-300 font-semibold">Dosen</span>, dan <span className="text-emerald-300 font-semibold">Mahasiswa</span> dalam satu ekosistem akademik modern yang unggul dan berkarakter.
          </p>

          {/* ROLE ENTRANCE ACTION CARDS (3 FAST PORTALS) */}
          <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {/* Mahasiswa Card */}
            <div
              onClick={() => loginAs('mahasiswa')}
              className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900/95 border border-slate-700/80 hover:border-emerald-400/80 rounded-2xl p-5 backdrop-blur-md shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Portal Pembelajaran
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  Mahasiswa
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Akses materi kuliah, kuis, ujian daring CBT, presensi token, dan rekap nilai KHS.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                <span>Masuk Ruang Kuliah</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Dosen Card */}
            <div
              onClick={() => loginAs('dosen')}
              className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900/95 border border-slate-700/80 hover:border-sky-400/80 rounded-2xl p-5 backdrop-blur-md shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Portal Pengajaran
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  Dosen Pengampu
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Unggah materi, buat tugas & bank soal ujian, buka presensi, dan penilaian mahasiswa.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                <span>Kelola Perkuliahan</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Admin Card */}
            <div
              onClick={() => loginAs('admin')}
              className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900/95 border border-slate-700/80 hover:border-amber-400/80 rounded-2xl p-5 backdrop-blur-md shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Portal Manajemen
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Administrator
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Kelola master data mahasiswa, dosen, fakultas/prodi, mata kuliah, akun, dan audit log.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>Masuk Konsol Admin</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Quick manual login / register prompt */}
          <div className="mt-8 flex items-center space-x-4 text-xs text-slate-400">
            <span>Sudah memiliki akun resmi?</span>
            <button
              onClick={() => setActivePage('login')}
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
            >
              Masuk dengan NIM / NIDN &rarr;
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setActivePage('register')}
              className="text-slate-300 hover:text-white font-semibold"
            >
              Daftar Baru
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. STATISTIK KAMPUS & PRESTASI SIVITAS AKADEMIKA */}
      {/* ============================================================ */}
      <section className="bg-slate-900 border-y border-amber-500/20 py-10 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-slate-800 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">14.850+</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Mahasiswa Aktif Sarjana & Pasca</div>
            </div>
            <div className="p-4 border-r border-slate-800 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">420+</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Dosen Berkualifikasi Doktor & Master</div>
            </div>
            <div className="p-4 border-r border-slate-800 last:border-none">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">100%</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Akreditasi Program Studi Unggul & A</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">98.4%</div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-1">Tingkat Keterserapan Lulusan di Industri</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SAMBUTAN REKTOR & FILOSOFI IBNU RUSMAN */}
      {/* ============================================================ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5 relative h-96 lg:h-full min-h-[420px] bg-slate-900 overflow-hidden">
            <img
              src={UNIVERSITY_INFO.rectorPhoto}
              alt={UNIVERSITY_INFO.rector}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-lg sm:text-xl font-bold font-serif text-white">{UNIVERSITY_INFO.rector}</div>
              <div className="text-xs text-amber-300 font-medium">Rektor Universitas Ibnu Rusman</div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-12 space-y-5">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
              <Quote className="w-3.5 h-3.5" />
              <span>Pesan Kehormatan Rektor</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
              "Menyatukan Khazanah Keilmuan, Sains Terkini, dan Keberadaban Moral"
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm">
              Nama besar <strong>Ibnu Rusman (Abu al-Walid Muhammad ibn Ahmad ibn Rusyd / Averroes)</strong> menginspirasi institusi kami untuk senantiasa menjunjung tinggi rasionalitas ilmiah, riset kritis, dan integrasi antara sains modern dengan keluhuran nilai etis.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm">
              Sistem <strong>E-Learning Universitas Ibnu Rusman</strong> dihadirkan sebagai wujud komitmen kami dalam mewujudkan kampus digital kelas dunia (World Class Digital Campus). Kami memastikan setiap mahasiswa dan dosen dapat berinteraksi, berkolaborasi, dan menghasilkan karya inovasi tanpa sekat ruang dan waktu.
            </p>

            <div className="pt-3 flex items-center space-x-6 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Pembelajaran Berpusat pada Mahasiswa (SCL)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Standar Mutu ISO 21001:2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. FITUR PEMBELAJARAN UNGGULAN (LMS, CBT, PRESENSI, FORUM) */}
      {/* ============================================================ */}
      <section id="fitur" className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
              Ekosistem Terintegrasi
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Fitur Canggih E-Learning Universitas Ibnu Rusman
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              Dirancang dengan standar UI/UX modern, performa responsif, dan alur kerja akademis perguruan tinggi yang lengkap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fitur 1 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Repositori Materi Kuliah Terpadu</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Dosen dapat mengunggah dan mendistribusikan modul PDF, slide PowerPoint interaktif, dokumen Word, serta rekaman video kuliah per sesi pertemuan (1-16).
              </p>
            </div>

            {/* Fitur 2 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mb-5">
                <MonitorCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ujian Daring CBT & Bank Soal</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Pelaksanaan UTS, UAS, dan Kuis dengan countdown timer real-time, navigasi nomor soal interaktif, koreksi otomatis, dan transparansi skor.
              </p>
            </div>

            {/* Fitur 3 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Presensi Digital Berbasis Token</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Dosen membuka sesi perkuliahan dengan 6 digit PIN acak. Mahasiswa menginput kode presensi secara mandiri dengan verifikasi kehadiran real-time.
              </p>
            </div>

            {/* Fitur 4 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Penilaian Tugas & Rubrik Dosen</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Pengumpulan tugas mahasiswa dengan upload dokumen. Dosen dapat langsung memeriksa submission, memberikan nilai (0-100), dan feedback konstruktif.
              </p>
            </div>

            {/* Fitur 5 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mb-5">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Forum Diskusi Kolaboratif</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Ruang tanya-jawab antar mahasiswa dan dosen. Dilengkapi dengan tanda verifikasi jawaban dosen untuk menjamin akurasi materi ilmiah.
              </p>
            </div>

            {/* Fitur 6 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Transkrip Nilai & Cetak KHS</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Rekapitulasi otomatis bobot tugas, kuis, UTS, UAS, dan kehadiran menjadi nilai mutu huruf (A, B+, dll) dengan fitur cetak KHS resmi universitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FAKULTAS & PROGRAM STUDI UNGGULAN */}
      {/* ============================================================ */}
      <section id="fakultas" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">
            Disiplin Ilmu Komprehensif
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Fakultas di Universitas Ibnu Rusman
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Menawarkan program sarjana dan pascasarjana dengan kurikulum terdepan berorientasi riset masa depan dan industri global.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_FACULTIES.map(fac => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded font-bold text-xs tracking-wider">
                    {fac.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {fac.programsCount} Program Studi
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{fac.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{fac.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Dekan: <strong className="text-slate-700">{fac.dean}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PENGUMUMAN RESMI KAMPUS TERKINI */}
      {/* ============================================================ */}
      <section id="pengumuman" className="py-20 bg-slate-900 text-white border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                Pusat Informasi Kampus
              </div>
              <h2 className="text-3xl font-extrabold font-serif text-white">
                Pengumuman & Warta Akademik
              </h2>
            </div>
            <button
              onClick={() => setActivePage('announcements')}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300"
            >
              <span>Lihat Seluruh Pengumuman</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.slice(0, 3).map(anc => (
              <div
                key={anc.id}
                className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col justify-between hover:border-amber-400/60 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      {anc.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{anc.publishedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                    {anc.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {anc.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-700/60 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="truncate max-w-[200px]">{anc.author}</span>
                  <button
                    onClick={() => setActivePage('announcements')}
                    className="text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    Buka Detail &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CALL TO ACTION: GABUNG DENGAN SIVITAS KAMPUS */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center mx-auto text-amber-400">
            <Building className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Siap Memulai Perkuliahan di Universitas Ibnu Rusman?
          </h2>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Dapatkan pengalaman belajar kelas dunia yang fleksibel, kolaboratif, dan terstruktur dengan sistem akademik digital terbaik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActivePage('login')}
              className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-400/20 transition-all transform hover:-translate-y-0.5"
            >
              Masuk ke Portal E-Learning
            </button>
            <button
              onClick={() => setActivePage('register')}
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-600 transition-all"
            >
              Pendaftaran Mahasiswa / Dosen Baru
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  Bell,
  Search,
  User as UserIcon,
  LogOut,
  KeyRound,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  ChevronDown,
  Menu,
  X,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

export const Header: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const {
    currentUser,
    activePage,
    setActivePage,
    logout,
    loginAs,
    notifications,
    markNotificationsAsRead,
    resetAllData,
  } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // If on landing, login, or register page, render the public navigation header
  if (!currentUser || activePage === 'landing' || activePage === 'login' || activePage === 'register') {
    return (
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & University Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActivePage('landing')}
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-slate-800 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={UNIVERSITY_INFO.logo}
                alt={UNIVERSITY_INFO.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Portal E-Learning Resmi
              </div>
              <div className="text-lg font-black tracking-wider text-white font-serif">
                {UNIVERSITY_INFO.name}
              </div>
              <div className="text-[10px] text-slate-300 italic hidden sm:block">
                {UNIVERSITY_INFO.slogan}
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <button
              onClick={() => setActivePage('landing')}
              className={`hover:text-amber-400 transition-colors ${activePage === 'landing' ? 'text-amber-400 font-bold border-b-2 border-amber-400 pb-1' : 'text-slate-200'}`}
            >
              Beranda
            </button>
            <a href="#fakultas" className="text-slate-200 hover:text-amber-400 transition-colors">
              Fakultas & Prodi
            </a>
            <a href="#fitur" className="text-slate-200 hover:text-amber-400 transition-colors">
              Fitur LMS
            </a>
            <a href="#pengumuman" className="text-slate-200 hover:text-amber-400 transition-colors">
              Pengumuman
            </a>
            <a href="#kontak" className="text-slate-200 hover:text-amber-400 transition-colors">
              Kontak
            </a>
          </nav>

          {/* Action buttons & Quick Demo Access */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick Persona Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500/15 border border-amber-400/40 text-amber-300 rounded-lg hover:bg-amber-500/25 transition-all shadow-sm"
                title="Coba Langsung sebagai Mahasiswa, Dosen, atau Admin"
              >
                <span>Demo Peran</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showRoleSwitcher && (
                <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Pilih Peran Demo Langsung
                  </div>
                  <button
                    onClick={() => { loginAs('mahasiswa'); setShowRoleSwitcher(false); }}
                    className="w-full text-left px-3 py-2 flex items-center space-x-2.5 hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition-colors"
                  >
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-semibold">Mahasiswa</div>
                      <div className="text-[10px] text-slate-400">Farhan (NIM: 20230810145)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { loginAs('dosen'); setShowRoleSwitcher(false); }}
                    className="w-full text-left px-3 py-2 flex items-center space-x-2.5 hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition-colors"
                  >
                    <Briefcase className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="font-semibold">Dosen Pengampu</div>
                      <div className="text-[10px] text-slate-400">Dr. Ir. Ahmad Rusydi, M.Kom</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { loginAs('admin'); setShowRoleSwitcher(false); }}
                    className="w-full text-left px-3 py-2 flex items-center space-x-2.5 hover:bg-slate-800 text-slate-200 hover:text-amber-300 transition-colors"
                  >
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold">Administrator</div>
                      <div className="text-[10px] text-slate-400">Drs. H. Mulyono Santoso</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setActivePage('login')}
              className="px-4 py-2 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg transition-all"
            >
              Masuk Portal
            </button>
            <button
              onClick={() => setActivePage('register')}
              className="px-4 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              Daftar Akun
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center sm:hidden space-x-2">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 text-slate-300 hover:text-white focus:outline-none"
            >
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileNavOpen && (
          <div className="sm:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <button
              onClick={() => { setActivePage('landing'); setMobileNavOpen(false); }}
              className="block w-full text-left py-2 text-slate-200 hover:text-amber-400 font-medium"
            >
              Beranda
            </button>
            <button
              onClick={() => { setActivePage('login'); setMobileNavOpen(false); }}
              className="w-full py-2.5 text-center font-semibold bg-slate-800 text-white rounded-lg border border-slate-700"
            >
              Masuk Portal
            </button>
            <button
              onClick={() => { setActivePage('register'); setMobileNavOpen(false); }}
              className="w-full py-2.5 text-center font-bold bg-amber-400 text-slate-950 rounded-lg"
            >
              Daftar Akun
            </button>
            <div className="pt-2 border-t border-slate-800">
              <div className="text-xs text-amber-400 font-semibold mb-2">Coba Demo 1-Klik:</div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => { loginAs('mahasiswa'); setMobileNavOpen(false); }}
                  className="px-2 py-1.5 text-xs bg-slate-800 text-slate-200 rounded border border-slate-700 font-medium"
                >
                  Mahasiswa
                </button>
                <button
                  onClick={() => { loginAs('dosen'); setMobileNavOpen(false); }}
                  className="px-2 py-1.5 text-xs bg-slate-800 text-slate-200 rounded border border-slate-700 font-medium"
                >
                  Dosen
                </button>
                <button
                  onClick={() => { loginAs('admin'); setMobileNavOpen(false); }}
                  className="px-2 py-1.5 text-xs bg-slate-800 text-slate-200 rounded border border-slate-700 font-medium"
                >
                  Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Dashboard Header for Authenticated Users (Admin, Dosen, Mahasiswa)
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm h-16 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Hamburger & Brand Title */}
      <div className="flex items-center space-x-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:hidden"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setActivePage('dashboard')}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border border-amber-500/40 p-0.5 bg-slate-900 flex-shrink-0">
            <img
              src={UNIVERSITY_INFO.logo}
              alt={UNIVERSITY_INFO.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-widest leading-none">
              E-Learning Portal
            </div>
            <div className="text-sm font-extrabold text-slate-900 tracking-wide font-serif leading-tight">
              {UNIVERSITY_INFO.name}
            </div>
          </div>
        </div>
      </div>

      {/* Middle: Search bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari mata kuliah, materi, tugas, atau dosen..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 hover:bg-slate-50 focus:bg-white border border-transparent focus:border-amber-500 rounded-full transition-all outline-none text-slate-800"
          />
        </div>
      </div>

      {/* Right: Quick actions, notifications, role switcher & user profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Quick Role Switcher Pill (Great for demonstration & testing) */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
            title="Ganti peran pengguna (Admin / Dosen / Mahasiswa)"
          >
            <span className="capitalize">{currentUser.role}</span>
            <ChevronDown className="w-3.5 h-3.5 text-amber-700" />
          </button>

          {showRoleSwitcher && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs">
              <div className="px-3 py-1 font-bold text-[11px] text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Ganti Peran Uji Coba (1-Klik)
              </div>
              <button
                onClick={() => { loginAs('mahasiswa'); setShowRoleSwitcher(false); }}
                className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-700"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <div>
                  <div className="font-semibold">Mahasiswa (Farhan)</div>
                  <div className="text-[10px] text-slate-500">NIM: 20230810145</div>
                </div>
              </button>
              <button
                onClick={() => { loginAs('dosen'); setShowRoleSwitcher(false); }}
                className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-700"
              >
                <Briefcase className="w-4 h-4 text-sky-600" />
                <div>
                  <div className="font-semibold">Dosen (Dr. Rusydi)</div>
                  <div className="text-[10px] text-slate-500">NIDN: 0412088201</div>
                </div>
              </button>
              <button
                onClick={() => { loginAs('admin'); setShowRoleSwitcher(false); }}
                className="w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-700"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="font-semibold">Administrator</div>
                  <div className="text-[10px] text-slate-500">PTIPD Kampus Pusat</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              if (!showNotifMenu) markNotificationsAsRead();
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="Pemberitahuan"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm">Pemberitahuan Akademik</span>
                <span className="text-[11px] text-slate-500">Terbaru</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between font-semibold text-slate-800">
                      <span>{notif.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{notif.time}</span>
                    </div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => { setActivePage('announcements'); setShowNotifMenu(false); }}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
                >
                  Lihat Semua Pengumuman Kampus &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-amber-500"
            />
            <div className="text-left hidden md:block">
              <div className="text-xs font-bold text-slate-800 max-w-[130px] truncate leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                {currentUser.identifier}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 text-xs">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="font-bold text-slate-800 text-sm truncate">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500">{currentUser.email}</div>
                <div className="mt-1.5 inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold uppercase text-[10px]">
                  {currentUser.role} • {currentUser.status}
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => { setActivePage('profile'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-700"
                >
                  <UserIcon className="w-4 h-4 text-slate-500" />
                  <span>Profil & Data Akademik</span>
                </button>
                <button
                  onClick={() => { setActivePage('profile'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-700"
                >
                  <KeyRound className="w-4 h-4 text-slate-500" />
                  <span>Ubah Kata Sandi</span>
                </button>
                <button
                  onClick={() => { setActivePage('landing'); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-700"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>Lihat Halaman Publik</span>
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={() => { resetAllData(); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-slate-50 text-slate-500 text-[11px]"
                  title="Kembalikan semua data ke pengaturan awal"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Data Demo Sistem</span>
                </button>
                <button
                  onClick={() => { logout(); setShowProfileMenu(false); }}
                  className="w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-red-50 text-red-600 font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar (Logout)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

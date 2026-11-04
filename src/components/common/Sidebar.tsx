import React from 'react';
import { useApp, ActivePage } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardList,
  GraduationCap,
  CheckCircle2,
  Award,
  Calendar,
  MessageSquare,
  Megaphone,
  User,
  Users,
  Briefcase,
  Building2,
  Layers,
  KeyRound,
  ChevronRight,
  LogOut,
  RotateCcw,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentUser, activePage, setActivePage, logout, resetAllData, assignments, exams } = useApp();

  if (!currentUser) return null;

  const role = currentUser.role;

  // Unsubmitted assignments badge for student or pending grading for lecturer
  const pendingAssignmentsCount = role === 'mahasiswa' ? assignments.length : 2;
  const activeExamsCount = exams.filter(e => e.status === 'Aktif').length;

  type MenuItem = {
    id: ActivePage;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  };

  const adminMenu: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard Admin', icon: LayoutDashboard },
    { id: 'admin-students', label: 'Data Mahasiswa', icon: GraduationCap },
    { id: 'admin-lecturers', label: 'Data Dosen', icon: Briefcase },
    { id: 'admin-departments', label: 'Fakultas & Prodi', icon: Building2 },
    { id: 'admin-courses', label: 'Mata Kuliah & Kelas', icon: BookOpen },
    { id: 'admin-users', label: 'Akun & Hak Akses', icon: Users },
    { id: 'schedule', label: 'Jadwal Kuliah Master', icon: Calendar },
    { id: 'announcements', label: 'Pengumuman Kampus', icon: Megaphone },
    { id: 'profile', label: 'Log Sistem & Profil', icon: User },
  ];

  const dosenMenu: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard Dosen', icon: LayoutDashboard },
    { id: 'courses', label: 'Mata Kuliah Diampu', icon: BookOpen },
    { id: 'materials', label: 'Unggah Materi', icon: FileText },
    { id: 'assignments', label: 'Tugas Perkuliahan', icon: ClipboardList, badge: pendingAssignmentsCount, badgeColor: 'bg-amber-500' },
    { id: 'exams', label: 'Bank Soal & Ujian CBT', icon: Award, badge: activeExamsCount, badgeColor: 'bg-indigo-500' },
    { id: 'attendance', label: 'Kelola Presensi', icon: CheckCircle2 },
    { id: 'grades', label: 'Rekap Nilai Mahasiswa', icon: Layers },
    { id: 'schedule', label: 'Jadwal Mengajar', icon: Calendar },
    { id: 'forum', label: 'Forum Diskusi', icon: MessageSquare },
    { id: 'announcements', label: 'Pengumuman Kampus', icon: Megaphone },
    { id: 'profile', label: 'Profil Saya', icon: User },
  ];

  const mahasiswaMenu: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard Mahasiswa', icon: LayoutDashboard },
    { id: 'courses', label: 'Mata Kuliah Saya', icon: BookOpen },
    { id: 'materials', label: 'Materi Pembelajaran', icon: FileText },
    { id: 'assignments', label: 'Tugas Kuliah', icon: ClipboardList, badge: pendingAssignmentsCount, badgeColor: 'bg-rose-500' },
    { id: 'exams', label: 'Ujian Online (CBT)', icon: Award, badge: activeExamsCount, badgeColor: 'bg-amber-500' },
    { id: 'attendance', label: 'Presensi Kuliah', icon: CheckCircle2 },
    { id: 'grades', label: 'Nilai & KHS', icon: Layers },
    { id: 'schedule', label: 'Jadwal & Kalender', icon: Calendar },
    { id: 'forum', label: 'Forum Diskusi', icon: MessageSquare },
    { id: 'announcements', label: 'Pengumuman Kampus', icon: Megaphone },
    { id: 'profile', label: 'Profil Pribadi', icon: User },
  ];

  const menuItems = role === 'admin' ? adminMenu : role === 'dosen' ? dosenMenu : mahasiswaMenu;

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 z-30 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* User identification badge */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center space-x-3">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={currentUser.name}
              className="w-10 h-10 rounded-xl object-cover border border-amber-400/40 shadow-sm"
            />
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[10px] text-amber-400 font-mono flex items-center space-x-1">
                <span>{currentUser.identifier}</span>
              </div>
              <div className="mt-1 flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold">
                  {role === 'admin' ? 'Super Admin' : role === 'dosen' ? 'Dosen Tetap' : 'Mahasiswa Aktif'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Navigasi Utama
          </div>

          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300 font-semibold border-l-4 border-amber-400 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3 truncate">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-300'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] font-bold rounded-full text-white ${
                        item.badgeColor || 'bg-amber-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom controls */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-1">
          <button
            onClick={() => handleNavClick('profile')}
            className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            <span>Pengaturan Akun</span>
          </button>
          <button
            onClick={resetAllData}
            className="w-full flex items-center space-x-2.5 px-3 py-2 text-[11px] text-slate-500 hover:text-amber-300 hover:bg-slate-800/50 rounded-lg transition-colors"
            title="Kembalikan data demo ke setelan awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Aplikasi</span>
          </button>
        </div>
      </aside>
    </>
  );
};

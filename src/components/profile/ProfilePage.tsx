import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  User as UserIcon,
  KeyRound,
  Activity,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Save,
  AlertCircle,
  Clock,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, changePassword, activityLogs } = useApp();

  const [activeTab, setActiveTab] = useState<'info' | 'security' | 'activity'>('info');

  // Edit Bio form states
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || 'Jakarta, Indonesia');
  const [expertise, setExpertise] = useState(currentUser?.expertise || '');

  // Change Password form states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMsg, setPwdMsg] = useState<{ text: string; isError?: boolean } | null>(null);

  if (!currentUser) return null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      phone,
      address,
      expertise: currentUser.role === 'dosen' ? expertise : undefined,
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);

    if (!newPassword || newPassword.length < 6) {
      setPwdMsg({ text: 'Kata sandi baru minimal 6 karakter!', isError: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwdMsg({ text: 'Konfirmasi kata sandi tidak cocok!', isError: true });
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPwdMsg({ text: 'Kata sandi Anda berhasil diperbarui dengan aman!', isError: false });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwdMsg({ text: res.message, isError: true });
    }
  };

  const myActivityLogs = activityLogs.filter(
    l => l.userId === currentUser.id || currentUser.role === 'admin'
  );

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black font-serif text-slate-900">
          Profil & Pengaturan Akun Akademik
        </h1>
        <p className="text-xs text-slate-500">
          Kelola data diri, keamanan kata sandi, dan riwayat aktivitas pembelajaran Anda di {UNIVERSITY_INFO.name}
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
        <div className="relative">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={currentUser.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-amber-400 p-0.5 bg-slate-800 shadow-xl"
          />
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 shadow-md">
            {currentUser.role === 'admin' ? (
              <ShieldCheck className="w-4 h-4" />
            ) : currentUser.role === 'dosen' ? (
              <Briefcase className="w-4 h-4" />
            ) : (
              <GraduationCap className="w-4 h-4" />
            )}
          </div>
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
              {currentUser.name}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
              {currentUser.role} • {currentUser.status}
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {currentUser.role === 'mahasiswa'
              ? `NIM: ${currentUser.identifier}`
              : currentUser.role === 'dosen'
              ? `NIDN: ${currentUser.identifier}`
              : `NIP: ${currentUser.identifier}`}
          </div>

          <div className="text-xs text-slate-600 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 pt-1">
            <span>{currentUser.faculty}</span>
            <span>•</span>
            <span>{currentUser.studyProgram}</span>
            {currentUser.semester && <span>• Semester {currentUser.semester}</span>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-xs text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'info'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserIcon className="w-4 h-4" />
          <span>Biodata Pribadi</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'security'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Keamanan Kata Sandi</span>
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'activity'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Riwayat Aktivitas Pembelajaran</span>
        </button>
      </div>

      {/* Tab 1: Biodata Pribadi */}
      {activeTab === 'info' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleUpdateProfile} className="space-y-5 text-xs max-w-2xl">
            <h3 className="text-base font-bold text-slate-900 font-serif pb-2 border-b border-slate-100">
              Informasi Kontak & Domisili
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Sivitas Kampus</label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="08123456789"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Alamat Domisili</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Jl. Salemba Tengah No. 12, Jakarta"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            {currentUser.role === 'dosen' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bidang Kepakaran Ilmiah & Riset</label>
                <textarea
                  rows={3}
                  value={expertise}
                  onChange={e => setExpertise(e.target.value)}
                  placeholder="Contoh: Software Architecture, Deep Learning, Cloud Native..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Data</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Keamanan Kata Sandi */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-xl">
          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif pb-2 border-b border-slate-100">
              Perbarui Kata Sandi Akun Anda
            </h3>

            {pwdMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
                  pwdMsg.isError
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                <span>{pwdMsg.text}</span>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kata Sandi Saat Ini</label>
              <input
                type="password"
                required
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Masukkan kata sandi lama..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Kata Sandi Baru (Min. 6 Karakter)</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Masukkan kata sandi baru..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Ulangi Kata Sandi Baru</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang kata sandi baru..."
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Simpan Kata Sandi Baru</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Riwayat Aktivitas Pembelajaran */}
      {activeTab === 'activity' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Log Audit & Riwayat Akses Pembelajaran
              </h3>
              <p className="text-xs text-slate-500">
                Catatan komprehensif tindakan perkuliahan, presensi, pengerjaan tugas, dan pengunggahan berkas
              </p>
            </div>
            <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded-full text-slate-600">
              Total {myActivityLogs.length} Entri
            </span>
          </div>

          <div className="space-y-3">
            {myActivityLogs.map(log => (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{log.userName}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-100 text-amber-800">
                      {log.userRole}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{log.action}</p>
                </div>

                <div className="text-right text-[11px] text-slate-400 font-mono self-start sm:self-center">
                  <div>{log.timestamp}</div>
                  <div>IP: {log.ipAddress || '180.252.12.89'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

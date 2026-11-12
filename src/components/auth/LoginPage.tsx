import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, loginAs, loginWithGoogle, setActivePage } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('mahasiswa');
  const [identifier, setIdentifier] = useState('20230810145'); // Default prefill for convenience
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // When switching tabs, provide helpful placeholder and prefilled demo ID
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'mahasiswa') {
      setIdentifier('20230810145');
    } else if (role === 'dosen') {
      setIdentifier('0412088201');
    } else {
      setIdentifier('admin@ibnurusman.ac.id');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Nomor identitas (NIM/NIDN/Email) tidak boleh kosong!');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Kata sandi wajib diisi!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const success = login(identifier, selectedRole);
      if (!success) {
        setErrorMessage(
          `Identitas atau kata sandi salah untuk peran ${selectedRole.toUpperCase()}. Anda juga dapat menggunakan tombol Akses Cepat Demo di bawah.`
        );
      }
    }, 400);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrorMessage('');
    const res = await loginWithGoogle(selectedRole);
    setIsGoogleLoading(false);
    if (!res.success && res.message && !res.message.includes('ditutup')) {
      setErrorMessage(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-slate-200">
      {/* Background Campus Ambient */}
      <div className="absolute inset-0 z-0">
        <img
          src={UNIVERSITY_INFO.campusHero}
          alt="Campus"
          className="w-full h-full object-cover filter brightness-[0.2] blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/80" />
      </div>

      {/* Top back button */}
      <div className="relative z-10 max-w-md mx-auto w-full px-4 mb-4">
        <button
          onClick={() => setActivePage('landing')}
          className="inline-flex items-center space-x-2 text-xs text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda Utama</span>
        </button>
      </div>

      {/* Card Header & Brand */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        <div className="w-20 h-20 rounded-full mx-auto overflow-hidden border-2 border-amber-400 p-0.5 bg-slate-900 shadow-2xl mb-3">
          <img
            src={UNIVERSITY_INFO.logo}
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-wider">
          {UNIVERSITY_INFO.name}
        </h2>
        <p className="text-xs text-amber-400 font-bold uppercase tracking-widest mt-1">
          {UNIVERSITY_INFO.systemTitle}
        </p>
      </div>

      {/* Login Box */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl">
          {/* Role Tabs */}
          <div className="flex rounded-xl bg-slate-950/80 p-1 border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange('mahasiswa')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === 'mahasiswa'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mahasiswa</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('dosen')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === 'dosen'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Dosen</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold rounded-lg transition-all ${
                selectedRole === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>

          {/* Real Google Account Sign-In Button */}
          <div className="mb-6 space-y-3">
            <button
              type="button"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignIn}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl shadow-lg border border-slate-300 transition-all text-xs sm:text-sm flex items-center justify-center space-x-3 group transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {isGoogleLoading ? (
                <div className="flex items-center space-x-2 text-slate-600">
                  <svg className="animate-spin h-4 w-4 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Membuka Google Sign-In...</span>
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="font-semibold text-slate-800">
                    Masuk dengan Akun Google
                  </span>
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-700 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] text-slate-400 uppercase tracking-widest font-semibold absolute">
                atau masuk dengan NIM / NIDN
              </span>
            </div>
          </div>

          {/* Error notice */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {selectedRole === 'mahasiswa'
                  ? 'Nomor Induk Mahasiswa (NIM)'
                  : selectedRole === 'dosen'
                  ? 'Nomor Induk Dosen Nasional (NIDN)'
                  : 'Email / Username Administrator'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={
                    selectedRole === 'mahasiswa'
                      ? 'Contoh: 20230810145'
                      : selectedRole === 'dosen'
                      ? 'Contoh: 0412088201'
                      : 'Contoh: admin@ibnurusman.ac.id'
                  }
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Kata Sandi</label>
                <button
                  type="button"
                  onClick={() => alert('Fitur reset kata sandi demo: Silakan gunakan kata sandi demo "password123" atau klik tombol Demo di bawah.')}
                  className="text-[11px] text-amber-400 hover:text-amber-300"
                >
                  Lupa sandi?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center text-xs text-slate-400">
              <input
                id="remember"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-amber-500 border-slate-700 rounded bg-slate-900 focus:ring-amber-500"
              />
              <label htmlFor="remember" className="ml-2 cursor-pointer">
                Ingat sesi saya di perangkat ini
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all text-sm flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <span>Memverifikasi kredensial...</span>
              ) : (
                <>
                  <span>Masuk ke Akun {selectedRole.toUpperCase()}</span>
                </>
              )}
            </button>
          </form>

          {/* One-Click Demo Personas */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Akses Cepat 1-Klik Akun Demo:</span>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => loginAs('mahasiswa')}
                className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-emerald-500/30 rounded-xl text-left text-xs flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span><strong>Mahasiswa:</strong> M. Farhan (20230810145)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">Masuk &rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => loginAs('dosen')}
                className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-sky-500/30 rounded-xl text-left text-xs flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span><strong>Dosen:</strong> Dr. Ir. Ahmad Rusydi, M.Kom</span>
                </div>
                <span className="text-[10px] text-sky-400 font-bold uppercase">Masuk &rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => login('0417098205', 'dosen')}
                className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-purple-500/30 rounded-xl text-left text-xs flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                  <span><strong>Dosen Kedokteran:</strong> Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.</span>
                </div>
                <span className="text-[10px] text-purple-400 font-bold uppercase">Masuk &rarr;</span>
              </button>

              <button
                type="button"
                onClick={() => loginAs('admin')}
                className="w-full py-2 px-3 bg-slate-800/80 hover:bg-slate-800 border border-amber-500/30 rounded-xl text-left text-xs flex items-center justify-between text-slate-200 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span><strong>Admin:</strong> Drs. H. Mulyono Santoso</span>
                </div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">Masuk &rarr;</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-slate-400">
            Belum memiliki akun terdaftar?{' '}
            <button
              onClick={() => setActivePage('register')}
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
            >
              Registrasi Akun Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  GraduationCap,
  Briefcase,
  User,
  Mail,
  Lock,
  Phone,
  ArrowLeft,
  AlertCircle,
  Building2,
  CheckCircle,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { registerUser, loginWithGoogle, setActivePage, faculties, studyPrograms } = useApp();

  const [role, setRole] = useState<UserRole>('mahasiswa');
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [faculty, setFaculty] = useState(faculties[0]?.name || 'Fakultas Teknik & Ilmu Komputer');
  const [studyProgram, setStudyProgram] = useState(studyPrograms[0]?.name || 'Teknik Informatika');
  const [semester, setSemester] = useState(1);
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setErrorMsg('');
    const res = await loginWithGoogle(role);
    setIsGoogleLoading(false);
    if (!res.success && res.message && !res.message.includes('ditutup')) {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !identifier.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Semua kolom bertanda bintang (*) wajib diisi!');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter!');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Anda wajib menyetujui Pakta Integritas & Ketentuan Akademik!');
      return;
    }

    const result = registerUser({
      name,
      identifier,
      email,
      phone,
      role,
      faculty,
      studyProgram,
      semester,
      gender,
      title: role === 'dosen' ? title || 'M.Kom' : undefined,
      password,
    });

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative text-slate-200">
      <div className="absolute inset-0 z-0">
        <img
          src={UNIVERSITY_INFO.campusHero}
          alt="Campus"
          className="w-full h-full object-cover filter brightness-[0.2] blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-900/85" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto w-full px-4 mb-4">
        <button
          onClick={() => setActivePage('landing')}
          className="inline-flex items-center space-x-2 text-xs text-slate-400 hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda Utama</span>
        </button>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-xl text-center px-4">
        <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-amber-400 p-0.5 bg-slate-900 shadow-xl mb-2">
          <img
            src={UNIVERSITY_INFO.logo}
            alt="Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-black font-serif text-white tracking-wide">
          Pendaftaran Akun Baru E-Learning
        </h2>
        <p className="text-xs text-amber-400 font-medium mt-1">
          {UNIVERSITY_INFO.name}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl relative z-10 px-4">
        <div className="bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl">
          {/* Role selector */}
          <div className="flex rounded-xl bg-slate-950/80 p-1 border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => setRole('mahasiswa')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'mahasiswa'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Daftar sebagai Mahasiswa</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('dosen')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-semibold rounded-lg transition-all ${
                role === 'dosen'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Daftar sebagai Dosen</span>
            </button>
          </div>

          {/* Quick Register with Google */}
          <div className="mb-6 space-y-3">
            <button
              type="button"
              disabled={isGoogleLoading}
              onClick={handleGoogleSignUp}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl shadow-lg border border-slate-300 transition-all text-xs flex items-center justify-center space-x-3 group transform hover:-translate-y-0.5 active:translate-y-0"
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
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
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
                    Daftar Cepat dengan Akun Google ({role === 'mahasiswa' ? 'Mahasiswa' : 'Dosen'})
                  </span>
                </>
              )}
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-slate-700 w-full" />
              <span className="bg-slate-900 px-3 text-[10px] text-slate-400 uppercase tracking-widest font-semibold absolute">
                atau isi formulir pendaftaran manual
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nama Lengkap & Gelar (jika ada) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={role === 'mahasiswa' ? 'Contoh: Ahmad Fauzan' : 'Contoh: Dr. Ir. Budi Santoso, M.Kom'}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {role === 'mahasiswa' ? 'NIM Mahasiswa *' : 'NIDN Dosen *'}
                </label>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder={role === 'mahasiswa' ? 'Contoh: 20240810999' : 'Contoh: 0418098001'}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Jenis Kelamin *
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Sivitas Kampus *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="nama@ibnurusman.ac.id"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="08123456789"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fakultas *
                </label>
                <select
                  value={faculty}
                  onChange={e => setFaculty(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {faculties.map(f => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Program Studi *
                </label>
                <select
                  value={studyProgram}
                  onChange={e => setStudyProgram(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {studyPrograms.map(sp => (
                    <option key={sp.id} value={sp.name}>
                      {sp.degree} {sp.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {role === 'mahasiswa' ? (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Semester Awal Perkuliahan
                </label>
                <select
                  value={semester}
                  onChange={e => setSemester(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={s}>
                      Semester {s}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bidang Keahlian Utama (Dosen)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Kecerdasan Buatan & Sistem Terdistribusi"
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kata Sandi *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ulangi Kata Sandi *
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi"
                  className="w-full px-3 py-2 bg-slate-950/70 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-start text-xs text-slate-400 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={e => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-amber-500 border-slate-700 rounded bg-slate-900 focus:ring-amber-500"
              />
              <label htmlFor="terms" className="ml-2 cursor-pointer leading-relaxed">
                Saya menyatakan data yang saya isi adalah benar dan menyetujui Pakta Integritas Kode Etik Akademik Universitas Ibnu Rusman.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/25 transition-all text-sm mt-4 flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Daftarkan Akun Resmi</span>
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            Sudah memiliki akun terdaftar?{' '}
            <button
              onClick={() => setActivePage('login')}
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-4"
            >
              Masuk di sini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

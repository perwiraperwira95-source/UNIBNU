import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, UserRole } from '../../types';
import {
  Users,
  Search,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  KeyRound,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  Sparkles,
  Lock,
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const { users, updateUser, deleteUser, addUser } = useApp();

  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [showResetModal, setShowResetModal] = useState<User | null>(null);
  const [newPass, setNewPass] = useState('ibnurusman2026');

  const filteredUsers = users.filter(u => {
    const matchesRole = selectedRole === 'all' || u.role === selectedRole;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.identifier.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleToggleStatus = (u: User) => {
    const nextStatus = u.status === 'Aktif' ? 'Non-Aktif' : 'Aktif';
    updateUser(u.id, { status: nextStatus });
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResetModal) return;
    alert(`Kata sandi untuk pengguna ${showResetModal.name} (${showResetModal.identifier}) berhasil direset menjadi: "${newPass}"`);
    setShowResetModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Manajemen Akun Pengguna & Hak Akses
          </h1>
          <p className="text-xs text-slate-500">
            Otoritas akun Admin, Dosen Pengampu, dan Mahasiswa, reset kredensial, serta kontrol status aktif
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama, identitas (NIM/NIDN), atau email..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 w-full sm:w-auto"
        >
          <option value="all">Semua Peran (Roles)</option>
          <option value="admin">Administrator</option>
          <option value="dosen">Dosen Pengampu</option>
          <option value="mahasiswa">Mahasiswa</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">Pengguna</th>
                <th className="p-4">Identitas (NIM/NIDN/NIP)</th>
                <th className="p-4 text-center">Hak Akses Role</th>
                <th className="p-4">Unit / Fakultas</th>
                <th className="p-4 text-center">Status Akun</th>
                <th className="p-4 text-center">Tindakan Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                        alt={u.name}
                        className="w-9 h-9 rounded-xl object-cover border border-amber-400"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-amber-700">{u.identifier}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        u.role === 'admin'
                          ? 'bg-amber-100 text-amber-800'
                          : u.role === 'dosen'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">
                    <div>{u.studyProgram || u.title || 'Pusat IT'}</div>
                    <div className="text-[10px] text-slate-400">{u.faculty || 'Biro Rektorat'}</div>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(u)}
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                        u.status === 'Aktif'
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                      }`}
                    >
                      {u.status} (Klik Toggle)
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setShowResetModal(u)}
                        className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors flex items-center space-x-1"
                        title="Reset Kata Sandi"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span className="text-[10px] font-semibold">Reset</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Yakin hapus akun ${u.name}?`)) {
                            deleteUser(u.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus Akun"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Reset Password */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Reset Kata Sandi Pengguna</h3>
              <button
                onClick={() => setShowResetModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">{showResetModal.name}</div>
                <div className="text-slate-500 font-mono text-[11px]">{showResetModal.identifier}</div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kata Sandi Baru Sementara</label>
                <input
                  type="text"
                  required
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Konfirmasi Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

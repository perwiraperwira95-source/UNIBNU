import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import {
  Briefcase,
  Search,
  Plus,
  Trash2,
  Edit,
  Building2,
  X,
  Award,
} from 'lucide-react';

export const AdminLecturersPage: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, faculties, studyPrograms } = useApp();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState<User | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [faculty, setFaculty] = useState(faculties[0]?.name || 'Fakultas Teknik & Ilmu Komputer');
  const [studyProgram, setStudyProgram] = useState(studyPrograms[0]?.name || 'Teknik Informatika');
  const [title, setTitle] = useState('Dr. Ir., M.Kom');
  const [expertise, setExpertise] = useState('Artificial Intelligence & Cloud Architecture');
  const [status, setStatus] = useState<'Aktif' | 'Cuti' | 'Non-Aktif'>('Aktif');

  const lecturers = users.filter(u => u.role === 'dosen');

  const filteredLecturers = lecturers.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.identifier.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveLecturer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !identifier.trim()) return;

    if (editingLecturer) {
      updateUser(editingLecturer.id, {
        name,
        identifier,
        email,
        phone,
        faculty,
        studyProgram,
        title,
        expertise,
        status,
      });
      setEditingLecturer(null);
    } else {
      addUser({
        name,
        identifier,
        email,
        phone,
        role: 'dosen',
        faculty,
        studyProgram,
        title,
        expertise,
        status,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      });
      setShowAddModal(false);
    }

    setName('');
    setIdentifier('');
  };

  const openEditModal = (lec: User) => {
    setEditingLecturer(lec);
    setName(lec.name);
    setIdentifier(lec.identifier);
    setEmail(lec.email);
    setPhone(lec.phone || '');
    setFaculty(lec.faculty || faculties[0]?.name);
    setStudyProgram(lec.studyProgram || studyPrograms[0]?.name);
    setTitle(lec.title || 'M.Kom');
    setExpertise(lec.expertise || '');
    setStatus(lec.status);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Master Data Dosen Pengampu
          </h1>
          <p className="text-xs text-slate-500">
            Direktori tenaga pendidik perguruan tinggi, Nomor Induk Dosen Nasional (NIDN), dan bidang kepakaran
          </p>
        </div>

        <button
          onClick={() => {
            setEditingLecturer(null);
            setName('');
            setIdentifier('');
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dosen Baru</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama, NIDN, atau prodi dosen..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">Foto & Nama Dosen</th>
                <th className="p-4">NIDN</th>
                <th className="p-4">Fakultas & Homebase</th>
                <th className="p-4">Bidang Kepakaran</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLecturers.map(lec => (
                <tr key={lec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={lec.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
                        alt={lec.name}
                        className="w-9 h-9 rounded-xl object-cover border border-amber-400"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{lec.name}</div>
                        <div className="text-[11px] text-slate-400">{lec.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-amber-700">{lec.identifier}</td>
                  <td className="p-4 text-slate-700">
                    <div className="font-semibold">{lec.studyProgram}</div>
                    <div className="text-[11px] text-slate-400">{lec.faculty}</div>
                  </td>
                  <td className="p-4 text-slate-600 max-w-xs truncate">{lec.expertise || '-'}</td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {lec.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(lec)}
                        className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data dosen ${lec.name}?`)) {
                            deleteUser(lec.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus"
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

      {/* Modal: Add / Edit Lecturer */}
      {(showAddModal || editingLecturer) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingLecturer ? 'Edit Data Dosen' : 'Tambah Dosen Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingLecturer(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLecturer} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Dr. Ir. Ahmad Rusydi, M.Kom"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIDN *</label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="0412088201"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Kepegawaian</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Cuti">Cuti</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="dosen@ibnurusman.ac.id"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">No. Kontak / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="081387654321"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fakultas</label>
                  <select
                    value={faculty}
                    onChange={e => setFaculty(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    {faculties.map(f => (
                      <option key={f.id} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Program Studi</label>
                  <select
                    value={studyProgram}
                    onChange={e => setStudyProgram(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    {studyPrograms.map(sp => (
                      <option key={sp.id} value={sp.name}>
                        {sp.degree} {sp.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bidang Keahlian / Riset</label>
                <input
                  type="text"
                  value={expertise}
                  onChange={e => setExpertise(e.target.value)}
                  placeholder="Artificial Intelligence, Software Engineering..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingLecturer(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Simpan Data Dosen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

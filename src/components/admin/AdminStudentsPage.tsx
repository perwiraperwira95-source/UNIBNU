import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import {
  GraduationCap,
  Search,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, faculties, studyPrograms } = useApp();

  const [search, setSearch] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<User | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [faculty, setFaculty] = useState(faculties[0]?.name || 'Fakultas Teknik & Ilmu Komputer');
  const [studyProgram, setStudyProgram] = useState(studyPrograms[0]?.name || 'Teknik Informatika');
  const [semester, setSemester] = useState(6);
  const [status, setStatus] = useState<'Aktif' | 'Cuti' | 'Non-Aktif'>('Aktif');

  const students = users.filter(u => u.role === 'mahasiswa');

  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.identifier.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesProdi = selectedProdi === 'all' || s.studyProgram === selectedProdi;
    return matchesSearch && matchesProdi;
  });

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !identifier.trim()) return;

    if (editingStudent) {
      updateUser(editingStudent.id, {
        name,
        identifier,
        email,
        phone,
        faculty,
        studyProgram,
        semester,
        status,
      });
      setEditingStudent(null);
    } else {
      addUser({
        name,
        identifier,
        email,
        phone,
        role: 'mahasiswa',
        faculty,
        studyProgram,
        semester,
        status,
        ipk: 3.75,
        totalSks: 80,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      });
      setShowAddModal(false);
    }

    setName('');
    setIdentifier('');
    setEmail('');
  };

  const openEditModal = (student: User) => {
    setEditingStudent(student);
    setName(student.name);
    setIdentifier(student.identifier);
    setEmail(student.email);
    setPhone(student.phone || '');
    setFaculty(student.faculty || faculties[0]?.name);
    setStudyProgram(student.studyProgram || studyPrograms[0]?.name);
    setSemester(student.semester || 6);
    setStatus(student.status);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Master Data Mahasiswa
          </h1>
          <p className="text-xs text-slate-500">
            Pengelolaan direktori mahasiswa aktif, status akademik, dan penetapan program studi
          </p>
        </div>

        <button
          onClick={() => {
            setEditingStudent(null);
            setName('');
            setIdentifier('');
            setEmail('');
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mahasiswa Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama, NIM, atau email mahasiswa..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={selectedProdi}
          onChange={e => setSelectedProdi(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 w-full sm:w-auto"
        >
          <option value="all">Semua Program Studi</option>
          {studyPrograms.map(sp => (
            <option key={sp.id} value={sp.name}>
              {sp.degree} {sp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">Foto & Nama Mahasiswa</th>
                <th className="p-4">NIM</th>
                <th className="p-4">Program Studi</th>
                <th className="p-4 text-center">Semester</th>
                <th className="p-4 text-center">IPK</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'}
                        alt={student.name}
                        className="w-9 h-9 rounded-xl object-cover border border-amber-400"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[11px] text-slate-400">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-amber-700">{student.identifier}</td>
                  <td className="p-4 text-slate-700 font-medium">{student.studyProgram}</td>
                  <td className="p-4 text-center font-bold text-slate-800">Sem. {student.semester || 6}</td>
                  <td className="p-4 text-center font-bold text-emerald-600 font-mono">{student.ipk || '3.86'}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        student.status === 'Aktif'
                          ? 'bg-emerald-100 text-emerald-800'
                          : student.status === 'Cuti'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(student)}
                        className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus data mahasiswa ${student.name}?`)) {
                            deleteUser(student.id);
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

      {/* Modal: Add / Edit Student */}
      {(showAddModal || editingStudent) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingStudent ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingStudent(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Mahasiswa *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Farhan Ramadhan"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Induk Mahasiswa (NIM) *</label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    placeholder="20230810145"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Akademik</label>
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
                  <label className="block font-semibold text-slate-700 mb-1">Email Mahasiswa</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="farhan@student.ibnurusman.ac.id"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={e => setSemester(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
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

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Simpan Data Mahasiswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

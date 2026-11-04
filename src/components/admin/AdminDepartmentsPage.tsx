import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Faculty, StudyProgram } from '../../types';
import {
  Building2,
  GraduationCap,
  Plus,
  Award,
  Search,
  X,
  Sparkles,
} from 'lucide-react';

export const AdminDepartmentsPage: React.FC = () => {
  const { faculties, studyPrograms, addFaculty, addStudyProgram } = useApp();

  const [activeTab, setActiveTab] = useState<'faculties' | 'programs'>('faculties');
  const [showAddFacModal, setShowAddFacModal] = useState(false);
  const [showAddProdiModal, setShowAddProdiModal] = useState(false);

  // Faculty form
  const [facName, setFacName] = useState('');
  const [facCode, setFacCode] = useState('');
  const [facDean, setFacDean] = useState('');
  const [facDesc, setFacDesc] = useState('');

  // Study program form
  const [prodiName, setProdiName] = useState('');
  const [prodiCode, setProdiCode] = useState('');
  const [facultyId, setFacultyId] = useState(faculties[0]?.id || '');
  const [degree, setDegree] = useState<'S1' | 'S2' | 'D3' | 'Profesi'>('S1');
  const [accreditation, setAccreditation] = useState<'Unggul' | 'A' | 'Baik Sekali'>('Unggul');
  const [headOfProgram, setHeadOfProgram] = useState('');

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facName.trim() || !facCode.trim()) return;

    addFaculty({
      name: facName,
      code: facCode,
      dean: facDean,
      description: facDesc,
    });

    setShowAddFacModal(false);
    setFacName('');
    setFacCode('');
  };

  const handleCreateProdi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodiName.trim() || !prodiCode.trim()) return;

    const targetFac = faculties.find(f => f.id === facultyId) || faculties[0];
    addStudyProgram({
      name: prodiName,
      code: prodiCode,
      facultyId: targetFac?.id || 'fac-1',
      facultyName: targetFac?.name || 'Fakultas Teknik & Ilmu Komputer',
      degree,
      accreditation,
      headOfProgram,
    });

    setShowAddProdiModal(false);
    setProdiName('');
    setProdiCode('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Fakultas & Program Studi
          </h1>
          <p className="text-xs text-slate-500">
            Struktur kelembagaan akademik, kepemimpinan dekanat, kaprodi, dan akreditasi BAN-PT
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'faculties' ? (
            <button
              onClick={() => setShowAddFacModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Fakultas</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddProdiModal(true)}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Program Studi</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-xs text-xs font-semibold w-fit">
        <button
          onClick={() => setActiveTab('faculties')}
          className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all ${
            activeTab === 'faculties'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Direktori Fakultas ({faculties.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('programs')}
          className={`flex items-center space-x-2 px-5 py-2 rounded-xl transition-all ${
            activeTab === 'programs'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Program Studi ({studyPrograms.length})</span>
        </button>
      </div>

      {/* View 1: Faculties Grid */}
      {activeTab === 'faculties' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map(fac => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold tracking-wider">
                    {fac.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {fac.programsCount} Prodi Aktif
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base font-serif">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fac.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                <span className="text-slate-400">Dekan Fakultas:</span>
                <div className="font-bold text-slate-800 mt-0.5">{fac.dean}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View 2: Study Programs Table */}
      {activeTab === 'programs' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-4">Kode Prodi</th>
                  <th className="p-4">Nama Program Studi</th>
                  <th className="p-4 text-center">Jenjang</th>
                  <th className="p-4">Fakultas Induk</th>
                  <th className="p-4 text-center">Akreditasi</th>
                  <th className="p-4">Ketua Program Studi (Kaprodi)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studyPrograms.map(sp => (
                  <tr key={sp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-700">{sp.code}</td>
                    <td className="p-4 font-bold text-slate-900">{sp.name}</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-800">
                        {sp.degree}
                      </span>
                    </td>
                    <td className="p-4 text-slate-700">{sp.facultyName}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {sp.accreditation}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">{sp.headOfProgram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Faculty */}
      {showAddFacModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Tambah Fakultas Baru</h3>
              <button
                onClick={() => setShowAddFacModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFaculty} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Fakultas *</label>
                <input
                  type="text"
                  required
                  value={facName}
                  onChange={e => setFacName(e.target.value)}
                  placeholder="Fakultas Sains Data & Kecerdasan Buatan"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode Singkatan *</label>
                  <input
                    type="text"
                    required
                    value={facCode}
                    onChange={e => setFacCode(e.target.value)}
                    placeholder="FSDKB"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Dekan *</label>
                  <input
                    type="text"
                    required
                    value={facDean}
                    onChange={e => setFacDean(e.target.value)}
                    placeholder="Prof. Dr. Ir. ..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={facDesc}
                  onChange={e => setFacDesc(e.target.value)}
                  placeholder="Fokus keilmuan dan pusat keunggulan..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFacModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Simpan Fakultas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Study Program */}
      {showAddProdiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Tambah Program Studi Baru</h3>
              <button
                onClick={() => setShowAddProdiModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProdi} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Fakultas Induk *</label>
                <select
                  value={facultyId}
                  onChange={e => setFacultyId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  {faculties.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Program Studi *</label>
                <input
                  type="text"
                  required
                  value={prodiName}
                  onChange={e => setProdiName(e.target.value)}
                  placeholder="Contoh: Rekayasa Kecerdasan Artifisial"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode *</label>
                  <input
                    type="text"
                    required
                    value={prodiCode}
                    onChange={e => setProdiCode(e.target.value)}
                    placeholder="RKA-S1"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenjang</label>
                  <select
                    value={degree}
                    onChange={e => setDegree(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="S1">S1 (Sarjana)</option>
                    <option value="S2">S2 (Magister)</option>
                    <option value="D3">D3 (Diploma)</option>
                    <option value="Profesi">Profesi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Akreditasi</label>
                  <select
                    value={accreditation}
                    onChange={e => setAccreditation(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Unggul">Unggul</option>
                    <option value="A">A</option>
                    <option value="Baik Sekali">Baik Sekali</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ketua Program Studi (Kaprodi)</label>
                <input
                  type="text"
                  value={headOfProgram}
                  onChange={e => setHeadOfProgram(e.target.value)}
                  placeholder="Dr. Ir. ..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProdiModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Simpan Program Studi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

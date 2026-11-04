import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course } from '../../types';
import {
  BookOpen,
  Search,
  Plus,
  Trash2,
  Edit,
  Clock,
  Calendar,
  Users,
  X,
} from 'lucide-react';

export const AdminCoursesPage: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse, faculties, studyPrograms, users } = useApp();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [sks, setSks] = useState(3);
  const [semester, setSemester] = useState(6);
  const [faculty, setFaculty] = useState(faculties[0]?.name || 'Fakultas Teknik & Ilmu Komputer');
  const [studyProgram, setStudyProgram] = useState(studyPrograms[0]?.name || 'Teknik Informatika');
  const [lecturerId, setLecturerId] = useState('');
  const [classRoom, setClassRoom] = useState('Lab Komputasi A-201');
  const [day, setDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu'>('Senin');
  const [time, setTime] = useState('08:00 - 10:30 WIB');
  const [description, setDescription] = useState('');

  const lecturers = users.filter(u => u.role === 'dosen');

  const filteredCourses = courses.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    c.lecturerName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    const selectedLecturer = lecturers.find(l => l.id === lecturerId) || lecturers[0];

    if (editingCourse) {
      updateCourse(editingCourse.id, {
        code,
        name,
        sks: Number(sks),
        semester: Number(semester),
        faculty,
        studyProgram,
        lecturerId: selectedLecturer?.id || 'dsn-1',
        lecturerName: selectedLecturer?.name || 'Dr. Ir. Ahmad Rusydi, M.Kom',
        classRoom,
        day,
        time,
        description,
      });
      setEditingCourse(null);
    } else {
      addCourse({
        code,
        name,
        sks: Number(sks),
        semester: Number(semester),
        faculty,
        studyProgram,
        lecturerId: selectedLecturer?.id || 'dsn-1',
        lecturerName: selectedLecturer?.name || 'Dr. Ir. Ahmad Rusydi, M.Kom',
        classRoom,
        day,
        time,
        thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
        description,
        totalMeetings: 16,
      });
      setShowAddModal(false);
    }

    setCode('');
    setName('');
  };

  const openEditModal = (c: Course) => {
    setEditingCourse(c);
    setCode(c.code);
    setName(c.name);
    setSks(c.sks);
    setSemester(c.semester);
    setFaculty(c.faculty);
    setStudyProgram(c.studyProgram);
    setLecturerId(c.lecturerId);
    setClassRoom(c.classRoom);
    setDay(c.day);
    setTime(c.time);
    setDescription(c.description);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Master Data Mata Kuliah & Kelas
          </h1>
          <p className="text-xs text-slate-500">
            Pengelolaan kurikulum mata kuliah, pembagian bobot SKS, dosen pengampu, dan penetapan jadwal ruang
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCourse(null);
            setCode('');
            setName('');
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mata Kuliah Baru</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari kode MK, mata kuliah, atau dosen..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">Kode MK</th>
                <th className="p-4">Nama Mata Kuliah</th>
                <th className="p-4 text-center">SKS</th>
                <th className="p-4 text-center">Semester</th>
                <th className="p-4">Dosen Pengampu</th>
                <th className="p-4">Jadwal & Ruang</th>
                <th className="p-4 text-center">Peserta</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCourses.map(course => (
                <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-amber-700">{course.code}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{course.name}</div>
                    <div className="text-[11px] text-slate-400">{course.studyProgram}</div>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-700">{course.sks} SKS</td>
                  <td className="p-4 text-center font-bold text-slate-700">Sem. {course.semester}</td>
                  <td className="p-4 text-slate-800 font-semibold">{course.lecturerName}</td>
                  <td className="p-4 text-slate-600">
                    <div>{course.day}, {course.time}</div>
                    <div className="text-[11px] text-slate-400">{course.classRoom}</div>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-800">{course.studentsEnrolled} Mhs</td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(course)}
                        className="p-1.5 text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Data"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus mata kuliah ${course.name}?`)) {
                            deleteCourse(course.id);
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

      {/* Modal: Add / Edit Course */}
      {(showAddModal || editingCourse) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                {editingCourse ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah Baru'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCourse(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode Mata Kuliah *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Contoh: TIF-301"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bobot SKS *</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    required
                    value={sks}
                    onChange={e => setSks(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Mata Kuliah *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Contoh: Rekayasa Perangkat Lunak Modern"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosen Pengampu *</label>
                  <select
                    value={lecturerId}
                    onChange={e => setLecturerId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    {lecturers.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
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

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hari Kuliah</label>
                  <select
                    value={day}
                    onChange={e => setDay(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Waktu Jam</label>
                  <input
                    type="text"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    placeholder="08:00 - 10:30 WIB"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ruangan / Lab</label>
                  <input
                    type="text"
                    value={classRoom}
                    onChange={e => setClassRoom(e.target.value)}
                    placeholder="Lab Komputasi A-201"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Mata Kuliah</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ringkasan silabus dan capaian perkuliahan..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Simpan Mata Kuliah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

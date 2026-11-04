import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  Users,
  Clock,
  ArrowRight,
  Plus,
  Calendar,
  Layers,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, currentUser, navigateToCourseDetail, setActivePage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');

  const filteredCourses = courses.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lecturerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFaculty = selectedFaculty === 'all' || c.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Katalog Mata Kuliah & Kelas Perkuliahan
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.role === 'dosen'
              ? 'Daftar mata kuliah yang Anda bimbing dan mata kuliah umum universitas'
              : currentUser?.role === 'admin'
              ? 'Seluruh mata kuliah terdaftar di sistem E-Learning Universitas Ibnu Rusman'
              : 'Daftar mata kuliah semester ini beserta silabus dan ruang kelas'}
          </p>
        </div>

        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setActivePage('admin-courses')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Mata Kuliah Baru</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari kode MK, nama mata kuliah, atau dosen..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Fakultas:</span>
          <select
            value={selectedFaculty}
            onChange={e => setSelectedFaculty(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800"
          >
            <option value="all">Semua Fakultas</option>
            <option value="Fakultas Teknik & Ilmu Komputer">Teknik & Ilmu Komputer</option>
            <option value="Fakultas Ekonomi & Bisnis">Ekonomi & Bisnis</option>
            <option value="Fakultas Studi Islam & Peradaban">Studi Islam & Peradaban</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="h-40 relative overflow-hidden bg-slate-900">
                <img
                  src={course.thumbnail}
                  alt={course.name}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-amber-400 font-bold rounded text-[11px] border border-amber-400/30">
                  {course.code}
                </div>
                <div className="absolute top-3 right-3 px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white font-medium rounded text-[11px]">
                  {course.sks} SKS
                </div>
              </div>

              <div className="p-5">
                <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider mb-1">
                  {course.studyProgram}
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 mb-1 group-hover:text-amber-800 transition-colors">
                  {course.name}
                </h3>
                <div className="text-xs text-slate-500 mb-3 truncate">
                  Dosen: <strong className="text-slate-700">{course.lecturerName}</strong>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{course.day}, {course.time}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{course.classRoom}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Realisasi Sesi Kuliah</span>
                    <span className="font-bold text-slate-700">
                      {course.completedMeetings}/{course.totalMeetings} Sesi
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full"
                      style={{ width: `${(course.completedMeetings / course.totalMeetings) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5" />
                <span>{course.studentsEnrolled} Peserta</span>
              </span>
              <button
                onClick={() => navigateToCourseDetail(course.id)}
                className="font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1"
              >
                <span>Lihat Detail Kelas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

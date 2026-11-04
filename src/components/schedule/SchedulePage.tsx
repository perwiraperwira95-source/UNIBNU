import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Video,
  BookOpen,
  Filter,
  CheckCircle2,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

export const SchedulePage: React.FC = () => {
  const { courses, academicEvents, currentUser } = useApp();
  const [viewMode, setViewMode] = useState<'weekly' | 'calendar'>('weekly');
  const [selectedDay, setSelectedDay] = useState<string>('all');

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredCourses = courses.filter(c => selectedDay === 'all' || c.day === selectedDay);

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'Kuliah':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'UTS':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'UAS':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Wisuda':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Registrasi':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Jadwal Perkuliahan & Kalender Akademik
          </h1>
          <p className="text-xs text-slate-500">
            Jadwal tatap muka, kelas virtual, dan agenda resmi universitas semester Gasal 2026/2027
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setViewMode('weekly')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
              viewMode === 'weekly' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Jadwal Mingguan</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl transition-all ${
              viewMode === 'calendar' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Kalender Akademik</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. WEEKLY TIMETABLE VIEW */}
      {/* ============================================================ */}
      {viewMode === 'weekly' && (
        <div className="space-y-6">
          {/* Day filter pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedDay('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDay === 'all'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Semua Hari
            </button>
            {daysOfWeek.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDay === day
                    ? 'bg-slate-900 text-amber-400 shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-lg text-xs">
                      {course.day}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>{course.time}</span>
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                      {course.code} • {course.sks} SKS
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-0.5 line-clamp-1">
                      {course.name}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="truncate">Dosen: <strong>{course.lecturerName}</strong></span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500">
                      <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span className="truncate">{course.classRoom}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{course.studyProgram}</span>
                  <a
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-700 hover:text-amber-800 font-bold flex items-center space-x-1"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Tautan Virtual</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. ACADEMIC CALENDAR VIEW */}
      {/* ============================================================ */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Agenda Resmi Kalender Akademik 2026/2027
              </h3>
              <p className="text-xs text-slate-500">
                Surat Keputusan Rektor Universitas Ibnu Rusman No. 042/SK-REK/UIR/VIII/2026
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full font-bold text-xs border border-amber-200">
              Semester Gasal & Genap
            </span>
          </div>

          <div className="space-y-4">
            {academicEvents.map((evt, idx) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase border ${getEventTypeBadge(
                        evt.type
                      )}`}
                    >
                      {evt.type}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{evt.title}</span>
                  </div>
                  <p className="text-xs text-slate-500">{evt.description}</p>
                </div>

                <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-right self-start sm:self-center flex-shrink-0">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Rentang Waktu</div>
                  <div className="text-xs font-bold text-amber-800 font-mono mt-0.5">
                    {new Date(evt.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} s.d.{' '}
                    {new Date(evt.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Material } from '../../types';
import { MaterialReaderModal } from '../materials/MaterialReaderModal';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Users,
  FileText,
  ClipboardList,
  Award,
  CheckCircle2,
  Download,
  Plus,
  Play,
  Share2,
  FileDown,
  Sparkles,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const {
    selectedCourseId,
    courses,
    materials,
    assignments,
    exams,
    studentAttendance,
    currentUser,
    setActivePage,
    navigateToExamRunner,
    incrementMaterialDownload,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'assignments' | 'exams' | 'attendance'>('overview');
  const [selectedReadingMaterial, setSelectedReadingMaterial] = useState<Material | null>(null);

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  if (!course) return null;

  // Filter materials, assignments, exams for this course
  const courseMaterials = materials.filter(m => m.courseId === course.id);
  const courseAssignments = assignments.filter(a => a.courseId === course.id);
  const courseExams = exams.filter(e => e.courseId === course.id);
  const myCourseAttendance = studentAttendance.filter(
    a => a.courseId === course.id && (currentUser?.role === 'mahasiswa' ? a.studentId === currentUser?.id : true)
  );

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <button
          onClick={() => setActivePage('courses')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-amber-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Mata Kuliah</span>
        </button>
      </div>

      {/* Course Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl">
        <div className="h-44 sm:h-56 relative overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.name}
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/40 text-amber-300 font-bold text-xs">
              {course.code}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-medium text-xs">
              {course.sks} SKS
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs">
              Semester {course.semester}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 relative -mt-16 sm:-mt-20 z-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              {course.faculty} • {course.studyProgram}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              {course.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
              <span className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Dosen: <strong>{course.lecturerName}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>{course.day}, {course.time}</span>
              </span>
              <span>•</span>
              <span>Ruang: {course.classRoom}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentUser?.role === 'dosen' ? (
              <button
                onClick={() => setActivePage('materials')}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Unggah Materi Baru</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePage('attendance')}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Presensi Perkuliahan</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex rounded-2xl bg-white p-1.5 border border-slate-200 overflow-x-auto shadow-xs text-xs font-semibold">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Silabus & Deskripsi</span>
        </button>
        <button
          onClick={() => setActiveTab('materials')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'materials' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Materi Kuliah ({courseMaterials.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'assignments' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>Tugas Perkuliahan ({courseAssignments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('exams')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'exams' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Ujian & Kuis CBT ({courseExams.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'attendance' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Presensi Kehadiran</span>
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif mb-2">Deskripsi Mata Kuliah</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif mb-3">Capaian Pembelajaran Lulusan (CPL)</h3>
              <ul className="space-y-2 text-xs text-slate-600 list-disc list-inside leading-relaxed">
                <li>Mampu merancang dan menganalisis arsitektur sistem enterprise yang terukur, aman, dan berdaya saing global.</li>
                <li>Menerapkan prinsip clean architecture, design patterns, serta otomasi CI/CD modern dalam ekosistem cloud terdistribusi.</li>
                <li>Memiliki etika keprofesian, integritas intelektual, dan kemampuan berkolaborasi dalam tim multidisiplin.</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif mb-3">Rencana Pembelajaran Semester (RPS)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">Sesi 01 - 04: Fondasi Arsitektur</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">DDD, Hexagonal, dan Microservices Principles</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">Sesi 05 - 08: Event-Driven & CI/CD</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Kafka Message Bus, Docker, Kubernetes, UTS</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">Sesi 09 - 12: Keamanan & Resilience</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Circuit Breaker, Rate Limiting, OWASP Top 10</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-800">Sesi 13 - 16: Capstone Project & UAS</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Deploy Multi-Region Cloud, Demo Presentasi</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-serif">Dosen Pengampu</h3>
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt={course.lecturerName}
                  className="w-12 h-12 rounded-xl object-cover border border-amber-400"
                />
                <div>
                  <div className="font-bold text-slate-900 text-xs">{course.lecturerName}</div>
                  <div className="text-[11px] text-slate-500">NIDN: 0412088201</div>
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Dosen Tetap FTIK</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Pertemuan:</span>
                  <span className="font-bold text-slate-800">{course.totalMeetings} Sesi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Sesi Terlaksana:</span>
                  <span className="font-bold text-emerald-600">{course.completedMeetings} Sesi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jumlah Peserta:</span>
                  <span className="font-bold text-slate-800">{course.studentsEnrolled} Mahasiswa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Materials */}
      {activeTab === 'materials' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Dokumen & Materi Perkuliahan</h3>
            {currentUser?.role === 'dosen' && (
              <button
                onClick={() => setActivePage('materials')}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                + Tambah Materi
              </button>
            )}
          </div>

          <div className="space-y-3">
            {courseMaterials.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Belum ada materi khusus yang diunggah untuk mata kuliah ini.
              </div>
            ) : (
              courseMaterials.map(mat => (
                <div
                  key={mat.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                      {mat.fileType}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-amber-700 uppercase">
                        Pertemuan Ke-{mat.meetingNumber} • {mat.fileSize}
                      </div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">
                        {mat.title}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{mat.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-center">
                    {currentUser?.role === 'mahasiswa' ? (
                      <button
                        onClick={() => setSelectedReadingMaterial(mat)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 whitespace-nowrap shadow-xs transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Baca Modul ({mat.readingTimeMinutes || 15} Mnt)</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedReadingMaterial(mat)}
                          className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 whitespace-nowrap shadow-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Baca</span>
                        </button>
                        <button
                          onClick={() => {
                            incrementMaterialDownload(mat.id);
                            showToast(`Mengunduh berkas arsip: ${mat.title}`, 'info');
                          }}
                          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center space-x-1 whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Arsip</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Daftar Tugas Perkuliahan</h3>
            <button
              onClick={() => setActivePage('assignments')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Lihat di Menu Tugas &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {courseAssignments.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Tidak ada tugas aktif untuk mata kuliah ini.
              </div>
            ) : (
              courseAssignments.map(asg => (
                <div
                  key={asg.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-[10px] font-bold text-rose-600 uppercase">
                      Pertemuan {asg.meetingNumber} • Bobot {asg.weightPercent}%
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">
                      {asg.title}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{asg.description}</p>
                  </div>
                  <button
                    onClick={() => setActivePage('assignments')}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap self-start sm:self-center"
                  >
                    Buka Halaman Tugas &rarr;
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Exams */}
      {activeTab === 'exams' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Ujian Daring CBT</h3>
            <button
              onClick={() => setActivePage('exams')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Semua Ujian &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {courseExams.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Belum ada jadwal ujian untuk mata kuliah ini.
              </div>
            ) : (
              courseExams.map(ex => (
                <div
                  key={ex.id}
                  className="p-5 rounded-2xl border border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[10px] rounded uppercase">
                      {ex.type}
                    </span>
                    <div className="font-bold text-slate-900 text-sm mt-1">{ex.title}</div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      Durasi: {ex.durationMinutes} Menit • {ex.totalQuestions} Soal • Batas Kelulusan: {ex.passingScore} Poin
                    </div>
                  </div>
                  <button
                    onClick={() => navigateToExamRunner(ex.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center space-x-1.5 whitespace-nowrap self-start sm:self-center"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Mulai Ujian CBT</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Attendance */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Riwayat Presensi Mahasiswa</h3>
            <button
              onClick={() => setActivePage('attendance')}
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              Buka Modul Presensi &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Pertemuan</th>
                  <th className="p-3">Nama Mahasiswa</th>
                  <th className="p-3">NIM</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Waktu Presensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myCourseAttendance.map(att => (
                  <tr key={att.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold">Pertemuan {att.meetingNumber}</td>
                    <td className="p-3 font-semibold text-slate-800">{att.studentName}</td>
                    <td className="p-3 font-mono text-slate-500">{att.studentNim}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {att.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500">{att.timestamp || '08:05 WIB'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Interactive Material Reading Modal */}
      {selectedReadingMaterial && (
        <MaterialReaderModal
          material={selectedReadingMaterial}
          onClose={() => setSelectedReadingMaterial(null)}
          onCompleted={() => {
            showToast(`Selesai mempelajari modul ${selectedReadingMaterial.title}`, 'success');
            setSelectedReadingMaterial(null);
          }}
        />
      )}
    </div>
  );
};

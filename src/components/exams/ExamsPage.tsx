import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Exam } from '../../types';
import { ExamRunnerModal } from './ExamRunnerModal';
import {
  Award,
  Search,
  Clock,
  CheckCircle2,
  Play,
  Plus,
  KeyRound,
  Layers,
  BookOpen,
  Calendar,
  AlertTriangle,
  X,
} from 'lucide-react';

export const ExamsPage: React.FC = () => {
  const {
    exams,
    examResults,
    courses,
    currentUser,
    addExam,
    selectedExamId,
    setSelectedExamId,
  } = useApp();

  const [search, setSearch] = useState('');
  const [activeExamToRun, setActiveExamToRun] = useState<Exam | null>(() => {
    if (selectedExamId) {
      return exams.find(e => e.id === selectedExamId) || null;
    }
    return null;
  });

  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create form state
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'UTS' | 'UAS' | 'Kuis'>('UTS');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [passingScore, setPassingScore] = useState(70);
  const [token, setToken] = useState('UIR-EXAM26');
  const [instructions, setInstructions] = useState('Dilarang membuka tab browser lain. Waktu berjalan otomatis.');

  const filteredExams = exams.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.courseName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const targetCourse = courses.find(c => c.id === courseId);
    addExam({
      courseId,
      courseName: targetCourse?.name || 'Mata Kuliah',
      title,
      type,
      date: new Date().toISOString().split('T')[0],
      durationMinutes: Number(durationMinutes),
      totalQuestions: 3,
      passingScore: Number(passingScore),
      token,
      status: 'Aktif',
      instructions,
      questions: [
        {
          id: `q-demo-1`,
          text: 'Konsep utama dalam arsitektur berorientasi layanan (SOA/Microservices) yang menjamin layanan dapat dideploy secara independen adalah:',
          type: 'multiple-choice',
          options: [
            'Loose coupling & High cohesion',
            'Tightly coupled database',
            'Monolithic single jar file',
            'Direct memory sharing',
          ],
          correctOptionIndex: 0,
          points: 35,
        },
        {
          id: `q-demo-2`,
          text: 'Teknik untuk mencegah serangan SQL Injection yang paling direkomendasikan adalah:',
          type: 'multiple-choice',
          options: [
            'String concatenation pada raw query',
            'Prepared Statements / Parameterized Queries',
            'Mematikan firewall database',
            'Menggunakan password root tanpa enkripsi',
          ],
          correctOptionIndex: 1,
          points: 35,
        },
        {
          id: `q-demo-3`,
          text: 'Dalam metodologi Scrum, durasi ideal satu Sprint umumnya berkisar antara:',
          type: 'multiple-choice',
          options: ['1 sampai 4 minggu', '6 bulan sampai 1 tahun', '1 hari kerja saja', '5 tahun kalender'],
          correctOptionIndex: 0,
          points: 30,
        },
      ],
    });

    setShowCreateModal(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Sistem Ujian Online Computer-Based Test (CBT)
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.role === 'mahasiswa'
              ? 'Ikuti Ujian Tengah Semester (UTS), Ujian Akhir Semester (UAS), dan Kuis secara online'
              : 'Kelola jadwal ujian daring, bank soal, token akses, dan hasil skor mahasiswa'}
          </p>
        </div>

        {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Paket Ujian Baru</span>
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama ujian atau mata kuliah..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExams.map(exam => {
          // Check if student has already completed this exam
          const studentResult = examResults.find(
            r => r.examId === exam.id && r.studentId === currentUser?.id
          );

          return (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                    {exam.type}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      exam.status === 'Aktif'
                        ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Status: {exam.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg font-serif">
                    {exam.title}
                  </h3>
                  <div className="text-xs font-semibold text-amber-700 mt-0.5">
                    {exam.courseName}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {exam.instructions}
                </p>

                {/* Exam Metadata pills */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-2">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Durasi</div>
                    <div className="font-bold text-slate-800 mt-0.5">{exam.durationMinutes} Menit</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Jumlah Soal</div>
                    <div className="font-bold text-slate-800 mt-0.5">{exam.totalQuestions} Soal</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">Passing Score</div>
                    <div className="font-bold text-emerald-600 mt-0.5">{exam.passingScore} Poin</div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-500 flex items-center space-x-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Token Ujian: <strong className="font-mono text-slate-800">{exam.token}</strong></span>
                </div>

                {currentUser?.role === 'mahasiswa' ? (
                  studentResult ? (
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                        Skor Anda: {studentResult.score}/100 ({studentResult.isPassed ? 'Lulus' : 'Remedial'})
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setActiveExamToRun(exam)}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-center"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Masuk Ruang Ujian CBT</span>
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => setActiveExamToRun(exam)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Simulasi Tinjau Soal &rarr;</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create Exam (Lecturer / Admin) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <Plus className="w-5 h-5 text-amber-500" />
                <span>Buat Paket Ujian CBT Baru</span>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Mata Kuliah *</label>
                <select
                  value={courseId}
                  onChange={e => setCourseId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jenis Evaluasi</label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="UTS">Ujian Tengah Semester (UTS)</option>
                    <option value="UAS">Ujian Akhir Semester (UAS)</option>
                    <option value="Kuis">Kuis Mingguan / Harian</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Durasi (Menit)</label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    value={durationMinutes}
                    onChange={e => setDurationMinutes(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Ujian *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Ujian Tengah Semester (UTS) Semester Gasal 2026/2027"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Batas Kelulusan (Passing Score)</label>
                  <input
                    type="number"
                    min="50"
                    max="90"
                    value={passingScore}
                    onChange={e => setPassingScore(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Token Akses Ujian</label>
                  <input
                    type="text"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                    placeholder="UIR-UTS2026"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Petunjuk & Tata Tertib Ujian</label>
                <textarea
                  rows={2}
                  value={instructions}
                  onChange={e => setInstructions(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                Paket ujian otomatis di-generate dengan bank soal pilihan ganda standar kurikulum Universitas Ibnu Rusman.
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Jadwalkan Ujian Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Interactive Exam Runner Modal */}
      {activeExamToRun && (
        <ExamRunnerModal
          exam={activeExamToRun}
          onClose={() => {
            setActiveExamToRun(null);
            setSelectedExamId(null);
          }}
        />
      )}
    </div>
  );
};

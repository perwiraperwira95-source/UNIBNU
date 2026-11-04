import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Assignment, Submission } from '../../types';
import {
  ClipboardList,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Upload,
  FileText,
  X,
  Award,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const {
    assignments,
    submissions,
    courses,
    currentUser,
    addAssignment,
    submitAssignment,
    gradeSubmission,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAssignmentForSubmission, setSelectedAssignmentForSubmission] = useState<Assignment | null>(null);
  const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(null);

  // Student submission form states
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionFileName, setSubmissionFileName] = useState('');

  // Lecturer grading form states
  const [gradeScore, setGradeScore] = useState<number>(90);
  const [gradeFeedback, setGradeFeedback] = useState('');

  // Create Assignment Form states
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetingNumber, setMeetingNumber] = useState(5);
  const [deadline, setDeadline] = useState('2026-11-25T23:59');
  const [weightPercent, setWeightPercent] = useState(15);
  const [attachmentName, setAttachmentName] = useState('Panduan_Tugas_Praktikum.pdf');

  const filteredAssignments = assignments.filter(a => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.courseName.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || a.courseId === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const targetCourse = courses.find(c => c.id === courseId);
    addAssignment({
      courseId,
      courseName: targetCourse?.name || 'Mata Kuliah',
      title,
      description,
      meetingNumber: Number(meetingNumber),
      deadline,
      maxScore: 100,
      weightPercent: Number(weightPercent),
      attachmentName,
      createdBy: currentUser?.name || 'Dosen Pengampu',
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignmentForSubmission) return;

    submitAssignment(
      selectedAssignmentForSubmission.id,
      submissionNotes,
      submissionFileName || `${currentUser?.name.replace(/\s+/g, '_')}_Tugas.pdf`
    );

    setSelectedAssignmentForSubmission(null);
    setSubmissionNotes('');
    setSubmissionFileName('');
  };

  const handleLecturerGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSubmission) return;

    gradeSubmission(gradingSubmission.id, Number(gradeScore), gradeFeedback);
    setGradingSubmission(null);
    setGradeFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Tugas & Evaluasi Perkuliahan
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.role === 'mahasiswa'
              ? 'Pantau tugas kuliah, unggah lembar jawaban, dan cek feedback penilaian dosen'
              : 'Terbitkan instruksi tugas perkuliahan dan evaluasi hasil pengerjaan mahasiswa'}
          </p>
        </div>

        {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Tugas Baru</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari tugas atau mata kuliah..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={selectedCourse}
          onChange={e => setSelectedCourse(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800 w-full sm:w-auto"
        >
          <option value="all">Semua Mata Kuliah</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>
              {c.code} - {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 gap-5">
        {filteredAssignments.map(asg => {
          // Check submission status for current student
          const studentSub = submissions.find(
            s => s.assignmentId === asg.id && s.studentId === currentUser?.id
          );
          // Check submissions for lecturer to grade
          const allSubsForThisAsg = submissions.filter(s => s.assignmentId === asg.id);

          const deadlineDate = new Date(asg.deadline);
          const isOverdue = new Date() > deadlineDate;

          return (
            <div
              key={asg.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                      Pertemuan {asg.meetingNumber}
                    </span>
                    <span className="text-xs font-bold text-amber-700">
                      {asg.courseName}
                    </span>
                    <span className="text-xs text-slate-400">• Bobot Nilai: {asg.weightPercent}%</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                    {asg.title}
                  </h3>
                  <div className="text-xs text-slate-500 flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span className={isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-600'}>
                      Batas Waktu: {deadlineDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} pukul {deadlineDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                    </span>
                  </div>
                </div>

                {/* Right Status Badge */}
                {currentUser?.role === 'mahasiswa' && (
                  <div>
                    {studentSub ? (
                      studentSub.status === 'Dinilai' ? (
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <div className="text-xs font-bold">
                            Telah Dinilai: <span className="text-sm font-extrabold text-emerald-700">{studentSub.score}/100</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Sudah Dikumpulkan (Menunggu Penilaian)</span>
                        </div>
                      )
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center space-x-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span>Belum Dikumpulkan</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {asg.description}
              </p>

              {/* Attachment if any */}
              {asg.attachmentName && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-slate-700">Lampiran Panduan: {asg.attachmentName}</span>
                  </div>
                  <button
                    onClick={() => alert(`Mengunduh berkas instruksi tugas: ${asg.attachmentName}`)}
                    className="text-amber-700 hover:text-amber-800 font-bold"
                  >
                    Unduh Panduan &rarr;
                  </button>
                </div>
              )}

              {/* Student View: Submission Status / Feedback */}
              {currentUser?.role === 'mahasiswa' && (
                <div className="pt-2">
                  {studentSub ? (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs">
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>Berkas Anda: {studentSub.fileName}</span>
                        <span className="text-slate-400 font-normal">
                          Dikirim: {new Date(studentSub.submittedAt).toLocaleString('id-ID')}
                        </span>
                      </div>
                      {studentSub.notes && (
                        <p className="text-slate-600 italic">"{studentSub.notes}"</p>
                      )}
                      {studentSub.feedback && (
                        <div className="mt-2 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-emerald-950">
                          <strong>Ulasan & Feedback Dosen:</strong>
                          <p className="mt-0.5">{studentSub.feedback}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedAssignmentForSubmission(asg)}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Kumpulkan Jawaban Tugas Sekarang</span>
                    </button>
                  )}
                </div>
              )}

              {/* Lecturer View: Submissions roster & grading */}
              {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-bold text-slate-800">
                      Pengumpulan Mahasiswa ({allSubsForThisAsg.length} Mahasiswa)
                    </span>
                    <span className="text-slate-400">
                      {allSubsForThisAsg.filter(s => s.status === 'Menunggu Dinilai').length} Perlu Dinilai
                    </span>
                  </div>

                  <div className="space-y-2">
                    {allSubsForThisAsg.length === 0 ? (
                      <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-400">
                        Belum ada mahasiswa yang mengumpulkan tugas ini.
                      </div>
                    ) : (
                      allSubsForThisAsg.map(sub => (
                        <div
                          key={sub.id}
                          className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900">{sub.studentName}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              NIM: {sub.studentNim} • Berkas: {sub.fileName}
                            </div>
                            {sub.notes && <div className="text-[11px] text-slate-600 mt-1 italic">"{sub.notes}"</div>}
                          </div>

                          <div className="flex items-center space-x-3 self-start sm:self-center">
                            {sub.score !== undefined ? (
                              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded-lg">
                                Skor: {sub.score}/100
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-amber-100 text-amber-800 font-bold rounded-lg text-[11px]">
                                Menunggu Nilai
                              </span>
                            )}

                            <button
                              onClick={() => {
                                setGradingSubmission(sub);
                                setGradeScore(sub.score || 90);
                                setGradeFeedback(sub.feedback || 'Pekerjaan sangat baik dan memenuhi kriteria.');
                              }}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg transition-colors text-[11px]"
                            >
                              {sub.score !== undefined ? 'Ubah Nilai' : 'Beri Nilai & Feedback'}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Student Submit Assignment */}
      {selectedAssignmentForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Pengumpulan Tugas Online</h3>
                <p className="text-xs text-slate-500">{selectedAssignmentForSubmission.title}</p>
              </div>
              <button
                onClick={() => setSelectedAssignmentForSubmission(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-[11px]">
                Pastikan nama file dokumen telah mencantumkan <strong>NIM_NamaLengkap</strong> sebelum mengunggah.
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama File Dokumen *</label>
                <input
                  type="text"
                  required
                  value={submissionFileName}
                  onChange={e => setSubmissionFileName(e.target.value)}
                  placeholder={`${currentUser?.identifier}_${currentUser?.name.replace(/\s+/g, '_')}_Tugas.pdf`}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Catatan / Jawaban Pendukung</label>
                <textarea
                  rows={4}
                  value={submissionNotes}
                  onChange={e => setSubmissionNotes(e.target.value)}
                  placeholder="Tuliskan catatan pengantar atau ringkasan solusi kepada Dosen Pengampu..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-6 border-2 border-dashed border-slate-300 hover:border-amber-400 rounded-2xl text-center cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-all">
                <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="font-bold text-slate-800">Simulasi Pilih Berkas (PDF / ZIP / DOCX)</div>
                <div className="text-[11px] text-slate-400 mt-1">Maksimal ukuran file: 25 MB</div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAssignmentForSubmission(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Kirim Jawaban Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Lecturer Grade Submission */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Penilaian Tugas Mahasiswa</h3>
                <p className="text-xs text-slate-500">{gradingSubmission.studentName} ({gradingSubmission.studentNim})</p>
              </div>
              <button
                onClick={() => setGradingSubmission(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLecturerGrade} className="space-y-4 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="font-semibold text-slate-700">Berkas Tugas: {gradingSubmission.fileName}</div>
                {gradingSubmission.notes && (
                  <p className="text-slate-500 italic text-[11px]">"{gradingSubmission.notes}"</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Skor Nilai (0 - 100) *</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={gradeScore}
                  onChange={e => setGradeScore(Number(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-lg font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ulasan / Masukan Konstruktif</label>
                <textarea
                  rows={4}
                  value={gradeFeedback}
                  onChange={e => setGradeFeedback(e.target.value)}
                  placeholder="Berikan catatan perbaikan atau apresiasi terhadap hasil kerja mahasiswa..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGradingSubmission(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Simpan Nilai & Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Lecturer Create Assignment */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <Plus className="w-5 h-5 text-amber-500" />
                <span>Terbitkan Tugas Perkuliahan Baru</span>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3.5 text-xs">
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
                  <label className="block font-semibold text-slate-700 mb-1">Pertemuan Ke- *</label>
                  <select
                    value={meetingNumber}
                    onChange={e => setMeetingNumber(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(m => (
                      <option key={m} value={m}>
                        Pertemuan {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bobot Penilaian (%)</label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    value={weightPercent}
                    onChange={e => setWeightPercent(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Tugas *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Tugas 04: Implementasi Desain Pattern Repository"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Batas Waktu Pengumpulan (Deadline) *</label>
                <input
                  type="datetime-local"
                  required
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Instruksi & Rubrik Tugas *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Uraikan detail pengerjaan, format pengumpulan file, dan kriteria penilaian..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Lampiran File Panduan</label>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  placeholder="Template_Laporan_Tugas.pdf"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
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
                  Terbitkan Tugas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

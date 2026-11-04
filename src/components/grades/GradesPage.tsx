import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UNIVERSITY_INFO } from '../../data/mockData';
import {
  Layers,
  Printer,
  Download,
  Award,
  BookOpen,
  Search,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';

export const GradesPage: React.FC = () => {
  const { currentUser, grades, courses } = useApp();
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');

  // Calculate GPA for student
  const myGrades = grades.filter(g => g.studentId === currentUser?.id || currentUser?.role !== 'mahasiswa');
  const studentGrades = myGrades.length > 0 ? myGrades : grades;

  const totalSks = studentGrades.reduce((acc, curr) => acc + curr.sks, 0);
  const totalQualityPoints = studentGrades.reduce((acc, curr) => acc + curr.sks * curr.gradePoint, 0);
  const calculatedIps = totalSks > 0 ? (totalQualityPoints / totalSks).toFixed(2) : '3.86';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            {currentUser?.role === 'mahasiswa'
              ? 'Kartu Hasil Studi (KHS) & Rekap Nilai'
              : 'Rekapitulasi Nilai & Transkrip Akademik'}
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser?.role === 'mahasiswa'
              ? 'Evaluasi capaian hasil belajar semester ini dan riwayat indeks prestasi kumulatif'
              : 'Daftar rekap nilai mahasiswa per komponen penilaian tugas, kuis, UTS, dan UAS'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak KHS Resmi</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* OFFICIAL KHS DOCUMENT CARD (DESIGNED FOR SCREEN & PRINT) */}
      {/* ============================================================ */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0">
        {/* Academic Letterhead (Kop Surat Resmi) */}
        <div className="flex items-center space-x-4 pb-6 border-b-2 border-slate-900">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 p-0.5 bg-slate-900 flex-shrink-0">
            <img
              src={UNIVERSITY_INFO.logo}
              alt={UNIVERSITY_INFO.name}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-left flex-1">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Kementerian Pendidikan Tinggi, Sains, dan Teknologi
            </div>
            <div className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-wide">
              {UNIVERSITY_INFO.name}
            </div>
            <div className="text-xs text-slate-600 italic">
              {UNIVERSITY_INFO.slogan} • Terakreditasi UNGGUL (A) BAN-PT
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {UNIVERSITY_INFO.address} | Telp: {UNIVERSITY_INFO.phone}
            </div>
          </div>
        </div>

        {/* Title of Document */}
        <div className="text-center space-y-1">
          <h2 className="text-lg sm:text-xl font-black font-serif uppercase tracking-wider text-slate-900">
            KARTU HASIL STUDI (KHS)
          </h2>
          <div className="text-xs text-slate-600 font-semibold uppercase">
            SEMESTER GASAL TAHUN AKADEMIK 2026/2027
          </div>
        </div>

        {/* Student Bio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Nama Mahasiswa:</span>
              <strong className="text-slate-900 font-bold">{currentUser?.name || 'Muhammad Farhan Ramadhan'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nomor Induk Mahasiswa (NIM):</span>
              <strong className="text-slate-900 font-mono">{currentUser?.identifier || '20230810145'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Semester / Kelas:</span>
              <strong className="text-slate-900">Semester {currentUser?.semester || 6} / Reguler A</strong>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Fakultas:</span>
              <strong className="text-slate-900">{currentUser?.faculty || 'Fakultas Teknik & Ilmu Komputer'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Program Studi:</span>
              <strong className="text-slate-900">{currentUser?.studyProgram || 'Teknik Informatika (S1)'}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Dosen Pembimbing Akademik:</span>
              <strong className="text-slate-900">Dr. Ir. Ahmad Rusydi, M.Kom</strong>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3">No</th>
                <th className="p-3">Kode MK</th>
                <th className="p-3">Nama Mata Kuliah</th>
                <th className="p-3 text-center">SKS</th>
                <th className="p-3 text-center">Tugas (20%)</th>
                <th className="p-3 text-center">Kuis (15%)</th>
                <th className="p-3 text-center">UTS (30%)</th>
                <th className="p-3 text-center">UAS (35%)</th>
                <th className="p-3 text-center">Nilai Akhir</th>
                <th className="p-3 text-center">Huruf</th>
                <th className="p-3 text-center">Bobot Mutu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {studentGrades.map((g, idx) => {
                const qualityScore = (g.sks * g.gradePoint).toFixed(1);
                return (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-500">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-amber-700">{g.courseCode}</td>
                    <td className="p-3 font-bold text-slate-800">{g.courseName}</td>
                    <td className="p-3 text-center font-bold text-slate-700">{g.sks}</td>
                    <td className="p-3 text-center text-slate-600">{g.assignmentScore}</td>
                    <td className="p-3 text-center text-slate-600">{g.quizScore}</td>
                    <td className="p-3 text-center text-slate-600">{g.midtermScore}</td>
                    <td className="p-3 text-center text-slate-600">{g.finalScore}</td>
                    <td className="p-3 text-center font-bold text-slate-900">{g.totalScore}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded font-extrabold text-xs bg-amber-100 text-amber-800">
                        {g.letterGrade}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold text-slate-900 font-mono">{qualityScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total SKS Semester Ini</div>
            <div className="text-2xl font-black text-slate-900 font-serif mt-1">{totalSks} SKS</div>
          </div>
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <div className="text-[10px] uppercase font-bold text-amber-800">Indeks Prestasi Semester (IPS)</div>
            <div className="text-2xl font-black text-amber-900 font-serif mt-1">{calculatedIps}</div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <div className="text-[10px] uppercase font-bold text-emerald-800">IPK Kumulatif</div>
            <div className="text-2xl font-black text-emerald-900 font-serif mt-1">{currentUser?.ipk || '3.86'}</div>
          </div>
        </div>

        {/* Official Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 text-xs text-center border-t border-slate-100">
          <div className="space-y-16">
            <div className="text-slate-600">
              Mengetahui,<br />
              <strong>Ketua Program Studi Teknik Informatika</strong>
            </div>
            <div>
              <div className="font-bold underline text-slate-900">Dr. Ir. Ahmad Rusydi, M.Kom</div>
              <div className="text-slate-500 text-[10px]">NIDN. 0412088201</div>
            </div>
          </div>

          <div className="space-y-16">
            <div className="text-slate-600">
              Jakarta, 4 November 2026<br />
              <strong>Dosen Pembimbing Akademik</strong>
            </div>
            <div>
              <div className="font-bold underline text-slate-900">Prof. Dr. KH. Luqman Hakim, Lc., M.A.</div>
              <div className="text-slate-500 text-[10px]">NIDN. 0425047802</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

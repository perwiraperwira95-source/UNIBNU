import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Material } from '../../types';
import {
  FileText,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Eye,
  Video,
  FileCheck,
  ExternalLink,
  BookOpen,
  X,
  Sparkles,
} from 'lucide-react';

export const MaterialsPage: React.FC = () => {
  const {
    materials,
    courses,
    currentUser,
    addMaterial,
    deleteMaterial,
    incrementMaterialDownload,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState('all');

  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<Material | null>(null);

  // Upload Form states
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [meetingNumber, setMeetingNumber] = useState(1);
  const [fileType, setFileType] = useState<'pdf' | 'ppt' | 'docx' | 'video' | 'link'>('pdf');
  const [fileSize, setFileSize] = useState('5.2 MB');
  const [fileUrl, setFileUrl] = useState('/documents/materi-kuliah.pdf');

  const filteredMaterials = materials.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.courseName.toLowerCase().includes(search.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || m.courseId === selectedCourse;
    const matchesMeeting = selectedMeeting === 'all' || m.meetingNumber.toString() === selectedMeeting;
    return matchesSearch && matchesCourse && matchesMeeting;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const targetCourse = courses.find(c => c.id === courseId);
    addMaterial({
      courseId,
      courseName: targetCourse?.name || 'Mata Kuliah',
      title,
      description,
      meetingNumber: Number(meetingNumber),
      fileType,
      fileSize,
      fileUrl,
      uploadedBy: currentUser?.name || 'Dosen Pengampu',
    });

    setShowUploadModal(false);
    setTitle('');
    setDescription('');
  };

  const getFileBadgeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-rose-100 text-rose-700 border-rose-300';
      case 'ppt':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'docx':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'video':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Repositori Materi & Modul Perkuliahan
          </h1>
          <p className="text-xs text-slate-500">
            Akses dan unduh bahan ajar digital, slide presentasi, panduan praktikum, dan video perkuliahan
          </p>
        </div>

        {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Unggah Materi Baru</span>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari materi perkuliahan..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800"
          >
            <option value="all">Semua Mata Kuliah</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedMeeting}
            onChange={e => setSelectedMeeting(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 text-slate-800"
          >
            <option value="all">Semua Pertemuan</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(m => (
              <option key={m} value={m.toString()}>
                Pertemuan {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
            Tidak ada materi yang sesuai dengan pencarian Anda.
          </div>
        ) : (
          filteredMaterials.map(mat => (
            <div
              key={mat.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-extrabold text-xs uppercase flex-shrink-0 ${getFileBadgeColor(
                    mat.fileType
                  )}`}
                >
                  {mat.fileType}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      Pertemuan {mat.meetingNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-700">
                      {mat.courseName}
                    </span>
                    <span className="text-[11px] text-slate-400">• {mat.fileSize}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">{mat.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">{mat.description}</p>

                  <div className="text-[11px] text-slate-400 flex items-center space-x-2 pt-1">
                    <span>Diunggah oleh: <strong className="text-slate-600">{mat.uploadedBy}</strong></span>
                    <span>•</span>
                    <span>{mat.uploadDate}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-2 self-start md:self-center">
                <button
                  onClick={() => setPreviewMaterial(mat)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => {
                    incrementMaterialDownload(mat.id);
                    alert(`Mengunduh file: ${mat.title} (${mat.fileSize})`);
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh ({mat.downloadCount})</span>
                </button>

                {(currentUser?.role === 'dosen' || currentUser?.role === 'admin') && (
                  <button
                    onClick={() => {
                      if (confirm('Apakah Anda yakin ingin menghapus materi ini?')) {
                        deleteMaterial(mat.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                    title="Hapus Materi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Document Reading Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                  {previewMaterial.fileType}
                </span>
                <span className="font-bold text-slate-800 text-sm truncate max-w-md">
                  {previewMaterial.title}
                </span>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed pr-2">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-amber-800 font-bold mb-1">Mata Kuliah: {previewMaterial.courseName}</div>
                <div className="text-slate-500">Sesi Pertemuan Ke-{previewMaterial.meetingNumber} • Pengajar: {previewMaterial.uploadedBy}</div>
              </div>

              <div className="space-y-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-inner">
                <h4 className="font-bold text-slate-900 text-sm">Ringkasan Materi & Panduan Pembelajaran:</h4>
                <p>{previewMaterial.description}</p>
                <p>
                  Materi ini telah diverifikasi sesuai dengan Rencana Pembelajaran Semester (RPS) Universitas Ibnu Rusman. Mahasiswa disarankan untuk menelaah setiap sub-bab teori, membaca studi kasus yang disertakan, dan mencoba latihan simulasi sebelum menghadiri sesi kelas berikutnya.
                </p>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                  💡 <strong>Catatan Akademik:</strong> File lengkap ({previewMaterial.fileSize}) mencakup diagram arsitektur interaktif, glosarium terminologi, dan link repositori kode sumber.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Total diunduh: {previewMaterial.downloadCount} kali</span>
              <button
                onClick={() => {
                  incrementMaterialDownload(previewMaterial.id);
                  alert(`Mengunduh dokumen: ${previewMaterial.title}`);
                }}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Berkas Asli</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Material Modal for Lecturer / Admin */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-base">
                <Plus className="w-5 h-5 text-amber-500" />
                <span>Unggah Materi Perkuliahan Baru</span>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
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
                  <label className="block font-semibold text-slate-700 mb-1">Tipe Berkas *</label>
                  <select
                    value={fileType}
                    onChange={e => setFileType(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  >
                    <option value="pdf">Dokumen PDF (.pdf)</option>
                    <option value="ppt">Slide PowerPoint (.pptx)</option>
                    <option value="docx">Dokumen Word (.docx)</option>
                    <option value="video">Rekaman Video Kuliah</option>
                    <option value="link">Tautan Web / Repositori</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Materi / Modul *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Modul 07: Arsitektur Cloud Native & Microservices"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi & Petunjuk Belajar</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Ringkasan isi materi dan arahan untuk mahasiswa..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ukuran / Durasi File</label>
                  <input
                    type="text"
                    value={fileSize}
                    onChange={e => setFileSize(e.target.value)}
                    placeholder="Contoh: 8.4 MB"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Path / URL File</label>
                  <input
                    type="text"
                    value={fileUrl}
                    onChange={e => setFileUrl(e.target.value)}
                    placeholder="/documents/modul-7.pdf"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Publikasikan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

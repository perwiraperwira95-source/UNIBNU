import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Announcement } from '../../types';
import {
  Megaphone,
  Search,
  Calendar,
  User,
  FileText,
  Plus,
  X,
  AlertCircle,
  Download,
} from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, currentUser, addAnnouncement } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [search, setSearch] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create form state
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'Akademik' | 'Beasiswa' | 'Kemahasiswaan' | 'Ujian' | 'Umum'>('Akademik');
  const [attachmentName, setAttachmentName] = useState('Surat_Edaran_Rektorat.pdf');
  const [isUrgent, setIsUrgent] = useState(false);

  const categories = ['Semua', 'Akademik', 'Beasiswa', 'Kemahasiswaan', 'Ujian', 'Umum'];

  const filteredAnnouncements = announcements.filter(a => {
    const matchesCategory = activeCategory === 'Semua' || a.category === activeCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      summary: summary || title,
      content,
      category,
      author: currentUser?.name || 'Biro Administrasi Akademik',
      attachmentName,
      isUrgent,
    });

    setShowCreateModal(false);
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Warta & Pengumuman Resmi Universitas
          </h1>
          <p className="text-xs text-slate-500">
            Pusat informasi surat edaran rektorat, jadwal beasiswa, kalender ujian, dan kegiatan kampus
          </p>
        </div>

        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Terbitkan Pengumuman Baru</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari pengumuman..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAnnouncements.map(item => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
              item.isUrgent ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800">
                  {item.category}
                </span>

                <div className="flex items-center space-x-2">
                  {item.isUrgent && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 animate-pulse flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Penting / Segera</span>
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{item.publishedDate}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-serif">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] truncate max-w-[200px]">
                {item.author}
              </span>
              <button
                onClick={() => setSelectedAnnouncement(item)}
                className="font-bold text-amber-700 hover:text-amber-800"
              >
                Baca Lengkap &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Read Detail Announcement */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] flex flex-col">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                  {selectedAnnouncement.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 mt-1">
                  {selectedAnnouncement.title}
                </h3>
                <div className="text-xs text-slate-500">
                  Diterbitkan: {selectedAnnouncement.publishedDate} • Oleh: {selectedAnnouncement.author}
                </div>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed pr-2">
              <p className="whitespace-pre-line">{selectedAnnouncement.content}</p>

              {selectedAnnouncement.attachmentName && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <div>
                      <div className="font-bold text-slate-800 text-xs">
                        {selectedAnnouncement.attachmentName}
                      </div>
                      <div className="text-[10px] text-slate-400">Berkas Lampiran Resmi Surat Edaran</div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Mengunduh berkas: ${selectedAnnouncement.attachmentName}`)}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold rounded-lg text-xs flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Berkas</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs"
              >
                Tutup Pengumuman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Announcement (Admin only) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Terbitkan Warta / Pengumuman Resmi</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Beasiswa">Beasiswa</option>
                  <option value="Kemahasiswaan">Kemahasiswaan</option>
                  <option value="Ujian">Ujian</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Pengumuman *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Jadwal Registrasi & Pembayaran UKT Semester Genap 2026/2027"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ringkasan Singkat</label>
                <input
                  type="text"
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  placeholder="Ringkasan satu kalimat yang muncul pada kartu warta..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Isi Lengkap Surat Edaran *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Ketik isi pengumuman secara komprehensif..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama File Lampiran</label>
                <input
                  type="text"
                  value={attachmentName}
                  onChange={e => setAttachmentName(e.target.value)}
                  placeholder="Surat_Edaran_Rektor_2026.pdf"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  id="urgent"
                  type="checkbox"
                  checked={isUrgent}
                  onChange={e => setIsUrgent(e.target.checked)}
                  className="w-4 h-4 text-amber-500 border-slate-300 rounded"
                />
                <label htmlFor="urgent" className="font-semibold text-slate-700 cursor-pointer">
                  Tandai sebagai Pengumuman Mendesak / Penting (Urgent)
                </label>
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
                  Terbitkan Warta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Pin,
  Tag,
  CheckCircle2,
  X,
  Send,
  Sparkles,
} from 'lucide-react';

export const ForumPage: React.FC = () => {
  const {
    forumPosts,
    forumComments,
    courses,
    currentUser,
    addForumPost,
    addForumComment,
    likeForumPost,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [search, setSearch] = useState('');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(forumPosts[0]?.id || null);

  // New post modal states
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Diskusi Kuliah' | 'Tanya Dosen' | 'Seputar Kampus' | 'Teknologi & Riset'>('Diskusi Kuliah');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Microservices, Arsitektur');

  // Comment input state
  const [replyText, setReplyText] = useState('');

  const categories = ['Semua', 'Diskusi Kuliah', 'Tanya Dosen', 'Seputar Kampus', 'Teknologi & Riset'];

  const filteredPosts = forumPosts.filter(p => {
    const matchesCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const targetCourse = courses.find(c => c.id === courseId);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    addForumPost({
      title,
      category,
      courseId: category === 'Diskusi Kuliah' ? courseId : undefined,
      courseName: category === 'Diskusi Kuliah' ? targetCourse?.name : undefined,
      content,
      authorId: currentUser?.id || 'usr-1',
      authorName: currentUser?.name || 'Sivitas Kampus',
      authorRole: currentUser?.role || 'mahasiswa',
      authorAvatar: currentUser?.avatar,
      tags: tags.length > 0 ? tags : ['Akademik'],
    });

    setShowNewPostModal(false);
    setTitle('');
    setContent('');
  };

  const handleSendComment = (postId: string) => {
    if (!replyText.trim()) return;
    addForumComment(postId, replyText);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black font-serif text-slate-900">
            Forum Diskusi Ilmiah & Konsultasi Akademik
          </h1>
          <p className="text-xs text-slate-500">
            Wadah interaksi ilmiah antara mahasiswa, dosen pengampu, dan peneliti seputar perkuliahan
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Mulai Topik Diskusi Baru</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
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
            placeholder="Cari topik diskusi..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Threads List */}
      <div className="space-y-4">
        {filteredPosts.map(post => {
          const isExpanded = expandedPostId === post.id;
          const postComments = forumComments.filter(c => c.postId === post.id);

          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-xl object-cover border border-amber-400"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">{post.authorName}</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-100 text-slate-700">
                        {post.authorRole}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">{post.createdAt}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {post.isPinned && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-800 border border-amber-400/30 flex items-center space-x-1">
                      <Pin className="w-3 h-3" />
                      <span>Disematkan</span>
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg font-serif mb-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Actions & Comment toggle */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => likeForumPost(post.id)}
                    className="flex items-center space-x-1.5 text-slate-500 hover:text-amber-600 font-semibold transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.likes} Suka</span>
                  </button>

                  <button
                    onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                    className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-800 font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{postComments.length} Balasan</span>
                  </button>
                </div>

                <button
                  onClick={() => setExpandedPostId(isExpanded ? null : post.id)}
                  className="text-amber-700 hover:text-amber-800 font-bold"
                >
                  {isExpanded ? 'Tutup Balasan ▲' : 'Buka Diskusi ▼'}
                </button>
              </div>

              {/* Expanded Replies Section */}
              {isExpanded && (
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="space-y-3">
                    {postComments.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl">
                        Belum ada balasan pada topik ini. Jadilah yang pertama menjawab!
                      </div>
                    ) : (
                      postComments.map(comment => (
                        <div
                          key={comment.id}
                          className={`p-4 rounded-2xl border text-xs space-y-2 ${
                            comment.isLecturerVerified
                              ? 'bg-amber-50/70 border-amber-300'
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-slate-900">{comment.authorName}</span>
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-slate-200 text-slate-700">
                                {comment.authorRole}
                              </span>
                              {comment.isLecturerVerified && (
                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow-xs">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Jawaban Terverifikasi Dosen</span>
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400">{comment.createdAt}</span>
                          </div>

                          <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Reply Input */}
                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendComment(post.id)}
                      placeholder="Tuliskan tanggapan atau solusi ilmiah Anda..."
                      className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Create New Post */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Buat Topik Diskusi Baru</h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kategori Diskusi *</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                >
                  <option value="Diskusi Kuliah">Diskusi Kuliah</option>
                  <option value="Tanya Dosen">Tanya Dosen</option>
                  <option value="Seputar Kampus">Seputar Kampus</option>
                  <option value="Teknologi & Riset">Teknologi & Riset</option>
                </select>
              </div>

              {category === 'Diskusi Kuliah' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pilih Mata Kuliah</label>
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
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Pertanyaan / Bahasan *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Bagaimana cara mitigasi deadlock pada database terdistribusi?"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Uraian Pertanyaan / Pendapat *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Jelaskan pertanyaan Anda secara lengkap dan sertakan konteks masalah..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  placeholder="Database, SQL, Microservices"
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow-md transition-all"
                >
                  Publikasikan Topik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

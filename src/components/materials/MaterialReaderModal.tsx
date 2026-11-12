import React, { useState, useEffect, useRef } from 'react';
import { Material, MaterialSection } from '../../types';
import {
  BookOpen,
  X,
  CheckCircle,
  Lightbulb,
  Key,
  Clock,
  Sparkles,
  HelpCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  Code2,
  Check,
  ShieldCheck,
  ListOrdered,
  Search,
  Activity,
  UserCheck,
} from 'lucide-react';

interface MaterialReaderModalProps {
  material: Material;
  onClose: () => void;
  onCompleted?: () => void;
}

export const MaterialReaderModal: React.FC<MaterialReaderModalProps> = ({
  material,
  onClose,
  onCompleted,
}) => {
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [qIndex: number]: number }>({});
  const [showQuizResults, setShowQuizResults] = useState<{ [qIndex: number]: boolean }>({});

  const totalSections = material.sections?.length || 0;
  const isLargeCurriculum = totalSections >= 10;

  // Active chapter state for single/focused mode
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'single' | 'all'>(isLargeCurriculum ? 'single' : 'all');
  const [searchChapter, setSearchChapter] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within reader
  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
    setShowQuizResults(prev => ({ ...prev, [qIndex]: true }));
  };

  const handleMarkAsDone = () => {
    setCompleted(true);
    if (onCompleted) {
      onCompleted();
    }
  };

  const changeChapter = (index: number) => {
    if (index >= 0 && index < totalSections) {
      setActiveChapterIndex(index);
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const fontSizeClass =
    fontSize === 'sm' ? 'text-xs leading-relaxed' : fontSize === 'lg' ? 'text-base leading-loose' : 'text-sm leading-relaxed';

  const currentSection = material.sections ? material.sections[activeChapterIndex] : null;

  const filteredSections = material.sections
    ? material.sections.filter(
        (sec, i) =>
          sec.heading.toLowerCase().includes(searchChapter.toLowerCase()) ||
          sec.subheading?.toLowerCase().includes(searchChapter.toLowerCase()) ||
          `bab ${i + 1}`.includes(searchChapter.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 flex flex-col h-[95vh] overflow-hidden">
        {/* Sticky Top Header */}
        <div className="relative bg-slate-900 text-white px-5 sm:px-8 py-4 border-b border-slate-800 flex-shrink-0">
          {/* Scroll progress bar */}
          <div
            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950">
                  Pertemuan {material.meetingNumber}
                </span>
                <span className="text-xs font-semibold text-amber-300 truncate max-w-xs sm:max-w-md">
                  {material.courseName}
                </span>
                {totalSections > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {totalSections} Bab Lengkap (Min 20 Paragraf/Bab)
                  </span>
                )}
                <span className="text-[11px] text-slate-400 hidden sm:inline flex items-center gap-1">
                  • <Clock className="w-3 h-3 inline text-slate-400" /> {material.readingTimeMinutes || 15} Menit
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-white truncate max-w-xl">
                {material.title}
              </h2>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* Font Size Selector */}
              <div className="hidden sm:flex items-center bg-slate-800 rounded-xl p-1 text-xs border border-slate-700">
                <button
                  type="button"
                  onClick={() => setFontSize('sm')}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    fontSize === 'sm' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                  title="Ukuran Font Kecil"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('base')}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    fontSize === 'base' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                  title="Ukuran Font Sedang"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('lg')}
                  className={`px-2 py-0.5 rounded-lg transition-colors ${
                    fontSize === 'lg' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                  title="Ukuran Font Besar"
                >
                  A+
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                title="Tutup Bacaan"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 50 Chapters Navigation Bar for Large Curricula */}
        {isLargeCurriculum && material.sections && (
          <div className="bg-slate-950 text-slate-200 px-5 sm:px-8 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-amber-400 flex items-center space-x-1.5">
                <ListOrdered className="w-4 h-4" />
                <span>Pilih Bab Pembahasan (1 - {totalSections}):</span>
              </span>

              {/* Chapter Select Dropdown */}
              <select
                value={activeChapterIndex}
                onChange={e => changeChapter(Number(e.target.value))}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 max-w-[260px] sm:max-w-md truncate"
              >
                {material.sections.map((sec, idx) => (
                  <option key={idx} value={idx}>
                    Bab {idx + 1}: {sec.heading.replace(/^Bab \d+:\s*/, '')}
                  </option>
                ))}
              </select>
            </div>

            {/* Previous / Next Chapter Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                disabled={activeChapterIndex === 0}
                onClick={() => changeChapter(activeChapterIndex - 1)}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-slate-300 flex items-center space-x-1 border border-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Bab Sebelumnya</span>
              </button>

              <span className="px-2 py-1 text-slate-400 font-mono text-xs">
                {activeChapterIndex + 1} / {totalSections}
              </span>

              <button
                type="button"
                disabled={activeChapterIndex === totalSections - 1}
                onClick={() => changeChapter(activeChapterIndex + 1)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold flex items-center space-x-1 shadow-sm transition-colors"
              >
                <span className="hidden sm:inline">Bab Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Reader Body */}
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-5 sm:px-10 py-6 space-y-8 bg-slate-50/50"
        >
          {/* Mode Baca Daring Notice */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 border border-amber-200/80 flex items-start space-x-3 text-slate-700">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-slate-900 flex items-center space-x-2">
                <span>Portal Modul Pembelajaran Daring Resmi • Universitas Ibnu Rusman</span>
                <span className="px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-full font-bold">
                  Bebas Unduh
                </span>
                {totalSections >= 50 && (
                  <span className="px-2 py-0.5 text-[10px] bg-sky-100 text-sky-800 rounded-full font-bold">
                    50 Bab • Min 20 Paragraf/Bab
                  </span>
                )}
              </div>
              <p className="text-slate-600">
                Materi perkuliahan ini disajikan secara lengkap, mendalam, dan menggunakan bahasa yang mudah dipahami.
                Anda dapat membaca dan mempelajari seluruh bab langsung di portal e-learning tanpa perlu mengunduh berkas.
              </p>
            </div>
          </div>

          {/* Dosen Pengampu & Tinjauan Umum */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-amber-600" />
                <span>
                  Dosen Pengampu: <strong className="text-slate-900">{material.uploadedBy}</strong>
                </span>
              </div>
              <div>Tanggal Publikasi: {material.uploadDate}</div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-700 mb-2 flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Ringkasan Pengantar Materi</span>
              </h3>
              <p className={`text-slate-700 ${fontSizeClass}`}>
                {material.overview || material.description}
              </p>
            </div>

            {/* Learning Objectives */}
            {material.learningObjectives && material.learningObjectives.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Sasaran Kompetensi & Capaian Pembelajaran:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {material.learningObjectives.map((obj, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Single Chapter View Mode (Optimized for 50 Chapters) */}
          {isLargeCurriculum && currentSection ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              {/* Chapter Header */}
              <div className="pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-widest text-amber-600 flex items-center space-x-2">
                    <span>Bab {activeChapterIndex + 1} dari {totalSections} Bab</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">
                      {currentSection.paragraphs ? `${currentSection.paragraphs.length} Paragraf Lengkap` : '20 Paragraf Lengkap'}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
                    {currentSection.heading}
                  </h3>
                  {currentSection.subheading && (
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                      {currentSection.subheading}
                    </p>
                  )}
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  Modul Ilmu Kedokteran UIR
                </div>
              </div>

              {/* 20 Paragraphs Rendered Cleanly with Paragraph Indicators */}
              <div className="space-y-4 text-slate-700">
                {currentSection.paragraphs && currentSection.paragraphs.length > 0 ? (
                  currentSection.paragraphs.map((par, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 sm:p-4 rounded-2xl bg-white hover:bg-slate-50/80 transition-colors border border-transparent hover:border-slate-100 flex items-start space-x-3.5"
                    >
                      <span className="w-7 h-7 rounded-xl bg-amber-100/70 text-amber-800 font-mono text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {pIdx + 1}
                      </span>
                      <p className={`flex-1 leading-relaxed ${fontSizeClass} text-slate-800`}>
                        {par}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className={`whitespace-pre-line leading-relaxed ${fontSizeClass}`}>
                    {currentSection.content}
                  </div>
                )}
              </div>

              {/* Analogi Sederhana Box */}
              {currentSection.analogies && (
                <div className="p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-slate-800 space-y-1.5 shadow-xs">
                  <div className="text-xs font-bold text-amber-900 flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    <span>Analogi Sederhana (Biar Gampang Dipahami Mahasiswa)</span>
                  </div>
                  <p className={`text-amber-950 font-sans italic ${fontSizeClass}`}>
                    {currentSection.analogies}
                  </p>
                </div>
              )}

              {/* Clinical Case if any */}
              {currentSection.clinicalCase && (
                <div className="p-5 rounded-2xl bg-sky-50/70 border-l-4 border-sky-500 text-slate-800 space-y-1.5 shadow-xs">
                  <div className="text-xs font-bold text-sky-900 flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-sky-600" />
                    <span>Studi Kasus Klinis Rumah Sakit Pendidikan UIR</span>
                  </div>
                  <p className={`text-sky-950 ${fontSizeClass}`}>
                    {currentSection.clinicalCase}
                  </p>
                </div>
              )}

              {/* Key Takeaways */}
              {currentSection.keyTakeaways && currentSection.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900 flex items-center space-x-2">
                    <Key className="w-4 h-4 text-emerald-600" />
                    <span>Poin Inti yang Wajib Anda Kuasai:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
                    {currentSection.keyTakeaways.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips from Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG. */}
              {currentSection.tips && (
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 text-xs flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>{currentSection.tips}</span>
                </div>
              )}

              {/* Bottom Chapter Switcher Navigation */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={activeChapterIndex === 0}
                  onClick={() => changeChapter(activeChapterIndex - 1)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none text-slate-700 font-semibold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>&larr; Bab Sebelumnya</span>
                </button>

                <div className="text-xs text-slate-500 font-medium hidden sm:block">
                  Bab {activeChapterIndex + 1} dari {totalSections}
                </div>

                <button
                  type="button"
                  disabled={activeChapterIndex === totalSections - 1}
                  onClick={() => changeChapter(activeChapterIndex + 1)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                >
                  <span>Bab Selanjutnya &rarr;</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Continuous View for standard materials */
            material.sections && material.sections.length > 0 ? (
              material.sections.map((sec, idx) => (
                <div
                  key={idx}
                  id={`section-${idx}`}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5 scroll-mt-6"
                >
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mb-1">
                      Bab {idx + 1}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                      {sec.heading}
                    </h3>
                    {sec.subheading && (
                      <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                        {sec.subheading}
                      </p>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className={`text-slate-700 whitespace-pre-line ${fontSizeClass}`}>
                    {sec.content}
                  </div>

                  {/* Analogi Sederhana Box */}
                  {sec.analogies && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border-l-4 border-amber-500 text-slate-800 space-y-1">
                      <div className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Analogi Sederhana (Biar Gampang Dipahami)</span>
                      </div>
                      <p className={`text-amber-950 font-sans italic ${fontSizeClass}`}>
                        {sec.analogies}
                      </p>
                    </div>
                  )}

                  {/* Key Takeaways */}
                  {sec.keyTakeaways && sec.keyTakeaways.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                        <Key className="w-4 h-4 text-emerald-600" />
                        <span>Poin Inti yang Wajib Anda Ingat:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc">
                        {sec.keyTakeaways.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Code Snippet if any */}
                  {sec.codeSnippet && (
                    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200">
                      <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center space-x-1.5 font-mono">
                          <Code2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Contoh Implementasi Kode Praktis</span>
                        </span>
                      </div>
                      <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-amber-300/90">
                        <code>{sec.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tips */}
                  {sec.tips && (
                    <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs flex items-start space-x-2">
                      <Sparkles className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                      <span>{sec.tips}</span>
                    </div>
                  )}
                </div>
              ))
            ) : null
          )}

          {/* Summary / Rangkuman */}
          {material.summary && (
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
              <div className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Rangkuman Intisari Perkuliahan</span>
              </div>
              <p className={`text-slate-200 leading-relaxed ${fontSizeClass}`}>
                {material.summary}
              </p>
            </div>
          )}

          {/* Interactive Self-Check Quiz */}
          {material.quizQuestions && material.quizQuestions.length > 0 && (
            <div id="quiz-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center space-x-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Uji Pemahaman Cepat (Interaktif)</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Pilih jawaban untuk menguji seberapa baik Anda memahami isi materi di atas.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {material.quizQuestions.map((quiz, qIdx) => {
                  const selected = quizAnswers[qIdx];
                  const hasAnswered = showQuizResults[qIdx];
                  const isCorrect = selected === quiz.correctIndex;

                  return (
                    <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {qIdx + 1}. {quiz.question}
                      </div>

                      <div className="space-y-2">
                        {quiz.options.map((opt, oIdx) => {
                          const isOptionSelected = selected === oIdx;
                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                          if (hasAnswered) {
                            if (oIdx === quiz.correctIndex) {
                              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleSelectAnswer(qIdx, oIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {hasAnswered && oIdx === quiz.correctIndex && (
                                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {hasAnswered && (
                        <div
                          className={`p-3 rounded-xl text-xs ${
                            isCorrect
                              ? 'bg-emerald-100/70 border border-emerald-300 text-emerald-900'
                              : 'bg-rose-100/70 border border-rose-300 text-rose-900'
                          }`}
                        >
                          <div className="font-bold mb-0.5">
                            {isCorrect ? '🎉 Jawaban Anda Benar!' : '⚠️ Jawaban Belum Tepat'}
                          </div>
                          <div>{quiz.explanation}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Bar (Strictly NO download button) */}
        <div className="bg-white border-t border-slate-200 px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Progress Bacaan: <strong>{Math.round(scrollProgress)}%</strong></span>
            {isLargeCurriculum && (
              <span className="text-slate-400">
                • Sedang membaca Bab {activeChapterIndex + 1} dari {totalSections}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
            >
              Tutup Bacaan
            </button>

            <button
              type="button"
              onClick={handleMarkAsDone}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all ${
                completed
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{completed ? 'Sudah Selesai Dipelajari' : 'Tandai Selesai Membaca'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

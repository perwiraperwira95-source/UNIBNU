import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Exam } from '../../types';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Flag,
  Award,
  Sparkles,
  X,
  FileCheck,
} from 'lucide-react';

interface ExamRunnerModalProps {
  exam: Exam;
  onClose: () => void;
}

export const ExamRunnerModal: React.FC<ExamRunnerModalProps> = ({ exam, onClose }) => {
  const { currentUser, submitExamResult } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(exam.durationMinutes * 60);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  const questions = exam.questions;
  const currentQuestion = questions[currentQuestionIndex];

  // Countdown timer
  useEffect(() => {
    if (isExamCompleted) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamCompleted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const toggleFlag = (index: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleFinishExam = () => {
    // Calculate final score
    let totalScore = 0;
    questions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        totalScore += q.points;
      }
    });

    setFinalScore(totalScore);
    setIsExamCompleted(true);
    setShowConfirmFinish(false);

    submitExamResult(exam.id, totalScore, userAnswers);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ffffff'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col text-slate-100 overflow-hidden">
      {/* Top Bar / Header of CBT Exam */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
            CBT
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white font-serif truncate max-w-xs sm:max-w-md">
              {exam.title}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {exam.courseName} • Mahasiswa: {currentUser?.name} ({currentUser?.identifier})
            </div>
          </div>
        </div>

        {/* Center/Right: Timer & Action */}
        <div className="flex items-center space-x-4">
          <div
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
              timeLeftSeconds < 300
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-amber-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          {!isExamCompleted && (
            <button
              onClick={() => setShowConfirmFinish(true)}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md"
            >
              Selesaikan Ujian
            </button>
          )}

          {isExamCompleted && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs"
            >
              Kembali ke Menu
            </button>
          )}
        </div>
      </header>

      {/* Main Body */}
      {isExamCompleted ? (
        /* Result Screen */
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/10">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Ujian CBT Selesai Terverifikasi
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Hasil Evaluasi Ujian Daring
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Jawaban Anda telah tersimpan secara resmi ke pangkalan data akademik universitas.
            </p>
          </div>

          {/* Score Card */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="text-xs uppercase font-bold text-slate-400">Skor Akhir Anda</div>
            <div className="text-6xl sm:text-7xl font-black text-amber-400 font-serif">
              {finalScore} <span className="text-2xl text-slate-500">/ 100</span>
            </div>

            <div className="flex items-center justify-center space-x-2 pt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  (finalScore || 0) >= exam.passingScore
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {(finalScore || 0) >= exam.passingScore ? 'LULUS MEMENUHI STANDAR' : 'REMEDIAL DIPERLUKAN'}
              </span>
            </div>
          </div>

          {/* Answers breakdown */}
          <div className="w-full text-left space-y-3">
            <h3 className="text-sm font-bold text-slate-200">Kunci Jawaban & Pembahasan:</h3>
            {questions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctOptionIndex;
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-xs ${
                    isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-100'
                      : 'bg-rose-950/30 border-rose-500/30 text-rose-100'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span>Soal #{idx + 1} ({q.points} Poin)</span>
                    <span>{isCorrect ? '✓ Benar' : '✗ Salah'}</span>
                  </div>
                  <p className="text-slate-300 mb-2">{q.text}</p>
                  <div className="text-[11px] text-slate-400">
                    Kunci Jawaban: <strong className="text-amber-400">{q.options?.[q.correctOptionIndex || 0]}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg"
          >
            Tutup & Kembali ke Portal
          </button>
        </div>
      ) : (
        /* Active Test Runner */
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left/Main: Active Question & Choices (flex-1) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col justify-between max-w-4xl mx-auto w-full">
            <div className="space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
                </span>
                <button
                  onClick={() => toggleFlag(currentQuestionIndex)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    flaggedQuestions.has(currentQuestionIndex)
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400'
                      : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>Ragu-Ragu</span>
                </button>
              </div>

              {/* Question Text */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-sm">
                <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                  {currentQuestion?.text}
                </p>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3">
                {currentQuestion?.options?.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestion.id] === optIdx;
                  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white shadow-md'
                          : 'bg-slate-900/50 border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {optionLetters[optIdx]}
                      </div>
                      <span className="text-xs sm:text-sm mt-0.5 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed border border-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-2 text-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md shadow-amber-500/20"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmFinish(true)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesaikan Ujian</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Question Palette / Navigation Grid (w-72) */}
          <div className="w-full lg:w-72 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 flex flex-col justify-between flex-shrink-0">
            <div>
              <div className="text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">
                Navigasi Nomor Soal
              </div>

              {/* Grid of numbers */}
              <div className="grid grid-cols-5 gap-2.5">
                {questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions.has(idx);
                  const isCurrent = currentQuestionIndex === idx;

                  let bgColor = 'bg-slate-800 text-slate-400 border-slate-700';
                  if (isCurrent) {
                    bgColor = 'ring-2 ring-amber-400 bg-amber-500/20 text-white border-amber-400';
                  } else if (isFlagged) {
                    bgColor = 'bg-amber-500 text-slate-950 font-bold border-amber-500';
                  } else if (isAnswered) {
                    bgColor = 'bg-emerald-600 text-white font-bold border-emerald-500';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-10 rounded-xl border text-xs font-semibold flex items-center justify-center transition-all ${bgColor}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-2 text-[11px] text-slate-400 pt-4 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-emerald-600"></span>
                  <span>Sudah Terjawab ({answeredCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-amber-500"></span>
                  <span>Ragu-Ragu ({flaggedQuestions.size})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-slate-800 border border-slate-700"></span>
                  <span>Belum Dijawab ({questions.length - answeredCount})</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowConfirmFinish(true)}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md"
              >
                Kumpulkan Semua Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmFinish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Yakin Selesaikan Ujian?</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Anda telah menjawab <strong>{answeredCount}</strong> dari <strong>{questions.length}</strong> pertanyaan.
                {questions.length - answeredCount > 0 && (
                  <span className="text-rose-400 block mt-1">
                    Peringatan: Masih ada {questions.length - answeredCount} soal yang belum Anda jawab!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmFinish(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={handleFinishExam}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs shadow-md"
              >
                Ya, Kumpulkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

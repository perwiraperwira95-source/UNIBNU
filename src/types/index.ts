export type UserRole = 'admin' | 'dosen' | 'mahasiswa';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  identifier: string; // NIM for mahasiswa, NIDN for dosen, NIP/Username for admin
  avatar?: string;
  gender?: 'Laki-laki' | 'Perempuan';
  phone?: string;
  address?: string;
  // Mahasiswa specific
  studyProgram?: string;
  faculty?: string;
  semester?: number;
  ipk?: number;
  totalSks?: number;
  academicYear?: string;
  // Dosen specific
  title?: string; // Gelar, e.g. Dr., M.Kom
  expertise?: string;
  status: 'Aktif' | 'Cuti' | 'Non-Aktif';
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  dean: string;
  programsCount: number;
  description: string;
}

export interface StudyProgram {
  id: string;
  name: string;
  code: string;
  facultyId: string;
  facultyName: string;
  degree: 'S1' | 'S2' | 'D3' | 'Profesi';
  accreditation: 'Unggul' | 'A' | 'Baik Sekali';
  headOfProgram: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  sks: number;
  semester: number;
  faculty: string;
  studyProgram: string;
  lecturerId: string;
  lecturerName: string;
  classRoom: string; // e.g. Gedung Al-Farabi R.304 / Google Meet
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
  time: string; // e.g. 08:00 - 10:30
  thumbnail: string;
  description: string;
  syllabusUrl?: string;
  totalMeetings: number;
  completedMeetings: number;
  studentsEnrolled: number;
}

export interface MaterialSection {
  heading: string;
  subheading?: string;
  content: string;
  paragraphs?: string[];
  analogies?: string;
  keyTakeaways?: string[];
  codeSnippet?: string;
  tips?: string;
  clinicalCase?: string;
}

export interface MaterialQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Material {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  meetingNumber: number;
  fileType: 'pdf' | 'ppt' | 'docx' | 'video' | 'link';
  fileSize?: string;
  fileUrl: string;
  uploadDate: string;
  uploadedBy: string;
  downloadCount: number;
  readingTimeMinutes?: number;
  overview?: string;
  learningObjectives?: string[];
  sections?: MaterialSection[];
  summary?: string;
  quizQuestions?: MaterialQuiz[];
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  meetingNumber: number;
  deadline: string; // ISO date string
  maxScore: number;
  weightPercent: number;
  attachmentName?: string;
  createdBy: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentNim: string;
  submittedAt: string;
  fileUrl?: string;
  fileName?: string;
  notes?: string;
  score?: number;
  feedback?: string;
  status: 'Menunggu Dinilai' | 'Dinilai' | 'Terlambat';
}

export interface ExamQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'essay';
  options?: string[]; // 4 or 5 options
  correctOptionIndex?: number; // 0 to 4
  points: number;
}

export interface Exam {
  id: string;
  courseId: string;
  courseName: string;
  title: string; // e.g. Ujian Tengah Semester (UTS)
  type: 'UTS' | 'UAS' | 'Kuis';
  date: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  token: string;
  status: 'Aktif' | 'Mendatang' | 'Selesai';
  questions: ExamQuestion[];
  instructions: string;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  studentNim: string;
  score: number;
  totalPoints: number;
  isPassed: boolean;
  submittedAt: string;
  userAnswers: { [questionId: string]: number | string };
}

export interface AttendanceSession {
  id: string;
  courseId: string;
  courseName: string;
  meetingNumber: number;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  token: string;
  isOpen: boolean;
  totalStudents: number;
  presentCount: number;
}

export interface StudentAttendance {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  studentNim: string;
  courseId: string;
  meetingNumber: number;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  timestamp?: string;
  notes?: string;
}

export interface GradeItem {
  id: string;
  studentId: string;
  studentName: string;
  studentNim: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  sks: number;
  semester: number;
  assignmentScore: number;
  quizScore: number;
  midtermScore: number; // UTS
  finalScore: number; // UAS
  attendanceScore: number;
  totalScore: number;
  letterGrade: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E';
  gradePoint: number; // 4.0, 3.7, etc
}

export interface ForumComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLecturerVerified?: boolean;
}

export interface ForumPost {
  id: string;
  courseId?: string;
  courseName?: string;
  title: string;
  content: string;
  category: 'Diskusi Kuliah' | 'Tanya Dosen' | 'Seputar Kampus' | 'Teknologi & Riset';
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  createdAt: string;
  likes: number;
  repliesCount: number;
  isPinned?: boolean;
  tags: string[];
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Akademik' | 'Beasiswa' | 'Kemahasiswaan' | 'Ujian' | 'Umum';
  publishedDate: string;
  author: string;
  attachmentName?: string;
  isUrgent?: boolean;
}

export interface AcademicEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  type: 'Kuliah' | 'UTS' | 'UAS' | 'Registrasi' | 'Libur' | 'Wisuda';
  description: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  timestamp: string;
  ipAddress?: string;
}

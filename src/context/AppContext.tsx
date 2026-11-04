import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Course,
  Material,
  Assignment,
  Submission,
  Exam,
  ExamResult,
  AttendanceSession,
  StudentAttendance,
  GradeItem,
  ForumPost,
  ForumComment,
  Announcement,
  AcademicEvent,
  ActivityLog,
  Faculty,
  StudyProgram,
  UserRole,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_FACULTIES,
  INITIAL_STUDY_PROGRAMS,
  INITIAL_COURSES,
  INITIAL_MATERIALS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_EXAMS,
  INITIAL_EXAM_RESULTS,
  INITIAL_ATTENDANCE_SESSIONS,
  INITIAL_STUDENT_ATTENDANCE,
  INITIAL_GRADES,
  INITIAL_FORUM_POSTS,
  INITIAL_FORUM_COMMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ACADEMIC_EVENTS,
  INITIAL_ACTIVITY_LOGS,
} from '../data/mockData';

export type ActivePage =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'courses'
  | 'course-detail'
  | 'materials'
  | 'assignments'
  | 'exams'
  | 'exam-runner'
  | 'attendance'
  | 'grades'
  | 'schedule'
  | 'forum'
  | 'announcements'
  | 'profile'
  | 'admin-students'
  | 'admin-lecturers'
  | 'admin-courses'
  | 'admin-departments'
  | 'admin-users';

interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  isRead: boolean;
}

interface AppContextType {
  currentUser: User | null;
  activePage: ActivePage;
  selectedCourseId: string | null;
  selectedExamId: string | null;
  users: User[];
  faculties: Faculty[];
  studyPrograms: StudyProgram[];
  courses: Course[];
  materials: Material[];
  assignments: Assignment[];
  submissions: Submission[];
  exams: Exam[];
  examResults: ExamResult[];
  attendanceSessions: AttendanceSession[];
  studentAttendance: StudentAttendance[];
  grades: GradeItem[];
  forumPosts: ForumPost[];
  forumComments: ForumComment[];
  announcements: Announcement[];
  academicEvents: AcademicEvent[];
  activityLogs: ActivityLog[];
  notifications: AppNotification[];
  toastMessage: { text: string; type: 'success' | 'info' | 'error' } | null;

  // Navigation
  setActivePage: (page: ActivePage) => void;
  setSelectedCourseId: (id: string | null) => void;
  setSelectedExamId: (id: string | null) => void;
  navigateToCourseDetail: (courseId: string) => void;
  navigateToExamRunner: (examId: string) => void;

  // Auth actions
  login: (identifier: string, role?: UserRole) => boolean;
  loginAs: (role: UserRole) => void;
  logout: () => void;
  registerUser: (userData: Partial<User> & { password?: string }) => { success: boolean; message: string };
  updateProfile: (updatedData: Partial<User>) => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };

  // Academic Actions
  addMaterial: (material: Omit<Material, 'id' | 'uploadDate' | 'downloadCount'>) => void;
  deleteMaterial: (id: string) => void;
  incrementMaterialDownload: (id: string) => void;

  addAssignment: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
  submitAssignment: (assignmentId: string, notes: string, fileName?: string) => void;
  gradeSubmission: (submissionId: string, score: number, feedback: string) => void;

  addExam: (exam: Omit<Exam, 'id'>) => void;
  submitExamResult: (examId: string, score: number, userAnswers: { [qId: string]: number | string }) => void;

  openAttendanceSession: (courseId: string, meetingNumber: number, topic: string) => AttendanceSession;
  closeAttendanceSession: (sessionId: string) => void;
  markAttendanceByToken: (token: string) => { success: boolean; message: string };
  updateStudentAttendanceStatus: (attendanceId: string, status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa') => void;

  addForumPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'likes' | 'repliesCount'>) => void;
  addForumComment: (postId: string, content: string) => void;
  likeForumPost: (postId: string) => void;

  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'publishedDate'>) => void;

  // Admin Master Data CRUD
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  addCourse: (course: Omit<Course, 'id' | 'completedMeetings' | 'studentsEnrolled'>) => void;
  updateCourse: (id: string, course: Partial<Course>) => void;
  deleteCourse: (id: string) => void;

  addFaculty: (faculty: Omit<Faculty, 'id' | 'programsCount'>) => void;
  addStudyProgram: (program: Omit<StudyProgram, 'id'>) => void;

  // Utility
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  markNotificationsAsRead: () => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // LocalStorage initialization helper
  const getStored = <T,>(key: string, fallback: T): T => {
    try {
      const item = localStorage.getItem(`uir_${key}`);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  };

  const setStored = <T,>(key: string, value: T) => {
    try {
      localStorage.setItem(`uir_${key}`, JSON.stringify(value));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  };

  // State
  const [currentUser, setCurrentUser] = useState<User | null>(() => getStored('currentUser', null));
  const [activePage, setActivePage] = useState<ActivePage>(() => getStored('activePage', 'landing'));
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>(() => getStored('users', INITIAL_USERS));
  const [faculties, setFaculties] = useState<Faculty[]>(() => getStored('faculties', INITIAL_FACULTIES));
  const [studyPrograms, setStudyPrograms] = useState<StudyProgram[]>(() => getStored('studyPrograms', INITIAL_STUDY_PROGRAMS));
  const [courses, setCourses] = useState<Course[]>(() => getStored('courses', INITIAL_COURSES));
  const [materials, setMaterials] = useState<Material[]>(() => getStored('materials', INITIAL_MATERIALS));
  const [assignments, setAssignments] = useState<Assignment[]>(() => getStored('assignments', INITIAL_ASSIGNMENTS));
  const [submissions, setSubmissions] = useState<Submission[]>(() => getStored('submissions', INITIAL_SUBMISSIONS));
  const [exams, setExams] = useState<Exam[]>(() => getStored('exams', INITIAL_EXAMS));
  const [examResults, setExamResults] = useState<ExamResult[]>(() => getStored('examResults', INITIAL_EXAM_RESULTS));
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(() => getStored('attendanceSessions', INITIAL_ATTENDANCE_SESSIONS));
  const [studentAttendance, setStudentAttendance] = useState<StudentAttendance[]>(() => getStored('studentAttendance', INITIAL_STUDENT_ATTENDANCE));
  const [grades, setGrades] = useState<GradeItem[]>(() => getStored('grades', INITIAL_GRADES));
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => getStored('forumPosts', INITIAL_FORUM_POSTS));
  const [forumComments, setForumComments] = useState<ForumComment[]>(() => getStored('forumComments', INITIAL_FORUM_COMMENTS));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getStored('announcements', INITIAL_ANNOUNCEMENTS));
  const [academicEvents] = useState<AcademicEvent[]>(() => getStored('academicEvents', INITIAL_ACADEMIC_EVENTS));
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => getStored('activityLogs', INITIAL_ACTIVITY_LOGS));

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Presensi Dibuka',
      message: 'Presensi Pertemuan 7 RPL Modern telah dibuka oleh Dr. Ahmad Rusydi.',
      type: 'info',
      time: '15 menit lalu',
      isRead: false,
    },
    {
      id: 'notif-2',
      title: 'Tugas Dinilai',
      message: 'Tugas Audit OWASP Anda telah dinilai oleh Dosen. Skor: 95.',
      type: 'success',
      time: '1 jam lalu',
      isRead: false,
    },
    {
      id: 'notif-3',
      title: 'Jadwal UTS Daring',
      message: 'UTS RPL Modern dijadwalkan pada 8 November 2026. Persiapkan perangkat Anda.',
      type: 'warning',
      time: 'Kemarin',
      isRead: true,
    },
  ]);

  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync state to LocalStorage
  useEffect(() => { setStored('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { setStored('activePage', activePage); }, [activePage]);
  useEffect(() => { setStored('users', users); }, [users]);
  useEffect(() => { setStored('courses', courses); }, [courses]);
  useEffect(() => { setStored('materials', materials); }, [materials]);
  useEffect(() => { setStored('assignments', assignments); }, [assignments]);
  useEffect(() => { setStored('submissions', submissions); }, [submissions]);
  useEffect(() => { setStored('exams', exams); }, [exams]);
  useEffect(() => { setStored('examResults', examResults); }, [examResults]);
  useEffect(() => { setStored('attendanceSessions', attendanceSessions); }, [attendanceSessions]);
  useEffect(() => { setStored('studentAttendance', studentAttendance); }, [studentAttendance]);
  useEffect(() => { setStored('grades', grades); }, [grades]);
  useEffect(() => { setStored('forumPosts', forumPosts); }, [forumPosts]);
  useEffect(() => { setStored('forumComments', forumComments); }, [forumComments]);
  useEffect(() => { setStored('announcements', announcements); }, [announcements]);
  useEffect(() => { setStored('activityLogs', activityLogs); }, [activityLogs]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addLog = (action: string) => {
    if (!currentUser) return;
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      ipAddress: '180.252.12.89',
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Auth
  const login = (identifier: string, role?: UserRole): boolean => {
    const trimmed = identifier.trim().toLowerCase();
    const found = users.find(u => {
      const matchId = u.identifier.toLowerCase() === trimmed || u.email.toLowerCase() === trimmed;
      if (role) return matchId && u.role === role;
      return matchId;
    });

    if (found) {
      setCurrentUser(found);
      setActivePage('dashboard');
      showToast(`Selamat datang, ${found.name}! Anda login sebagai ${found.role.toUpperCase()}.`, 'success');
      return true;
    }
    return false;
  };

  const loginAs = (role: UserRole) => {
    const user = users.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      setActivePage('dashboard');
      showToast(`Login demo berhasil sebagai ${user.name} (${role.toUpperCase()})`, 'success');
      addLog(`Masuk ke sistem E-Learning sebagai ${role.toUpperCase()}`);
    }
  };

  const logout = () => {
    if (currentUser) {
      addLog(`Keluar dari sistem E-Learning`);
    }
    setCurrentUser(null);
    setActivePage('landing');
    showToast('Anda telah berhasil keluar dari sistem.', 'info');
  };

  const registerUser = (userData: Partial<User> & { password?: string }): { success: boolean; message: string } => {
    if (!userData.name || !userData.identifier || !userData.email) {
      return { success: false, message: 'Harap lengkapi semua kolom wajib!' };
    }

    const exists = users.some(
      u => u.identifier.toLowerCase() === userData.identifier?.toLowerCase() || u.email.toLowerCase() === userData.email?.toLowerCase()
    );
    if (exists) {
      return { success: false, message: 'NIM/NIDN atau Email sudah terdaftar dalam sistem!' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      identifier: userData.identifier,
      role: userData.role || 'mahasiswa',
      status: 'Aktif',
      faculty: userData.faculty || 'Fakultas Teknik & Ilmu Komputer',
      studyProgram: userData.studyProgram || 'Teknik Informatika',
      semester: userData.semester || 1,
      gender: userData.gender || 'Laki-laki',
      phone: userData.phone || '08123456789',
      avatar: userData.gender === 'Perempuan' 
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      ipk: 3.75,
      totalSks: 20,
      title: userData.title,
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setActivePage('dashboard');
    showToast(`Registrasi berhasil! Selamat datang di Universitas Ibnu Rusman, ${newUser.name}.`, 'success');
    return { success: true, message: 'Berhasil' };
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    showToast('Profil Anda berhasil diperbarui.', 'success');
    addLog('Memperbarui data profil pribadi');
  };

  const changePassword = (_oldPass: string, newPass: string) => {
    if (newPass.length < 6) {
      return { success: false, message: 'Kata sandi baru minimal 6 karakter!' };
    }
    showToast('Kata sandi berhasil diperbarui dengan aman.', 'success');
    addLog('Mengubah kata sandi akun');
    return { success: true, message: 'Sukses' };
  };

  // Navigation helpers
  const navigateToCourseDetail = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActivePage('course-detail');
  };

  const navigateToExamRunner = (examId: string) => {
    setSelectedExamId(examId);
    setActivePage('exam-runner');
  };

  // Academic Materials
  const addMaterial = (mat: Omit<Material, 'id' | 'uploadDate' | 'downloadCount'>) => {
    const newMaterial: Material = {
      ...mat,
      id: `mat-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
    };
    setMaterials(prev => [newMaterial, ...prev]);
    showToast(`Materi "${mat.title}" berhasil diunggah!`, 'success');
    addLog(`Mengunggah materi pembelajaran baru: ${mat.title}`);
  };

  const deleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    showToast('Materi berhasil dihapus.', 'info');
    addLog('Menghapus materi pembelajaran');
  };

  const incrementMaterialDownload = (id: string) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, downloadCount: m.downloadCount + 1 } : m));
  };

  // Assignments
  const addAssignment = (asg: Omit<Assignment, 'id' | 'createdAt'>) => {
    const newAssignment: Assignment = {
      ...asg,
      id: `asg-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAssignments(prev => [newAssignment, ...prev]);
    showToast(`Tugas baru "${asg.title}" berhasil diterbitkan!`, 'success');
    addLog(`Membuat tugas perkuliahan baru: ${asg.title}`);
  };

  const submitAssignment = (assignmentId: string, notes: string, fileName?: string) => {
    if (!currentUser) return;
    const targetAssignment = assignments.find(a => a.id === assignmentId);
    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentNim: currentUser.identifier,
      submittedAt: new Date().toISOString(),
      fileName: fileName || `${currentUser.name.replace(/\s+/g, '_')}_Tugas.pdf`,
      fileUrl: '/uploads/student_submission.pdf',
      notes,
      status: 'Menunggu Dinilai',
    };
    setSubmissions(prev => {
      // replace if already exists
      const filtered = prev.filter(s => !(s.assignmentId === assignmentId && s.studentId === currentUser.id));
      return [newSubmission, ...filtered];
    });
    showToast(`Tugas "${targetAssignment?.title || ''}" berhasil dikumpulkan!`, 'success');
    addLog(`Mengumpulkan tugas: ${targetAssignment?.title || 'Tugas Perkuliahan'}`);
  };

  const gradeSubmission = (submissionId: string, score: number, feedback: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          score,
          feedback,
          status: 'Dinilai',
        };
      }
      return s;
    }));
    showToast(`Nilai (${score}) dan umpan balik berhasil disimpan!`, 'success');
    addLog(`Memberikan penilaian tugas mahasiswa`);
  };

  // Exams
  const addExam = (exam: Omit<Exam, 'id'>) => {
    const newExam: Exam = {
      ...exam,
      id: `exm-${Date.now()}`,
    };
    setExams(prev => [newExam, ...prev]);
    showToast(`Ujian "${exam.title}" berhasil dijadwalkan!`, 'success');
    addLog(`Membuat jadwal ujian baru: ${exam.title}`);
  };

  const submitExamResult = (examId: string, score: number, userAnswers: { [qId: string]: number | string }) => {
    if (!currentUser) return;
    const exam = exams.find(e => e.id === examId);
    const newResult: ExamResult = {
      id: `res-${Date.now()}`,
      examId,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentNim: currentUser.identifier,
      score,
      totalPoints: 100,
      isPassed: score >= (exam?.passingScore || 65),
      submittedAt: new Date().toISOString(),
      userAnswers,
    };
    setExamResults(prev => [newResult, ...prev]);
    showToast(`Ujian selesai! Skor Anda: ${score}/100. Hasil telah tersimpan.`, 'success');
    addLog(`Menyelesaikan ujian online CBT: ${exam?.title || 'Ujian'} (Skor: ${score})`);
  };

  // Attendance
  const openAttendanceSession = (courseId: string, meetingNumber: number, topic: string) => {
    const targetCourse = courses.find(c => c.id === courseId);
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    const now = new Date();
    const newSession: AttendanceSession = {
      id: `att-${Date.now()}`,
      courseId,
      courseName: targetCourse?.name || 'Mata Kuliah',
      meetingNumber,
      topic,
      date: now.toISOString().split('T')[0],
      startTime: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      endTime: '23:59',
      token: randomPin,
      isOpen: true,
      totalStudents: targetCourse?.studentsEnrolled || 35,
      presentCount: 0,
    };
    setAttendanceSessions(prev => [newSession, ...prev]);
    showToast(`Sesi presensi Pertemuan ${meetingNumber} dibuka! Kode Token PIN: ${randomPin}`, 'success');
    addLog(`Membuka sesi presensi perkuliahan pertemuan ${meetingNumber} (Kode: ${randomPin})`);
    return newSession;
  };

  const closeAttendanceSession = (sessionId: string) => {
    setAttendanceSessions(prev => prev.map(s => s.id === sessionId ? { ...s, isOpen: false } : s));
    showToast('Sesi presensi telah ditutup.', 'info');
    addLog('Menutup sesi presensi perkuliahan');
  };

  const markAttendanceByToken = (tokenInput: string): { success: boolean; message: string } => {
    if (!currentUser) return { success: false, message: 'Harap login terlebih dahulu' };
    const session = attendanceSessions.find(s => s.token.trim() === tokenInput.trim() && s.isOpen);
    if (!session) {
      return { success: false, message: 'Kode token salah atau sesi presensi telah berakhir!' };
    }

    const alreadyMarked = studentAttendance.some(
      a => a.sessionId === session.id && a.studentId === currentUser.id
    );
    if (alreadyMarked) {
      return { success: false, message: 'Anda sudah melakukan presensi pada pertemuan ini!' };
    }

    const now = new Date();
    const newAttendance: StudentAttendance = {
      id: `sa-${Date.now()}`,
      sessionId: session.id,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentNim: currentUser.identifier,
      courseId: session.courseId,
      meetingNumber: session.meetingNumber,
      status: 'Hadir',
      timestamp: `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`,
      notes: 'Presensi mandiri via sistem E-Learning',
    };

    setStudentAttendance(prev => [newAttendance, ...prev]);
    setAttendanceSessions(prev => prev.map(s => s.id === session.id ? { ...s, presentCount: s.presentCount + 1 } : s));
    showToast(`Presensi berhasil! Anda tercatat HADIR pada pertemuan ke-${session.meetingNumber}.`, 'success');
    addLog(`Melakukan presensi online pada ${session.courseName} Pertemuan ${session.meetingNumber}`);
    return { success: true, message: 'Presensi Berhasil' };
  };

  const updateStudentAttendanceStatus = (attendanceId: string, status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa') => {
    setStudentAttendance(prev => prev.map(a => a.id === attendanceId ? { ...a, status } : a));
    showToast(`Status kehadiran diubah menjadi: ${status}`, 'success');
  };

  // Forum
  const addForumPost = (post: Omit<ForumPost, 'id' | 'createdAt' | 'likes' | 'repliesCount'>) => {
    const newPost: ForumPost = {
      ...post,
      id: `fp-${Date.now()}`,
      createdAt: 'Baru saja',
      likes: 0,
      repliesCount: 0,
    };
    setForumPosts(prev => [newPost, ...prev]);
    showToast('Topik diskusi berhasil dipublikasikan!', 'success');
    addLog(`Membuat topik diskusi forum: ${post.title}`);
  };

  const addForumComment = (postId: string, content: string) => {
    if (!currentUser) return;
    const newComment: ForumComment = {
      id: `fc-${Date.now()}`,
      postId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorRole: currentUser.role,
      authorAvatar: currentUser.avatar,
      content,
      createdAt: 'Baru saja',
      likes: 0,
      isLecturerVerified: currentUser.role === 'dosen',
    };
    setForumComments(prev => [...prev, newComment]);
    setForumPosts(prev => prev.map(p => p.id === postId ? { ...p, repliesCount: p.repliesCount + 1 } : p));
    showToast('Komentar berhasil dikirim!', 'success');
    addLog('Menulis komentar pada forum diskusi');
  };

  const likeForumPost = (postId: string) => {
    setForumPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  // Announcements
  const addAnnouncement = (anc: Omit<Announcement, 'id' | 'publishedDate'>) => {
    const newAnc: Announcement = {
      ...anc,
      id: `anc-${Date.now()}`,
      publishedDate: new Date().toISOString().split('T')[0],
    };
    setAnnouncements(prev => [newAnc, ...prev]);
    showToast('Pengumuman baru berhasil diterbitkan!', 'success');
    addLog(`Menerbitkan pengumuman resmi: ${anc.title}`);
  };

  // Admin CRUD
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = { ...userData, id: `usr-${Date.now()}` };
    setUsers(prev => [newUser, ...prev]);
    showToast(`Pengguna "${userData.name}" berhasil ditambahkan.`, 'success');
    addLog(`Menambahkan akun pengguna baru: ${userData.name} (${userData.role})`);
  };

  const updateUser = (id: string, updated: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
    showToast('Data pengguna berhasil diperbarui.', 'success');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast('Pengguna berhasil dihapus.', 'info');
  };

  const addCourse = (c: Omit<Course, 'id' | 'completedMeetings' | 'studentsEnrolled'>) => {
    const newCourse: Course = {
      ...c,
      id: `crs-${Date.now()}`,
      completedMeetings: 0,
      studentsEnrolled: 30,
    };
    setCourses(prev => [newCourse, ...prev]);
    showToast(`Mata kuliah "${c.name}" berhasil didaftarkan.`, 'success');
    addLog(`Mendaftarkan mata kuliah baru: ${c.name} (${c.code})`);
  };

  const updateCourse = (id: string, c: Partial<Course>) => {
    setCourses(prev => prev.map(item => item.id === id ? { ...item, ...c } : item));
    showToast('Data mata kuliah berhasil diperbarui.', 'success');
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    showToast('Mata kuliah berhasil dihapus.', 'info');
  };

  const addFaculty = (f: Omit<Faculty, 'id' | 'programsCount'>) => {
    const newFac: Faculty = { ...f, id: `fac-${Date.now()}`, programsCount: 0 };
    setFaculties(prev => [...prev, newFac]);
    showToast(`Fakultas "${f.name}" berhasil ditambahkan.`, 'success');
  };

  const addStudyProgram = (sp: Omit<StudyProgram, 'id'>) => {
    const newSp: StudyProgram = { ...sp, id: `prodi-${Date.now()}` };
    setStudyPrograms(prev => [...prev, newSp]);
    showToast(`Program studi "${sp.name}" berhasil ditambahkan.`, 'success');
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const resetAllData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setFaculties(INITIAL_FACULTIES);
    setStudyPrograms(INITIAL_STUDY_PROGRAMS);
    setCourses(INITIAL_COURSES);
    setMaterials(INITIAL_MATERIALS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setExams(INITIAL_EXAMS);
    setExamResults(INITIAL_EXAM_RESULTS);
    setAttendanceSessions(INITIAL_ATTENDANCE_SESSIONS);
    setStudentAttendance(INITIAL_STUDENT_ATTENDANCE);
    setGrades(INITIAL_GRADES);
    setForumPosts(INITIAL_FORUM_POSTS);
    setForumComments(INITIAL_FORUM_COMMENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setCurrentUser(null);
    setActivePage('landing');
    showToast('Data sistem telah direset ke data awal demo.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activePage,
        selectedCourseId,
        selectedExamId,
        users,
        faculties,
        studyPrograms,
        courses,
        materials,
        assignments,
        submissions,
        exams,
        examResults,
        attendanceSessions,
        studentAttendance,
        grades,
        forumPosts,
        forumComments,
        announcements,
        academicEvents,
        activityLogs,
        notifications,
        toastMessage,

        setActivePage,
        setSelectedCourseId,
        setSelectedExamId,
        navigateToCourseDetail,
        navigateToExamRunner,

        login,
        loginAs,
        logout,
        registerUser,
        updateProfile,
        changePassword,

        addMaterial,
        deleteMaterial,
        incrementMaterialDownload,

        addAssignment,
        submitAssignment,
        gradeSubmission,

        addExam,
        submitExamResult,

        openAttendanceSession,
        closeAttendanceSession,
        markAttendanceByToken,
        updateStudentAttendanceStatus,

        addForumPost,
        addForumComment,
        likeForumPost,

        addAnnouncement,

        addUser,
        updateUser,
        deleteUser,
        addCourse,
        updateCourse,
        deleteCourse,
        addFaculty,
        addStudyProgram,

        showToast,
        markNotificationsAsRead,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

import {
  User,
  Faculty,
  StudyProgram,
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
} from '../types';

import universityLogoImg from '../assets/images/university_logo_1793797435430.jpg';
import campusHeroImg from '../assets/images/campus_hero_1793797435338.jpg';
import { MEDICAL_COURSE_MATERIAL } from './medicalCurriculum50Bab';

export const UNIVERSITY_INFO = {
  name: 'UNIVERSITAS IBNU RUSMAN',
  acronym: 'UIR',
  systemTitle: 'E-LEARNING UNIVERSITAS IBNU RUSMAN',
  slogan: 'Membangun Generasi Cerdas, Unggul, dan Berkarakter',
  established: 1968,
  accreditation: 'A (UNGGUL)',
  address: 'Jl. Pemuda Cendekia No. 45, Kompleks Kampus Terpadu, Jakarta',
  phone: '(021) 789-4521 / +62 812-9988-7766',
  email: 'info@ibnurusman.ac.id',
  website: 'https://ibnurusman.ac.id',
  rector: 'Prof. Misbakhul Munir, M.Kom., Ph.D.',
  rectorPhoto: '/assets/aistudio/WhatsApp_Image_2026-11-04_at_20.27.45_899e954b.jpeg',
  logo: universityLogoImg,
  campusHero: campusHeroImg,
};

export const INITIAL_USERS: User[] = [
  {
    id: 'adm-1',
    name: 'Drs. H. Mulyono Santoso, M.Si',
    email: 'admin@ibnurusman.ac.id',
    role: 'admin',
    identifier: 'ADM-1975031201',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    gender: 'Laki-laki',
    phone: '081234567890',
    title: 'Kepala Pusat Pangkalan Data & IT',
    status: 'Aktif',
  },
  {
    id: 'dsn-1',
    name: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    email: 'ahmad.rusydi@ibnurusman.ac.id',
    role: 'dosen',
    identifier: '0412088201', // NIDN
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    gender: 'Laki-laki',
    phone: '081387654321',
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    title: 'Dr. Ir., M.Kom',
    expertise: 'Artificial Intelligence, Software Engineering & Cloud Computing',
    status: 'Aktif',
  },
  {
    id: 'dsn-2',
    name: 'Prof. Dr. Hj. Siti Nurhaliza, S.E., M.M.',
    email: 'siti.nurhaliza@ibnurusman.ac.id',
    role: 'dosen',
    identifier: '0425047802',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    gender: 'Perempuan',
    phone: '081198765432',
    faculty: 'Fakultas Ekonomi & Bisnis',
    studyProgram: 'Manajemen Keuangan Bisnis',
    title: 'Prof. Dr., S.E., M.M.',
    expertise: 'Manajemen Keuangan Korporasi & Fintech',
    status: 'Aktif',
  },
  {
    id: 'dsn-3',
    name: 'Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.',
    email: 'qothrunnada.zakiyah@ibnurusman.ac.id',
    role: 'dosen',
    identifier: '0417098205', // NIDN
    avatar: 'https://images.unsplash.com/photo-1594824813572-c2e50529d2f2?auto=format&fit=crop&w=300&q=80',
    gender: 'Perempuan',
    phone: '081233445566',
    faculty: 'Fakultas Kedokteran & Ilmu Kesehatan',
    studyProgram: 'Ilmu Kedokteran',
    title: 'Prof. Dr., Sp.OG.',
    expertise: 'Obstetri & Ginekologi Klinis, Fisiologi Reproduksi Manusia, Bedah Kebidanan & Kesehatan Maternal',
    status: 'Aktif',
  },
  {
    id: 'mhs-1',
    name: 'Muhammad Farhan Ramadhan',
    email: 'farhan.ramadhan@student.ibnurusman.ac.id',
    role: 'mahasiswa',
    identifier: '20230810145', // NIM
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    gender: 'Laki-laki',
    phone: '085712349876',
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    semester: 6,
    ipk: 3.86,
    totalSks: 114,
    academicYear: '2023/2024',
    status: 'Aktif',
  },
  {
    id: 'mhs-2',
    name: 'Aisyah Putri Azzahra',
    email: 'aisyah.putri@student.ibnurusman.ac.id',
    role: 'mahasiswa',
    identifier: '20230810146',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    gender: 'Perempuan',
    phone: '085711223344',
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    semester: 6,
    ipk: 3.92,
    totalSks: 114,
    academicYear: '2023/2024',
    status: 'Aktif',
  },
  {
    id: 'mhs-3',
    name: 'Rizky Maulana Pratama',
    email: 'rizky.maulana@student.ibnurusman.ac.id',
    role: 'mahasiswa',
    identifier: '20230810147',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    gender: 'Laki-laki',
    phone: '085788990011',
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    semester: 6,
    ipk: 3.65,
    totalSks: 114,
    academicYear: '2023/2024',
    status: 'Aktif',
  },
];

export const INITIAL_FACULTIES: Faculty[] = [
  {
    id: 'fac-1',
    name: 'Fakultas Teknik & Ilmu Komputer',
    code: 'FTIK',
    dean: 'Dr. Eng. Hendra Gunawan, S.T., M.T.',
    programsCount: 4,
    description: 'Pusat riset teknologi rekayasa, kecerdasan buatan, IoT, dan transformasi digital peradaban.',
  },
  {
    id: 'fac-2',
    name: 'Fakultas Ekonomi & Bisnis',
    code: 'FEB',
    dean: 'Prof. Dr. Hj. Siti Nurhaliza, S.E., M.M.',
    programsCount: 5,
    description: 'Mencetak pemimpin bisnis global, akuntan profesional, dan inovator ekonomi syariah & synergetic fintech.',
  },
  {
    id: 'fac-3',
    name: 'Fakultas Kedokteran & Ilmu Kesehatan',
    code: 'FKIK',
    dean: 'dr. H. Bambang Soeprapto, Sp.B., FICS',
    programsCount: 3,
    description: 'Mendidik dokter dan tenaga medis berjiwa humanis, unggul dalam teknologi klinis terkini.',
  },
  {
    id: 'fac-4',
    name: 'Fakultas Hukum & Humaniora',
    code: 'FHH',
    dean: 'Dr. Hamdan Wahyudi, S.H., M.H.',
    programsCount: 3,
    description: 'Mengembangkan keilmuan hukum tata negara, advokasi etis, dan keadilan sosial bermartabat.',
  },
  {
    id: 'fac-5',
    name: 'Fakultas Studi Islam & Peradaban',
    code: 'FSIP',
    dean: 'Prof. Dr. KH. Luqman Hakim, Lc., M.A.',
    programsCount: 4,
    description: 'Meneladani kearifan filsafat Ibnu Rusman (Averroes), sains peradaban, dan nilai keislaman moderat.',
  },
];

export const INITIAL_STUDY_PROGRAMS: StudyProgram[] = [
  {
    id: 'prodi-1',
    name: 'Teknik Informatika',
    code: 'TI-S1',
    facultyId: 'fac-1',
    facultyName: 'Fakultas Teknik & Ilmu Komputer',
    degree: 'S1',
    accreditation: 'Unggul',
    headOfProgram: 'Dr. Ir. Ahmad Rusydi, M.Kom',
  },
  {
    id: 'prodi-2',
    name: 'Sistem Informasi',
    code: 'SI-S1',
    facultyId: 'fac-1',
    facultyName: 'Fakultas Teknik & Ilmu Komputer',
    degree: 'S1',
    accreditation: 'Unggul',
    headOfProgram: 'Ir. Dewi Kusuma, M.T.',
  },
  {
    id: 'prodi-3',
    name: 'Teknik Elektro & Robotika',
    code: 'TE-S1',
    facultyId: 'fac-1',
    facultyName: 'Fakultas Teknik & Ilmu Komputer',
    degree: 'S1',
    accreditation: 'Baik Sekali',
    headOfProgram: 'Fajar Nugraha, Ph.D',
  },
  {
    id: 'prodi-4',
    name: 'Manajemen Bisnis Digital',
    code: 'MBD-S1',
    facultyId: 'fac-2',
    facultyName: 'Fakultas Ekonomi & Bisnis',
    degree: 'S1',
    accreditation: 'Unggul',
    headOfProgram: 'Dr. Rina Wulandari, S.E., M.B.A.',
  },
  {
    id: 'prodi-5',
    name: 'Akuntansi & Keuangan Syariah',
    code: 'AKS-S1',
    facultyId: 'fac-2',
    facultyName: 'Fakultas Ekonomi & Bisnis',
    degree: 'S1',
    accreditation: 'A',
    headOfProgram: 'Drs. H. Arifin, M.Ak., Ak.',
  },
  {
    id: 'prodi-6',
    name: 'Kedokteran Umum',
    code: 'KU-S1',
    facultyId: 'fac-3',
    facultyName: 'Fakultas Kedokteran & Ilmu Kesehatan',
    degree: 'S1',
    accreditation: 'Unggul',
    headOfProgram: 'dr. Nabila Hapsari, Sp.A.',
  },
  {
    id: 'prodi-7',
    name: 'Ilmu Kedokteran',
    code: 'IK-S1',
    facultyId: 'fac-3',
    facultyName: 'Fakultas Kedokteran & Ilmu Kesehatan',
    degree: 'S1',
    accreditation: 'Unggul',
    headOfProgram: 'Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs-1',
    code: 'TIF-301',
    name: 'Rekayasa Perangkat Lunak Modern',
    sks: 3,
    semester: 6,
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    lecturerId: 'dsn-1',
    lecturerName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    classRoom: 'Lab Komputasi A-201 & Cloud Meet',
    day: 'Senin',
    time: '08:00 - 10:30 WIB',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Membahas arsitektur microservices, agile sprint, design patterns, CI/CD pipeline, dan pengujian mutu software enterprise.',
    totalMeetings: 16,
    completedMeetings: 7,
    studentsEnrolled: 38,
  },
  {
    id: 'crs-2',
    code: 'TIF-305',
    name: 'Kecerdasan Buatan & Machine Learning',
    sks: 3,
    semester: 6,
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    lecturerId: 'dsn-1',
    lecturerName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    classRoom: 'Gedung Ibnu Sina R.402',
    day: 'Rabu',
    time: '10:45 - 13:15 WIB',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    description: 'Eksplorasi deep learning, computer vision, natural language processing (LLM), reinforcement learning, dan implementasi PyTorch.',
    totalMeetings: 16,
    completedMeetings: 7,
    studentsEnrolled: 42,
  },
  {
    id: 'crs-3',
    code: 'TIF-309',
    name: 'Keamanan Siber & Kriptografi Modern',
    sks: 3,
    semester: 6,
    faculty: 'Fakultas Teknik & Ilmu Komputer',
    studyProgram: 'Teknik Informatika',
    lecturerId: 'dsn-1',
    lecturerName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    classRoom: 'Lab Cyber Security B-105',
    day: 'Kamis',
    time: '13:30 - 16:00 WIB',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    description: 'Konsep enkripsi asimetris, blockchain consensus, penetration testing, Zero-Trust network, dan audit keamanan sistem informasi.',
    totalMeetings: 16,
    completedMeetings: 6,
    studentsEnrolled: 36,
  },
  {
    id: 'crs-4',
    code: 'FEB-202',
    name: 'Manajemen Inovasi & Kewirausahaan Digital',
    sks: 2,
    semester: 6,
    faculty: 'Fakultas Ekonomi & Bisnis',
    studyProgram: 'Manajemen Bisnis Digital',
    lecturerId: 'dsn-2',
    lecturerName: 'Prof. Dr. Hj. Siti Nurhaliza, S.E., M.M.',
    classRoom: 'Auditorium Al-Khawarizmi Lt. 3',
    day: 'Selasa',
    time: '08:00 - 09:40 WIB',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    description: 'Strategi valuasi startup digital, lean canvas, customer discovery, pitching investor, dan hukum bisnis digital.',
    totalMeetings: 16,
    completedMeetings: 7,
    studentsEnrolled: 45,
  },
  {
    id: 'crs-5',
    code: 'UNI-101',
    name: 'Filsafat Ilmu & Etika Ibnu Rusman',
    sks: 2,
    semester: 6,
    faculty: 'Fakultas Studi Islam & Peradaban',
    studyProgram: 'Mata Kuliah Wajib Universitas',
    lecturerId: 'dsn-2',
    lecturerName: 'Prof. Dr. KH. Luqman Hakim, Lc., M.A.',
    classRoom: 'Hall Utama Gedung Rektorat Lt. 2',
    day: 'Jumat',
    time: '08:30 - 10:10 WIB',
    thumbnail: 'https://images.unsplash.com/photo-1507842229450-766a4f91e988?auto=format&fit=crop&w=600&q=80',
    description: 'Kajian epistemologi rasionalitas Ibnu Rusman (Averroes), harmoni antara wahyu dan sains modern, serta etika kecendekiawanan.',
    totalMeetings: 16,
    completedMeetings: 8,
    studentsEnrolled: 50,
  },
  {
    id: 'crs-6',
    code: 'MED-301',
    name: 'Ilmu Kedokteran & Obstetri Ginekologi Komprehensif',
    sks: 4,
    semester: 6,
    faculty: 'Fakultas Kedokteran & Ilmu Kesehatan',
    studyProgram: 'Ilmu Kedokteran',
    lecturerId: 'dsn-3',
    lecturerName: 'Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.',
    classRoom: 'Gedung Ibnu Sina Smart Lab FKIK R.301 & RS Pendidikan UIR',
    day: 'Selasa',
    time: '08:00 - 11:30 WIB',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    description: 'Kurikulum masterclass 50 Bab komprehensif: anatomi panggul, embriologi klinis, fisiologi reproduksi, pemantauan antenatal, patofisiologi kegawatdaruratan maternal, hingga etika biomedis.',
    totalMeetings: 16,
    completedMeetings: 7,
    studentsEnrolled: 40,
  },
];

export const INITIAL_MATERIALS: Material[] = [
  MEDICAL_COURSE_MATERIAL,
  {
    id: 'mat-1',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    title: 'Modul 01: Arsitektur Software Berkelanjutan & Domain-Driven Design (DDD)',
    description: 'Panduan fundamental mengenai pemodelan bounded context, aggregate roots, dan arsitektur hexagon / clean architecture agar sistem berskala besar tidak mudah runtuh.',
    meetingNumber: 1,
    fileType: 'pdf',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-09-10',
    uploadedBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    downloadCount: 142,
    readingTimeMinutes: 18,
    overview: 'Modul ini dirancang khusus bagi mahasiswa semester 6 untuk memahami bagaimana merancang software kelas enterprise yang tidak kusut (spaghetti code) saat fiturnya bertambah ribuan baris. Kita akan membedah prinsip Domain-Driven Design (DDD) dan Clean Architecture dengan analogi kehidupan sehari-hari.',
    learningObjectives: [
      'Memahami mengapa arsitektur monolitik tradisional sering runtuh ketika bisnis berkembang cepat.',
      'Mampu memisahkan aturan bisnis inti (Core Domain) dari framework eksternal seperti Express, React, atau SQL.',
      'Menguasai konsep Bounded Context dan Ubiquitous Language agar tim engineer dan tim bisnis memiliki bahasa yang sama.',
      'Membedakan Entity, Value Object, dan Aggregate Root dalam pemodelan data berintegritas tinggi.',
      'Mengimplementasikan Repository Pattern untuk decoupling database.'
    ],
    sections: [
      {
        heading: '1. Masalah Terbesar dalam Software Engineering: "The Big Ball of Mud"',
        subheading: 'Mengapa kode yang awalnya rapi berubah menjadi mimpi buruk?',
        content: 'Ketika Anda membangun aplikasi sederhana saat kuliah semester satu, Anda mungkin menaruh semua kode query database langsung di dalam controller atau tombol klik UI. Ini berfungsi untuk 100 pengguna. Namun, di industri enterprise dengan 5 juta pengguna dan 50 engineer yang menulis kode bersamaan, pendekatan ini menciptakan "The Big Ball of Mud" (gumpalan lumpur raksasa). Mengubah satu baris kode di fitur pembayaran bisa secara misterius merusak fitur pengiriman barang!',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda membangun rumah kardus kecil. Anda bisa menempelkan dapur langsung di sebelah tempat tidur dengan selotip. Tetapi jika Anda membangun gedung pencakar langit 50 lantai, Anda membutuhkan zona pondasi, saluran pipa terpisah, jalur evakuasi independen, dan regulasi listrik terstandarisasi. Arsitektur software adalah cetak biru gedung 50 lantai tersebut.',
        keyTakeaways: [
          'Arsitektur yang buruk meningkatkan technical debt (utang teknis) secara eksponensial.',
          'Domain-Driven Design (DDD) memindahkan fokus engineer dari "bagaimana tabel database dibuat" ke "bagaimana logika bisnis dunia nyata beroperasi".'
        ]
      },
      {
        heading: '2. Bounded Context: Membagi Wilayah Kekuasaan',
        subheading: 'Satu kata yang sama bisa memiliki arti berbeda di tempat yang berbeda',
        content: 'Dalam DDD, "Bounded Context" adalah batas eksplisit di mana sebuah model domain berlaku. Di dunia nyata, kata "Barang" bagi tim Pergudangan berarti sebuah kotak fisik berbobot 2 kg dengan dimensi panjang-lebar-tinggi. Namun bagi tim Akuntansi, "Barang" adalah baris entri neraca aset bernilai Rp 500.000 dengan depresiasi tahunan. Jika kedua tim dipaksa memakai satu tabel database yang sama persis, kode akan penuh dengan kondisi if-else yang memusingkan.',
        analogies: '💡 Analogi Sederhana: Mirip seperti paspor antar negara. Di dalam wilayah negara Indonesia, Anda menggunakan Rupiah dan aturan lalu lintas jalur kiri. Saat Anda melintasi batas ke negara lain, Anda mengikuti aturan mereka melalui pos pemeriksaan resmi (API Gateway / Anti-Corruption Layer).',
        keyTakeaways: [
          'Jangan pernah mencoba membuat satu "Tabel Universal" untuk seluruh aplikasi kampus atau e-commerce.',
          'Bagi sistem menjadi konteks independen: Konteks Akademik, Konteks Keuangan, Konteks Perpustakaan, dan Konteks Kemahasiswaan.'
        ]
      },
      {
        heading: '3. Membedakan Entity, Value Object, dan Aggregate Root',
        subheading: 'Fondasi pemodelan objek yang aman dari bug',
        content: 'Dalam DDD, objek dikelompokkan menjadi:\n1. Entity: Objek yang memiliki identitas unik sepanjang waktu (misalnya Mahasiswa dengan NIM). Meskipun namanya diubah atau foto profilnya berganti, dia tetap orang yang sama karena NIM-nya unik.\n2. Value Object: Objek yang tidak memiliki identitas tersendiri dan bersifat immutable (tidak bisa diubah). Objek ini diidentifikasi murni dari nilainya. Contoh: Uang (Rp 50.000) atau Alamat (Jl. Pemuda No. 10). Jika Anda mengganti uang Rp 50.000 Anda dengan lembaran Rp 50.000 yang lain, nilainya sama persis.\n3. Aggregate Root: Pintu gerbang utama untuk sekelompok objek yang saling terkait. Objek luar tidak boleh mengubah data anak di dalam aggregate secara langsung, melainkan harus selalu lewat sang ketua (Root).',
        codeSnippet: `// Contoh Value Object: Uang (Immutable & Aman)
class Money {
  constructor(public readonly amount: number, public readonly currency: 'IDR' | 'USD') {
    if (amount < 0) throw new Error("Nominal uang tidak boleh negatif!");
  }
  public add(other: Money): Money {
    if (this.currency !== other.currency) throw new Error("Mata uang harus sama!");
    return new Money(this.amount + other.amount, this.currency);
  }
}`,
        tips: 'Gunakan Value Object sesering mungkin. Kode Anda akan menjadi sangat kebal terhadap mutasi data liar (state corruption).'
      },
      {
        heading: '4. Clean Architecture (Hexagonal Architecture)',
        subheading: 'Pusatkan aturan bisnis, singkirkan framework ke tepi lingkaran',
        content: 'Clean Architecture yang dipopulerkan oleh Robert C. Martin (Uncle Bob) memiliki aturan ketergantungan emas: "Arah dependensi selalu mengarah ke dalam." Lapisan terluar (UI, Web Server, Database SQL/NoSQL, Eksternal API) bergantung pada Lapisan Inti (Use Cases & Entities), dan BUKAN sebaliknya! Artinya, jika besok kampus memutuskan berganti dari PostgreSQL ke MongoDB, aturan perhitungan IPK mahasiswa sama sekali tidak perlu diubah atau diuji ulang.',
        keyTakeaways: [
          'Domain Entities: Logika bisnis murni (bebas dari library pihak ketiga).',
          'Use Cases / Interactors: Alur proses spesifik (misalnya: "DaftarKRSUseCase").',
          'Controllers / Presenters: Penerjemah request HTTP atau input pengguna.',
          'Infrastructure: Driver database, pengirim email, dan koneksi internet.'
        ]
      },
      {
        heading: '5. Studi Kasus Nyata: Sistem Pendaftaran KRS Kampus Saat Lonjakan Trafik',
        subheading: 'Bagaimana arsitektur ini menyelamatkan kampus dari server tumbang',
        content: 'Setiap awal semester, puluhan ribu mahasiswa mengakses portal KRS secara serentak dalam detik yang sama untuk memperebutkan kuota kelas favorit. Sistem tradisional yang melakukan locking baris pada tabel database tunggal pasti akan timeout.\n\nDengan pendekatan DDD:\n1. Kelas Perkuliahan dimodelkan sebagai Aggregate Root dengan batas kuota ketat (misal 40 kursi).\n2. Saat mahasiswa mendaftar, method "enrollStudent(nim)" dijalankan di dalam memory aggregate.\n3. Jika kuota penuh, error langsung ditolak sebelum query berat ke database terjadi.\n4. Event "StudentEnrolledEvent" dipancarkan secara asinkron ke antrian pesan untuk memperbarui rekapitulasi data.',
        analogies: '💡 Analogi Sederhana: Seperti loket bioskop. Petugas loket memegang denah 50 kursi di hadapannya. Ia mencoret kursi yang sudah dibeli pembeli di depannya tanpa perlu bolak-balik memeriksa ke dalam studio bioskop untuk menghitung manual siapa yang duduk.'
      }
    ],
    summary: 'Domain-Driven Design bukan tentang membuat kode menjadi rumit, melainkan tentang membuat kode berbicara dalam bahasa bisnis yang jujur. Dengan memisahkan Bounded Context, menggunakan Value Object, dan menerapkan Clean Architecture, sistem perangkat lunak yang Anda bangun di Universitas Ibnu Rusman akan kokoh bertahan hingga puluhan tahun.',
    quizQuestions: [
      {
        question: 'Manakah di bawah ini yang merupakan contoh terbaik dari Value Object?',
        options: ['Mahasiswa dengan NIM unik', 'Mata Uang Rp 100.000 dengan nominal dan kode ISO', 'Dosen dengan NIDN', 'Gedung Fakultas dengan nomor sertifikat'],
        correctIndex: 1,
        explanation: 'Nilai uang Rp 100.000 tidak memiliki identitas tersendiri; jika diganti dengan selembar Rp 100.000 yang lain, nilainya persis sama.'
      },
      {
        question: 'Pada Clean Architecture, apa arah ketergantungan (dependency rule) yang benar?',
        options: ['Domain bergantung pada Database', 'Use Case bergantung pada Framework UI', 'Lapisan luar bergantung pada lapisan dalam', 'Database memanggil logika Entity secara langsung'],
        correctIndex: 2,
        explanation: 'Aturan ketergantungan Clean Architecture menyatakan bahwa semua ketergantungan harus selalu mengarah ke pusat (lapisan dalam) tempat aturan bisnis berada.'
      }
    ]
  },
  {
    id: 'mat-2',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    title: 'Slide Presentasi: Microservices & Event-Driven Architecture dengan Kafka',
    description: 'Panduan lengkap perbandingan pola komunikasi monolitik vs microservices, sinkron (REST/gRPC) vs asinkron (Kafka Event Streaming), serta strategi menjaga konsistensi data terdistribusi.',
    meetingNumber: 4,
    fileType: 'ppt',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-10-02',
    uploadedBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    downloadCount: 118,
    readingTimeMinutes: 16,
    overview: 'Saat aplikasi bertransformasi dari monolit menjadi ratusan service kecil independen, masalah baru muncul: bagaimana service-service ini saling berkomunikasi tanpa saling membebani atau menyebabkan efek domino ketika satu server mati? Modul ini mengupas tuntas rahasia arsitektur berbasis event (Event-Driven Architecture) menggunakan Apache Kafka.',
    learningObjectives: [
      'Memahami keterbatasan komunikasi sinkron REST API pada arsitektur terdistribusi skala tinggi.',
      'Memahami arsitektur internal Apache Kafka: Topics, Partitions, Brokers, Producer, dan Consumer Groups.',
      'Menguasai pola Event-Driven: publish-subscribe vs point-to-point queue.',
      'Memahami penyelesaian masalah konsistensi data dengan Saga Pattern dan Outbox Pattern.'
    ],
    sections: [
      {
        heading: '1. Mengapa REST API Saja Tidak Cukup di Skala Besar?',
        subheading: 'Bahaya "Cascading Failure" (Kegagalan Berantai)',
        content: 'Dalam sistem pembayaran e-commerce, saat user menekan "Bayar", sistem harus: (1) Memotong saldo, (2) Mengurangi stok barang, (3) Mengirim notifikasi WhatsApp, (4) Mencetak invoice, (5) Memperbarui poin reward. Jika semuanya dipanggil menggunakan REST API sinkron secara berantai (A memanggil B, B memanggil C, C memanggil D): jika server notifikasi WhatsApp lambat 5 detik, seluruh transaksi pembayaran pembeli akan macet atau gagal!',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda memesan kopi di kafe. Cara REST Sinkron: Pelayan kasir berjalan ke dapur, menunggu kopi diseduh 10 menit, baru kembali ke meja kasir untuk melayani antrian orang kedua. Akibatnya antrian kasir mengular sampai ke jalan raya! Cara Event-Driven: Kasir memberi Anda selembar struk bernomor pesanan, lalu langsung melayani pelanggan berikutnya. Mesin kopi menyeduh di belakang secara mandiri.',
        keyTakeaways: [
          'Komunikasi sinkron mengikat waktu eksekusi antar layanan (tight temporal coupling).',
          'Komunikasi asinkron melepaskan keterikatan sehingga layanan penerima dapat memproses data sesuai kapasitas kecepatannya sendiri (backpressure handling).'
        ]
      },
      {
        heading: '2. Anatomi Apache Kafka: Jantung Aliran Data Real-time',
        subheading: 'Bukan sekadar antrian pesan biasa, tapi log peristiwa permanen',
        content: 'Apache Kafka bukan sekadar message broker seperti RabbitMQ biasa. Kafka adalah "Distributed Commit Log". Pesan yang masuk ke Kafka disimpan di hard drive secara berurutan (append-only) dan tidak langsung dihapus saat dibaca!\n\nKomponen inti Kafka:\n• Topic: Saluran atau kategori data (misalnya: "transaksi-berhasil").\n• Partition: Pembagian topik menjadi beberapa berkas log di mesin berbeda agar proses baca-tulis dapat berjalan paralel hingga jutaan pesan per detik.\n• Producer: Aplikasi yang menerbitkan pesan (misal: Layanan Pembayaran).\n• Consumer: Aplikasi yang mendengarkan dan memproses pesan (misal: Layanan Inventori & Notifikasi).\n• Offset: Penanda nomor halaman pesan terakhir yang sudah dibaca oleh consumer.',
        keyTakeaways: [
          'Karena Kafka menyimpan riwayat log (retention period), jika terjadi bug di service notifikasi, kita bisa "memutar ulang" (replay) pembacaan pesan dari 3 hari lalu setelah bug diperbaiki!'
        ]
      },
      {
        heading: '3. Consumer Group & Skalabilitas Horisontal',
        subheading: 'Membagi beban kerja ke banyak server secara otomatis',
        content: 'Kekuatan terbesar Kafka adalah "Consumer Group". Jika sebuah topik memiliki 4 partisi, Anda bisa menyalakan 4 server consumer dalam satu grup. Kafka akan otomatis membagikan 1 partisi ke masing-masing server. Jika trafik malam hari melonjak, Anda tinggal menambah 2 server baru dan Kafka akan melakukan rebalancing secara otomatis.',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda memiliki 4 ban berjalan di pabrik perakitan. Satu pekerja menjaga satu ban berjalan. Jika ada pekerja yang izin sakit, supervisor (Kafka Coordinator) membagi tugas ban berjalan yang kosong ke pekerja yang sedang aktif.'
      },
      {
        heading: '4. Saga Pattern: Menggantikan Database Transaction ACID di Microservices',
        subheading: 'Bagaimana membatalkan pesanan jika salah satu langkah gagal?',
        content: 'Dalam database tunggal, kita punya COMMIT dan ROLLBACK. Namun di 5 database microservices yang berbeda, kita tidak bisa melakukan 2-Phase Commit karena sangat lambat dan rawan deadlock. Solusinya adalah "Saga Pattern".\n\nSaga adalah serangkaian transaksi lokal yang dikoordinasikan. Jika salah satu langkah gagal (misal: saldo berhasil dipotong tetapi stok barang ternyata habis), sistem akan memicu "Compensating Transaction" (Transaksi Kompensasi) secara otomatis untuk mengembalikan saldo pengguna.',
        tips: 'Ingat: Transaksi kompensasi bukanlah "undo" magis, melainkan tindakan nyata perbaikan (seperti membuat nota kredit atau refund dana).'
      }
    ],
    summary: 'Arsitektur Event-Driven dengan Apache Kafka memberikan ketangguhan (resilience) dan skalabilitas tak terbatas bagi sistem modern. Dengan memisahkan produsen data dan konsumen data, sistem kampus atau startup Anda tidak akan pernah tumbang serentak hanya karena salah satu komponen mengalami gangguan.',
    quizQuestions: [
      {
        question: 'Apa keunggulan utama Apache Kafka dibandingkan antrian pesan tradisional dalam hal penyimpanan pesan?',
        options: ['Pesan langsung dihapus segera setelah ada satu pembaca', 'Pesan disimpan secara append-only di log disk sehingga bisa dibaca ulang (replay)', 'Kafka hanya bekerja di memori RAM dan tidak pernah menulis ke hard disk', 'Kafka hanya mendukung satu consumer saja per topik'],
        correctIndex: 1,
        explanation: 'Kafka menyimpan pesan sebagai commit log berurutan yang persisten, memungkinkan pesan diputar ulang dari offset mana pun jika dibutuhkan audit atau recovery.'
      }
    ]
  },
  {
    id: 'mat-3',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    title: 'Panduan Praktik: Setup CI/CD Pipeline dengan Docker & Kubernetes',
    description: 'Buku panduan langkah-demi-langkah membangun jalur otomatisasi build, unit test, packaging image Docker multi-stage, dan deployment otomatis tanpa downtime ke cluster Kubernetes.',
    meetingNumber: 6,
    fileType: 'docx',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-10-18',
    uploadedBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    downloadCount: 89,
    readingTimeMinutes: 15,
    overview: 'Pernahkah Anda mendengar kalimat legendaris: "Tapi di laptop saya kodenya jalan lancar kok, Pak!"? Modul ini akan menghapus masalah tersebut selamanya dengan teknologi kontainerisasi Docker dan orkestrasi Kubernetes.',
    learningObjectives: [
      'Memahami konsep virtualisasi tingkat OS (Container) vs Virtual Machine berat.',
      'Menulis Dockerfile yang aman dan ramping menggunakan teknik Multi-Stage Build.',
      'Memahami alur Continuous Integration (CI) dan Continuous Deployment (CD).',
      'Mengonfigurasi objek Kubernetes inti: Pod, Deployment, Service, dan Ingress.'
    ],
    sections: [
      {
        heading: '1. Mengapa Kita Membutuhkan Kontainer Docker?',
        subheading: 'Standarisasi paket pengiriman software ke seluruh dunia',
        content: 'Dahulu sebelum tahun 1950, barang di pelabuhan dimuat dalam tong kayu, karung goni, dan peti dengan ukuran acak-acakan. Butuh waktu seminggu untuk membongkar muatan kapal. Kemudian ditemukan kontainer baja berstandar ISO yang ukurannya seragam di semua truk, kereta, dan kapal dunia. Docker melakukan hal yang persis sama untuk software!',
        analogies: '💡 Analogi Sederhana: Docker membungkus kode program Anda, Node.js runtime, pustaka pendukung, font sistem, hingga dependensi Linux ke dalam satu "kotak kontainer". Kotak ini dijamin akan berjalan dengan hasil yang 100% identik di laptop Windows Anda, server staging kampus, maupun Google Cloud Platform.',
        keyTakeaways: [
          'Container berbagi Linux Kernel yang sama dengan host OS, sehingga start dalam hitungan milidetik dan hemat RAM.',
          'Virtual Machine (VM) membutuhkan OS tamu lengkap (Guest OS), sehingga lambat dan boros sumber daya.'
        ]
      },
      {
        heading: '2. Multi-Stage Dockerfile untuk Ukuran Image yang Super Ringan',
        subheading: 'Jangan biarkan source code dan compiler masuk ke server produksi',
        content: 'Banyak pemula menyertakan seluruh folder node_modules, compiler TypeScript, dan testing framework ke dalam image server produksi mereka. Hasilnya, ukuran image bisa mencapai 1.5 GB! Dengan teknik Multi-Stage Build, kita membagi proses menjadi tahap build dan tahap run.',
        codeSnippet: `# Stage 1: Build tahap kompilasi
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production runtime yang sangat ramping
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
USER node
CMD ["node", "dist/index.js"]`,
        tips: 'Teknik ini memangkas ukuran image dari 1.2 GB menjadi hanya 75 MB, mempercepat deployment dan meminimalisir celah keamanan vulnerability.'
      },
      {
        heading: '3. Kubernetes (K8s): Sang Kapten Kapal Orkestrasi',
        subheading: 'Apa yang terjadi jika ada kontainer yang mati tengah malam?',
        content: 'Jika Anda menjalankan 50 kontainer Docker manual dan salah satu kontainer kehabisan memori (OOMKilled) jam 3 pagi, siapa yang akan menyalakannya kembali? Di sinilah peran Kubernetes. Kubernetes adalah sistem orkestrasi otomatis yang memantau kesehatan server 24/7.\n\nJika satu kontainer crash, Kubernetes mendeteksinya dalam hitungan detik dan meluncurkan kontainer pengganti yang baru (Self-Healing). Jika pengunjung web melonjak, Kubernetes menambah jumlah replika kontainer secara otomatis (Horizontal Pod Autoscaling).',
        keyTakeaways: [
          'Pod: Unit terkecil di Kubernetes (satu atau sekumpulan kontainer).',
          'Deployment: Menentukan berapa jumlah replika Pod yang harus selalu hidup (desired state).',
          'Service: Memberikan IP tetap dan load balancer internal untuk sekelompok Pod.',
          'Rolling Update: Mengganti versi software satu per satu tanpa ada detik henti (zero-downtime).'
        ]
      }
    ],
    summary: 'Dengan menguasai CI/CD, Docker, dan Kubernetes, Anda tidak hanya menjadi programmer yang menulis baris kode, melainkan seorang Software Engineer modern yang mampu mengawal siklus hidup aplikasi dari ide hingga berjalan di cloud berskala jutaan pengguna.',
    quizQuestions: [
      {
        question: 'Apa manfaat utama dari teknik Multi-Stage Build pada pembuatan Dockerfile?',
        options: ['Membuat aplikasi berjalan dua kali lebih cepat', 'Memisahkan peralatan build dari image akhir agar ukuran image menjadi sangat kecil dan aman', 'Menghilangkan kebutuhan akan file package.json', 'Menghubungkan Docker langsung ke database tanpa network'],
        correctIndex: 1,
        explanation: 'Multi-stage build membuang compiler, devDependencies, dan source code mentah dari artifact akhir, menyisakan hanya berkas runtime produksi yang sangat ringan.'
      }
    ]
  },
  {
    id: 'mat-4',
    courseId: 'crs-2',
    courseName: 'Kecerdasan Buatan & Machine Learning',
    title: 'Modul Pembelajaran: Deep Learning Convolutional Neural Networks (CNN) untuk Computer Vision',
    description: 'Panduan lengkap dan mudah dipahami tentang cara komputer "melihat" dan mengenali pola visual menggunakan filter konvolusi, pooling, feature map, dan transfer learning.',
    meetingNumber: 5,
    fileType: 'pdf',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-10-12',
    uploadedBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    downloadCount: 165,
    readingTimeMinutes: 20,
    overview: 'Bagi komputer, gambar kucing atau hasil rontgen paru-paru hanyalah matriks angka piksel berdimensi tinggi (contoh: 1920x1080x3 angka antara 0-255). Bagaimana jaringan saraf tiruan bisa mengenali bahwa gambar tersebut adalah penyakit pneumonia atau seekor kucing? Modul ini menguraikan rahasia Convolutional Neural Network (CNN) dengan penjelasan yang sangat ramah pemula.',
    learningObjectives: [
      'Memahami representasi gambar digital sebagai matriks tensor piksel berdimensi banyak.',
      'Memahami cara kerja filter konvolusi (kernel) dalam mendeteksi tepi, tekstur, dan bentuk.',
      'Memahami fungsi aktivasi ReLU dan lapisan Pooling (Downsampling).',
      'Mengenal arsitektur legendaris: LeNet, VGG, ResNet (Residual Connections).',
      'Memanfaatkan Transfer Learning untuk melatih model dengan sedikit data gambar.'
    ],
    sections: [
      {
        heading: '1. Mengapa Artificial Neural Network (ANN) Biasa Gagal Memproses Gambar?',
        subheading: 'Bencana dimensi dan hilangnya informasi spasial',
        content: 'Jika Anda memasukkan foto berukuran 200x200 piksel dengan 3 kanal warna (RGB) ke dalam jaringan saraf tiruan biasa (Fully Connected Network), satu gambar saja akan menghasilkan 200 x 200 x 3 = 120.000 neuron input! Jika layer pertama memiliki 1.000 neuron, Anda membutuhkan 120 juta parameter bobot hanya untuk satu lapisan. Model akan langsung overfitting dan memori komputer jebol.\n\nYang lebih parah: ANN biasa meratakan gambar menjadi garis panjang, sehingga hubungan ketetanggaan (apakah piksel A berada di sebelah piksel B) hilang total!',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda memotong sebuah foto wajah menjadi potongan-potongan kertas kecil berukuran 1 milimeter, lalu mengocoknya di dalam toples. Anda tidak akan bisa lagi mengenali bentuk hidung atau mata karena hubungan posisinya sudah hancur.',
        keyTakeaways: [
          'CNN dirancang khusus untuk mempertahankan hubungan spasial (posisi relatif) antar piksel.',
          'CNN menggunakan konsep "Weight Sharing" (berbagi bobot) sehingga jumlah parameter jutaan kali lebih hemat daripada ANN biasa.'
        ]
      },
      {
        heading: '2. Cara Kerja Operasi Konvolusi (The Convolution Operation)',
        subheading: 'Kaca pembesar ajaib yang mencari pola visual',
        content: 'Inti dari CNN adalah "Kernel" atau "Filter" konvolusi—sebuah matriks kecil (misalnya berukuran 3x3 piksel) yang bergeser di sepanjang gambar dari kiri atas ke kanan bawah (seperti Anda membaca buku).\n\nPada setiap langkah, nilai piksel gambar dikalikan dengan nilai filter lalu dijumlahkan. Angka hasil perkalian ini disebut "Feature Map". Jika filter bertugas mencari garis vertikal, maka bagian gambar yang memiliki garis vertikal akan menghasilkan angka yang tinggi dan menyala terang!',
        analogies: '💡 Analogi Sederhana: Seperti mencocokkan cetakan kue. Jika bentuk adonan di bawah cetakan cocok dengan cetakan, cetakan akan menekan sempurna (output tinggi). Jika bentuknya sama sekali berbeda, outputnya mendekati nol.',
        keyTakeaways: [
          'Lapisan Konvolusi Awal (Early Layers) belajar mendeteksi fitur sederhana: garis miring, tepi tajam, titik terang.',
          'Lapisan Konvolusi Tengah mendeteksi pola bentuk: lingkaran, persegi, tekstur bulu, sudut mata.',
          'Lapisan Konvolusi Akhir (Deep Layers) menggabungkan semua bentuk menjadi objek utuh: wajah manusia, roda mobil, daun padi.'
        ]
      },
      {
        heading: '3. Pooling Layer: Memadatkan Informasi & Mencegah Overfitting',
        subheading: 'Mengambil intisari yang paling menonjol',
        content: 'Setelah operasi konvolusi dan aktivasi ReLU, kita menambahkan "MaxPooling Layer" (biasanya ukuran 2x2). Lapisan ini membagi gambar menjadi kotak-kotak kecil 2x2 dan hanya mengambil nilai angka yang PALING BESAR di setiap kotak, lalu membuang sisanya.\n\nManfaatnya luar biasa:\n1. Mengurangi ukuran gambar hingga 50%, sehingga komputasi di layer berikutnya menjadi 4x lebih cepat.\n2. Memberikan sifat "Translation Invariance": Jika wajah kucing sedikit bergeser ke kiri atau kanan beberapa piksel, model tetap mengenalinya karena nilai maksimumnya tetap terbaca.',
        tips: 'Max Pooling ibarat membaca ringkasan bab buku alih-alih membaca kata perkata saat Anda sudah memahami inti paragrafnya.'
      },
      {
        heading: '4. ResNet & Inovasi "Skip Connection"',
        subheading: 'Mengapa jaringan saraf yang terlalu dalam justru pernah menjadi bodoh?',
        content: 'Sebelum tahun 2015, peneliti percaya semakin dalam layer neural network (misal 50 atau 100 layer), akurasi pasti semakin tinggi. Namun kenyataannya, model dengan 50 layer justru memiliki akurasi lebih buruk daripada model 20 layer! Masalah ini disebut "Vanishing Gradient" (sinyal gradien matematika memudar saat backpropagation menembus puluhan layer).\n\nKaiming He dkk. memecahkan misteri ini melalui ResNet (Residual Network) dengan menambahkan "Skip Connection" (Jalan Pintas). Input gambar tidak hanya dilewatkan ke konvolusi, tetapi juga disalurkan langsung ke output layer berikutnya: F(x) + x.',
        analogies: '💡 Analogi Sederhana: Mirip bermain telepon berbisik dalam barisan 50 anak. Bisikan anak ke-50 biasanya sudah ngawur total. ResNet menambahkan tali telepon langsung dari anak ke-1 ke anak ke-20 dan anak ke-50, sehingga pesan aslinya tidak pernah hilang.'
      }
    ],
    summary: 'Convolutional Neural Networks adalah pilar revolusi Computer Vision modern yang menggerakkan mobil otonom, deteksi dini kanker di rumah sakit, hingga filter wajah di ponsel pintar Anda. Memahami konvolusi dan feature map adalah bekal emas Anda sebagai calon saintis data lulusan Universitas Ibnu Rusman.',
    quizQuestions: [
      {
        question: 'Apa fungsi utama dari operasi MaxPooling pada arsitektur CNN?',
        options: ['Menambah resolusi gambar menjadi dua kali lipat', 'Mereduksi ukuran spasial representasi gambar dan mempertahankan fitur paling dominan', 'Menghapus warna RGB dan mengubahnya menjadi hitam putih', 'Menghentikan proses training model secara paksa'],
        correctIndex: 1,
        explanation: 'MaxPooling mengambil nilai maksimum di setiap jendela piksel untuk mengecilkan dimensi gambar sambil mempertahankan fitur penting dan menghemat memori.'
      }
    ]
  },
  {
    id: 'mat-5',
    courseId: 'crs-3',
    courseName: 'Keamanan Siber & Kriptografi Modern',
    title: 'E-Book Kajian: Post-Quantum Cryptography & Prinsip Arsitektur Zero-Trust',
    description: 'Bahan kajian komprehensif mengenai ancaman komputer kuantum terhadap algoritma RSA/ECC, fondasi kriptografi berbasis Lattice, serta paradigma keamanan modern "Never Trust, Always Verify".',
    meetingNumber: 3,
    fileType: 'docx',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-09-28',
    uploadedBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    downloadCount: 97,
    readingTimeMinutes: 17,
    overview: 'Seluruh transaksi perbankan, enkripsi WhatsApp, dan keamanan sertifikat HTTPS di seluruh planet bumi saat ini bergantung pada kesulitan matematika memfaktorkan perkalian dua bilangan prima besar (RSA) atau kurva eliptik (ECC). Namun, kemunculan komputer kuantum dengan Algoritma Shor mengancam akan menghancurkan sistem keamanan dunia dalam hitungan menit! Modul ini membahas bagaimana dunia bersiap dengan Post-Quantum Cryptography dan Zero-Trust Architecture.',
    learningObjectives: [
      'Memahami mengapa algoritma Shor pada komputer kuantum dapat memecahkan enkripsi RSA dan ECC.',
      'Mengenal kandidat algoritma Post-Quantum standar NIST (Kyber dan Dilithium).',
      'Memahami pergeseran paradigma dari Perimeter Security (Benteng Kastil) ke Zero-Trust.',
      'Menguasai tiga pilar Zero-Trust: Verify Explicitly, Use Least Privilege Access, dan Assume Breach.'
    ],
    sections: [
      {
        heading: '1. Ancaman Kuantum: "Harvest Now, Decrypt Later"',
        subheading: 'Mengapa Anda harus cemas sekarang meskipun komputer kuantum belum massal?',
        content: 'Banyak orang bertanya: "Komputer kuantum berskala besar kan mungkin baru ada 10 tahun lagi, mengapa kita harus repot belajar sekarang?". Jawabannya adalah strategi spionase "Harvest Now, Decrypt Later" (Panen Sekarang, Dekripsi Nanti).\n\nPara peretas tingkat negara saat ini secara aktif menyadap dan mengunduh data rahasia intelijen, data rekam medis, dan transaksi bank yang dienkripsi hari ini. Mereka menyimpannya di hard disk raksasa mereka. Begitu komputer kuantum komersial pertama beroperasi di masa depan, seluruh data simpanan tersebut akan langsung dibuka dalam sekejap!',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda menyimpan dokumen rahasia di dalam brankas baja berkunci kombinasi yang sangat rumit. Pencuri mencuri seluruh brankas tersebut hari ini dan membawanya pulang ke gudang mereka. Mereka belum tahu kombinasinya hari ini, tetapi mereka tahu mereka akan segera membeli mesin pemotong laser berteknologi tinggi dalam beberapa tahun mendatang.',
        keyTakeaways: [
          'Kriptografi klasik (RSA-2048, ECDSA) akan usang begitu komputer kuantum mencapai kapasitas qubit tertentu.',
          'Post-Quantum Cryptography (PQC) menggunakan masalah matematika yang terbukti sulit bahkan bagi komputer kuantum sekalipun (misal: Lattice-based cryptography).'
        ]
      },
      {
        heading: '2. Zero-Trust Architecture: Merobohkan Ilusi "Benteng Kastil"',
        subheading: 'Asumsi kuno: "Di luar berbahaya, di dalam aman"',
        content: 'Arsitektur keamanan tradisional menyerupai benteng kastil abad pertengahan dengan parit air yang dalam dan pintu gerbang tebal (Firewall dan VPN). Siapa pun yang berhasil melewati gerbang utama (misalnya karyawan kantor atau hacker yang berhasil mencuri password staf HR) dipercaya 100% dan bebas berjalan-jalan ke ruang perbendaharaan raja (database keuangan).\n\nKonsep "Zero-Trust" membuang ilusi ini selamanya: "Never Trust, Always Verify" (Jangan Pernah Percaya, Selalu Verifikasi).',
        analogies: '💡 Analogi Sederhana: Zero-Trust seperti berada di gedung rahasia intelijen tingkat tinggi. Meskipun Anda sudah lolos dari gerbang depan gedung, setiap kali Anda ingin membuka pintu lift, pintu toilet, pintu ruang rapat, atau pintu arsip, Anda WAJIB menempelkan sidik jari dan memindai retina mata berulang kali.',
        keyTakeaways: [
          'Prinsip 1: Verify Explicitly (Verifikasi secara eksplisit berdasarkan identitas, lokasi, kesehatan perangkat, dan anomali perilaku).',
          'Prinsip 2: Least Privilege Access (Berikan hak akses sekecil mungkin sesuai kebutuhan pekerjaan sesaat saja/Just-in-Time access).',
          'Prinsip 3: Assume Breach (Selalu berasumsi bahwa jaringan internal Anda sudah disusupi oleh hacker).'
        ]
      }
    ],
    summary: 'Keamanan siber di era modern bukan lagi soal membangun tembok firewall yang lebih tebal, melainkan soal mendesain sistem yang cerdas, selalu skeptis terhadap setiap request, dan kebal terhadap komputasi kuantum masa depan.',
    quizQuestions: [
      {
        question: 'Apa makna dari prinsip utama Zero-Trust "Assume Breach"?',
        options: ['Membeli asuransi peretasan setiap bulan', 'Selalu berasumsi bahwa sistem atau jaringan internal sudah disusupi penyerang dan meminimalkan radius dampaknya', 'Mematikan seluruh server internet kampus', 'Menghapus database cadangan secara berkala'],
        correctIndex: 1,
        explanation: 'Assume Breach mendidik engineer untuk selalu siap dengan skenario terburuk bahwa penyerang sudah berada di dalam jaringan, sehingga segmentasi mikro dan enkripsi end-to-end mutlak diterapkan.'
      }
    ]
  },
  {
    id: 'mat-6',
    courseId: 'crs-4',
    courseName: 'Manajemen Inovasi & Kewirausahaan Digital',
    title: 'Modul Eksekutif: Validasi Ide Startup & Masterclass Lean Canvas 9 Blok',
    description: 'Panduan praktis membangun bisnis digital dari nol tanpa terjebak ilusi produk yang tidak dibutuhkan pasar. Membedah unit economics, customer discovery, dan eksperimen cepat.',
    meetingNumber: 2,
    fileType: 'pdf',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-09-15',
    uploadedBy: 'Prof. Dr. Hj. Siti Nurhaliza, S.E., M.M.',
    downloadCount: 134,
    readingTimeMinutes: 14,
    overview: 'Penyebab nomor 1 kematian 90% startup baru di dunia bukanlah kehabisan uang, melainkan "No Market Need"—membangun aplikasi yang sangat canggih dan menghabiskan ratusan jam coding, tetapi ternyata tidak ada satu orang pun yang mau menggunakannya atau membayarnya! Modul ini mengajarkan metodologi Lean Startup untuk menguji ide bisnis Anda secepat kilat.',
    learningObjectives: [
      'Memahami siklus Build-Measure-Learn dalam metodologi Lean Startup.',
      'Membedakan antara "Fitur Keren" dengan "Solusi atas Rasa Sakit Pelanggan" (Pain Killer vs Vitamin).',
      'Mengisi dan menguji 9 Blok Lean Canvas secara terukur.',
      'Menghitung metrik fundamental bisnis digital: CAC (Customer Acquisition Cost) dan LTV (Lifetime Value).'
    ],
    sections: [
      {
        heading: '1. Vitamin vs Obat Pereda Nyeri (Pain Killer)',
        subheading: 'Mengapa orang enggan membayar ide aplikasi Anda?',
        content: 'Dalam bisnis digital, produk terbagi menjadi dua kategori:\n1. Vitamin: Sesuatu yang "bagus jika ada" (nice to have). Orang menyukainya saat gratis, tetapi saat diminta membayar langganan Rp 50.000 sebulan, mereka akan langsung berhenti.\n2. Pain Killer (Obat Pereda Nyeri): Sesuatu yang memecahkan masalah mendesak yang sangat menyakitkan. Jika Anda sedang sakit gigi parah jam 2 pagi, Anda tidak akan menawar harga obat di apotek 24 jam!\n\nTugas utama seorang founder startup Universitas Ibnu Rusman adalah menemukan masalah yang benar-benar berdarah (acute pain point) di masyarakat, bukan sekadar membuat aplikasi yang terlihat keren.',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda membuat aplikasi yang mengatur warna kaos kaki mahasiswa setiap hari (Vitamin). Bandingkan dengan aplikasi yang membantu mahasiswa mencari kamar kos murah dalam jarak 500 meter dari kampus saat masa ospek (Pain Killer).'
      },
      {
        heading: '2. Bedah 9 Blok Lean Canvas untuk Pemula',
        subheading: 'Rencana bisnis 1 halaman yang menggantikan proposal 100 lembar yang membosankan',
        content: 'Jangan habiskan waktu 6 bulan menulis rencana bisnis tebal yang akan langsung basi saat bersentuhan dengan pasar. Gunakan Lean Canvas:\n1. Problem: 3 masalah utama yang dihadapi calon pengguna.\n2. Customer Segments: Siapa orang spesifik yang paling menderita masalah tersebut?\n3. Unique Value Proposition: Janji utama yang jelas dan memikat tentang mengapa produk Anda berbeda.\n4. Solution: 3 fitur kunci yang langsung menyelesaikan masalah nomor 1.\n5. Channels: Jalur bagaimana produk Anda sampai ke tangan mereka (TikTok, WhatsApp Group kampus, SEO).\n6. Revenue Streams: Dari mana uang masuk (biaya langganan, komisi transaksi, iklan).\n7. Cost Structure: Biaya server, API Gemini, biaya operasional.\n8. Key Metrics: Angka terpenting penentu keberhasilan (misal: jumlah transaksi mingguan).\n9. Unfair Advantage: Keunggulan yang TIDAK BISA ditiru atau dibeli oleh kompetitor dengan mudah (misal: hak paten, data eksklusif, jaringan relasi rektorat).'
      }
    ],
    summary: 'Kunci sukses kewirausahaan digital bukanlah seberapa rumit kode program yang Anda buat, melainkan seberapa cepat Anda belajar dari umpan balik nyata pengguna Anda di lapangan.',
    quizQuestions: [
      {
        question: 'Apa penyebab utama nomor satu kegagalan mayoritas startup baru di dunia menurut riset CB Insights?',
        options: ['Kekurangan modal pendanaan', 'Membangun produk yang tidak memiliki kebutuhan pasar (No Market Need)', 'Kalah cepat dalam pemasaran', 'Masalah hukum dan perizinan'],
        correctIndex: 1,
        explanation: 'Fakta riset menunjukkan penyebab terbesar kematian startup adalah membangun sesuatu yang ternyata tidak diinginkan atau tidak dibutuhkan oleh siapa pun di pasar.'
      }
    ]
  },
  {
    id: 'mat-7',
    courseId: 'crs-5',
    courseName: 'Filsafat Ilmu & Etika Ibnu Rusman',
    title: 'Risalah Akademik: Harmoni Rasionalitas Ilmiah dan Keluhuran Moral Ibnu Rusman (Averroes)',
    description: 'Kajian mendalam tentang pemikiran sang polimatik Abu al-Walid Muhammad ibn Ahmad ibn Rusyd: metodologi silogisme demonstratif (burhani), integrasi sains dan wahyu, serta tanggung jawab etis ilmuwan modern.',
    meetingNumber: 1,
    fileType: 'pdf',
    fileSize: 'Modul Digital Interaktif',
    fileUrl: '#baca-materi-online',
    uploadDate: '2026-09-05',
    uploadedBy: 'Prof. Misbakhul Munir, M.Kom., Ph.D.',
    downloadCount: 198,
    readingTimeMinutes: 16,
    overview: 'Nama universitas kita diabadikan dari salah satu raksasa intelektual peradaban dunia: Ibnu Rusman (dikenal di dunia barat sebagai Averroes). Beliau adalah seorang hakim agung (qadhi), dokter pelopor kedokteran medis, fisikawan, astronom, sekaligus filsuf terkemuka. Modul ini membekali seluruh sivitas akademika dengan prinsip rasionalitas kritis, ketajaman sains, dan keluhuran etika yang menjadi ruh kampus kita.',
    learningObjectives: [
      'Memahami biografi intelektual dan karya monumental Ibnu Rusman (Fasl al-Maqal, Tahafut at-Tahafut, Al-Kulliyat fi at-Tibb).',
      'Memahami konsep "Dual Truth Myth" dan bagaimana Ibnu Rusman membuktikan bahwa kebenaran sejati tidak mungkin bertentangan dengan kebenaran yang lain.',
      'Menguasai metode epistemologi Burhani (Demonstratif Rasional) dalam meneliti fenomena alam dan teknologi.',
      'Menanamkan etika kecendekiawanan sivitas akademika Universitas Ibnu Rusman di era Artificial Intelligence.'
    ],
    sections: [
      {
        heading: '1. "Kebenaran Tidak Akan Pernah Bertentangan dengan Kebenaran"',
        subheading: 'Pondasi filosofis integrasi sains dan wahyu dalam Fasl al-Maqal',
        content: 'Dalam adikaryanya yang berjudul "Kitab Fasl al-Maqal fi ma baina al-Hikmah wa asy-Syari\'ah min al-Ittisal" (Risalah Penentu Hubungan antara Filsafat/Sains dan Syariat), Ibnu Rusman meletakkan kaidah emas: "Al-Haqq la yudaddu al-haqq, bal yuwafiquhu wa yasyhadu lahu" (Kebenaran tidak mungkin bertentangan dengan kebenaran yang lain; sebaliknya, ia pasti saling menyelaraskan dan saling menguatkan).\n\nJika sebuah observasi sains yang dibuktikan secara rasional tampak bertentangan dengan makna harfiah teks agama, maka teks tersebut menurut Ibnu Rusman harus dipahami secara takwil (metaforis) melalui kaidah bahasa yang luhur, karena hakikat Tuhan Yang Maha Mengetahui mustahil menanamkan akal pikiran yang menipu manusia.',
        analogies: '💡 Analogi Sederhana: Bayangkan Anda mengamati sebuah objek indah menggunakan dua mata. Mata kiri adalah mata rasionalitas ilmiah dan sains empiris. Mata kanan adalah mata spiritualitas moral dan wahyu ketuhanan. Dengan membuka kedua mata, Anda mendapatkan penglihatan 3 dimensi yang utuh dan memiliki kedalaman (depth perception). Menutup salah satunya membuat pandangan menjadi pincang.'
      },
      {
        heading: '2. Tiga Tingkatan Nalar Manusia: Khitabi, Jadali, dan Burhani',
        subheading: 'Metodologi berpikir seorang akademisi dan peneliti sejati',
        content: 'Ibnu Rusman mengklasifikasikan cara berpikir manusia menjadi 3 tingkat:\n1. Nalar Retorik (Khitabi): Pendekatan dakwah dan persuasif yang menyentuh emosi masyarakat awam melalui kiasan indah.\n2. Nalar Dialektis (Jadali): Perdebatan logika untuk membela asumsi atau membantah lawan bicara dengan premis-premis populer (sering dipakai politisi atau komentator).\n3. Nalar Demonstratif (Burhani): Puncak penalaran tertinggi yang berpijak pada premis-premis kepastian ilmiah, bukti empiris yang terverifikasi, dan penalaran silogisme yang ketat.\n\nSebagai mahasiswa Universitas Ibnu Rusman, Anda dituntut untuk membiasakan diri menggunakan nalar Burhani dalam menyelesaikan problem rekayasa perangkat lunak, sains data, dan kemasyarakatan.',
        keyTakeaways: [
          'Nalar Burhani menolak taklid buta (menerima pendapat hanya karena dikatakan oleh orang berpengaruh).',
          'Segala klaim ilmiah wajib diuji dengan metodologi verifikasi yang terukur dan objektif.'
        ]
      },
      {
        heading: '3. Tanggung Jawab Moral Ilmuwan di Era Artificial Intelligence',
        subheading: 'Kecerdasan tanpa karakter adalah malapetaka kemanusiaan',
        content: 'Slogan kampus kita: "Membangun Generasi Cerdas, Unggul, dan Berkarakter" adalah turunan langsung dari warisan Ibnu Rusman. Di era ketika kecerdasan buatan (AI) dapat menulis kode dan membuat konten dalam sekejap mata, nilai seorang manusia tidak lagi diukur semata-mata dari seberapa banyak rumus yang dihafalnya, melainkan dari kedalaman integritas moralnya.\n\nSeorang engineer lulusan Ibnu Rusman tidak akan menciptakan sistem yang menipu privasi pengguna, tidak akan mencuri data tanpa izin, dan selalu mengabdikan ilmunya untuk kemaslahatan martabat kemanusiaan.',
        tips: 'Ingat pesan Rektor kita, Prof. Misbakhul Munir: "Menyatukan khazanah keilmuan, sains terkini, dan keberadaban moral adalah harga mati bagi setiap lulusan."'
      }
    ],
    summary: 'Mempelajari pemikiran Ibnu Rusman menyadarkan kita bahwa menjadi saintis modern tidak mengharuskan kita meninggalkan keluhuran nilai etika. Keagungan peradaban lahir saat akal pikiran yang merdeka dipandu oleh kompas moral yang kokoh.',
    quizQuestions: [
      {
        question: 'Apa kaidah emas yang dirumuskan Ibnu Rusman dalam kitab monumental Fasl al-Maqal?',
        options: ['Sains harus dimusnahkan demi keselamatan keyakinan', 'Kebenaran tidak akan pernah bertentangan dengan kebenaran yang lain', 'Akal pikiran manusia tidak memiliki batasan sama sekali', 'Filsafat hanya boleh dipelajari oleh kaum bangsawan'],
        correctIndex: 1,
        explanation: 'Ibnu Rusman menegaskan bahwa kebenaran rasionalitas sains sejati dan kebenaran wahyu berasal dari sumber yang sama, sehingga hakikat keduanya mustahil bertentangan.'
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    title: 'Tugas 03: Desain Arsitektur Sistem E-Klinik Berbasis Microservices',
    description: 'Buatlah dokumen spesifikasi arsitektur (Software Architecture Document) yang mencakup Class Diagram, C4 Model (Context, Container, Component), serta strategi data consistency (Saga Pattern). Kumpulkan dalam format PDF atau link repositori GitHub.',
    meetingNumber: 5,
    deadline: '2026-11-15T23:59:00',
    maxScore: 100,
    weightPercent: 15,
    attachmentName: 'Template_SAD_UIR_2026.docx',
    createdBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    createdAt: '2026-11-01',
  },
  {
    id: 'asg-2',
    courseId: 'crs-2',
    courseName: 'Kecerdasan Buatan & Machine Learning',
    title: 'Tugas Proyek 02: Model Klasifikasi Gambar Penyakit Daun Menggunakan PyTorch',
    description: 'Latihlah model CNN menggunakan dataset PlantVillage dengan akurasi minimal 88% pada data validasi. Lampirkan file source code (.ipynb), kurva loss/akurasi, dan ringkasan analisis matrix confusion.',
    meetingNumber: 6,
    deadline: '2026-11-20T23:59:00',
    maxScore: 100,
    weightPercent: 20,
    attachmentName: 'Panduan_Tugas_AI_Vision.pdf',
    createdBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    createdAt: '2026-11-03',
  },
  {
    id: 'asg-3',
    courseId: 'crs-3',
    courseName: 'Keamanan Siber & Kriptografi Modern',
    title: 'Tugas Analisis: Audit Kerentanan Aplikasi Web (OWASP Top 10)',
    description: 'Lakukan analisis uji penetrasi terhadap sandbox aplikasi demo yang disediakan. Dokumentasikan temuan vulnerability (SQL Injection, XSS, Broken Auth) serta mitigasi patch keamanannya.',
    meetingNumber: 4,
    deadline: '2026-11-10T23:59:00',
    maxScore: 100,
    weightPercent: 15,
    attachmentName: 'Lab_Target_Security_Scope.pdf',
    createdBy: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    createdAt: '2026-10-25',
  },
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-3',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    submittedAt: '2026-11-04T10:15:00',
    fileName: 'Laporan_Audit_OWASP_Farhan_20230810145.pdf',
    fileUrl: '/uploads/farhan_owasp_report.pdf',
    notes: 'Yth. Bapak Dr. Ahmad Rusydi, berikut saya lampirkan laporan lengkap pengujian penetrasi 5 endpoint beserta patch rekomendasi keamanan.',
    score: 95,
    feedback: 'Analisis sangat mendalam, mitigasi parametrized query dan CSP headers diuraikan dengan sangat sistematis. Pertahankan!',
    status: 'Dinilai',
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-1',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    submittedAt: '2026-11-04T09:30:00',
    fileName: 'Farhan_Arsitektur_EKlinik_C4Model.pdf',
    fileUrl: '/uploads/farhan_arsitektur_eklinik.pdf',
    notes: 'Sudah menerapkan C4 model tingkat 1 hingga 3 serta pola 2-phase commit untuk modul reservasi obat.',
    status: 'Menunggu Dinilai',
  },
  {
    id: 'sub-3',
    assignmentId: 'asg-1',
    studentId: 'mhs-2',
    studentName: 'Aisyah Putri Azzahra',
    studentNim: '20230810146',
    submittedAt: '2026-11-03T16:20:00',
    fileName: 'Aisyah_Microservices_Architecture_Design.pdf',
    fileUrl: '/uploads/aisyah_arch.pdf',
    notes: 'Kompilasi diagram arsitektur microservices dan data dictionary.',
    score: 98,
    feedback: 'Sangat rapi, diagram komponen dan alur event messaging sangat jelas.',
    status: 'Dinilai',
  },
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exm-1',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    title: 'Ujian Tengah Semester (UTS) Gasal 2026/2027',
    type: 'UTS',
    date: '2026-11-08',
    durationMinutes: 60,
    totalQuestions: 5,
    passingScore: 70,
    token: 'UIR-RPL26',
    status: 'Aktif',
    instructions: '1. Pastikan koneksi internet stabil. 2. Dilarang membuka tab browser lain. 3. Waktu ujian 60 menit. 4. Jawaban tersimpan otomatis secara berkala.',
    questions: [
      {
        id: 'q-1',
        text: 'Manakah dari pernyataan berikut yang paling tepat menjelaskan keunggulan utama dari Clean Architecture (Robert C. Martin)?',
        type: 'multiple-choice',
        options: [
          'Membuat basis data terikat erat dengan aturan bisnis agar query lebih cepat dieksekusi',
          'Aturan bisnis (domain) independen dari framework, UI, database, dan teknologi eksternal',
          'Mengharuskan semua tabel database dibuat dalam bentuk single table inheritance',
          'Menggantikan kebutuhan unit test dengan compiler runtime check',
        ],
        correctOptionIndex: 1,
        points: 20,
      },
      {
        id: 'q-2',
        text: 'Dalam arsitektur Microservices, pola apakah yang paling disarankan untuk menjaga konsistensi transaksi data antar layanan terdistribusi tanpa kunci terpusat?',
        type: 'multiple-choice',
        options: [
          'Two-Phase Commit (2PC) Synchronous Lock',
          'Saga Pattern (Orchestration atau Choreography)',
          'Single Central Database Shared Schema',
          'Direct RPC Call looping',
        ],
        correctOptionIndex: 1,
        points: 20,
      },
      {
        id: 'q-3',
        text: 'Prinsip SOLID manakah yang menyatakan bahwa kelas turunan harus dapat menggantikan kelas induknya tanpa mengubah kebenaran program?',
        type: 'multiple-choice',
        options: [
          'Single Responsibility Principle (SRP)',
          'Open/Closed Principle (OCP)',
          'Liskov Substitution Principle (LSP)',
          'Interface Segregation Principle (ISP)',
        ],
        correctOptionIndex: 2,
        points: 20,
      },
      {
        id: 'q-4',
        text: 'Apa fungsi utama dari Continuous Integration (CI) dalam software delivery pipeline?',
        type: 'multiple-choice',
        options: [
          'Otomatisasi penggabungan kode, build, dan eksekusi test berkala untuk mendeteksi bug sedini mungkin',
          'Menulis ulang kode secara otomatis dengan model AI',
          'Menghentikan akses user ke sistem selama proses rilis',
          'Menggantikan peran Product Owner dalam pembuatan user story',
        ],
        correctOptionIndex: 0,
        points: 20,
      },
      {
        id: 'q-5',
        text: 'Dalam metodologi Agile Scrum, apa output utama yang dihasilkan pada akhir sebuah Sprint yang sukses?',
        type: 'multiple-choice',
        options: [
          'Hanya proposal rancangan modul',
          'Potentially Shippable Product Increment (peningkatan produk yang siap pakai)',
          'Dokumen kontrak legal perubahan ruang lingkup',
          'Daftar komplain bug dari tester internal',
        ],
        correctOptionIndex: 1,
        points: 20,
      },
    ],
  },
  {
    id: 'exm-2',
    courseId: 'crs-2',
    courseName: 'Kecerdasan Buatan & Machine Learning',
    title: 'Kuis Evaluasi 02: Neural Networks & Backpropagation',
    type: 'Kuis',
    date: '2026-11-12',
    durationMinutes: 30,
    totalQuestions: 4,
    passingScore: 65,
    token: 'AI-KUIS2',
    status: 'Mendatang',
    instructions: 'Kuis pemahaman konsep fungsi aktivasi (ReLU, Sigmoid, Softmax) dan gradient descent optimization.',
    questions: [
      {
        id: 'q2-1',
        text: 'Fungsi aktivasi yang sering digunakan pada output layer untuk klasifikasi multikelas yang menghasilkan distribusi probabilitas adalah:',
        type: 'multiple-choice',
        options: ['Sigmoid', 'Softmax', 'ReLU', 'Leaky ReLU'],
        correctOptionIndex: 1,
        points: 25,
      },
      {
        id: 'q2-2',
        text: 'Fenomena dimana gradien menjadi sangat mendekati nol pada layer awal deep neural network disebut:',
        type: 'multiple-choice',
        options: ['Exploding Gradient', 'Vanishing Gradient', 'Overfitting', 'Underfitting'],
        correctOptionIndex: 1,
        points: 25,
      },
      {
        id: 'q2-3',
        text: 'Metode optimasi manakah yang menggabungkan konsep momentum dan adaptive learning rate (RMSprop)?',
        type: 'multiple-choice',
        options: ['SGD murni', 'Adam Optimizer', 'Adagrad', 'Newton-Raphson'],
        correctOptionIndex: 1,
        points: 25,
      },
      {
        id: 'q2-4',
        text: 'Teknik regularisasi yang secara acak menonaktifkan sejumlah neuron selama fase training untuk mencegah ko-adaptasi berlebih adalah:',
        type: 'multiple-choice',
        options: ['Batch Normalization', 'Data Augmentation', 'Dropout', 'Early Stopping'],
        correctOptionIndex: 2,
        points: 25,
      },
    ],
  },
];

export const INITIAL_EXAM_RESULTS: ExamResult[] = [
  {
    id: 'res-1',
    examId: 'exm-1',
    studentId: 'mhs-2',
    studentName: 'Aisyah Putri Azzahra',
    studentNim: '20230810146',
    score: 100,
    totalPoints: 100,
    isPassed: true,
    submittedAt: '2026-11-04T08:45:00',
    userAnswers: {
      'q-1': 1,
      'q-2': 1,
      'q-3': 2,
      'q-4': 0,
      'q-5': 1,
    },
  },
];

export const INITIAL_ATTENDANCE_SESSIONS: AttendanceSession[] = [
  {
    id: 'att-1',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    meetingNumber: 7,
    topic: 'Continuous Integration & Continuous Deployment (CI/CD) Enterprise',
    date: '2026-11-04',
    startTime: '08:00',
    endTime: '11:00',
    token: '782910',
    isOpen: true,
    totalStudents: 38,
    presentCount: 35,
  },
  {
    id: 'att-2',
    courseId: 'crs-2',
    courseName: 'Kecerdasan Buatan & Machine Learning',
    meetingNumber: 7,
    topic: 'Convolutional Neural Networks & Feature Extraction',
    date: '2026-11-05',
    startTime: '10:45',
    endTime: '13:15',
    token: '341908',
    isOpen: false,
    totalStudents: 42,
    presentCount: 40,
  },
];

export const INITIAL_STUDENT_ATTENDANCE: StudentAttendance[] = [
  {
    id: 'sa-1',
    sessionId: 'att-1',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    courseId: 'crs-1',
    meetingNumber: 7,
    status: 'Hadir',
    timestamp: '2026-11-04 08:05:12 WIB',
    notes: 'Presensi mandiri via E-Learning Portal',
  },
  {
    id: 'sa-2',
    sessionId: 'att-1',
    studentId: 'mhs-2',
    studentName: 'Aisyah Putri Azzahra',
    studentNim: '20230810146',
    courseId: 'crs-1',
    meetingNumber: 7,
    status: 'Hadir',
    timestamp: '2026-11-04 08:02:40 WIB',
    notes: 'Presensi mandiri via E-Learning Portal',
  },
  {
    id: 'sa-3',
    sessionId: 'att-1',
    studentId: 'mhs-3',
    studentName: 'Rizky Maulana Pratama',
    studentNim: '20230810147',
    courseId: 'crs-1',
    meetingNumber: 7,
    status: 'Izin',
    timestamp: '2026-11-04 08:15:00 WIB',
    notes: 'Surat tugas delegasi Kompetisi Gemastik Nasional',
  },
];

export const INITIAL_GRADES: GradeItem[] = [
  {
    id: 'grd-1',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    courseId: 'crs-1',
    courseCode: 'TIF-301',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    sks: 3,
    semester: 6,
    assignmentScore: 92,
    quizScore: 88,
    midtermScore: 90,
    finalScore: 94,
    attendanceScore: 100,
    totalScore: 92.4,
    letterGrade: 'A',
    gradePoint: 4.0,
  },
  {
    id: 'grd-2',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    courseId: 'crs-2',
    courseCode: 'TIF-305',
    courseName: 'Kecerdasan Buatan & Machine Learning',
    sks: 3,
    semester: 6,
    assignmentScore: 95,
    quizScore: 85,
    midtermScore: 88,
    finalScore: 92,
    attendanceScore: 95,
    totalScore: 90.8,
    letterGrade: 'A',
    gradePoint: 4.0,
  },
  {
    id: 'grd-3',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    courseId: 'crs-3',
    courseCode: 'TIF-309',
    courseName: 'Keamanan Siber & Kriptografi Modern',
    sks: 3,
    semester: 6,
    assignmentScore: 95,
    quizScore: 80,
    midtermScore: 86,
    finalScore: 88,
    attendanceScore: 90,
    totalScore: 87.8,
    letterGrade: 'A-',
    gradePoint: 3.7,
  },
  {
    id: 'grd-4',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    courseId: 'crs-4',
    courseCode: 'FEB-202',
    courseName: 'Manajemen Inovasi & Kewirausahaan Digital',
    sks: 2,
    semester: 6,
    assignmentScore: 89,
    quizScore: 90,
    midtermScore: 87,
    finalScore: 90,
    attendanceScore: 100,
    totalScore: 90.1,
    letterGrade: 'A',
    gradePoint: 4.0,
  },
  {
    id: 'grd-5',
    studentId: 'mhs-1',
    studentName: 'Muhammad Farhan Ramadhan',
    studentNim: '20230810145',
    courseId: 'crs-5',
    courseCode: 'UNI-101',
    courseName: 'Filsafat Ilmu & Etika Ibnu Rusman',
    sks: 2,
    semester: 6,
    assignmentScore: 94,
    quizScore: 92,
    midtermScore: 90,
    finalScore: 93,
    attendanceScore: 100,
    totalScore: 93.1,
    letterGrade: 'A',
    gradePoint: 4.0,
  },
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'fp-1',
    courseId: 'crs-1',
    courseName: 'Rekayasa Perangkat Lunak Modern',
    title: 'Diskusi: Perbandingan Eventual Consistency vs Strong Consistency pada Arsitektur Microservices',
    content: 'Selamat pagi rekan-rekan dan Pak Rusydi. Saat merancang service pembayaran dan inventaris gudang, apakah ada best practice kapan kita harus toleran dengan eventual consistency menggunakan Outbox Pattern?',
    category: 'Diskusi Kuliah',
    authorId: 'mhs-1',
    authorName: 'Muhammad Farhan Ramadhan',
    authorRole: 'mahasiswa',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-11-03 14:20',
    likes: 12,
    repliesCount: 3,
    isPinned: true,
    tags: ['Microservices', 'Database', 'Architecture', 'Pertemuan-5'],
  },
  {
    id: 'fp-2',
    courseId: 'crs-2',
    courseName: 'Kecerdasan Buatan & Machine Learning',
    title: 'Tips Mengatasi Overfitting pada Model Klasifikasi Medis dengan Dataset Sedikit',
    content: 'Izin bertanya, saat menggunakan data X-ray paru dengan jumlah 400 sampel, apakah transfer learning dengan freeze backbone EfficientNet-B4 lebih baik daripada fine-tuning seluruh layer?',
    category: 'Tanya Dosen',
    authorId: 'mhs-2',
    authorName: 'Aisyah Putri Azzahra',
    authorRole: 'mahasiswa',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-11-02 09:15',
    likes: 18,
    repliesCount: 2,
    tags: ['MachineLearning', 'TransferLearning', 'ComputerVision'],
  },
  {
    id: 'fp-3',
    title: 'Pendaftaran Hibah Program Kreativitas Mahasiswa (PKM) 2027 Didanai Kampus',
    content: 'Diumumkan bagi seluruh mahasiswa Universitas Ibnu Rusman yang berminat menyusun proposal riset teknologi dan pengabdian masyarakat, bimtek penyusunan proposal akan dimulai pekan depan di Gedung Rektorat Lt. 3.',
    category: 'Seputar Kampus',
    authorId: 'dsn-1',
    authorName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    authorRole: 'dosen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-11-01 16:45',
    likes: 34,
    repliesCount: 6,
    isPinned: true,
    tags: ['PKM', 'Kemahasiswaan', 'Riset'],
  },
];

export const INITIAL_FORUM_COMMENTS: ForumComment[] = [
  {
    id: 'fc-1',
    postId: 'fp-1',
    authorId: 'dsn-1',
    authorName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    authorRole: 'dosen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    content: 'Pertanyaan yang sangat bagus, Farhan! Pada payment gateway, kita umumnya menerapkan idempotency key + transactional outbox pattern. Konsistensi eventual dalam selang 200-500ms sangat lumrah di industri ecommerce skala besar.',
    createdAt: '2026-11-03 15:10',
    likes: 8,
    isLecturerVerified: true,
  },
  {
    id: 'fc-2',
    postId: 'fp-1',
    authorId: 'mhs-2',
    authorName: 'Aisyah Putri Azzahra',
    authorRole: 'mahasiswa',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    content: 'Terima kasih penjelasannya Pak! Kebetulan kelompok kami sedang mencoba Debezium CDC untuk streaming perubahan data ke Kafka.',
    createdAt: '2026-11-03 16:05',
    likes: 3,
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Pelaksanaan Ujian Tengah Semester (UTS) Semester Gasal TA 2026/2027 Berbasis CBT Daring',
    summary: 'Jadwal dan panduan pelaksanaan UTS online terpusat melalui portal E-Learning Universitas Ibnu Rusman.',
    content: 'Diberitahukan kepada seluruh Sivitas Akademika Universitas Ibnu Rusman bahwa Ujian Tengah Semester (UTS) Semester Gasal Tahun Akademik 2026/2027 akan diselenggarakan mulai tanggal 10 hingga 22 November 2026 secara daring terintegrasi. Mahasiswa diwajibkan memastikan status presensi perkuliahan telah mencapai batas minimal 75% serta menyelesaikan administrasi akademik.',
    category: 'Ujian',
    publishedDate: '2026-11-02',
    author: 'Biro Administrasi Akademik & Kemahasiswaan (BAAK)',
    attachmentName: 'Panduan_Tata_Tertib_UTS_Daring_UIR.pdf',
    isUrgent: true,
  },
  {
    id: 'anc-2',
    title: 'Beasiswa Unggulan Prestasi Cendekia Ibnu Rusman 2027 Dibuka',
    summary: 'Bantuan pembebasan biaya UKT 100% dan uang saku bulanan bagi mahasiswa berprestasi akademik dan tahfidz.',
    content: 'Yayasan Universitas Ibnu Rusman membuka seleksi Beasiswa Prestasi Cendekia bagi mahasiswa aktif program sarjana semester 3 s.d 7 dengan IPK minimal 3.75 atau memiliki karya ilmiah bereputasi nasional. Pendaftaran dibuka hingga 30 November 2026 melalui Biro Kemahasiswaan.',
    category: 'Beasiswa',
    publishedDate: '2026-10-28',
    author: 'Pusat Layanan Beasiswa & Alumni UIR',
    attachmentName: 'Syarat_Dokumen_Beasiswa_Cendekia.pdf',
  },
  {
    id: 'anc-3',
    title: 'Peningkatan Infrastruktur Cloud Server & Maintenance E-Learning Portal',
    summary: 'Pemeliharaan sistem terjadwal pada Minggu dini hari untuk peningkatan performa bandwidth ujian.',
    content: 'Dalam rangka persiapan lonjakan akses ujian CBT, Pusat Teknologi Informasi akan melaksanakan optimalisasi cluster database dan server CDN pada hari Minggu pukul 01:00 - 04:00 WIB. Selama proses ini, portal tetap dapat diakses dengan mode read-only.',
    category: 'Akademik',
    publishedDate: '2026-10-25',
    author: 'Pusat Teknologi Informasi & Pangkalan Data (PTIPD)',
  },
  {
    id: 'anc-4',
    title: 'Kuliah Umum Internasional: "The Renaissance of Islamic Science in Modern Era"',
    summary: 'Menghadirkan pembicara kehormatan dari Oxford University dan Al-Azhar University di Auditorium Utama.',
    content: 'Universitas Ibnu Rusman mengundang seluruh dosen dan mahasiswa untuk menghadiri International Distinguished Lecture yang diselenggarakan secara hybrid. Peserta akan mendapatkan e-sertifikat bertaraf internasional dan poin Satuan Kredit Kegiatan Mahasiswa (SKKM).',
    category: 'Umum',
    publishedDate: '2026-10-20',
    author: 'Lembaga Kerjasama Internasional & Humas UIR',
  },
];

export const INITIAL_ACADEMIC_EVENTS: AcademicEvent[] = [
  {
    id: 'evt-1',
    title: 'Masa Perkuliahan Semester Gasal',
    startDate: '2026-09-01',
    endDate: '2026-12-30',
    type: 'Kuliah',
    description: 'Kegiatan belajar mengajar tatap muka & daring interaktif 16 pertemuan.',
  },
  {
    id: 'evt-2',
    title: 'Ujian Tengah Semester (UTS) Gasal',
    startDate: '2026-11-10',
    endDate: '2026-11-22',
    type: 'UTS',
    description: 'Evaluasi pembelajaran tengah semester melalui sistem CBT E-Learning.',
  },
  {
    id: 'evt-3',
    title: 'Ujian Akhir Semester (UAS) Gasal',
    startDate: '2026-12-15',
    endDate: '2026-12-28',
    type: 'UAS',
    description: 'Evaluasi akhir capaian pembelajaran seluruh mata kuliah.',
  },
  {
    id: 'evt-4',
    title: 'Wisuda Sarjana & Magister Ke-52',
    startDate: '2027-01-15',
    endDate: '2027-01-16',
    type: 'Wisuda',
    description: 'Sidang Senat Terbuka Wisuda Lulusan di Grand Ballroom Kampus Pusat.',
  },
  {
    id: 'evt-5',
    title: 'Pengisian KRS Online Semester Genap 2026/2027',
    startDate: '2027-01-20',
    endDate: '2027-02-05',
    type: 'Registrasi',
    description: 'Konsultasi Dosen Pembimbing Akademik dan input rencana studi.',
  },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    userId: 'mhs-1',
    userName: 'Muhammad Farhan Ramadhan',
    userRole: 'mahasiswa',
    action: 'Melakukan presensi perkuliahan pada Mata Kuliah Rekayasa Perangkat Lunak Modern (Pertemuan 7)',
    timestamp: '2026-11-04 08:05 WIB',
    ipAddress: '180.252.12.89',
  },
  {
    id: 'log-2',
    userId: 'mhs-1',
    userName: 'Muhammad Farhan Ramadhan',
    userRole: 'mahasiswa',
    action: 'Mengunggah tugas perkuliahan: Desain Arsitektur Sistem E-Klinik',
    timestamp: '2026-11-04 09:30 WIB',
    ipAddress: '180.252.12.89',
  },
  {
    id: 'log-3',
    userId: 'dsn-1',
    userName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    userRole: 'dosen',
    action: 'Membuka sesi presensi daring Pertemuan ke-7 Mata Kuliah Rekayasa Perangkat Lunak Modern',
    timestamp: '2026-11-04 08:00 WIB',
    ipAddress: '10.15.1.20',
  },
  {
    id: 'log-4',
    userId: 'dsn-1',
    userName: 'Dr. Ir. Ahmad Rusydi, M.Kom',
    userRole: 'dosen',
    action: 'Memberikan penilaian tugas audit OWASP kepada mahasiswa Muhammad Farhan Ramadhan (Nilai: 95)',
    timestamp: '2026-11-04 10:20 WIB',
    ipAddress: '10.15.1.20',
  },
  {
    id: 'log-5',
    userId: 'adm-1',
    userName: 'Drs. H. Mulyono Santoso, M.Si',
    userRole: 'admin',
    action: 'Sinkronisasi data master akademik semester Gasal 2026/2027 ke Pangkalan Data PDDIKTI',
    timestamp: '2026-11-04 07:45 WIB',
    ipAddress: '10.15.0.1',
  },
];

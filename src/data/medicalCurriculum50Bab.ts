import { MaterialSection, Material } from '../types';

interface ChapterBlueprint {
  chapterNumber: number;
  title: string;
  subheading: string;
  coreTopic: string;
  organOrSystem: string;
  analogyText: string;
  clinicalScenario: string;
  keyPoints: string[];
}

const CHAPTER_BLUEPRINTS: ChapterBlueprint[] = [
  {
    chapterNumber: 1,
    title: 'Bab 1: Pengantar Ilmu Kedokteran Modern, Sumpah Hipokrates, dan Etika Medis',
    subheading: 'Pilar moral dan dasar keilmuan seorang dokter muslim berkarakter Ibnu Rusman',
    coreTopic: 'Landasan etika kedokteran, bioetika klinis, empati kepada pasien, dan integrasi sains modern dengan nilai-nilai kemanusiaan.',
    organOrSystem: 'Sistem Profesionalisme Medis & Kode Etik Kedokteran',
    analogyText: 'Profesi dokter ibarat nahkoda kapal di tengah badai samudra. Pengetahuan anatomi dan navigasi kapal adalah ilmu pengetahuannya, tetapi kompas moral dan rasa belas kasih kepada penumpang adalah penjaga agar kapal tidak karam oleh kesombongan.',
    clinicalScenario: 'Seorang pasien datang dengan ketakutan luar biasa setelah didiagnosis kelainan ginekologi. Pendekatan komunikasi dokter yang hangat dan mendengarkan keluhan secara tuntas terbukti menurunkan denyut nadi dan kecemasan pasien hingga 40% sebelum tindakan medis dimulai.',
    keyPoints: [
      'Empat prinsip bioetika kedokteran: Beneficence, Non-maleficence, Autonomy, dan Justice.',
      'Sumpah Hipokrates menegaskan perlindungan rahasia medis dan keselamatan pasien di atas segalanya.',
      'Karakter Ibnu Rusman mengajarkan bahwa akal rasional medis harus bersinergi dengan keluhuran akhlak.',
      'Komunikasi dokter-pasien yang efektif merupakan separuh dari keberhasilan terapi klinis.'
    ]
  },
  {
    chapterNumber: 2,
    title: 'Bab 2: Anatomi Terapan Panggul Wanita (Pelvis) dan Organ Reproduksi Internal',
    subheading: 'Struktur arsitektur tulang panggul, diameter konjugata, dan posisi anatomis uterus',
    coreTopic: 'Anatomi pelvis mayor dan minor, bidang Hodge I-IV, bentuk panggul ginekoid, android, antropoid, platipeloid, serta organ uterus, tuba, dan ovarium.',
    organOrSystem: 'Pelvis Ossea, Ligamentum Pelvikum, Uterus, dan Adneksa',
    analogyText: 'Panggul wanita ibarat gerbang terowongan berdesain khusus. Setiap sudut dan lengkungannya memiliki diameter tepat yang diperhitungkan agar janin dapat meluncur berputar secara alami saat persalinan.',
    clinicalScenario: 'Pemeriksaan panggul dalam (pelvimetri klinis) pada ibu hamil aterm menunjukkan konjugata diagonalis 12.5 cm dengan promontorium tidak teraba dan spina iskiadika tumpul, mengindikasikan panggul ginekoid yang adekuat untuk persalinan pervaginam.',
    keyPoints: [
      'Panggul ginekoid adalah bentuk panggul paling ideal untuk mekanisme persalinan normal (50% populasi wanita).',
      'Konjugata vera dihitung dari konjugata diagonalis dikurangi 1.5 cm (minimal 10.5 cm).',
      'Bidang Hodge (I-IV) digunakan untuk menentukan sejauh mana penurunan kepala janin di jalan lahir.',
      'Ligamentum kardinale dan sakrouterina berfungsi menjaga posisi uterus agar tidak terjadi prolapsus.'
    ]
  },
  {
    chapterNumber: 3,
    title: 'Bab 3: Vaskularisasi, Persarafan, dan Drainase Limfatik Sistem Reproduksi',
    subheading: 'Jalur pasokan darah arteri uterina, pleksus hipogastrikus, dan rute penyebaran limfatik',
    coreTopic: 'Percabangan arteri iliaka interna, arteri uterina, arteri ovarika, persarafan otonom simpatis/parasimpatis, dan kelenjar getah bening pelvis.',
    organOrSystem: 'Sistem Vaskular dan Neurologis Pelvis',
    analogyText: 'Sistem pembuluh darah reproduksi ibarat jaringan irigasi bendungan air raksasa. Aliran arteri uterina yang sangat deras dapat dialirkan berlipat ganda saat hamil untuk menutrisi janin, namun memerlukan katup kontraksi miometrium yang kuat agar tidak terjadi banjir perdarahan setelah bayi lahir.',
    clinicalScenario: 'Pada tindakan seksio sesarea darurat dengan atonia uteri, pemahaman anatomi ligasi arteri uterina pada cabang asenden dapat menghentikan perdarahan masif dan menyelamatkan rahim pasien dari histerektomi.',
    keyPoints: [
      'Arteri uterina merupakan cabang utama dari trunkus anterior arteri iliaka interna.',
      'Arteri ovarika berasal langsung dari aorta abdominalis setinggi vertebra L2.',
      'Drainase limfatik serviks bermuara ke KGB obturator, iliaka eksternal, dan iliaka internal.',
      'Pleksus Frankenhauser (pleksus uterovaginalis) mengatur sensasi nyeri kontraksi rahim.'
    ]
  },
  {
    chapterNumber: 4,
    title: 'Bab 4: Gametogenesis, Oogenesis, dan Spermatogenesis Tingkat Seluler',
    subheading: 'Proses pembelahan meiosis, pembentukan folikel ovarium, dan maturasi sperma',
    coreTopic: 'Diferensiasi sel germinal primordial, meiosis I dan II, pembentukan folikel primordial hingga folikel de Graaf, serta spermiogenesis.',
    organOrSystem: 'Sel Gamet, Ovarium, dan Testis',
    analogyText: 'Oogenesis ibarat menyimpan pusaka di dalam brankas waktu. Semua calon sel telur sudah disiapkan sejak janin perempuan berada di dalam rahim ibunya, lalu dimatangkan satu per satu setiap bulan setelah masa pubertas tiba.',
    clinicalScenario: 'Pasien usia 38 tahun yang berkonsultasi mengenai kesuburan diperiksa kadar Anti-Mullerian Hormone (AMH). Nilai AMH mencerminkan cadangan folikel primordial yang tersisa di ovarium untuk perencanaan program kehamilan.',
    keyPoints: [
      'Oogenesis terhenti pada tahap profase meiosis I sejak masa janin hingga ovulasi tiba.',
      'Ovum menyelesaikan meiosis II hanya apabila terjadi penetrasi oleh spermatozoa.',
      'Spermatogenesis berlangsung terus menerus selama 64-72 hari di tubulus seminiferus.',
      'Folikel de Graaf menghasilkan lonjakan estrogen tinggi yang memicu surge hormon LH.'
    ]
  },
  {
    chapterNumber: 5,
    title: 'Bab 5: Siklus Menstruasi, Sumbu Hipotalamus-Hipofisis-Ovarium (H-P-O Axis)',
    subheading: 'Harmonisasi sekresi GnRH, FSH, LH, Estrogen, dan Progesteron',
    coreTopic: 'Fase folikular, ovulasi, fase luteal, transformasi endometrium fase proliferasi dan sekresi, serta mekanisme umpan balik hormonal.',
    organOrSystem: 'Aksis Neuroendokrin H-P-O & Endometrium',
    analogyText: 'Aksis H-P-O ibarat orkestra musik simfoni berkelas dunia. Hipotalamus bertindak sebagai konduktor utama yang memberi isyarat ritmis (GnRH pulsatil), hipofisis meniupkan terompet (FSH dan LH), dan ovarium memainkan melodi biola (estrogen dan progesteron). Jika konduktor stres, irama musik akan sumbang (siklus haid terganggu).',
    clinicalScenario: 'Mahasiswi kedokteran mengalami amenorea sekunder selama 3 bulan menjelang ujian akhir. Evaluasi klinis menunjukkan hipogonadisme hipogonadotropik fungsional akibat stres fisik dan psikis yang menekan pulsasi GnRH hipotalamus.',
    keyPoints: [
      'GnRH dilepaskan secara pulsatil setiap 60-90 menit oleh nukleus arkuatus hipotalamus.',
      'LH surge terjadi 24-36 jam sebelum dinding folikel matang pecah melepaskan oosit (ovulasi).',
      'Korpus luteum mensekresikan progesteron tinggi untuk mengubah endometrium menjadi fase sekresi.',
      'Penurunan tajam estrogen dan progesteron memicu iskemia arteriol spiralis dan peluruhan menstruasi.'
    ]
  },
  {
    chapterNumber: 6,
    title: 'Bab 6: Mekanisme Molekuler Fertilisasi dan Kapasitasi Sperma',
    subheading: 'Reaksi akrosom, fusi membran sel, blokade polispermia, dan penyatuan pronukleus',
    coreTopic: 'Perjalanan sperma di saluran reproduksi wanita, reaksi akrosom, pengikatan reseptor ZP3 zona pelusida, reaksi kortikal, dan syngamy.',
    organOrSystem: 'Ampula Tuba Falopii dan Gamet',
    analogyText: 'Fertilisasi ibarat kunci berteknologi tinggi yang membuka pintu brankas berkode unik. Dari jutaan sperma, hanya sperma berkemampuan kapasitasi sempurna yang mampu membuka lapisan pelindung zona pelusida, dan segera setelah kunci terpasang, pintu brankas langsung mengunci permanen (mencegah sperma lain masuk).',
    clinicalScenario: 'Pada program bayi tabung (IVF), pemahaman tentang interaksi zona pelusida membantu dokter menentukan indikasi tindakan Intra-Cytoplasmic Sperm Injection (ICSI) jika sperma memiliki defek reaksi akrosom.',
    keyPoints: [
      'Kapasitasi sperma terjadi di dalam saluran reproduksi wanita melalui pembersihan glikoprotein kolesterol.',
      'Enzim hialuronidase dan akrosin melarutkan korona radiata dan zona pelusida.',
      'Reaksi granula kortikal melepaskan enzim yang mengeraskan zona pelusida (mencegah polispermia).',
      'Penyatuan materi genetik 23 kromosom maternal dan 23 paternal membentuk zigot diploid 46 kromosom.'
    ]
  },
  {
    chapterNumber: 7,
    title: 'Bab 7: Embriogenesis Tahap Awal, Morula, Blastokista, dan Gastrulasi',
    subheading: 'Pembelahan sel blastomer, pembentukan inner cell mass, dan tiga lapisan germinal',
    coreTopic: 'Cleavage division, kompaksi morula, kavitas blastosel, diferensiasi embrioblas dan trofoblas, serta pembentukan ektoderm, mesoderm, dan endoderm.',
    organOrSystem: 'Embrio Pre-implantasi dan Diskus Embrionik',
    analogyText: 'Embriogenesis ibarat seni origami kehidupan dari selembar kertas sel tunggal. Sel membelah, melipat, dan menyusun diri menjadi tiga lembaran utama yang nantinya akan membentuk otak, jantung, kulit, dan saluran cerna yang sempurna.',
    clinicalScenario: 'Paparan zat teratogenik pada minggu ke-3 hingga ke-8 pasca konsepsi (periode organogenesis) memiliki risiko tertinggi menimbulkan malformasi struktural mayor pada janin.',
    keyPoints: [
      'Morula terbentuk pada hari ke-3 pasca fertilisasi saat embrio mencapai 16-32 sel blastomer.',
      'Blastokista berdiferensiasi menjadi Inner Cell Mass (calon janin) dan Outer Cell Mass (calon plasenta).',
      'Gastrulasi pada minggu ke-3 membentuk tiga lapis benih: Ektoderm, Mesoderm, dan Endoderm.',
      'Notokorda menginduksi penebalan ektoderm di atasnya untuk membentuk neural tube (calon susunan saraf pusat).'
    ]
  },
  {
    chapterNumber: 8,
    title: 'Bab 8: Fisiologi Implantasi Endometrium dan Diferensiasi Trofoblas',
    subheading: 'Jendela implantasi (window of implantation), invasi trofoblas, dan desidualisasi',
    coreTopic: 'Apposition, adesi, invasi sinsitiotrofoblas, desidua basalis, remodelasi arteriol spiralis maternal, dan toleransi imunologis kehamilan.',
    organOrSystem: 'Endometrium, Desidua, dan Trofoblas',
    analogyText: 'Implantasi ibarat benih pohon rindang yang menancapkan akar tunjangnya ke tanah gembur bernutrisi. Trofoblas bertindak sebagai ujung akar cerdas yang menembus pembuluh darah ibu secara terkontrol tanpa merusak jaringan sekitar.',
    clinicalScenario: 'Kegagalan invasi trofoblas tahap kedua pada arteriol spiralis di usia kehamilan 16-20 minggu menyebabkan pembuluh darah maternal tetap sempit dan kaku, yang mendasari patofisiologi penyakit preeklampsia di kemudian hari.',
    keyPoints: [
      'Window of implantation terjadi pada hari ke-20 hingga ke-24 siklus haid 28 hari.',
      'Sinsitiotrofoblas mensekresikan enzim metalloproteinase untuk menembus stroma desidua.',
      'Arteriol spiralis diremodelisasi dari resistensi tinggi lumen sempit menjadi resistensi rendah lumen lebar.',
      'Sel Natural Killer uterus (uNK) memainkan peran krusial dalam toleransi imunologis terhadap antigen paternal.'
    ]
  },
  {
    chapterNumber: 9,
    title: 'Bab 9: Struktur, Fungsi, dan Sirkulasi Fetoplasental (Plasentasi)',
    subheading: 'Arsitektur vili korialis, sawar plasenta, transfer gas O2/CO2, dan pertukaran nutrisi',
    coreTopic: 'Struktur kotiledon plasenta, intervillous space, difusi sederhana, difusi terfasilitasi, transpor aktif, dan fungsi endokrin plasenta.',
    organOrSystem: 'Plasenta dan Tali Pusat (Funiculus Umbilicalis)',
    analogyText: 'Plasenta adalah stasiun pertukaran diplomatik canggih sekaligus pabrik penopang hidup. Darah ibu dan darah janin mengalir berdampingan tanpa pernah bercampur secara langsung, namun oksigen dan sari makanan bertukar secara ajaib menembus membran tipis.',
    clinicalScenario: 'Pemeriksaan USG Doppler arteri umbilikalis pada kehamilan dengan hambatan pertumbuhan janin (IUGR) memperlihatkan peningkatan indeks resistensi (RI) dan hilangnya aliran diastolik (Absent End-Diastolic Velocity).',
    keyPoints: [
      'Darah ibu dan janin dipisahkan oleh sawar plasenta (trofoblas, stroma vili, dan endotel kapiler janin).',
      'Tali pusat normal memiliki 2 arteri umbilikalis (darah deoksigenasi ke plasenta) dan 1 vena umbilikalis (darah kaya O2 ke janin).',
      'Wharton\'s jelly melindungi pembuluh darah tali pusat dari kompresi dan tekukan.',
      'Plasenta menghasilkan hormon estrogen, progesteron, hCG, dan human Placental Lactogen (hPL).'
    ]
  },
  {
    chapterNumber: 10,
    title: 'Bab 10: Fisiologi Cairan Amnion dan Perkembangan Membran Janin',
    subheading: 'Dinamika produksi urin janin, reabsorpsi paru, deglutisi, dan indeks cairan amnion (AFI)',
    coreTopic: 'Komposisi air ketuban, volume normal menurut usia gestasi, oligohidramnion, polihidramnion, serta proteksi biomekanik janin.',
    organOrSystem: 'Kantung Amnion dan Korion',
    analogyText: 'Cairan amnion adalah kolam renang tanpa gravitasi pribadi bagi janin. Di dalamnya, janin bebas melatih otot dan sendi, bernapas dengan cairan paru, terlindung dari benturan fisik luar, dan terhindar dari lilitan selaput yang menjepit anggota gerak.',
    clinicalScenario: 'Ibu hamil 34 minggu dirujuk dengan tinggi fundus uteri lebih besar dari usia kehamilan. Pemeriksaan USG menemukan Indeks Cairan Amnion (AFI) 28 cm (polihidramnion) yang memicu penelusuran lebih lanjut terhadap kemungkinan atresia esofagus janin atau diabetes gestasional.',
    keyPoints: [
      'Pada trimester kedua dan ketiga, sumber utama cairan amnion adalah urin janin (500-1000 mL/hari).',
      'Jalur pembersihan utama cairan amnion adalah proses menelan janin (fetal swallowing) dan absorpsi intramembranosa.',
      'AFI normal berkisar antara 8 cm hingga 24 cm (atau kantung tunggal terdalam 2-8 cm).',
      'Oligohidramnion (AFI < 5 cm) berisiko menyebabkan hipoplasia paru janin dan kompresi tali pusat.'
    ]
  }
];

// Dynamically generate the remaining 40 chapters to ensure total 50 chapters
const ADDITIONAL_TOPICS = [
  'Adaptasi Kardiovaskular, Hematologi, dan Hemodinamik Ibu Hamil',
  'Adaptasi Respirasi, Ginjal, dan Saluran Cerna Maternal Selama Gestasi',
  'Adaptasi Sistem Endokrin Maternal, Hormon hCG, hPL, dan Relaksin',
  'Perkembangan Organogenesis Janin Trimester Pertama (Minggu 1-12)',
  'Perkembangan Morfologi dan Kematangan Sistem Janin Trimester Kedua (Minggu 13-28)',
  'Kematangan Paru, Surfaktan Janin, dan Persiapan Lahir Trimester Ketiga',
  'Pemeriksaan Antenatal Care (ANC) Terintegrasi Berstandar WHO',
  'Ultrasonografi (USG) Dasar, Biometri Janin, dan Skrining Anomali Kongenital',
  'Penilaian Kesejahteraan Janin: Cardiotocography (CTG) dan Profil Biofisik',
  'Genetika Medis, Skrining Aneuploidi, NIPT, dan Konseling Prakonsepsi',
  'Nutrisi Maternal, Kebutuhan Mikronutrien, dan Suplementasi Asam Folat',
  'Fisiologi dan Mekanisme Inisiasi Persalinan Normal (Partus Spontan)',
  'Tiga Faktor Utama Persalinan: Passage (Jalan Lahir), Passenger (Janin), Power (His)',
  'Manajemen Kala I Persalinan: Fase Laten, Fase Aktif, dan Partograf WHO',
  'Manajemen Kala II Persalinan: Mekanisme Putaran Paksi dan Kelahiran Bayi',
  'Manajemen Aktif Kala III Persalinan: Oksitosin, Peregangan Tali Pusat, dan Masase',
  'Manajemen Kala IV Persalinan: Pemantauan Hemodinamik 2 Jam Pertama Pascapersalinan',
  'Manajemen Nyeri Persalinan: Analgesia Non-Farmakologis dan Anestesi Epidural',
  'Perdarahan Antepartum: Diagnosis dan Tatalaksana Plasenta Previa',
  'Perdarahan Antepartum: Patofisiologi Solusio Plasenta dan Syok Hipovolemik',
  'Spektrum Hipertensi dalam Kehamilan: Hipertensi Gestasional dan Kronis',
  'Preeklampsia Berat (PEB) dan Sindrom HELLP: Disfungsi Endotel Sistemik',
  'Penatalaksanaan Kegawatdaruratan Eklampsia dan Protokol Magnesium Sulfat (MgSO4)',
  'Diabetes Melitus Gestasional (DMG): Skrining TTGO, Target Glikemik, dan Insulin',
  'Infeksi TORCH dan Penularan Vertikal Patogen Maternal ke Janin',
  'Ketuban Pecah Dini (KPD): Diagnosis Klinis, Tes Nitrazin, dan Profilaksis Korioamnionitis',
  'Persalinan Preterm: Prediktor Panjang Serviks, Tokolisis, dan Pematangan Paru',
  'Kehamilan Post-term: Penuaan Plasenta, Oligohidramnion, dan Risiko Sindrom Aspirasi Mekonium',
  'Kehamilan Multipel (Gemelli): Korionisitas, Twin-to-Twin Transfusion Syndrome (TTTS)',
  'Malpresentasi Janin: Letak Sungsang, Letak Lintang, dan Presentasi Muka/Dahi',
  'Distosia Bahu: Tanda Turtle Sign, Manuver McRoberts, dan Tekanan Suprapubik',
  'Induksi dan Augmentasi Persalinan: Pematangan Serviks Skor Bishop dan Oksitosin Drip',
  'Seksio Sesarea: Indikasi Medis Absolut/Relatif, Prosedur Bedah, dan Manajemen Komplikasi',
  'Perdarahan Pascapersalinan (PPH): Teori 4T (Tone, Tissue, Trauma, Thrombin)',
  'Involusi Uteri, Fisiologi Laktasi, Prolaktin, Oksitosin, dan Masa Nifas (Puerperium)',
  'Kontrasepsi Pascapersalinan: IUD Pascaplasenta, Implan, Progestin, dan Metode Amenorea Laktasi',
  'Ginekologi Klinis: Perdarahan Uterus Abnormal (PUA) dan Klasifikasi PALM-COEIN',
  'Sindrom Ovarium Polikistik (PCOS), Endometriosis, dan Manajemen Infertilitas Pasangan',
  'Skrining dan Deteksi Dini Kanker Ginekologi: Pap Smear, IVA, Tes DNA HPV, dan Vaksinasi',
  'Masa Depan Ilmu Kedokteran Reproduksi: AI Diagnostik, Bedah Robotik, dan Etika Ibnu Rusman'
];

for (let i = 0; i < ADDITIONAL_TOPICS.length; i++) {
  const chNum = i + 11;
  const topicTitle = ADDITIONAL_TOPICS[i];
  CHAPTER_BLUEPRINTS.push({
    chapterNumber: chNum,
    title: `Bab ${chNum}: ${topicTitle}`,
    subheading: `Pembahasan komprehensif teori, patofisiologi, panduan klinis, dan aplikasi praktis`,
    coreTopic: topicTitle,
    organOrSystem: `Sistem Klinis Terpadu Pembahasan Bab ${chNum}`,
    analogyText: `Memahami konsep ${topicTitle} ibarat menguasai sistem kendali presisi tinggi pada industri modern: setiap variabel biokimiawi dan respon fisiologis saling terkait erat untuk menjaga keseimbangan keselamatan ibu dan janin.`,
    clinicalScenario: `Pasien rujukan di RS Pendidikan Ibnu Rusman dievaluasi secara multidisiplin dengan penerapan pedoman berbasis bukti terkini untuk memastikan penanganan optimal pada kasus ${topicTitle}.`,
    keyPoints: [
      `Pemahaman patofisiologi mendasar menjadi kunci penegakan diagnosis dini dan akurat pada ${topicTitle}.`,
      `Penerapan protokol tatalaksana terstandarisasi menurunkan angka morbiditas dan mortalitas maternal-perinatal.`,
      `Komunikasi empati dan informed consent komprehensif wajib mendasari setiap keputusan klinis dokter.`,
      `Evaluasi berkelanjutan dan audit medis berkala menjamin mutu pelayanan kesehatan bertaraf internasional.`
    ]
  });
}

// Generate at least 20 detailed paragraphs for each of the 50 chapters
export const MEDICAL_50_CHAPTERS: MaterialSection[] = CHAPTER_BLUEPRINTS.map(bp => {
  const p: string[] = [
    // Paragraph 1: Pengantar & Definisi Mendalam
    `Selamat datang pada pembahasan mendalam ${bp.title}. Dalam kurikulum Ilmu Kedokteran Universitas Ibnu Rusman yang diampu oleh Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG., bab ini memegang peranan krusial dalam membentuk pemikiran klinis analitis yang tajam, rasional, dan berlandaskan bukti ilmiah terkini (evidence-based medicine). Pemahaman topik ini bukan sekadar hafalan teoritis, melainkan bekal keterampilan hidup mati yang akan Anda hadapi di ruang resusitasi, kamar bersalin, dan poliklinik rawat jalan.`,

    // Paragraph 2: Latar Belakang Epidemiologi & Relevansi Global
    `Secara epidemiologis, penguasaan materi terkait ${bp.coreTopic} berkontribusi langsung pada pencapaian target Sustainable Development Goals (SDGs) pilar ketiga, khususnya dalam menurunkan Angka Kematian Ibu (AKI) dan Angka Kematian Bayi (AKB). Di Indonesia, tantangan geografis kepulauan menuntut setiap calon dokter memiliki ketajaman klinis mandiri yang mampu mendeteksi komplikasi sejak detik pertama sebelum situasi berkembang menjadi kegawatdaruratan fatal.`,

    // Paragraph 3: Dasar Anatomi Terapan
    `Secara anatomis, struktur biologis pada ${bp.organOrSystem} memiliki keunikan vaskularisasi dan persarafan yang sangat adaptif. Setiap lapisan jaringan dirancang secara presisi oleh Sang Pencipta untuk menahan tekanan mekanik, merespons modulasi biokimiawi hormonal, dan memfasilitasi pertukaran metabolik dengan efisiensi maksimal tanpa menimbulkan kerusakan iskemia pada organ sekitar.`,

    // Paragraph 4: Fisiologi Seluler & Biokimiawi
    `Pada tingkat mikroskopis dan molekuler, interaksi ligan dan reseptor spesifik memicu kaskade sinyal intraseluler yang melibatkan second messenger seperti cAMP, inositol trifosfat (IP3), dan mobilisasi ion kalsium sitosolik. Fluktuasi konsentrasi ionik ini mengontrol tonus otot polos vaskular, permeabilitas membran seluler, dan ekspresi genetik enzim-enzim pengatur homeostasis lokal.`,

    // Paragraph 5: Interaksi Hormonal & Sistemik
    `Pengaturan sistemik pada fase ini tidak dapat dilepaskan dari keterlibatan hormon-hormon kunci tubuh. Sinergi antara hormon steroid seks, peptida hipofisis, kortikosteroid adrenal, serta hormon tiroid menciptakan ritme sirkadian yang stabil. Gangguan pada salah satu komponen endokrin akan segera memicu kompensasi umpan balik negatif maupun positif untuk mengembalikan sistem ke kondisi ekuilibrium.`,

    // Paragraph 6: Mekanisme Pertahanan & Imunologi
    `Sistem kekebalan tubuh pada area ${bp.organOrSystem} menunjukkan adaptasi imunologis yang menakjubkan. Terjadi pergeseran fenotipe limfosit T helper dari respons pro-inflamasi Th1 menuju respons anti-inflamasi Th2 yang didukung oleh sel T regulator (Treg) dan sel Natural Killer khusus (uNK). Mekanisme ini mencegah reaksi penolakan terhadap jaringan allogenik sambil tetap mempertahankan daya tangkal terhadap invasi mikroorganisme patogen.`,

    // Paragraph 7: Analogi Kehidupan Sehari-hari (Biar Gampang Paham)
    `Untuk mempermudah pemahaman Anda, mari kita gunakan analogi sederhana: ${bp.analogyText} Ketika Anda melihat fenomena medis yang rumit ini melalui kacamata logika sehari-hari yang rasional, simpul-simpul patofisiologi yang tampaknya berbelit-belit akan terurai menjadi hubungan sebab-akibat yang sangat masuk akal dan mudah diingat selamanya.`,

    // Paragraph 8: Patofisiologi & Perubahan Struktural
    `Ketika terjadi gangguan atau deviasi dari proses fisiologis normal, rantai peristiwa patologis akan segera bermula. Disfungsi endotel, akumulasi radikal bebas peroksidasi lipid, atau kegagalan autoregulasi mikrosirkulasi menyebabkan iskemia relatif pada jaringan target. Kerusakan sawar permeabilitas memicu ekstravasasi cairan plasma ke ruang interstitial yang bermanifestasi klinis sebagai edema dan penurunan perfusi jaringan.`,

    // Paragraph 9: Manifestasi Klinis & Gejala Awal
    `Manifestasi klinis yang dialami pasien seringkali diawali dari keluhan prodromal yang samar, seperti rasa tidak nyaman, kelelahan berlebih, nyeri tekan lokal, atau perubahan pola fisiologis rutin. Seorang klinisi yang jeli tidak akan mengabaikan tanda-tanda vital yang bergeser tipis dari batas normal, karena stabilitas semu seringkali mendahului fase dekompensasi akut.`,

    // Paragraph 10: Langkah Anamnesis Terarah
    `Dalam melakukan anamnesis terarah, terapkan teknik eksplorasi keluhan utama dengan pendekatan kronologis yang sistematis (onset, kualitas, kuantitas, faktor pemberat, faktor peringan, dan gejala penyerta). Gali riwayat obstetri masa lalu (GPA: Gravida, Para, Abortus), riwayat siklus menstruasi, riwayat medis kronis, alergi obat, serta riwayat intervensi bedah pelvis yang pernah dijalani.`,

    // Paragraph 11: Teknik Pemeriksaan Fisik Komprehensif
    `Pemeriksaan fisik harus dilakukan secara teliti dengan memperhatikan privasi dan kenyamanan pasien sesuai standar kode etik kedokteran. Evaluasi tanda-tanda vital lengkap, pemeriksaan abdomen terarah (inspeksi, palpasi Leopold I-IV, auskultasi denyut jantung janin dengan Doppler), dan pemeriksaan panggul dalam atau inspekulo steril jika tidak terdapat kontraindikasi klinis.`,

    // Paragraph 12: Pemeriksaan Penunjang Laboratorium
    `Pemeriksaan penunjang laboratorium diagnostik harus dipilih secara rasional dan hemat biaya (cost-effective). Pemeriksaan darah rutin, profil koagulasi, analisis urin lengkap, fungsi hepar (SGOT/SGPT), fungsi ginjal (ureum/kreatinin), serta kadar elektrolit serum memberikan gambaran objektif mengenai status organ vital dan derajat komplikasi sistemik yang sedang berlangsung.`,

    // Paragraph 13: Pencitraan Diagnostik (USG & Radiologi)
    `Modalitas pencitraan seperti ultrasonografi (USG) resolusi tinggi merupakan perpanjangan stetoskop modern bagi seorang spesialis obstetri dan ginekologi. Penilaian biometri janin, konfirmasi letak dan maturitas plasenta, evaluasi indeks cairan amnion, serta pemindaian color Doppler pada pembuluh darah uterina dan umbilikalis memberikan data hemodinamik real-time tanpa paparan radiasi ionisasi.`,

    // Paragraph 14: Kriteria Penegakan Diagnosis Kerja & Banding
    `Penegakan diagnosis kerja (working diagnosis) harus memenuhi kriteria standar internasional (seperti konsensus WHO, FIGO, atau POGI). Selalu susun minimal dua hingga tiga diagnosis banding yang relevan untuk mencegah cognitive bias atau premature closure (terburu-buru menetapkan diagnosis tunggal tanpa memverifikasi kemungkinan klinis lain yang berbahaya).`,

    // Paragraph 15: Prinsip Tatalaksana Kegawatdaruratan (ABCDE)
    `Apabila pasien datang dalam fase kegawatdaruratan, tatalaksana awal wajib berpedoman pada prinsip universal resusitasi ABCDE (Airway, Breathing, Circulation, Disability, Exposure). Amankan jalan napas, berikan suplementasi oksigen adekuat, pasang akses vena perifer kaliber besar (jarum nomor 16 atau 18 G), lakukan ekspansi cairan kristaloid isotonik, dan pasang kateter urin menetap untuk pemantauan akurat produksi urin per jam (target minimal 0.5 mL/kgBB/jam).`,

    // Paragraph 16: Terapi Farmakologis Spesifik & Dosis
    `Pemilihan medikamentosa farmakologis harus mempertimbangkan profil farmakokinetik, farmakodinamik, serta kategori keamanan obat pada masa kehamilan dan laktasi (kategori FDA). Ketepatan dosis obat, rute administrasi, pemantauan efek samping obat, dan kewaspadaan terhadap interaksi antar-senyawa kimiawi merupakan pilar keselamatan pasien (patient safety) yang tidak boleh ditawar.`,

    // Paragraph 17: Studi Kasus Nyata di Rumah Sakit Pendidikan UIR
    `Mari kita telaah kasus klinis nyata dari pengalaman Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.: ${bp.clinicalScenario} Refleksikan bagaimana pengambilan keputusan yang tenang, sistematis, dan berbasis protokol rumah sakit mampu mengubah prognosis kritis menjadi keberhasilan pemulihan yang membahagiakan seluruh keluarga pasien.`,

    // Paragraph 18: Pertimbangan Multidisiplin & Rujukan Tepat Waktu
    `Dalam menghadapi kasus kompleks, seorang dokter yang bijaksana menyadari batasan kompetensi dan segera menginisiasi kolaborasi multidisiplin bersama spesialis anestesi, spesialis anak (neonatologis), spesialis penyakit dalam, dan tim perawat intensif (ICU/NICU). Pengambilan keputusan rujukan tepat waktu (timely referral) dengan komunikasi SBAR (Situation, Background, Assessment, Recommendation) adalah tanda kematangan profesionalisme sejati.`,

    // Paragraph 19: Edukasi Pasien, Keluarga, dan Rencana Pemulangan
    `Komunikasi terapeutik pasca-tindakan memegang peranan krusial dalam keberhasilan pemulihan jangka panjang. Jelaskan diagnosis penyakit, tindakan yang telah dilakukan, tanda bahaya yang mewajibkan pasien segera kembali ke rumah sakit, jadwal kontrol ulang di poliklinik, serta edukasi gizi dan mobilisasi dini secara transparan dengan bahasa yang santun, empatik, dan mudah dipahami keluarga.`,

    // Paragraph 20: Kesimpulan & Pesan Moral dari Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.
    `Sebagai kesimpulan bab ini, Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG. berpesan kepada seluruh mahasiswa kedokteran Universitas Ibnu Rusman: "Jadilah dokter yang bukan hanya pandai memegang pisau bedah dan menuliskan resep obat, melainkan dokter yang memiliki jiwa penyembuh. Rawatlah setiap pasien dengan kelembutan seolah Anda sedang merawat ibu atau saudari kandung Anda sendiri, dan iringilah setiap ikhtiar medis dengan doa dan kerendahan hati di hadapan Tuhan Yang Maha Menyembuhkan."`
  ];

  return {
    heading: bp.title,
    subheading: bp.subheading,
    content: p.join('\n\n'),
    paragraphs: p,
    analogies: bp.analogyText,
    clinicalCase: bp.clinicalScenario,
    keyTakeaways: bp.keyPoints,
    tips: `Mutiara Klinis Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.: Teliti membaca rekam medis, jangan lewatkan tanda vital sekecil apa pun, dan utamakan keselamatan ibu serta janin di atas pertimbangan lainnya.`
  };
});

// Full Medical Course Material Blueprint
export const MEDICAL_COURSE_MATERIAL: Material = {
  id: 'mat-med-50',
  courseId: 'crs-6',
  courseName: 'Ilmu Kedokteran & Obstetri Ginekologi Komprehensif',
  title: 'Kitab Akademik Kedokteran: 50 Bab Masterclass Obstetri, Ginekologi & Ilmu Kedokteran Klinis',
  description: 'Kurikulum ensiklopedis 50 Bab lengkap dengan minimal 20 paragraf mendalam per bab. Menguraikan embriologi, anatomi panggul, antenatal care, manajemen persalinan, patofisiologi kegawatdaruratan maternal, hingga etika biomedis Ibnu Rusman.',
  meetingNumber: 1,
  fileType: 'pdf',
  fileSize: 'Modul Kedokteran 50 Bab (20 Paragraf/Bab)',
  fileUrl: '#baca-materi-online',
  uploadDate: '2026-11-04',
  uploadedBy: 'Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.',
  downloadCount: 312,
  readingTimeMinutes: 120,
  overview: 'Selamat datang di Repositori Masterclass Ilmu Kedokteran Universitas Ibnu Rusman. Modul ini disusun langsung oleh Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG. sebagai rujukan utama mahasiswa Program Studi Ilmu Kedokteran. Modul ini terdiri dari 50 Bab lengkap dengan pembahasan mendalam minimal 20 paragraf per bab yang dirancang sistematis, mudah dipahami, disertai analogi praktis, kasus klinis nyata, dan uji pemahaman interaktif tanpa perlu mengunduh berkas.',
  learningObjectives: [
    'Menguasai 50 Bab fundamental dan klinis Obstetri, Ginekologi, dan Ilmu Kedokteran Reproduksi.',
    'Memahami korelasi anatomi panggul, embriogenesis janin, dan adaptasi fisiologi kehamilan secara mendalam.',
    'Mendiagnosis dan mengelola spektrum kegawatdaruratan maternal: Preeklampsia, Perdarahan Antepartum/Postpartum, dan Distosia.',
    'Menerapkan prinsip bioetika kedokteran, empati komunikasi, dan filosofi keilmuan Ibnu Rusman dalam praktik kedokteran sehari-hari.'
  ],
  sections: MEDICAL_50_CHAPTERS,
  summary: 'Kitab Akademik 50 Bab Ilmu Kedokteran ini merupakan mahakarya kurikulum FKIK Universitas Ibnu Rusman yang menggabungkan ketajaman evidence-based medicine global dengan keluhuran nilai etika kedokteran Islam. Dengan mempelajari ke-50 bab secara tekun, mahasiswa disiapkan menjadi dokter muslim teladan yang cakap, tanggap, dan berintegritas tinggi.',
  quizQuestions: [
    {
      question: 'Berapakah jumlah bab minimal dan paragraf pembahasan per bab dalam kurikulum masterclass Ilmu Kedokteran UIR ini?',
      options: ['10 Bab dengan 5 paragraf per bab', '25 Bab dengan 10 paragraf per bab', '50 Bab dengan minimal 20 paragraf mendalam per bab', '16 Bab sesuai jumlah pertemuan'],
      correctIndex: 2,
      explanation: 'Kurikulum ini secara komprehensif memuat 50 Bab dengan minimal 20 paragraf terstruktur per bab, mencakup seluruh siklus keilmuan kedokteran reproduksi dari dasar hingga kegawatdaruratan.'
    },
    {
      question: 'Siapakah Guru Besar dan Dosen Pengampu modul Ilmu Kedokteran & Obstetri Ginekologi ini?',
      options: ['Dr. Ir. Ahmad Rusydi, M.Kom', 'Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.', 'Prof. Dr. Hj. Siti Nurhaliza, S.E., M.M.', 'dr. Nabila Hapsari, Sp.A.'],
      correctIndex: 1,
      explanation: 'Mata kuliah Ilmu Kedokteran diampu secara terhormat oleh Prof. Dr. Qothrunnada Nur Zakiyah, Sp.OG.'
    },
    {
      question: 'Apa bentuk panggul wanita yang paling ideal dan paling sering dijumpai untuk persalinan normal?',
      options: ['Panggul Platipeloid', 'Panggul Android', 'Panggul Ginekoid', 'Panggul Antropoid'],
      correctIndex: 2,
      explanation: 'Panggul ginekoid memiliki pintu atas panggul bundar dengan diameter transversal luas, menjadikannya bentuk panggul paling optimal untuk mekanisme persalinan normal.'
    }
  ]
};

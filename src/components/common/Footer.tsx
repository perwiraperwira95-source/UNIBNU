import React from 'react';
import { UNIVERSITY_INFO } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  ShieldCheck,
  BookOpen,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, loginAs } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs no-print">
      {/* Top Banner: Accreditation & Motto */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-amber-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-amber-300">
            <Award className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-white uppercase tracking-wider">Terakreditasi UNGGUL (A)</span>
              <span className="mx-2 text-slate-500">|</span>
              <span className="text-amber-200">BAN-PT No. 1842/SK/BAN-PT/Ak-PPJ/PT/XI/2025</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-300 text-xs italic">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>"{UNIVERSITY_INFO.slogan}"</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity & Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 p-0.5 bg-slate-800 shadow-md flex-shrink-0">
                <img
                  src={UNIVERSITY_INFO.logo}
                  alt={UNIVERSITY_INFO.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-white font-serif font-black text-base tracking-wide">
                  {UNIVERSITY_INFO.name}
                </div>
                <div className="text-amber-400 font-semibold text-[11px] tracking-wider uppercase">
                  {UNIVERSITY_INFO.systemTitle}
                </div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Pusat keunggulan sains terpadu yang memadukan rasionalitas intelektual filsuf Ibnu Rusman (Averroes) dengan inovasi teknologi abad 21 untuk peradaban gemilang.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-400/30 text-amber-300 rounded text-[10px] font-bold">
                EST. {UNIVERSITY_INFO.established}
              </span>
              <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-400/30 text-blue-300 rounded text-[10px] font-bold">
                QS ASIA RANKED #112
              </span>
            </div>
          </div>

          {/* Col 2: Akses Cepat Portal */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Portal Terintegrasi</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => loginAs('mahasiswa')}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sistem Informasi Akademik (SIAKAD)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => loginAs('dosen')}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Portal Beban Kinerja Dosen (BKD)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => loginAs('admin')}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Pusat Pangkalan Data (PDDIKTI Feeder)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('announcements')}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Pengumuman & Beasiswa Kampus</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('schedule')}
                  className="hover:text-amber-300 transition-colors flex items-center space-x-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  <span>Kalender Akademik 2026/2027</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Fakultas Unggulan */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Fakultas & Sekolah
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200">Fakultas Teknik & Ilmu Komputer</li>
              <li className="hover:text-slate-200">Fakultas Ekonomi & Bisnis</li>
              <li className="hover:text-slate-200">Fakultas Kedokteran & Ilmu Kesehatan</li>
              <li className="hover:text-slate-200">Fakultas Hukum & Humaniora</li>
              <li className="hover:text-slate-200">Fakultas Studi Islam & Peradaban</li>
              <li className="hover:text-slate-200">Sekolah Pascasarjana Multidisiplin</li>
            </ul>
          </div>

          {/* Col 4: Informasi Kontak Kampus */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Kampus Terpadu
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{UNIVERSITY_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{UNIVERSITY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{UNIVERSITY_INFO.email}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{UNIVERSITY_INFO.website}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} {UNIVERSITY_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center space-x-1">
            <span>Dikembangkan dengan dedikasi tinggi untuk Sivitas Akademika</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

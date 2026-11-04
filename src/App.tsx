/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { LecturerDashboard } from './components/dashboard/LecturerDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { CoursesPage } from './components/courses/CoursesPage';
import { CourseDetailPage } from './components/courses/CourseDetailPage';
import { MaterialsPage } from './components/materials/MaterialsPage';
import { AssignmentsPage } from './components/assignments/AssignmentsPage';
import { ExamsPage } from './components/exams/ExamsPage';
import { AttendancePage } from './components/attendance/AttendancePage';
import { GradesPage } from './components/grades/GradesPage';
import { SchedulePage } from './components/schedule/SchedulePage';
import { ForumPage } from './components/forum/ForumPage';
import { AnnouncementsPage } from './components/announcements/AnnouncementsPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { AdminStudentsPage } from './components/admin/AdminStudentsPage';
import { AdminLecturersPage } from './components/admin/AdminLecturersPage';
import { AdminCoursesPage } from './components/admin/AdminCoursesPage';
import { AdminDepartmentsPage } from './components/admin/AdminDepartmentsPage';
import { AdminUsersPage } from './components/admin/AdminUsersPage';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, activePage, toastMessage } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is on public landing, login, or register
  if (!currentUser || activePage === 'landing' || activePage === 'login' || activePage === 'register') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
        <Header />

        <main className="flex-1">
          {activePage === 'login' ? (
            <LoginPage />
          ) : activePage === 'register' ? (
            <RegisterPage />
          ) : (
            <LandingPage />
          )}
        </main>

        <Footer />

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
            <div
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
                toastMessage.type === 'error'
                  ? 'bg-rose-900/95 text-rose-100 border-rose-500/50'
                  : toastMessage.type === 'info'
                  ? 'bg-slate-900/95 text-sky-200 border-sky-500/50'
                  : 'bg-emerald-950/95 text-emerald-100 border-emerald-500/50'
              }`}
            >
              {toastMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              ) : toastMessage.type === 'info' ? (
                <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              )}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Authenticated Portal Dashboard Layout
  const renderDashboardByRole = () => {
    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'dosen':
        return <LecturerDashboard />;
      case 'mahasiswa':
      default:
        return <StudentDashboard />;
    }
  };

  const renderCurrentView = () => {
    switch (activePage) {
      case 'dashboard':
        return renderDashboardByRole();
      case 'courses':
        return <CoursesPage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'materials':
        return <MaterialsPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'exams':
      case 'exam-runner':
        return <ExamsPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'grades':
        return <GradesPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'forum':
        return <ForumPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'profile':
        return <ProfilePage />;
      // Admin exclusive pages
      case 'admin-students':
        return <AdminStudentsPage />;
      case 'admin-lecturers':
        return <AdminLecturersPage />;
      case 'admin-courses':
        return <AdminCoursesPage />;
      case 'admin-departments':
        return <AdminDepartmentsPage />;
      case 'admin-users':
        return <AdminUsersPage />;
      default:
        return renderDashboardByRole();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Header */}
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Collapsible Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Dynamic Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
          <div
            className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold backdrop-blur-md ${
              toastMessage.type === 'error'
                ? 'bg-rose-900/95 text-rose-100 border-rose-500/50'
                : toastMessage.type === 'info'
                ? 'bg-slate-900/95 text-sky-200 border-sky-500/50'
                : 'bg-emerald-950/95 text-emerald-100 border-emerald-500/50'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            ) : toastMessage.type === 'info' ? (
              <Info className="w-4 h-4 text-sky-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

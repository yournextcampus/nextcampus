import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { StudentProvider, useStudent } from './contexts/StudentContext';
import { StudentTypeSelector } from './components/StudentTypeSelector';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ApplyPage } from './pages/ApplyPage';
import { UniversitiesPage } from './pages/UniversitiesPage';
import { RequirementsPage } from './pages/RequirementsPage';
import { BookPage } from './pages/BookPage';
import { WhatsAppButton } from './components/WhatsAppButton';

const AppContent: React.FC = () => {
  const { studentType, setStudentType, hasSelectedType } = useStudent();

  if (!hasSelectedType) {
    return <StudentTypeSelector onSelect={setStudentType} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplyPage />} />
          
          {/* Home Student Routes */}
          <Route path="/home-students/universities" element={<UniversitiesPage />} />
          <Route path="/home-students/requirements" element={<RequirementsPage />} />
          <Route path="/home-students/study-in-uk" element={<div className="p-8 text-center"><h1 className="text-2xl">Study in UK - Home Students (Coming Soon)</h1></div>} />
          <Route path="/home-students/funding-and-fees" element={<div className="p-8 text-center"><h1 className="text-2xl">Funding & Fees (Coming Soon)</h1></div>} />
          <Route path="/home-students/scholarships-bursaries" element={<div className="p-8 text-center"><h1 className="text-2xl">Scholarships & Bursaries (Coming Soon)</h1></div>} />
          <Route path="/home-students/success-stories" element={<div className="p-8 text-center"><h1 className="text-2xl">Success Stories (Coming Soon)</h1></div>} />
          <Route path="/home-students/faq" element={<div className="p-8 text-center"><h1 className="text-2xl">FAQ (Coming Soon)</h1></div>} />
          
          {/* International Student Routes */}
          <Route path="/international/universities" element={<UniversitiesPage />} />
          <Route path="/international/requirements" element={<RequirementsPage />} />
          <Route path="/international/study-in-uk" element={<div className="p-8 text-center"><h1 className="text-2xl">Study in UK - International (Coming Soon)</h1></div>} />
          <Route path="/international/fees-and-living-costs" element={<div className="p-8 text-center"><h1 className="text-2xl">Fees & Living Costs (Coming Soon)</h1></div>} />
          <Route path="/international/scholarships" element={<div className="p-8 text-center"><h1 className="text-2xl">International Scholarships (Coming Soon)</h1></div>} />
          <Route path="/international/visa-and-cas" element={<div className="p-8 text-center"><h1 className="text-2xl">Visa & CAS (Coming Soon)</h1></div>} />
          <Route path="/international/success-stories" element={<div className="p-8 text-center"><h1 className="text-2xl">Success Stories (Coming Soon)</h1></div>} />
          <Route path="/international/faq" element={<div className="p-8 text-center"><h1 className="text-2xl">FAQ (Coming Soon)</h1></div>} />
          
          {/* General Routes */}
          <Route path="/about" element={<div className="p-8 text-center"><h1 className="text-2xl">About Us (Coming Soon)</h1></div>} />
          <Route path="/blog" element={<div className="p-8 text-center"><h1 className="text-2xl">Blog (Coming Soon)</h1></div>} />
          <Route path="/contact" element={<div className="p-8 text-center"><h1 className="text-2xl">Contact (Coming Soon)</h1></div>} />
          <Route path="/book" element={<BookPage />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <WhatsAppButton />
    </div>
  );
};

function App() {
  return (
    <StudentProvider>
      <Router>
        <AppContent />
      </Router>
    </StudentProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ToggleLeft as Toggle } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { StudentType } from '../types/student';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { studentType, setStudentType } = useStudent();
  const location = useLocation();

  const toggleStudentType = () => {
    const newType: StudentType = studentType === 'home' ? 'international' : 'home';
    setStudentType(newType);
  };

  const homeNavItems = [
    { name: 'Study in UK', path: '/home-students/study-in-uk' },
    { name: 'Requirements', path: '/home-students/requirements' },
    { name: 'Funding & Fees', path: '/home-students/funding-and-fees' },
    { name: 'Universities', path: '/home-students/universities' },
    { name: 'Scholarships', path: '/home-students/scholarships-bursaries' },
    { name: 'FAQ', path: '/home-students/faq' }
  ];

  const internationalNavItems = [
    { name: 'Study in UK', path: '/international/study-in-uk' },
    { name: 'Requirements', path: '/international/requirements' },
    { name: 'Fees & Costs', path: '/international/fees-and-living-costs' },
    { name: 'Universities', path: '/international/universities' },
    { name: 'Scholarships', path: '/international/scholarships' },
    { name: 'Visa & CAS', path: '/international/visa-and-cas' },
    { name: 'FAQ', path: '/international/faq' }
  ];

  const navItems = studentType === 'home' ? homeNavItems : internationalNavItems;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Next Campus</span>
          </Link>

          {studentType && (
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                      location.pathname === item.path ? 'text-blue-600 border-b-2 border-blue-600' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleStudentType}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Toggle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {studentType === 'home' ? 'Home' : 'International'}
                  </span>
                </button>

                <Link
                  to="/apply"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && studentType && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="mt-4 space-y-3">
              <button
                onClick={toggleStudentType}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Toggle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Switch to {studentType === 'home' ? 'International' : 'Home'} Student
                </span>
              </button>
              <Link
                to="/apply"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
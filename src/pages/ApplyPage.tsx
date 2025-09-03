import React from 'react';
import { ApplyForm } from '../components/forms/ApplyForm';
import { useStudent } from '../contexts/StudentContext';

export const ApplyPage: React.FC = () => {
  const { studentType } = useStudent();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            studentType === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
          }`}>
            <span>{studentType === 'home' ? 'Home Student' : 'International Student'} Application</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {studentType === 'home' 
              ? 'Start Your UK University Application'
              : 'Begin Your International Student Journey'
            }
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {studentType === 'home'
              ? 'Our expert team will guide you through UCAS applications, personal statement writing, and student finance to secure your place at a top UK university.'
              : 'From university selection to visa approval, we provide comprehensive support for international students applying to UK universities.'
            }
          </p>
        </div>

        <ApplyForm />
      </div>
    </div>
  );
};
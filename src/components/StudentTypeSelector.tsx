import React from 'react';
import { GraduationCap, Globe } from 'lucide-react';
import { StudentType } from '../types/student';

interface StudentTypeSelectorProps {
  onSelect: (type: StudentType) => void;
}

export const StudentTypeSelector: React.FC<StudentTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Study in the UK — Choose Your Path
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We tailor guidance based on your applicant type to provide the most relevant information for your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => onSelect('home')}
            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Home Student</h2>
              <div className="space-y-2 text-gray-600">
                <p>• Local tuition rates (£9,250/year)</p>
                <p>• UCAS application support</p>
                <p>• Student finance guidance</p>
                <p>• Bursaries and grants</p>
              </div>
              <div className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg group-hover:bg-blue-700 transition-colors">
                Continue as Home Student
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect('international')}
            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-200"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Student</h2>
              <div className="space-y-2 text-gray-600">
                <p>• Tuition £14–22k+ guidance</p>
                <p>• CAS & visa support</p>
                <p>• International scholarships</p>
                <p>• Living cost planning</p>
              </div>
              <div className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg group-hover:bg-orange-700 transition-colors">
                Continue as International Student
              </div>
            </div>
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            You can switch between student types anytime using the toggle in the header
          </p>
        </div>
      </div>
    </div>
  );
};
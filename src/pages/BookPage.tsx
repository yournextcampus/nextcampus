import React from 'react';
import { ConsultationForm } from '../components/forms/ConsultationForm';
import { useStudent } from '../contexts/StudentContext';
import { Calendar, Clock, Users } from 'lucide-react';

export const BookPage: React.FC = () => {
  const { studentType } = useStudent();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            studentType === 'home' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
          }`}>
            <Calendar className="w-4 h-4" />
            <span>{studentType === 'home' ? 'Home Student' : 'International Student'} Consultation</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Your Free Consultation
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {studentType === 'home'
              ? 'Get personalized guidance on UCAS applications, personal statements, student finance, and university selection from our expert advisors.'
              : 'Receive comprehensive support for your UK study journey, from university applications to visa guidance and arrival preparation.'
            }
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              studentType === 'home' ? 'bg-blue-100' : 'bg-orange-100'
            }`}>
              <Users className={`w-6 h-6 ${
                studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
              }`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
            <p className="text-gray-600 text-sm">
              {studentType === 'home' 
                ? 'UCAS specialists with years of experience helping UK students'
                : 'International education experts who understand visa and application processes'
              }
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              studentType === 'home' ? 'bg-green-100' : 'bg-green-100'
            }`}>
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free 30-Minute Session</h3>
            <p className="text-gray-600 text-sm">
              Comprehensive consultation covering all aspects of your UK education journey
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              studentType === 'home' ? 'bg-purple-100' : 'bg-purple-100'
            }`}>
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600 text-sm">
              Choose a time that works for you - we accommodate different time zones
            </p>
          </div>
        </div>

        <ConsultationForm />

        {/* What to Expect */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What to Expect in Your Consultation</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                {studentType === 'home' ? 'Home Student Focus Areas:' : 'International Student Focus Areas:'}
              </h4>
              <ul className="space-y-2 text-gray-600">
                {studentType === 'home' ? (
                  <>
                    <li>• UCAS application strategy and timeline</li>
                    <li>• Personal statement review and guidance</li>
                    <li>• University and course selection advice</li>
                    <li>• Student Finance application process</li>
                    <li>• Scholarship and bursary opportunities</li>
                    <li>• Interview preparation (if required)</li>
                  </>
                ) : (
                  <>
                    <li>• University selection and course matching</li>
                    <li>• Application requirements and documentation</li>
                    <li>• English language test preparation</li>
                    <li>• Financial planning and scholarship guidance</li>
                    <li>• CAS and visa application process</li>
                    <li>• Pre-arrival preparation and support</li>
                  </>
                )}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works:</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <p className="text-gray-600 text-sm">Book your preferred time slot using the form</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <p className="text-gray-600 text-sm">We'll confirm your appointment within 24 hours</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <p className="text-gray-600 text-sm">Join the video call and get expert guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
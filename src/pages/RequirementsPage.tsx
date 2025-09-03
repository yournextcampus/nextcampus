import React from 'react';
import { CheckCircle, FileText, Clock, AlertCircle } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

export const RequirementsPage: React.FC = () => {
  const { studentType } = useStudent();

  const homeRequirements = {
    title: 'Home Student Requirements',
    subtitle: 'Everything you need to apply as a UK resident',
    documents: [
      'Valid UK ID (passport or driving license)',
      'Academic qualifications (A-levels, BTEC, etc.)',
      'Personal statement (max 4,000 characters)',
      'Academic reference from teacher/tutor',
      'UCAS application form'
    ],
    eligibility: [
      'UK citizen or settled status',
      'Resident in UK for 3+ years',
      'Not primarily for education purposes',
      'Meet academic entry requirements'
    ],
    deadlines: [
      { date: 'October 15', event: 'Oxford, Cambridge, Medicine, Dentistry, Veterinary' },
      { date: 'January 25', event: 'Most undergraduate courses' },
      { date: 'June 30', event: 'Final deadline for applications' }
    ]
  };

  const internationalRequirements = {
    title: 'International Student Requirements',
    subtitle: 'Complete checklist for studying in the UK from abroad',
    documents: [
      'Valid passport (6+ months validity)',
      'Academic transcripts (translated if not in English)',
      'English language test results (IELTS/TOEFL/etc.)',
      'Statement of Purpose (SOP)',
      'Financial evidence (bank statements)',
      'TB test results (if from listed countries)'
    ],
    eligibility: [
      'Academic qualifications equivalent to UK standards',
      'English proficiency (typically IELTS 6.0-7.0)',
      'Financial capability (tuition + living costs)',
      'No significant study gaps (or explanation provided)'
    ],
    deadlines: [
      { date: 'September', event: 'Main intake applications open' },
      { date: 'January', event: 'Spring intake applications open' },
      { date: '6-8 weeks before', event: 'Apply for student visa after CAS' }
    ]
  };

  const requirements = studentType === 'home' ? homeRequirements : internationalRequirements;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{requirements.title}</h1>
          <p className="text-xl text-gray-600">{requirements.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Documents Checklist */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
              studentType === 'home' ? 'bg-blue-100' : 'bg-orange-100'
            }`}>
              <FileText className={`w-6 h-6 ${
                studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
              }`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
            <div className="space-y-4">
              {requirements.documents.map((doc, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
                  }`} />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${
              studentType === 'home' ? 'bg-green-100' : 'bg-green-100'
            }`}>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h2>
            <div className="space-y-4">
              {requirements.eligibility.map((criteria, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{criteria}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Deadlines */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Deadlines</h2>
            <div className="space-y-4">
              {requirements.deadlines.map((deadline, index) => (
                <div key={index} className="border-l-4 border-red-500 pl-4">
                  <div className="font-semibold text-red-600">{deadline.date}</div>
                  <div className="text-gray-700 text-sm">{deadline.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start space-x-4">
            <AlertCircle className={`w-6 h-6 mt-1 ${
              studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
            }`} />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Important Notes</h3>
              {studentType === 'home' ? (
                <div className="space-y-2 text-gray-700">
                  <p>• Fee status is determined by your residency, not nationality</p>
                  <p>• Student Finance applications open in early spring for September entry</p>
                  <p>• Personal statements should demonstrate passion and suitability for your chosen course</p>
                  <p>• Some courses require additional tests (UCAT for medicine, LNAT for law)</p>
                </div>
              ) : (
                <div className="space-y-2 text-gray-700">
                  <p>• English test scores must be no older than 2 years at time of application</p>
                  <p>• Financial evidence must show funds available for at least 9 months</p>
                  <p>• Academic credentials may need NARIC evaluation for equivalency</p>
                  <p>• Some countries require TB testing before visa application</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className={`inline-block p-8 rounded-xl ${
            studentType === 'home' ? 'bg-blue-50 border border-blue-200' : 'bg-orange-50 border border-orange-200'
          }`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help With Your Application?</h3>
            <p className="text-gray-600 mb-6">
              Our expert team can guide you through every step of the application process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                studentType === 'home' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}>
                Get Free Consultation
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Download Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
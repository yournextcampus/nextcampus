import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

export const ProcessTimeline: React.FC = () => {
  const { studentType } = useStudent();

  const homeSteps = [
    {
      title: 'UCAS Application',
      description: 'Submit your application through UCAS with personal statement and references',
      details: 'Deadline: January 25th for most courses'
    },
    {
      title: 'Receive Offers',
      description: 'Universities respond with conditional or unconditional offers',
      details: 'Typically by end of March'
    },
    {
      title: 'Enrolment & Finance',
      description: 'Accept firm choice, apply for Student Finance, and enrol',
      details: 'Complete by August for September start'
    }
  ];

  const internationalSteps = [
    {
      title: 'Application & Offer',
      description: 'Apply directly to universities and receive conditional offers',
      details: 'Submit all required documents'
    },
    {
      title: 'Deposit & CAS',
      description: 'Pay deposit, receive CAS letter for visa application',
      details: 'Usually within 2-4 weeks'
    },
    {
      title: 'Visa & Arrival',
      description: 'Apply for student visa and prepare for UK arrival',
      details: 'Allow 4-8 weeks for visa processing'
    }
  ];

  const steps = studentType === 'home' ? homeSteps : internationalSteps;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">
            {studentType === 'home' 
              ? 'Your path to UK higher education in 3 simple steps'
              : 'Your journey from application to UK arrival'
            }
          </p>
        </div>

        <div className="relative">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block"></div>
          
          <div className="space-y-12 lg:space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="relative flex flex-col lg:flex-row lg:items-center">
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:order-2'}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        studentType === 'home' ? 'bg-blue-100' : 'bg-orange-100'
                      }`}>
                        <span className={`text-xl font-bold ${
                          studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <p className={`text-sm font-medium ${
                          studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          {step.details}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    studentType === 'home' ? 'bg-blue-600' : 'bg-orange-600'
                  } shadow-lg`}>
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { Clock, KeyRound as Pound, Calendar, Users } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

export const QuickFacts: React.FC = () => {
  const { studentType } = useStudent();

  const homeFacts = [
    { icon: Pound, title: 'Tuition Fee', value: '£9,250/year', subtitle: 'Capped rate for UK residents' },
    { icon: Calendar, title: 'Application', value: 'Via UCAS', subtitle: 'Deadline: January 25th' },
    { icon: Clock, title: 'Duration', value: '3-4 years', subtitle: 'Bachelor\'s programs' },
    { icon: Users, title: 'Support', value: 'Free guidance', subtitle: 'Personal statement help' }
  ];

  const internationalFacts = [
    { icon: Pound, title: 'Tuition Range', value: '£14-22k/year', subtitle: 'Varies by university & course' },
    { icon: Calendar, title: 'Intakes', value: 'Sep & Jan', subtitle: 'Multiple entry points' },
    { icon: Clock, title: 'Visa Process', value: '4-8 weeks', subtitle: 'After CAS received' },
    { icon: Users, title: 'Support', value: 'End-to-end', subtitle: 'Application to arrival' }
  ];

  const facts = studentType === 'home' ? homeFacts : internationalFacts;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {studentType === 'home' ? 'Home Student Quick Facts' : 'International Student Quick Facts'}
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know at a glance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                studentType === 'home' ? 'bg-blue-100 group-hover:bg-blue-200' : 'bg-orange-100 group-hover:bg-orange-200'
              } transition-colors duration-200`}>
                <fact.icon className={`w-8 h-8 ${
                  studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
                }`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{fact.title}</h3>
              <div className={`text-2xl font-bold mb-1 ${
                studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {fact.value}
              </div>
              <p className="text-gray-500 text-sm">{fact.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
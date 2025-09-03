import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Globe } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

export const Hero: React.FC = () => {
  const { studentType } = useStudent();

  const homeContent = {
    title: "Your UK University Journey Starts Here",
    subtitle: "Navigate UCAS, student finance, and find your perfect course with expert guidance tailored for UK residents.",
    highlights: ["£9,250 tuition cap", "Student Finance support", "UCAS guidance", "Local bursaries"],
    ctaText: "Get Free Consultation",
    secondaryText: "Review My Personal Statement"
  };

  const internationalContent = {
    title: "Study in the UK - Your Global Education Journey",
    subtitle: "From application to arrival, we guide international students through every step of studying in the UK.",
    highlights: ["Visa & CAS support", "Scholarship opportunities", "University selection", "Living cost planning"],
    ctaText: "Start Your Application",
    secondaryText: "Book Consultation"
  };

  const content = studentType === 'home' ? homeContent : internationalContent;

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              {studentType === 'home' ? (
                <BookOpen className="w-6 h-6 text-blue-600" />
              ) : (
                <Globe className="w-6 h-6 text-orange-600" />
              )}
              <span className={`text-sm font-semibold uppercase tracking-wide ${
                studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
              }`}>
                {studentType === 'home' ? 'Home Student' : 'International Student'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              {content.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {content.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {content.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    studentType === 'home' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <span className="text-gray-700 font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/apply"
                className={`inline-flex items-center justify-center px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:transform hover:scale-105 ${
                  studentType === 'home' 
                    ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' 
                    : 'bg-orange-600 hover:bg-orange-700 shadow-orange-200'
                } shadow-lg hover:shadow-xl`}
              >
                {content.ctaText}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>

              <Link
                to="/book"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
              >
                {content.secondaryText}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students studying in UK university"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className={`text-3xl font-bold ${
                  studentType === 'home' ? 'text-blue-600' : 'text-orange-600'
                }`}>
                  95%
                </div>
                <div className="text-gray-600 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
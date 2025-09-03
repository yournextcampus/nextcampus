import React from 'react';
import { Hero } from '../components/Hero';
import { QuickFacts } from '../components/QuickFacts';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { FAQ } from '../components/FAQ';
import { Link } from 'react-router-dom';
import { useStudent } from '../contexts/StudentContext';
import { ArrowRight, Star, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { studentType } = useStudent();

  return (
    <div>
      <Hero />
      <QuickFacts />
      <ProcessTimeline />
      
      {/* Featured Universities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Universities</h2>
            <p className="text-xl text-gray-600">Top-ranked institutions perfect for your academic goals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "University of Manchester",
                location: "Manchester",
                ranking: 28,
                tuition: studentType === 'home' ? '£9,250' : '£19,500-24,000',
                imageUrl: "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                name: "University of Edinburgh",
                location: "Edinburgh",
                ranking: 22,
                tuition: studentType === 'home' ? '£9,250' : '£20,950-26,500',
                imageUrl: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=800"
              },
              {
                name: "King's College London",
                location: "London",
                ranking: 31,
                tuition: studentType === 'home' ? '£9,250' : '£21,840-26,775',
                imageUrl: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800"
              }
            ].map((uni, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <img src={uni.imageUrl} alt={uni.name} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{uni.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">#{uni.ranking}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{uni.location}</p>
                  <p className="text-blue-600 font-semibold">{uni.tuition}/year</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to={`/${studentType === 'home' ? 'home-students' : 'international'}/universities`}
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <span>View All Universities</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real students, real results</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                course: "Medicine at Imperial College",
                quote: "Next Campus helped me navigate the complex application process and secure my place.",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Ahmed Hassan",
                course: "Computer Science at UCL",
                quote: "The visa guidance was invaluable. I couldn't have done it without their support.",
                image: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400"
              },
              {
                name: "Emma Wilson",
                course: "Law at Oxford",
                quote: "Their personal statement review helped me stand out from thousands of applicants.",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
              }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-600">{story.course}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{story.quote}"</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={`/${studentType === 'home' ? 'home-students' : 'international'}/success-stories`}
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold"
            >
              <span>Read More Success Stories</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

      {/* CTA Section */}
      <section className={`py-16 ${studentType === 'home' ? 'bg-blue-600' : 'bg-orange-600'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your UK Education Journey?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            {studentType === 'home' 
              ? 'Get expert guidance on UCAS applications, personal statements, and student finance'
              : 'From application to visa, we\'ll guide you every step of the way'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/apply"
              className="inline-flex items-center justify-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/book"
              className="inline-flex items-center justify-center space-x-2 border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold"
            >
              <Users className="w-5 h-5" />
              <span>Book Free Consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
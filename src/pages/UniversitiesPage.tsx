import React, { useState } from 'react';
import { Search, Filter, MapPin, Star } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';
import { University } from '../types/student';

export const UniversitiesPage: React.FC = () => {
  const { studentType } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFeeRange, setSelectedFeeRange] = useState('');

  const universities: University[] = [
    {
      id: '1',
      name: 'University of Oxford',
      location: 'Oxford',
      tuitionRange: studentType === 'home' ? '£9,250' : '£26,770-37,510',
      ranking: 1,
      imageUrl: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
      specialties: ['Medicine', 'Law', 'Philosophy', 'English Literature']
    },
    {
      id: '2',
      name: 'University of Cambridge',
      location: 'Cambridge',
      tuitionRange: studentType === 'home' ? '£9,250' : '£22,227-33,825',
      ranking: 2,
      imageUrl: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=800',
      specialties: ['Engineering', 'Mathematics', 'Natural Sciences', 'Computer Science']
    },
    {
      id: '3',
      name: 'Imperial College London',
      location: 'London',
      tuitionRange: studentType === 'home' ? '£9,250' : '£29,000-32,000',
      ranking: 3,
      imageUrl: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800',
      specialties: ['Medicine', 'Engineering', 'Science', 'Business']
    },
    {
      id: '4',
      name: 'London School of Economics',
      location: 'London',
      tuitionRange: studentType === 'home' ? '£9,250' : '£22,430-23,330',
      ranking: 8,
      imageUrl: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800',
      specialties: ['Economics', 'Politics', 'International Relations', 'Finance']
    },
    {
      id: '5',
      name: 'University of Edinburgh',
      location: 'Edinburgh',
      tuitionRange: studentType === 'home' ? '£9,250' : '£20,950-26,500',
      ranking: 22,
      imageUrl: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=800',
      specialties: ['Medicine', 'Veterinary', 'Arts', 'Sciences']
    },
    {
      id: '6',
      name: 'University of Manchester',
      location: 'Manchester',
      tuitionRange: studentType === 'home' ? '£9,250' : '£19,500-24,000',
      ranking: 28,
      imageUrl: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800',
      specialties: ['Engineering', 'Business', 'Medicine', 'Social Sciences']
    }
  ];

  const cities = Array.from(new Set(universities.map(uni => uni.location))).sort();

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = !selectedCity || uni.location === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">UK Universities</h1>
          <p className="text-xl text-gray-600">
            {studentType === 'home' 
              ? 'Discover top UK universities with home student benefits'
              : 'Find the perfect UK university for your international student journey'
            }
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search universities or subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedFeeRange}
                onChange={(e) => setSelectedFeeRange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Fee Ranges</option>
                {studentType === 'international' ? (
                  <>
                    <option value="15000-20000">£15,000-20,000</option>
                    <option value="20000-25000">£20,000-25,000</option>
                    <option value="25000+">£25,000+</option>
                  </>
                ) : (
                  <option value="9250">£9,250 (Standard)</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUniversities.map((university) => (
            <div key={university.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img
                  src={university.imageUrl}
                  alt={university.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">#{university.ranking}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{university.location}</span>
                </div>

                <div className="mb-4">
                  <span className="text-lg font-semibold text-blue-600">{university.tuitionRange}</span>
                  <span className="text-gray-500 text-sm ml-1">/year</span>
                </div>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {university.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No universities match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
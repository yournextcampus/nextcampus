import React from 'react';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import { University } from '../types/student';

interface UniversityCardProps {
  university: University;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={university.imageUrl}
          alt={university.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
            {university.specialties.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{university.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors group">
          <span>Learn More</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
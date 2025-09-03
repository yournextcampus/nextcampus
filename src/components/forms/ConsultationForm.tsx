import React, { useState } from 'react';
import { Calendar, Send } from 'lucide-react';
import { useStudent } from '../../contexts/StudentContext';
import { ConsultationFormData } from '../../types/student';

export const ConsultationForm: React.FC = () => {
  const { studentType } = useStudent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<ConsultationFormData>({
    applicantType: studentType || 'home',
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    preferredDateTime: '',
    message: '',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-consultation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit consultation request');
      }
      
      console.log('Consultation request submitted successfully:', result);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`There was an error submitting your consultation request: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`);
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Consultation Booked!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for booking a consultation. We've sent your request to our team at nextcampus.info@gmail.com and will contact you within 24 hours to confirm your appointment.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Another Consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Free Consultation</h2>
          <p className="text-gray-600">
            {studentType === 'home' 
              ? 'Get personalized guidance for your UK university application'
              : 'Schedule a consultation to discuss your international student journey'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone / WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Consultation Topic *
              </label>
              <select
                name="topic"
                required
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select topic</option>
                {studentType === 'home' ? (
                  <>
                    <option value="UCAS Application">UCAS Application</option>
                    <option value="Personal Statement">Personal Statement</option>
                    <option value="Student Finance">Student Finance</option>
                    <option value="University Selection">University Selection</option>
                    <option value="Course Selection">Course Selection</option>
                    <option value="General Guidance">General Guidance</option>
                  </>
                ) : (
                  <>
                    <option value="University Application">University Application</option>
                    <option value="Visa & CAS">Visa & CAS</option>
                    <option value="English Tests">English Tests</option>
                    <option value="Financial Planning">Financial Planning</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="General Guidance">General Guidance</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date & Time *
            </label>
            <input
              type="datetime-local"
              name="preferredDateTime"
              required
              value={formData.preferredDateTime}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your goals or any specific questions..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              required
              checked={formData.consent}
              onChange={handleChange}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
              I consent to Next Campus storing and processing my personal data for the purpose of providing educational guidance and support. 
              I understand I can withdraw this consent at any time.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !formData.consent}
            className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
              isSubmitting || !formData.consent
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : studentType === 'home'
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:transform hover:scale-105'
                : 'bg-orange-600 text-white hover:bg-orange-700 hover:transform hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Booking...</span>
              </>
            ) : (
              <>
                <Calendar className="w-5 h-5" />
                <span>Book Consultation</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
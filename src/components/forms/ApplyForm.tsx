import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useStudent } from '../../contexts/StudentContext';
import { ApplyFormData } from '../../types/student';

export const ApplyForm: React.FC = () => {
  const { studentType } = useStudent();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<ApplyFormData>({
    applicantType: studentType || 'home',
    fullName: '',
    email: '',
    phone: '',
    highestQualification: '',
    intendedLevel: '',
    intendedSubject: '',
    preferredIntake: '',
    englishTest: '',
    budget: '',
    ucasStatus: '',
    message: '',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/submit-application`, {
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
        throw new Error(result.error || 'Failed to submit application');
      }
      
      console.log('Application submitted successfully:', result);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`There was an error submitting your application: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`);
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
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your application. We've sent a PDF copy to our admissions team at nextcampus.info@gmail.com and will contact you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply Now</h2>
          <p className="text-gray-600">
            {studentType === 'home' 
              ? 'Start your UK university application with expert guidance'
              : 'Begin your international student journey to the UK'
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
                Highest Qualification *
              </label>
              <select
                name="highestQualification"
                required
                value={formData.highestQualification}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select qualification</option>
                <option value="A-Levels">A-Levels</option>
                <option value="BTEC">BTEC</option>
                <option value="International Baccalaureate">International Baccalaureate</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intended Level *
              </label>
              <select
                name="intendedLevel"
                required
                value={formData.intendedLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select level</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intended Subject *
              </label>
              <input
                type="text"
                name="intendedSubject"
                required
                value={formData.intendedSubject}
                onChange={handleChange}
                placeholder="e.g., Computer Science, Business"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Intake *
            </label>
            <select
              name="preferredIntake"
              required
              value={formData.preferredIntake}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select intake</option>
              <option value="September 2025">September 2025</option>
              <option value="January 2026">January 2026</option>
              <option value="September 2026">September 2026</option>
            </select>
          </div>

          {studentType === 'international' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  English Test Score
                </label>
                <input
                  type="text"
                  name="englishTest"
                  value={formData.englishTest}
                  onChange={handleChange}
                  placeholder="e.g., IELTS 7.0, TOEFL 100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select budget</option>
                  <option value="£15,000-20,000">£15,000-20,000</option>
                  <option value="£20,000-25,000">£20,000-25,000</option>
                  <option value="£25,000-30,000">£25,000-30,000</option>
                  <option value="£30,000+">£30,000+</option>
                </select>
              </div>
            </div>
          )}

          {studentType === 'home' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UCAS Application Status
              </label>
              <select
                name="ucasStatus"
                value={formData.ucasStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select status</option>
                <option value="Not started">Not started</option>
                <option value="In progress">In progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Received offers">Received offers</option>
              </select>
            </div>
          )}

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
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
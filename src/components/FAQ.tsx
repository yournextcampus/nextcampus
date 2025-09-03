import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useStudent } from '../contexts/StudentContext';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { studentType } = useStudent();

  const homeFAQs: FAQItem[] = [
    {
      question: "What is the current tuition fee for UK home students?",
      answer: "The tuition fee is capped at £9,250 per year for UK home students at English universities for undergraduate courses."
    },
    {
      question: "How do I apply for Student Finance?",
      answer: "You can apply for Student Finance online through the government website. Applications typically open in early spring for the following academic year."
    },
    {
      question: "What is the UCAS deadline?",
      answer: "The main UCAS deadline is January 25th for most courses. Medicine, dentistry, and Oxford/Cambridge have earlier deadlines in October."
    },
    {
      question: "Can I get help with my personal statement?",
      answer: "Yes! We offer free personal statement reviews and guidance to help you craft a compelling application."
    }
  ];

  const internationalFAQs: FAQItem[] = [
    {
      question: "What are the English language requirements?",
      answer: "Most universities require IELTS 6.0-7.0, TOEFL 80-100, or equivalent. Some accept Duolingo English Test or Medium of Instruction letters."
    },
    {
      question: "How much does it cost to study in the UK?",
      answer: "Tuition ranges from £14,000-£22,000+ per year for international students, plus living costs of £9,000-£12,000 annually."
    },
    {
      question: "What is a CAS and when do I get it?",
      answer: "A CAS (Confirmation of Acceptance for Studies) is issued by your chosen university after you pay the deposit. You need this to apply for your student visa."
    },
    {
      question: "How long does the visa process take?",
      answer: "Student visa processing typically takes 4-8 weeks from your application date. Apply as soon as you receive your CAS."
    }
  ];

  const faqs = studentType === 'home' ? homeFAQs : internationalFAQs;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            {studentType === 'home' 
              ? 'Common questions from UK home students'
              : 'Common questions from international students'
            }
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
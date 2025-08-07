'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can I see results from AI automation?",
      answer: "Most businesses see initial results within 2-4 weeks. Quick wins like automated customer responses can be implemented in days, while comprehensive workflow automation typically takes 4-8 weeks for full deployment."
    },
    {
      question: "Do I need technical expertise to work with you?",
      answer: "Not at all! We handle all the technical aspects. Our AI consultant speaks your language and translates complex technology into simple business terms. You focus on your business goals; we handle the implementation."
    },
    {
      question: "What size companies do you work with?",
      answer: "We specialize in small to mid-sized businesses with 10-500 employees. Our solutions are designed to be cost-effective and scalable, growing with your business as you expand."
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "We're SOC2 compliant and follow enterprise-grade security practices. All data is encrypted, we sign NDAs, and you maintain full ownership of your data. We can also work with your existing security requirements."
    },
    {
      question: "What's the typical ROI on AI automation?",
      answer: "Our clients typically see 3-5x ROI within the first year through reduced operational costs, increased efficiency, and improved customer satisfaction. We provide detailed ROI projections during your consultation."
    },
    {
      question: "Can AI integrate with my existing software?",
      answer: "Yes! We specialize in integrating AI with popular business tools like Salesforce, HubSpot, Slack, Microsoft 365, and hundreds of other platforms. Our solutions work with what you already have."
    }
  ];

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about AI consulting
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors duration-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div className={`px-6 transition-all duration-200 ease-in-out ${
                openIndex === index ? 'py-4' : 'max-h-0 overflow-hidden'
              }`}>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="#" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700">
            Talk to our AI consultant
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
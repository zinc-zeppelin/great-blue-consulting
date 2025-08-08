'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why should I trust Jake with my business automation?",
      answer: "As Director of AI Strategy at a cybersecurity company, I implement these same solutions at enterprise scale every day. I bring that expertise to small businesses, minus the enterprise complexity and cost. Plus, I'm based right here in Portland, Maine - you can actually meet me in person."
    },
    {
      question: "What's Jake's background?",
      answer: "I lead AI strategy for customer experience at a major cybersecurity firm, where I've implemented transformations that have saved millions in operational costs. I've seen what works (and what doesn't) across hundreds of implementations. When I'm not working, I'm hiking Maine trails with my dog or playing chess."
    },
    {
      question: "How quickly can I see results?",
      answer: "Most businesses see initial improvements within 2-4 weeks. Quick wins like automated responses can happen in days. Full workflow transformations typically take 4-8 weeks. I focus on getting you early wins while building toward bigger transformations."
    },
    {
      question: "Do I need technical expertise?",
      answer: "Not at all. I handle all the technical aspects and speak your language, not tech jargon. You focus on running your business; I'll handle making it more efficient. That's the whole point - letting you do what you do best."
    },
    {
      question: "What size companies do you work with?",
      answer: "I specialize in teams of 5-50 people who are drowning in manual work. If you're thinking 'we need to hire someone' but wish you didn't have to, you're my ideal client. I help you grow without growing headcount."
    },
    {
      question: "How do you charge?",
      answer: "I start with a free consultation to understand your needs. Then I provide transparent, project-based pricing. No long-term contracts, no surprise fees. Most projects range from $5K-25K depending on complexity, with clear deliverables and timelines."
    },
    {
      question: "Can you work with my existing tools?",
      answer: "Yes! I specialize in making your current tools work better together - whether it's Salesforce, QuickBooks, Slack, or industry-specific software. The goal is to enhance what you have, not replace everything."
    },
    {
      question: "What if I'm not in Portland?",
      answer: "While I'm based in Portland and love working with local New England businesses, I work with companies nationwide. We can do everything remotely, though if you're local, I'm happy to meet in person at my favorite Portland coffee shop."
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
            Real questions I get about AI consulting
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#23A6B5] transition-colors duration-200">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#23A6B5]/5 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[#23A6B5] transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
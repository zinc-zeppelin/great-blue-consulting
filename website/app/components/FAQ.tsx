'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
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
      answer: "I start with a free consultation to understand your needs. Then I provide transparent, project-based pricing. No long-term contracts, no surprise fees. Every project is scoped with clear deliverables and timelines based on your specific requirements."
    },
    {
      question: "Can you work with my existing tools?",
      answer: "Yes! I specialize in making your current tools work better together - whether it's Salesforce, QuickBooks, Slack, or industry-specific software. The goal is to enhance what you have, not replace everything."
    },
    {
      question: "What if I'm not in Portland?",
      answer: "While I'm based in Portland and love working with local New England businesses, I work with companies nationwide. We can do everything remotely, though if you're local, I'm happy to meet in person at my favorite Portland coffee shop."
    },
    {
      question: "How do you protect my business information?",
      answer: "Your data security is paramount. All conversations are processed in real-time and not stored permanently. Email communications are encrypted, and I never share your business information with third parties. The AI analysis happens in isolated sessions that are cleared after each consultation."
    },
    {
      question: "What happens after our AI conversation?",
      answer: "Within minutes of our conversation, you'll receive a personalized email with your custom automation roadmap. This includes specific recommendations based on your exact pain points, implementation priorities, and next steps. Most clients are surprised by how detailed and actionable it is."
    },
    {
      question: "How does this website work?",
      answer: <><span>Curious about the tech behind this experience? I've built this entire system using cutting-edge AI and automation tools. </span><a href="/how-it-works" className="text-[#23A6B5] hover:text-[#1A8A94] underline">See the full technical breakdown →</a></>,
      isJSX: true
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
                  <div className="text-gray-700">
                    {typeof faq.answer === 'string' ? faq.answer : faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';

export default function AICapabilities() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const capabilities = [
    {
      title: "Business Process Analysis",
      description: "Identify bottlenecks and inefficiencies in your workflows",
      gradient: "from-purple-500 to-pink-500",
      examples: [
        {
          level: "Simple",
          title: "Email Workflow Automation",
          description: "Auto-categorize and route emails, draft responses with AI"
        },
        {
          level: "Medium",
          title: "Document Processing Pipeline",
          description: "Extract data from PDFs, validate information, and update systems automatically"
        },
        {
          level: "Complex",
          title: "End-to-End Process Orchestration",
          description: "Multi-step workflows with conditional logic, approvals, and cross-system integration"
        }
      ]
    },
    {
      title: "Customer Support Automation",
      description: "Intelligent chatbots and ticket routing systems",
      gradient: "from-blue-500 to-cyan-500",
      examples: [
        {
          level: "Simple",
          title: "FAQ Chatbot",
          description: "Answer common questions 24/7, reduce support tickets by 60%"
        },
        {
          level: "Medium",
          title: "Intelligent Ticket Routing",
          description: "AI categorizes and assigns tickets to the right team automatically"
        },
        {
          level: "Complex",
          title: "Omnichannel Support AI",
          description: "Unified AI across chat, email, phone with sentiment analysis and escalation"
        }
      ]
    },
    {
      title: "Sales Intelligence",
      description: "Lead scoring and automated follow-up sequences",
      gradient: "from-green-500 to-emerald-500",
      examples: [
        {
          level: "Simple",
          title: "Lead Scoring Automation",
          description: "AI ranks leads by likelihood to convert, focus on hot prospects"
        },
        {
          level: "Medium",
          title: "Personalized Outreach Sequences",
          description: "AI crafts follow-ups based on prospect behavior and engagement"
        },
        {
          level: "Complex",
          title: "Predictive Sales Analytics",
          description: "Forecast deals, identify at-risk accounts, optimize pricing strategies"
        }
      ]
    },
    {
      title: "Data Analytics",
      description: "Real-time insights and predictive modeling",
      gradient: "from-orange-500 to-red-500",
      examples: [
        {
          level: "Simple",
          title: "Automated Reporting Dashboards",
          description: "Real-time KPIs and metrics without manual spreadsheet work"
        },
        {
          level: "Medium",
          title: "Predictive Maintenance",
          description: "AI predicts equipment failures before they happen"
        },
        {
          level: "Complex",
          title: "Multi-Modal AI Analytics",
          description: "Combine text, voice, and visual data for comprehensive insights"
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Capabilities That Drive Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI consultant analyzes your specific needs and recommends the perfect automation solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-50 p-8 hover:shadow-xl transition-all duration-300">
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{capability.title}</h3>
                </div>
                <p className="text-gray-600 text-lg mb-6">{capability.description}</p>
                
                {/* Expandable Examples Button */}
                <button
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  className="inline-flex items-center text-gray-900 font-semibold hover:text-green-600 transition-colors duration-200"
                >
                  <span>View implementation examples</span>
                  <svg 
                    className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${
                      expandedCard === index ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
                  </svg>
                </button>
                
                {/* Examples Content */}
                <div className={`mt-6 space-y-4 overflow-hidden transition-all duration-300 ${
                  expandedCard === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  {capability.examples.map((example, exIdx) => (
                    <div key={exIdx} className="border-l-4 border-gradient-to-r from-green-500 to-blue-600 pl-4 py-2">
                      <div className="flex items-center mb-1">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full mr-2 ${
                          example.level === 'Simple' ? 'bg-blue-100 text-blue-700' :
                          example.level === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {example.level}
                        </span>
                        <h4 className="font-semibold text-gray-900">{example.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
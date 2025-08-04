'use client';

import { useState } from 'react';

export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const services = [
    {
      title: "AI Strategy Consulting",
      description: "Develop a comprehensive AI roadmap tailored to your business objectives and industry",
      features: [
        "AI readiness assessment",
        "Technology stack recommendations",
        "Implementation timeline",
        "ROI projections"
      ],
      examples: [
        {
          level: "Simple",
          title: "Automated Email Responses",
          description: "Deploy GPT-powered email assistant that drafts responses, saving 2-3 hours daily"
        },
        {
          level: "Medium",
          title: "Customer Sentiment Dashboard",
          description: "Real-time analysis of customer feedback across all channels with actionable insights"
        },
        {
          level: "Complex",
          title: "Multi-Agent Intelligence System",
          description: "Autonomous agents for competitive analysis, market research, and strategic recommendations"
        }
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Process Automation",
      description: "Automate repetitive tasks and workflows to free up your team for strategic work",
      features: [
        "Workflow analysis",
        "Automation design",
        "Integration planning",
        "Performance monitoring"
      ],
      examples: [
        {
          level: "Simple",
          title: "Document Classification",
          description: "Auto-sort and route incoming documents to the right teams, reducing manual filing by 90%"
        },
        {
          level: "Medium",
          title: "Invoice Processing Pipeline",
          description: "OCR extraction, validation, and approval workflows with exception handling"
        },
        {
          level: "Complex",
          title: "Order Fulfillment Orchestration",
          description: "End-to-end automation from order intake to delivery with multi-system integration"
        }
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Custom AI Development",
      description: "Build bespoke AI solutions that give you a competitive edge in your market",
      features: [
        "Custom model training",
        "API development",
        "Scalable architecture",
        "Ongoing optimization"
      ],
      examples: [
        {
          level: "Simple",
          title: "FAQ Chatbot",
          description: "24/7 customer support bot that handles common questions, reducing tickets by 60%"
        },
        {
          level: "Medium",
          title: "Predictive Maintenance System",
          description: "ML models that predict equipment failures before they happen, saving costly downtime"
        },
        {
          level: "Complex",
          title: "Multi-Modal AI Agent",
          description: "Vision, voice, and text-enabled agent for complete customer interaction automation"
        }
      ],
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Consulting Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From strategy to implementation, we help businesses at every stage of their AI journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Expandable Examples Section */}
                <div className="mt-8">
                  <button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-all duration-200"
                  >
                    <span>View AI examples</span>
                    <svg 
                      className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${
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
                    {service.examples.map((example, exIdx) => (
                      <div key={exIdx} className="border-l-4 border-green-500 pl-4 py-2">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';

export default function AICapabilities() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const capabilities = [
    {
      title: "Stop Drowning in Repetitive Tasks",
      description: "I'll identify and eliminate the busywork that's eating your time",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      examples: [
        {
          title: "Email Chaos → Smart Inbox",
          description: "Auto-categorize, route, and draft responses. Your inbox practically manages itself."
        },
        {
          title: "Manual Data Entry → Automated Processing",
          description: "Extract data from PDFs, emails, and forms. Update all your systems automatically."
        },
        {
          title: "Scattered Workflows → Orchestrated Processes",
          description: "Connect your tools so they work together. One trigger, multiple actions, zero manual steps."
        }
      ]
    },
    {
      title: "Turn Customer Frustration into Loyalty",
      description: "Give customers instant answers while your team focuses on complex issues",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      examples: [
        {
          title: "24/7 Instant Responses",
          description: "Smart chatbots answer common questions immediately, any time of day or night."
        },
        {
          title: "Smart Ticket Routing",
          description: "AI reads, categorizes, and assigns tickets to the right person instantly."
        },
        {
          title: "Unified Support Experience",
          description: "Whether customers call, email, or chat, they get consistent, intelligent help."
        }
      ]
    },
    {
      title: "Close More Deals Without More Effort",
      description: "Let AI handle the follow-ups while you focus on relationships",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      examples: [
        {
          title: "Know Who's Ready to Buy",
          description: "AI scores leads based on behavior, so you call the right people at the right time."
        },
        {
          title: "Personalized Follow-Ups on Autopilot",
          description: "Each prospect gets tailored messages based on their interests and engagement."
        },
        {
          title: "Predict and Prevent Churn",
          description: "Identify at-risk accounts before they leave, with actionable insights to keep them."
        }
      ]
    },
    {
      title: "Make Decisions with Real Data, Not Gut Feelings",
      description: "See what's actually happening in your business, in real-time",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      examples: [
        {
          title: "Live Dashboards, Zero Spreadsheets",
          description: "All your KPIs update automatically. No more Monday morning report scrambles."
        },
        {
          title: "Spot Problems Before They Happen",
          description: "AI identifies trends and anomalies you'd never catch manually."
        },
        {
          title: "One Source of Truth",
          description: "Pull data from all your tools into one clear, actionable view."
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-white" id="capabilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What I Can Fix for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real solutions to the problems that keep you up at night
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <div key={index} className="relative overflow-hidden rounded-2xl bg-gray-50 hover:bg-[#23A6B5]/5 border border-gray-200 hover:border-[#23A6B5] transition-all duration-300">
              <div className="p-8">
                {/* Icon and Title */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#23A6B5]/10 rounded-lg flex items-center justify-center text-[#23A6B5] mr-4">
                    {capability.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 flex-1">{capability.title}</h3>
                </div>
                
                <p className="text-gray-600 text-lg mb-6">{capability.description}</p>
                
                {/* Expandable Examples Button - Much more obvious */}
                <button
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    expandedCard === index 
                      ? 'bg-[#23A6B5] text-white' 
                      : 'bg-[#23A6B5]/10 text-[#23A6B5] hover:bg-[#23A6B5]/20'
                  }`}
                >
                  <span className="font-semibold">
                    {expandedCard === index ? 'Hide Examples' : 'See Real Examples'}
                  </span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">
                      {expandedCard === index ? 'Click to close' : 'Click to expand'}
                    </span>
                    <svg 
                      className={`w-5 h-5 transform transition-transform duration-200 ${
                        expandedCard === index ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {/* Examples Content */}
                <div className={`mt-6 space-y-4 overflow-hidden transition-all duration-500 ${
                  expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {capability.examples.map((example, exIdx) => (
                    <div key={exIdx} className="bg-white rounded-lg p-4 border-l-4 border-[#23A6B5]">
                      <h4 className="font-semibold text-gray-900 mb-2">{example.title}</h4>
                      <p className="text-gray-600">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Every business is different. Let's talk about your specific challenges.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#23A6B5] rounded-full hover:bg-[#1A8A94] transition-all duration-200 transform hover:scale-105"
          >
            Tell Me About Your Chaos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
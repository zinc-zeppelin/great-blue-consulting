'use client';

import { useState, useEffect } from 'react';
import { useVisibilityTracking } from '../hooks/useVisibilityTracking';

export default function AICapabilities() {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useVisibilityTracking('ai_capabilities_section');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <section ref={sectionRef} className="py-20 bg-gray-50" id="capabilities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What I Can Fix for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real solutions to the problems that keep you up at night
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <div 
              key={index} 
              className="relative"
            >
              {isMobile ? (
                // Mobile: Click anywhere on card to expand/collapse
                <div 
                  onClick={() => setFlippedCard(flippedCard === index ? null : index)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#23A6B5] to-[#4FC3D1] rounded-lg flex items-center justify-center text-white mr-4">
                        {capability.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 flex-1">{capability.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{capability.description}</p>
                    
                    {flippedCard === index && (
                      <div className="space-y-3 animate-fadeIn mb-4">
                        {capability.examples.map((example, exIdx) => (
                          <div key={exIdx} className="border-l-4 border-[#23A6B5] pl-3 py-1">
                            <h5 className="font-semibold text-[#1E3A5F] text-sm">{example.title}</h5>
                            <p className="text-gray-600 text-sm">{example.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Visual indicator bar at bottom */}
                  <div className="bg-[#23A6B5]/10 px-6 py-3 flex items-center justify-center">
                    <svg 
                      className={`w-5 h-5 text-[#23A6B5] transform transition-transform duration-200 ${flippedCard === index ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              ) : (
                // Desktop: Hover to flip
                <div 
                  className="group"
                  onMouseEnter={() => setFlippedCard(index)}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                  <div className="relative h-[320px] transform transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    {/* Front of card */}
                    <div className="absolute inset-0 [backface-visibility:hidden]">
                      <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col">
                        <div className="flex items-start mb-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#23A6B5] to-[#4FC3D1] rounded-lg flex items-center justify-center text-white mr-4">
                            {capability.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 flex-1">{capability.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 text-lg mb-6 flex-grow">{capability.description}</p>
                        
                        <div className="flex items-center text-[#23A6B5] font-medium">
                          <span>Hover to see examples</span>
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Back of card */}
                    <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <div className="h-full bg-gradient-to-br from-[#23A6B5] to-[#1E3A5F] rounded-2xl shadow-2xl p-8 text-white">
                        <h4 className="text-xl font-bold mb-4">Real Examples:</h4>
                        <div className="space-y-3">
                          {capability.examples.map((example, exIdx) => (
                            <div key={exIdx} className="border-l-4 border-[#4FC3D1] pl-4">
                              <h5 className="font-semibold text-[#4FC3D1] text-sm">{example.title}</h5>
                              <p className="text-white/90 text-sm">{example.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Every business is different. Let's talk about your specific challenges.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#23A6B5] rounded-full hover:bg-[#1A8A94] transition-all duration-200 transform hover:scale-105"
          >
            Talk to My AI Assistant
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
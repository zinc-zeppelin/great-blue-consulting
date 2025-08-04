'use client';

import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import VapiChatSDK from './VapiChatSDK';

interface UserData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export default function ChatWithFormTeaser() {
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  // Demo conversation phrases that cycle through
  const demoConversation = [
    { role: 'user', text: "I need help automating my customer support..." },
    { role: 'ai', text: "I can help you implement AI-powered support automation. Let me understand your needs..." },
    { role: 'user', text: "We get about 500 tickets per day..." },
    { role: 'ai', text: "With that volume, I recommend a tiered automation approach. First, let's categorize..." }
  ];

  // Cycle through demo conversation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % demoConversation.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (data: UserData) => {
    setIsTransitioning(true);
    setUserData(data);
    
    // Add a smooth transition delay
    setTimeout(() => {
      setShowChat(true);
      setIsTransitioning(false);
    }, 300);
  };

  if (showChat && userData) {
    return <VapiChatSDK userData={userData} />;
  }

  return (
    <section id="ai-consultation" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your Business with AI Automation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete the form below to unlock your personalized AI consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Contact Form */}
          <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  Start Your AI Journey
                </h3>
                <p className="text-gray-600">
                  Tell us about your business and unlock instant AI insights
                </p>
              </div>
              <ContactForm onSubmit={handleFormSubmit} />
            </div>
          </div>

          {/* Right side - Voice Chat Teaser */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-green-500 rounded-full animate-pulse" />
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-green-600 rounded-full animate-pulse animation-delay-1000" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Your AI Consultant Awaits
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">Live Demo</span>
                  </div>
                </div>

                {/* Voice visualization */}
                <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 bg-green-500 rounded-full transition-all duration-300 ${
                            currentPhrase % 2 === 0 ? 'animate-voice-wave' : 'h-4'
                          }`}
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            height: currentPhrase % 2 === 0 ? `${Math.random() * 24 + 8}px` : '16px'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Demo conversation */}
                  <div className="space-y-3 min-h-[100px]">
                    <div
                      className={`transition-all duration-500 ${
                        demoConversation[currentPhrase].role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      <div
                        className={`inline-block px-4 py-2 rounded-lg text-sm ${
                          demoConversation[currentPhrase].role === 'user'
                            ? 'bg-gray-200 text-gray-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {demoConversation[currentPhrase].text}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {demoConversation[currentPhrase].role === 'user' ? 'You' : 'AI Consultant'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Real-time voice conversation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Personalized to your business</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Instant AI recommendations</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Fill out the form to activate</p>
                  <div className="inline-flex items-center space-x-2 text-green-600 font-semibold">
                    <span>Your Personal AI Consultant</span>
                    <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
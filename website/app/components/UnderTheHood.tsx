'use client';

import { useState } from 'react';

export default function UnderTheHood() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const techStack = [
    {
      id: 'vapi',
      name: 'Vapi AI',
      category: 'Voice Intelligence',
      description: 'Powers the conversational AI that analyzes your business needs',
      details: 'Handles natural language processing, voice recognition, and real-time conversation flow. Configured with custom prompts to understand business pain points and suggest AI solutions.',
      icon: '🎙️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'n8n',
      name: 'n8n',
      category: 'Workflow Automation',
      description: 'Orchestrates the entire follow-up process',
      details: 'Receives conversation data, triggers email sequences, updates Google Sheets, and manages the lead nurturing pipeline. Completely self-hosted for maximum control.',
      icon: '⚡',
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'nextjs',
      name: 'Next.js + React',
      category: 'Frontend Framework',
      description: 'The website you\'re looking at right now',
      details: 'Server-side rendered for SEO, optimized for performance, and fully responsive. Deployed on Netlify with automatic CI/CD from GitHub.',
      icon: '⚛️',
      color: 'from-gray-700 to-gray-900'
    },
    {
      id: 'google',
      name: 'Google Workspace',
      category: 'Data & Communication',
      description: 'Stores leads and manages email delivery',
      details: 'Google Sheets acts as a simple CRM, Gmail sends personalized follow-ups, and everything integrates seamlessly with your existing workflow.',
      icon: '📊',
      color: 'from-blue-500 to-green-500'
    },
    {
      id: 'openai',
      name: 'OpenAI GPT-4',
      category: 'AI Intelligence',
      description: 'Generates personalized insights and recommendations',
      details: 'Analyzes conversation transcripts to create custom automation roadmaps. Each follow-up email is uniquely tailored to the specific pain points discussed.',
      icon: '🧠',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'railway',
      name: 'Railway',
      category: 'Infrastructure',
      description: 'Hosts the n8n automation platform',
      details: 'Provides reliable, scalable hosting for the workflow automation engine. Ensures your leads are processed 24/7 without downtime.',
      icon: '🚂',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section className="py-12 bg-gray-50" id="under-the-hood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isExpanded ? (
          // Collapsed view - subtle and optional
          <div className="text-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#23A6B5] transition-colors duration-200"
            >
              <span className="text-sm">Curious how this works?</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        ) : (
          // Expanded view
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  How This Actually Works
                </h2>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The exact tech stack powering your AI consultation experience
              </p>
            </div>

            {/* Simplified Flow */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#23A6B5]/10 rounded-full flex items-center justify-center text-[#23A6B5] mx-auto mb-2">
                    <span className="font-bold">1</span>
                  </div>
                  <p className="text-sm text-gray-600">You Talk</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#23A6B5]/10 rounded-full flex items-center justify-center text-[#23A6B5] mx-auto mb-2">
                    <span className="font-bold">2</span>
                  </div>
                  <p className="text-sm text-gray-600">AI Analyzes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#23A6B5]/10 rounded-full flex items-center justify-center text-[#23A6B5] mx-auto mb-2">
                    <span className="font-bold">3</span>
                  </div>
                  <p className="text-sm text-gray-600">Automation Runs</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#23A6B5]/10 rounded-full flex items-center justify-center text-[#23A6B5] mx-auto mb-2">
                    <span className="font-bold">4</span>
                  </div>
                  <p className="text-sm text-gray-600">Email Sent</p>
                </div>
              </div>
            </div>

            {/* Tech Stack Grid - Simplified */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech) => (
                <div
                  key={tech.id}
                  onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
                  className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer transition-all duration-200 hover:border-[#23A6B5] hover:shadow-md"
                >
                  <div className="flex items-center mb-2">
                    <div className="text-2xl mr-3">{tech.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                      <p className="text-xs text-gray-500">{tech.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600">{tech.description}</p>
                  
                  {selectedTech === tech.id && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-600">{tech.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Subtle CTA */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Want to build something like this for your business?
              </p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[#23A6B5] hover:text-[#1A8A94] font-medium text-sm transition-colors"
              >
                Let's talk about it ↑
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
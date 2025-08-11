'use client';

import { useState } from 'react';

export default function UnderTheHood() {
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
    <section className="py-20 bg-gray-50" id="under-the-hood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How This Actually Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No smoke and mirrors - here's the exact tech stack powering this experience
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">The Flow</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-2xl mb-3">
                1
              </div>
              <h4 className="font-semibold mb-2">You Talk</h4>
              <p className="text-sm text-gray-600">Vapi AI listens and understands your challenges</p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block text-[#23A6B5]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-2xl mb-3">
                2
              </div>
              <h4 className="font-semibold mb-2">AI Analyzes</h4>
              <p className="text-sm text-gray-600">GPT-4 processes your needs and creates solutions</p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block text-[#23A6B5]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-2xl mb-3">
                3
              </div>
              <h4 className="font-semibold mb-2">Automation Kicks In</h4>
              <p className="text-sm text-gray-600">n8n orchestrates the entire follow-up sequence</p>
            </div>
            
            {/* Arrow */}
            <div className="hidden md:block text-[#23A6B5]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-16 h-16 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-2xl mb-3">
                4
              </div>
              <h4 className="font-semibold mb-2">You Get Results</h4>
              <p className="text-sm text-gray-600">Custom roadmap delivered to your inbox</p>
            </div>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(selectedTech === tech.id ? null : tech.id)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-start mb-4">
                <div className={`text-4xl mr-4`}>{tech.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                  <p className="text-sm text-gray-500">{tech.category}</p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3">{tech.description}</p>
              
              {selectedTech === tech.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
                  <p className="text-sm text-gray-700">{tech.details}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className={`h-1 flex-1 bg-gradient-to-r ${tech.color} rounded-full opacity-50`} />
                <svg 
                  className={`w-4 h-4 ml-2 text-gray-400 transform transition-transform ${selectedTech === tech.id ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Build Your Own CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Build Something Like This?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            This entire system is what I help businesses implement. From AI voice agents to automated workflows, 
            I'll show you exactly how to build it for your specific needs.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-[#23A6B5] rounded-full hover:bg-[#1A8A94] transition-all duration-200 transform hover:scale-105"
          >
            Let's Build Your Version
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
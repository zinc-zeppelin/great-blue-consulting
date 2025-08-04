'use client';

import { useState } from 'react';
import VapiChatSDKSimple from './VapiChatSDKSimple';

export default function VoiceHero() {
  const [showChat, setShowChat] = useState(false);

  const startChat = () => {
    setShowChat(true);
  };

  if (showChat) {
    return <VapiChatSDKSimple userData={null} onClose={() => setShowChat(false)} />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Your AI Business Consultant is Ready
        </h1>
        
        <button
          onClick={startChat}
          className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl"
        >
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          Start Talking
        </button>
        
        <p className="mt-8 text-lg text-gray-600">
          No forms. No downloads. Just answers.
        </p>
      </div>
    </section>
  );
}
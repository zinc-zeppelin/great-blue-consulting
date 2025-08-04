'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface UserData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface VapiChatProps {
  userData: UserData;
}

const getServiceLabel = (service: string): string => {
  const serviceLabels: { [key: string]: string } = {
    'ai-automation': 'AI Automation',
    'custom-agents': 'Custom AI Agents',
    'process-optimization': 'Process Optimization',
    'integration': 'Integration Services',
    'strategy': 'AI Strategy Consulting',
    'training': 'Training & Support'
  };
  return serviceLabels[service] || service;
};

export default function VapiChat({ userData }: VapiChatProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create custom first message with user data
    const customFirstMessage = `Hey ${userData.name}! I see you're from ${userData.company} and interested in ${getServiceLabel(userData.service)}. I read your message about: "${userData.message}". How can I help you explore this further?`;

    // Create the vapi-widget element with all attributes
    if (widgetRef.current) {
      widgetRef.current.innerHTML = `
        <vapi-widget
          public-key="c5045627-4627-46f8-94e1-1279ae22343c"
          assistant-id="e5ff7a8b-b4a5-4e78-916c-40dd483c23d7"
          mode="voice"
          theme="dark"
          base-bg-color="#ffffff"
          accent-color="#10b981"
          cta-button-color="#10b981"
          cta-button-text-color="#ffffff"
          border-radius="large"
          size="full"
          position="inline"
          title="AI CONSULTANT"
          start-button-text="Start Voice Chat"
          end-button-text="End Call"
          chat-first-message="${customFirstMessage}"
          chat-placeholder="Type your message..."
          voice-show-transcript="true"
          consent-required="false"
          style="width: 100%; height: 600px;"
        ></vapi-widget>
      `;
    }
  }, [userData]);

  return (
    <section id="ai-chat" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {userData.name}!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's explore how AI automation can help {userData.company}. 
            Click "Start Voice Chat" below to begin our conversation.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
          <div ref={widgetRef} className="vapi-widget-container" />
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Having issues? You can also <a href="#contact" className="text-green-600 hover:underline">contact us directly</a>
          </p>
        </div>
      </div>
      
      <Script 
        src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" 
        strategy="afterInteractive"
      />
    </section>
  );
}
'use client';

import { useEffect } from 'react';

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

export default function VapiChatSimple({ userData }: VapiChatProps) {
  useEffect(() => {
    // Add the Vapi widget script to the page
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const customFirstMessage = `Hey ${userData.name}! I see you're from ${userData.company} and interested in ${getServiceLabel(userData.service)}. I read your message about: "${userData.message}". How can I help you explore this further?`;

  return (
    <section id="ai-chat" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {userData.name}!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's explore how AI automation can help {userData.company}.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Directly embed the widget HTML */}
          <div 
            dangerouslySetInnerHTML={{
              __html: `
                <vapi-widget
                  public-key="c5045627-4627-46f8-94e1-1279ae22343c"
                  assistant-id="e5ff7a8b-b4a5-4e78-916c-40dd483c23d7"
                  mode="voice"
                  theme="light"
                  base-bg-color="#ffffff"
                  accent-color="#10b981"
                  cta-button-color="#10b981"
                  cta-button-text-color="#ffffff"
                  border-radius="large"
                  size="full"
                  position="bottom-right"
                  title="TALK WITH AI"
                  start-button-text="Start Voice Chat"
                  end-button-text="End Call"
                  chat-first-message="${customFirstMessage.replace(/"/g, '&quot;')}"
                  chat-placeholder="Type your message..."
                  voice-show-transcript="true"
                  consent-required="false"
                ></vapi-widget>
              `
            }}
          />
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            The voice chat widget will appear in the bottom right corner. Having issues? 
            <a href="#contact" className="text-green-600 hover:underline ml-1">Contact us directly</a>
          </p>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vapi-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'public-key'?: string;
        'assistant-id'?: string;
        mode?: string;
        theme?: string;
        'base-bg-color'?: string;
        'accent-color'?: string;
        'cta-button-color'?: string;
        'cta-button-text-color'?: string;
        'border-radius'?: string;
        size?: string;
        position?: string;
        title?: string;
        'start-button-text'?: string;
        'end-button-text'?: string;
        'chat-first-message'?: string;
        'chat-placeholder'?: string;
        'voice-show-transcript'?: string;
        'consent-required'?: string;
      }, HTMLElement>;
    }
  }
}

export default function VapiChat({ userData }: VapiChatProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [widgetReady, setWidgetReady] = useState(false);

  useEffect(() => {
    // Wait for script to load and then check if widget is ready
    if (scriptLoaded) {
      // Give the widget time to initialize
      const checkWidget = setInterval(() => {
        const widgetElements = document.querySelectorAll('vapi-widget');
        if (widgetElements.length > 0) {
          setWidgetReady(true);
          clearInterval(checkWidget);
        }
      }, 100);
      
      // Cleanup after 5 seconds if widget doesn't load
      setTimeout(() => clearInterval(checkWidget), 5000);
    }
  }, [scriptLoaded]);

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
            Click "Start Voice Chat" below to begin our conversation.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
          {/* Show loading state while widget initializes */}
          {!widgetReady && scriptLoaded && (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading voice chat...</p>
            </div>
          )}
          
          {/* Fixed height container for the widget */}
          <div className="vapi-widget-container" style={{ minHeight: '600px', position: 'relative' }}>
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
              position="inline"
              title="AI CONSULTANT"
              start-button-text="Start Voice Chat"
              end-button-text="End Call"
              chat-first-message={customFirstMessage}
              chat-placeholder="Type your message..."
              voice-show-transcript="true"
              consent-required="false"
              style={{ width: '100%', height: '100%', minHeight: '600px', display: 'block' }}
            />
          </div>
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
        onLoad={() => setScriptLoaded(true)}
        onError={(e) => console.error('Failed to load Vapi widget script:', e)}
      />
    </section>
  );
}
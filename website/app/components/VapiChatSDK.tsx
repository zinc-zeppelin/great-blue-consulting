'use client';

import { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

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

export default function VapiChatSDK({ userData }: VapiChatProps) {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [transcript, setTranscript] = useState<string[]>([]);

  useEffect(() => {
    // Initialize Vapi instance
    const vapiInstance = new Vapi('c5045627-4627-46f8-94e1-1279ae22343c');
    
    // Set up event listeners
    vapiInstance.on('call-start', () => {
      console.log('Call started');
      setCallStatus('connected');
    });
    
    vapiInstance.on('call-end', () => {
      console.log('Call ended');
      setCallStatus('ended');
    });
    
    vapiInstance.on('message', (message) => {
      console.log('Message received:', message);
      if (message.type === 'transcript' && message.transcript) {
        setTranscript(prev => [...prev, `${message.role}: ${message.transcript}`]);
      }
    });
    
    vapiInstance.on('error', (error) => {
      console.error('Vapi error:', error);
    });
    
    setVapi(vapiInstance);
    
    return () => {
      vapiInstance.stop();
    };
  }, []);

  const startCall = async () => {
    if (!vapi) return;
    
    try {
      setCallStatus('connecting');
      
      // Start call with assistant overrides for personalization
      await vapi.start('e5ff7a8b-b4a5-4e78-916c-40dd483c23d7', {
        variableValues: {
          name: userData.name,
          email: userData.email,
          company: userData.company,
          service: getServiceLabel(userData.service),
          message: userData.message
        }
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('idle');
    }
  };

  const endCall = async () => {
    if (!vapi) return;
    
    try {
      await vapi.stop();
      setCallStatus('ended');
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

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
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-8">
          {/* Call Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={startCall}
              disabled={callStatus !== 'idle' && callStatus !== 'ended'}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                callStatus === 'idle' || callStatus === 'ended'
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {callStatus === 'connecting' ? 'Connecting...' : 'Start Voice Chat'}
            </button>
            
            {callStatus === 'connected' && (
              <button
                onClick={endCall}
                className="px-8 py-4 rounded-lg font-semibold text-lg bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all"
              >
                End Call
              </button>
            )}
          </div>
          
          {/* Status Indicator */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2">
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                callStatus === 'connected' ? 'bg-green-500' :
                callStatus === 'connecting' ? 'bg-yellow-500' :
                'bg-gray-400'
              }`} />
              <span className="text-sm font-medium text-gray-600">
                {callStatus === 'idle' && 'Ready to start'}
                {callStatus === 'connecting' && 'Connecting...'}
                {callStatus === 'connected' && 'Connected - Speak now'}
                {callStatus === 'ended' && 'Call ended'}
              </span>
            </div>
          </div>
          
          {/* Transcript Display */}
          {transcript.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversation Transcript</h3>
              <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                {transcript.map((line, idx) => (
                  <p key={idx} className={`text-sm ${
                    line.startsWith('user:') ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Having issues? You can also <a href="#contact" className="text-green-600 hover:underline">contact us directly</a>
          </p>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

interface VapiChatInlineProps {
  onClose: () => void;
}

export default function VapiChatInline({ onClose }: VapiChatInlineProps) {
  const [vapi, setVapi] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const initializeVapi = async () => {
      try {
        const { default: VapiSDK } = await import('@vapi-ai/web');
        const vapiInstance = new VapiSDK('c5045627-4627-46f8-94e1-1279ae22343c');
        
        vapiInstance.on('call-start', () => {
          setCallStatus('connected');
        });
        
        vapiInstance.on('call-end', () => {
          setCallStatus('ended');
          setTimeout(() => onClose(), 2000);
        });
        
        vapiInstance.on('message', (message) => {
          if (message.type === 'speech-update') {
            setIsSpeaking(message.status === 'started');
          }
        });
        
        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
          setCallStatus('ended');
        });
        
        setVapi(vapiInstance);
        
        // Start the call after a delay
        setTimeout(() => {
          if (vapiInstance) {
            startCall(vapiInstance);
          }
        }, 1000);
      } catch (error) {
        console.error('Failed to load Vapi SDK:', error);
      }
    };
    
    initializeVapi();
    
    return () => {
      if (vapi) {
        vapi.stop();
      }
    };
  }, []);

  const startCall = async (vapiInstance: any) => {
    if (!vapiInstance) return;
    
    try {
      setCallStatus('connecting');
      await vapiInstance.start('e5ff7a8b-b4a5-4e78-916c-40dd483c23d7');
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('ended');
    }
  };

  const endCall = async () => {
    if (vapi) {
      await vapi.stop();
    }
  };

  // Minimized view
  if (isMinimized) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-3"
        >
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-4 bg-white rounded-full ${
                  callStatus === 'connected' ? 'animate-voice-bar' : ''
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <span className="text-sm font-medium">
            {isSpeaking ? 'Speaking...' : 'Listening...'}
          </span>
        </button>
      </div>
    );
  }

  // Full inline view
  return (
    <div className="fixed bottom-8 right-8 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span className="font-semibold">AI Consultant</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Voice visualization */}
        <div className="h-12 flex items-center justify-center mb-4">
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 bg-green-500 rounded-full transition-all duration-300 ${
                  callStatus === 'connected' ? 'animate-voice-bar' : ''
                }`}
                style={{
                  height: callStatus === 'connected' ? '24px' : '16px',
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-gray-900">
            {callStatus === 'connecting' && 'Connecting...'}
            {callStatus === 'connected' && (isSpeaking ? 'AI is speaking' : 'AI is listening')}
            {callStatus === 'ended' && 'Call ended'}
            {callStatus === 'idle' && 'Preparing...'}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {callStatus === 'connected' && !isSpeaking && 'Speak naturally about your needs'}
          </p>
        </div>

        {/* Controls */}
        {callStatus === 'connected' && (
          <button
            onClick={endCall}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            End Call
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-2 text-center">
        <p className="text-xs text-gray-600">Powered by PineAI</p>
      </div>
    </div>
  );
}
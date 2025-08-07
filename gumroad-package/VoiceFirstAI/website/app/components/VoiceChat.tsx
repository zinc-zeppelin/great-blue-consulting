'use client';

import { useState, useEffect, useRef } from 'react';
import VapiChatSDKSimple from './VapiChatSDKSimple';

export default function VoiceChat() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'speaking' | 'listening' | 'ended'>('idle');
  const [conversation, setConversation] = useState<Array<{role: string, text: string}>>([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const vapiRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const startChat = async () => {
    setStatus('connecting');
    
    try {
      const { default: Vapi } = await import('@vapi-ai/web');
      const vapi = new Vapi('c5045627-4627-46f8-94e1-1279ae22343c');
      vapiRef.current = vapi;

      // Set up event handlers
      vapi.on('call-start', () => {
        console.log('Call started');
        setStatus('listening');
      });

      vapi.on('call-end', () => {
        console.log('Call ended');
        setStatus('ended');
        setTimeout(() => setShowTranscript(true), 500);
      });

      vapi.on('speech-start', () => {
        console.log('Assistant speaking');
        setStatus('speaking');
      });

      vapi.on('speech-end', () => {
        console.log('Assistant stopped speaking');
        setStatus('listening');
      });

      vapi.on('message', (message: any) => {
        if (message.type === 'conversation-update') {
          const messages = message.conversation || [];
          const formatted = messages
            .filter((m: any) => m.role && m.content && m.role !== 'system')
            .map((m: any) => ({
              role: m.role === 'assistant' ? 'assistant' : 'user',
              text: m.content
            }));
          setConversation(formatted);
        }
      });

      vapi.on('error', (error: any) => {
        console.error('Vapi error:', error);
        setStatus('ended');
      });

      // Start the call with the assistant ID
      await vapi.start('e5ff7a8b-b4a5-4e78-916c-40dd483c23d7');
      
    } catch (error) {
      console.error('Failed to start call:', error);
      setStatus('idle');
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setStatus('ended');
      setTimeout(() => setShowTranscript(true), 500);
    }
  };

  if (showTranscript) {
    return <VapiChatSDKSimple 
      userData={null} 
      onClose={() => {
        setShowTranscript(false);
        setStatus('idle');  // Reset to idle when returning from form
        setConversation([]); // Clear conversation for fresh start
      }} 
      initialConversation={conversation} 
    />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-green-500">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}
        />
      </div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          <span className="block">Your AI Business</span>
          <span className="block bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 bg-clip-text text-transparent">
            Consultant is Ready
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Get instant AI-powered insights for your business. 
          No forms, no waiting - just start talking.
        </p>

        {status === 'idle' ? (
          <button
            onClick={startChat}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-semibold text-gray-900 transition-all duration-200 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-200" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-75 blur group-hover:opacity-100 transition-opacity duration-200" />
            <div className="relative flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Start Talking</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        ) : (
          <div className="inline-flex items-center justify-center px-12 py-6 text-xl font-semibold">
            <div className="relative bg-white/90 backdrop-blur-sm rounded-full shadow-2xl px-8 py-4 flex items-center space-x-4">
              {/* Voice visualization */}
              <div className="flex space-x-1 items-center h-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-full transition-all duration-300 ${
                      status === 'speaking' ? 'bg-green-500 animate-voice-bar' : 
                      status === 'listening' ? 'bg-blue-500' : 
                      'bg-gray-300'
                    }`}
                    style={{
                      height: (status === 'speaking' || status === 'listening' || status === 'connecting') ? '24px' : '16px',
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
              
              {/* Status text */}
              <span className="text-gray-900 font-medium">
                {status === 'connecting' && 'Connecting...'}
                {status === 'speaking' && 'Speaking...'}
                {status === 'listening' && 'Listening...'}
                {status === 'ended' && 'Call ended'}
              </span>
              
              {/* End call button */}
              {(status === 'speaking' || status === 'listening') && (
                <button
                  onClick={endCall}
                  className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll to learn more</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
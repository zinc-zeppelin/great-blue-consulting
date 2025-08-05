'use client';

import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import VapiChatSDKSimple from './VapiChatSDKSimple';

export default function VoiceHeroEnhanced() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const vapiRef = useRef<any>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: string, text: string}>>([]);
  const [showTranscript, setShowTranscript] = useState(false);

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

  // Initialize Vapi when user clicks start
  useEffect(() => {
    if (callStatus !== 'connecting') return;
    
    let mounted = true;

    const initializeAndStartCall = async () => {
      try {
        const { default: VapiSDK } = await import('@vapi-ai/web');
        if (!mounted) return;
        
        const vapiInstance = new VapiSDK('c5045627-4627-46f8-94e1-1279ae22343c');
        
        vapiInstance.on('call-start', () => {
          console.log('Call started event received');
          if (mounted) {
            setCallStatus('connected');
          }
        });
        
        vapiInstance.on('call-end', () => {
          console.log('Call ended event received');
          if (mounted) {
            setCallStatus('ended');
            // Clean up after call ends
            setTimeout(() => {
              if (vapiRef.current) {
                vapiRef.current.removeAllListeners();
                vapiRef.current = null;
              }
              if (mounted) {
                setShowTranscript(true);
              }
            }, 1000);
          }
        });
        
        // Add speech events
        vapiInstance.on('speech-start', () => {
          console.log('Speech started - setting isSpeaking to true');
          if (mounted) {
            setIsSpeaking(true);
          }
        });
        
        vapiInstance.on('speech-end', () => {
          console.log('Speech ended - setting isSpeaking to false');
          if (mounted) {
            setIsSpeaking(false);
          }
        });
        
        vapiInstance.on('message', (message: any) => {
          if (!mounted) return;
          
          // Only log important messages
          if (message.type === 'speech-update' || message.type === 'conversation-update') {
            console.log('Vapi message:', message.type);
          }
          
          if (message.type === 'speech-update') {
            console.log('Speech update:', message.status, message.role);
            setIsSpeaking(message.status === 'started');
          }
          
          if (message.type === 'conversation-update') {
            const conv = message.conversation || [];
            const formattedConversation = conv
              .filter((msg: any) => {
                if (!msg.role || !msg.content) return false;
                if (msg.role === 'system') return false;
                if (msg.role === 'assistant' && msg.content.includes('{{user_')) return false;
                return true;
              })
              .map((msg: any) => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                text: msg.content
              }));
            setConversation(formattedConversation);
          }
        });
        
        vapiInstance.on('error', (error: any) => {
          console.error('Vapi error:', error);
          if (mounted) {
            setCallStatus('ended');
          }
        });
        
        // Volume level monitoring (commented out for production)
        // vapiInstance.on('volume-level', (volume: number) => {
        //   console.log('Volume level:', volume);
        // });
        
        if (mounted) {
          vapiRef.current = vapiInstance;
          
          // Start the call with inline assistant configuration to ensure AI speaks first
          try {
            console.log('Starting Vapi call with inline assistant...');
            
            // Use inline assistant configuration instead of assistant ID
            const assistant: any = {
              firstMessage: "Hey there! I'm your AI business consultant. I'd love to learn about your business and explore where AI could make the biggest impact. What kind of business are you running?",
              model: {
                provider: "openai",
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "system" as const,
                    content: "You are a friendly AI business consultant. Your job is to understand the user's business and explore where AI could make the biggest impact. Be conversational, ask follow-up questions, and provide specific examples of how AI could help their business."
                  }
                ]
              },
              voice: {
                provider: "playht",
                voiceId: "jennifer"
              },
              // Explicitly enable client messages we need
              clientMessages: [
                "conversation-update",
                "function-call",
                "hang",
                "model-output",
                "speech-update",
                "status-update",
                "transcript",
                "user-interrupted",
                "voice-input"
              ]
            };
            
            const result = await vapiInstance.start(assistant);
            console.log('Vapi start result:', result);
          } catch (error) {
            console.error('Failed to start call:', error);
            if (mounted) {
              setCallStatus('ended');
            }
          }
        }
      } catch (error) {
        console.error('Failed to load Vapi SDK:', error);
        if (mounted) {
          setCallStatus('ended');
        }
      }
    };
    
    initializeAndStartCall();
    
    // Cleanup function - only run when this effect re-runs or component unmounts
    return () => {
      mounted = false;
    };
  }, [callStatus]); // Keep dependency but structure differently

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current.removeAllListeners();
        vapiRef.current = null;
      }
    };
  }, []);

  const startChat = () => {
    setCallStatus('connecting');
  };

  const endCall = async () => {
    console.log('endCall triggered, vapiRef.current:', vapiRef.current);
    if (vapiRef.current && callStatus === 'connected') {
      try {
        // First update status to prevent multiple calls
        setCallStatus('ended');
        await vapiRef.current.stop();
        vapiRef.current.removeAllListeners();
        vapiRef.current = null;
        setTimeout(() => setShowTranscript(true), 1000);
      } catch (error) {
        console.error('Error stopping call:', error);
        // Even if error, ensure we transition state
        setCallStatus('ended');
        setTimeout(() => setShowTranscript(true), 1000);
      }
    }
  };

  if (showTranscript) {
    return <VapiChatSDKSimple userData={null} onClose={() => setShowTranscript(false)} initialConversation={conversation} />;
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

        {callStatus === 'idle' ? (
          <button
            onClick={startChat}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-semibold text-gray-900 transition-all duration-200 transform hover:scale-105"
          >
            {/* Button background with glass effect */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-200" />
            
            {/* Button gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-75 blur group-hover:opacity-100 transition-opacity duration-200" />
            
            {/* Button content */}
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
            {/* Active call container with fixed width */}
            <div className="relative bg-white/90 backdrop-blur-sm rounded-full shadow-2xl px-8 py-4 flex items-center space-x-4 min-w-[320px]">
              {/* Voice visualization with fixed container */}
              <div className="w-[50px] h-[32px] flex items-center justify-center">
                <div className="flex space-x-1">
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
              
              {/* Status text with fixed width */}
              <span className="text-gray-900 w-[140px] text-center">
                {callStatus === 'connecting' && 'Connecting...'}
                {callStatus === 'connected' && (isSpeaking ? 'AI is speaking...' : 'Listening...')}
                {callStatus === 'ended' && 'Call ended'}
              </span>
              
              {/* End call button */}
              {callStatus === 'connected' && (
                <button
                  onClick={endCall}
                  className="ml-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
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
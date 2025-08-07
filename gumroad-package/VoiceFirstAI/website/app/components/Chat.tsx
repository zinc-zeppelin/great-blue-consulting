'use client';

import { useState, useCallback, useEffect } from 'react';
import { useConversation } from '@elevenlabs/react';

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface UserData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface ChatProps {
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

export default function Chat({ userData }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTextMode, setIsTextMode] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [debugInfo, setDebugInfo] = useState({
    status: 'idle',
    isSpeaking: false,
    audioActive: false,
    lastEvent: 'none'
  });

  const conversation = useConversation({
    onConnect: () => {
      console.log('🟢 Connected to ElevenLabs', {
        timestamp: new Date().toISOString(),
        conversationStatus: conversation.status,
        isSpeaking: conversation.isSpeaking,
        userData
      });
      setDebugInfo(prev => ({ ...prev, lastEvent: 'connected' }));
      setMessages(prev => [...prev, {
        content: `Connected! I have your information and I'm ready to discuss how AI can help ${userData.company}. You can speak to me or switch to text mode to type messages.`,
        role: 'assistant',
        timestamp: new Date()
      }]);
    },
    onDisconnect: () => {
      console.log('🔴 Disconnected from ElevenLabs', {
        timestamp: new Date().toISOString()
      });
      setDebugInfo(prev => ({ ...prev, lastEvent: 'disconnected' }));
      setMessages(prev => [...prev, {
        content: 'Conversation ended.',
        role: 'assistant',
        timestamp: new Date()
      }]);
    },
    onMessage: (message: any) => {
      console.log('💬 Message received:', {
        message,
        timestamp: new Date().toISOString(),
        type: typeof message
      });
      setDebugInfo(prev => ({ ...prev, lastEvent: 'message' }));
      // Handle different message formats
      if (typeof message === 'string') {
        // Simple string message
        setMessages(prev => [...prev, {
          content: message,
          role: 'assistant',
          timestamp: new Date()
        }]);
      } else if (message && message.message) {
        // Structured message format
        setMessages(prev => [...prev, {
          content: message.message.content || message.message || '',
          role: message.message.role || 'assistant',
          timestamp: new Date()
        }]);
      }
    },
    onError: (error: any) => {
      console.error('❌ Conversation error details:', {
        error,
        message: error.message,
        type: error.type,
        code: error.code,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      setDebugInfo(prev => ({ ...prev, lastEvent: `error: ${error.message}` }));
      setMessages(prev => [...prev, {
        content: `Error: ${error.message || 'Something went wrong'}`,
        role: 'assistant',
        timestamp: new Date()
      }]);
    },
    // Add new debugging handlers
    onModeChange: (data: any) => {
      console.log('🔄 Mode changed:', data);
      setDebugInfo(prev => ({ ...prev, lastEvent: `mode: ${data?.mode || 'unknown'}` }));
    },
    onStatusChange: (status: any) => {
      console.log('📊 Status changed:', status);
      setDebugInfo(prev => ({ ...prev, status: status || 'unknown' }));
    },
    onAudioData: (data: any) => {
      console.log('🎤 Audio data received:', {
        hasData: !!data,
        timestamp: new Date().toISOString()
      });
    },
    onVolumeChange: (volume: any) => {
      console.log('🔊 Volume change:', volume);
    }
  });

  const startConversation = useCallback(async () => {
    try {
      console.log('🚀 Starting conversation...');
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('🎙️ Microphone stream obtained:', {
        active: stream.active,
        id: stream.id,
        tracks: stream.getTracks().map(track => ({
          kind: track.kind,
          label: track.label,
          enabled: track.enabled,
          muted: track.muted,
          readyState: track.readyState,
          settings: track.getSettings()
        }))
      });
      setAudioStream(stream);
      setDebugInfo(prev => ({ ...prev, audioActive: stream.active }));
      
      // Start conversation with your agent ID and dynamic variables
      console.log('📡 Starting session with config:', {
        agentId: 'agent_5501k0vy6b9zet2v2vabyytrs0y9',
        connectionType: 'webrtc',
        dynamicVariables: {
          user_name: userData.name,
          user_email: userData.email,
          user_company: userData.company,
          user_service: getServiceLabel(userData.service),
          user_message: userData.message
        }
      });
      
      const sessionId = await conversation.startSession({
        agentId: 'agent_5501k0vy6b9zet2v2vabyytrs0y9', // Replace with your agent ID
        connectionType: 'webrtc', // or 'websocket'
        dynamicVariables: {
          user_name: userData.name,
          user_email: userData.email,
          user_company: userData.company,
          user_service: getServiceLabel(userData.service),
          user_message: userData.message
        }
      });
      
      console.log('✅ Session started:', {
        sessionId,
        conversationStatus: conversation.status,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Failed to start conversation:', error);
      setMessages(prev => [...prev, {
        content: 'Failed to start conversation. Please check your microphone permissions.',
        role: 'assistant',
        timestamp: new Date()
      }]);
    }
  }, [conversation, userData]);

  const endConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  const sendTextMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || conversation.status !== 'connected') return;

    // Add user message to chat
    setMessages(prev => [...prev, {
      content: inputText,
      role: 'user',
      timestamp: new Date()
    }]);

    // Send message to AI using the sendUserMessage method
    if (conversation.sendUserMessage) {
      conversation.sendUserMessage(inputText);
    }
    
    setInputText('');
  }, [inputText, conversation]);

  // Auto-start conversation when component mounts
  useEffect(() => {
    startConversation();
  }, []);

  // Update debug info with conversation status
  useEffect(() => {
    setDebugInfo(prev => ({
      ...prev,
      status: conversation.status,
      isSpeaking: conversation.isSpeaking || false
    }));
  }, [conversation.status, conversation.isSpeaking]);

  // Make debugging functions available globally
  useEffect(() => {
    (window as any).debugConversation = {
      conversation,
      audioStream,
      debugInfo,
      checkMicrophone: async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('🎙️ Microphone test:', stream.getTracks());
          stream.getTracks().forEach(track => track.stop());
          return true;
        } catch (e) {
          console.error('❌ Microphone test failed:', e);
          return false;
        }
      },
      getStatus: () => ({
        status: conversation.status,
        isSpeaking: conversation.isSpeaking,
        audioActive: audioStream?.active,
        debugInfo
      }),
      testAudioContext: () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        console.log('🔊 Audio Context State:', audioContext.state);
        if (audioContext.state === 'suspended') {
          audioContext.resume().then(() => {
            console.log('✅ Audio Context resumed');
          });
        }
        return audioContext.state;
      }
    };
    
    console.log('🐛 Debug functions available in console: window.debugConversation');
  }, [conversation, audioStream, debugInfo]);

  return (
    <section id="ai-chat" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {userData.name}!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's explore how AI automation can help {userData.company}. 
            Our AI consultant is ready to discuss your needs.
          </p>
        </div>
        
        {/* Debug Panel */}
        <div className="mb-4 bg-gray-100 p-3 rounded-lg text-xs font-mono">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <span className="font-semibold">Status:</span> {debugInfo.status}
            </div>
            <div>
              <span className="font-semibold">Speaking:</span> {debugInfo.isSpeaking ? 'Yes' : 'No'}
            </div>
            <div>
              <span className="font-semibold">Audio:</span> {debugInfo.audioActive ? 'Active' : 'Inactive'}
            </div>
            <div>
              <span className="font-semibold">Last Event:</span> {debugInfo.lastEvent}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-lg mb-4">No messages yet.</p>
                <p>Click "Start Voice Chat" to begin a conversation.</p>
              </div>
            ) : (
              messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-800 shadow-md'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-green-100' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Controls Area */}
          <div className="border-t border-gray-200 bg-white p-4">
            {/* Status and Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  conversation.status === 'connected' ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span className="text-sm text-gray-600">
                  {conversation.status === 'connected' 
                    ? (isTextMode 
                      ? 'Text mode active' 
                      : (conversation.isSpeaking ? 'AI is speaking...' : 'Listening...'))
                    : 'Not connected'}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={startConversation}
                  disabled={conversation.status === 'connected'}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    conversation.status === 'connected'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Start Voice Chat
                </button>
                <button
                  onClick={endConversation}
                  disabled={conversation.status !== 'connected'}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    conversation.status !== 'connected'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  End Chat
                </button>
                <button
                  onClick={() => setIsTextMode(!isTextMode)}
                  className={`px-4 py-2 rounded-md font-medium transition ${
                    isTextMode
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                  title="Toggle text input mode"
                >
                  {isTextMode ? 'Voice Mode' : 'Text Mode'}
                </button>
              </div>
            </div>

            {/* Text Input (Optional - for text mode) */}
            {isTextMode && conversation.status === 'connected' && (
              <form onSubmit={sendTextMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    if (conversation.sendUserActivity) {
                      conversation.sendUserActivity();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Prefer traditional contact? <a href="#contact" className="text-green-600 hover:underline">Fill out our form below</a>
          </p>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';

interface UserData {
  name: string;
  email: string;
  company: string;
}

interface VapiChatSDKProps {
  userData: UserData | null;
  onClose?: () => void;
  initialConversation?: Array<{role: string, text: string}>;
}

export default function VapiChatSDKSimple({ userData, onClose, initialConversation = [] }: VapiChatSDKProps) {
  const [vapi, setVapi] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);
  const [showForm, setShowForm] = useState(true); // Show form immediately since call already ended
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<Array<{role: string, text: string}>>(initialConversation);

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
          setTimeout(() => setShowForm(true), 1000);
        });
        
        vapiInstance.on('message', (message) => {
          // Handle speech status updates
          if (message.type === 'speech-update') {
            setIsSpeaking(message.status === 'started');
          }
          
          // Handle conversation updates for clean transcript
          if (message.type === 'conversation-update') {
            const conversation = message.conversation || [];
            const formattedConversation = conversation
              .filter((msg: any) => {
                // Filter out system messages and empty content
                if (!msg.role || !msg.content) return false;
                if (msg.role === 'system') return false;
                // Filter out the initial system prompt that contains user variables
                if (msg.role === 'assistant' && msg.content.includes('{{user_')) return false;
                return true;
              })
              .map((msg: any) => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                text: msg.content
              }));
            setConversation(formattedConversation);
          }
          
          // Still track individual transcripts for real-time display if needed
          if (message.type === 'transcript' && message.transcript) {
            setTranscript(prev => [...prev, {
              role: message.role,
              text: message.transcript
            }]);
          }
        });
        
        vapiInstance.on('error', (error) => {
          console.error('Vapi error:', error);
          setCallStatus('ended');
        });
        
        setVapi(vapiInstance);
        
        // Start the call after a delay to ensure everything is ready
        setTimeout(() => {
          if (vapiInstance) {
            startCall(vapiInstance);
          }
        }, 2000);
      } catch (error) {
        console.error('Failed to load Vapi SDK:', error);
      }
    };
    
    initializeVapi();
  }, []);

  const startCall = async (vapiInstance: any) => {
    if (!vapiInstance) {
      console.error('Vapi instance not available');
      return;
    }
    
    try {
      setCallStatus('connecting');
      console.log('Starting Vapi call...');
      
      // Start with just the assistant ID, no overrides needed for initial chat
      await vapiInstance.start('e5ff7a8b-b4a5-4e78-916c-40dd483c23d7');
      console.log('Vapi call started successfully');
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('ended');
      // Show error to user
      alert('Unable to start voice chat. Please check your microphone permissions and try again.');
    }
  };

  const endCall = async () => {
    if (vapi) {
      await vapi.stop();
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the form data and transcript to your backend
    console.log('Saving consultation:', {
      sessionId,
      formData,
      transcript
    });
    
    // For now, just show success
    alert('Your consultation has been saved! We\'ll email you the full transcript.');
    
    if (onClose) {
      onClose();
    }
  };

  // Since we're coming from VoiceHeroEnhanced after call ended, show form directly
  return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your AI Consultation Transcript
            </h2>
            
            {/* Transcript Box */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto">
              {(conversation.length > 0 ? conversation : transcript).map((message, idx) => (
                <div key={idx} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    {message.role === 'user' ? 'You' : 'AI Consultant'}
                  </p>
                  <p className={`inline-block px-4 py-2 rounded-lg ${
                    message.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'
                  }`}>
                    {message.text}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get your personalized AI insights and implementation ideas:
              </h3>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Email Me AI Insights & Ideas
                </button>
              </form>
              
              <p className="text-sm text-gray-600 mt-4 text-center">
                We'll send you the transcript plus personalized AI implementation ideas for your business
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
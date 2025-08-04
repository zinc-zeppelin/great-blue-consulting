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
}

export default function VapiChatSDKSimple({ userData, onClose }: VapiChatSDKProps) {
  const [vapi, setVapi] = useState<any>(null);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [transcript, setTranscript] = useState<Array<{role: string, text: string}>>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);

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
        
        // Start the call after a short delay to ensure everything is ready
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
  }, []);

  const startCall = async (vapiInstance: any) => {
    if (!vapiInstance) {
      console.error('Vapi instance not available');
      return;
    }
    
    try {
      setCallStatus('connecting');
      console.log('Starting Vapi call...');
      
      const config: any = {
        assistantOverrides: {
          metadata: { sessionId },
          // Always provide variableValues with defaults when userData is null
          variableValues: userData ? {
            user_name: userData.name,
            user_email: userData.email,
            user_company: userData.company
          } : {
            user_name: '',
            user_email: '',
            user_company: '',
            user_service: '',
            user_message: ''
          }
        }
      };
      
      await vapiInstance.start('e5ff7a8b-b4a5-4e78-916c-40dd483c23d7', config);
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

  // Show form after chat
  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Your AI Consultation Transcript
            </h2>
            
            {/* Transcript Box */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 max-h-96 overflow-y-auto">
              {transcript.map((message, idx) => (
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
                This conversation is temporary. Save your personalized insights:
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
                  Email Me This Consultation
                </button>
              </form>
              
              <p className="text-sm text-gray-600 mt-4 text-center">
                We'll send you the full transcript plus additional resources
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Voice chat interface
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          {/* Simple voice visualization */}
          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 bg-green-500 rounded-full transition-all duration-300 ${
                  callStatus === 'connected' ? 'h-8' : 'h-4'
                }`}
                style={{
                  height: callStatus === 'connected' ? `${Math.random() * 32 + 8}px` : '16px'
                }}
              />
            ))}
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {callStatus === 'connecting' && 'Connecting to your AI consultant...'}
            {callStatus === 'connected' && 'AI Consultant is listening...'}
            {callStatus === 'ended' && 'Conversation ended'}
            {callStatus === 'idle' && 'Preparing your consultation...'}
          </h2>
          
          <p className="text-gray-600">
            {callStatus === 'connected' && 'Speak naturally about your business needs'}
          </p>
        </div>
        
        {callStatus === 'connected' && (
          <button
            onClick={endCall}
            className="px-8 py-3 text-gray-700 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            End Conversation
          </button>
        )}
      </div>
    </div>
  );
}
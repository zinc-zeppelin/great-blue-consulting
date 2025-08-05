'use client';

import { useEffect, useState } from 'react';

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
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [conversation, setConversation] = useState<Array<{role: string, text: string}>>(initialConversation);

  // Don't initialize Vapi here - we're just showing the form after the call ended
  useEffect(() => {
    // If we have an initial conversation from the parent, use it
    if (initialConversation && initialConversation.length > 0) {
      setConversation(initialConversation);
    }
  }, [initialConversation]);


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would send the form data and transcript to your backend
    console.log('Saving consultation:', {
      sessionId,
      formData,
      conversation
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
              {conversation.map((message, idx) => (
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
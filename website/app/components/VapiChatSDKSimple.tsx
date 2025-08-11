'use client';

import { useEffect, useState } from 'react';
import { trackConversionStep } from '../utils/analytics';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Don't initialize Vapi here - we're just showing the form after the call ended
  useEffect(() => {
    // If we have an initial conversation from the parent, use it
    if (initialConversation && initialConversation.length > 0) {
      setConversation(initialConversation);
    }
    
    // Track that form was viewed
    trackConversionStep('form_viewed');
  }, [initialConversation]);


  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Send to n8n webhook endpoint
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          formData,
          conversation,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send consultation data');
      }

      setSubmitStatus('success');
      
      // Track successful form submission - THE ULTIMATE CONVERSION!
      trackConversionStep('form_submitted');
      
      // Wait a moment to show success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting consultation:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
              {conversation.length === 0 ? (
                <p className="text-gray-500 text-center">No conversation recorded. Please ensure you had a conversation before ending the call.</p>
              ) : (
                conversation.map((message, idx) => (
                <div key={idx} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm font-semibold text-gray-600 mb-1">
                    {message.role === 'user' ? 'You' : 'AI Consultant'}
                  </p>
                  <p className={`inline-block px-4 py-2 rounded-lg ${
                    message.role === 'user' ? 'bg-gray-100 text-gray-900' : 'bg-[#23A6B5]/10 text-[#1E3A5F]'
                  }`}>
                    {message.text}
                  </p>
                </div>
              ))
              )}
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A6B5] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A6B5] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#23A6B5] focus:border-transparent"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-200 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#23A6B5] hover:bg-[#1A8A94]'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Email Me AI Insights & Ideas'}
                </button>
              </form>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-[#23A6B5]/10 border border-[#23A6B5] text-[#1E3A5F] rounded-lg">
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm">Your AI insights are being prepared and will be emailed to you shortly.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">Failed to send your consultation. Please try again or contact support.</p>
                </div>
              )}
              
              {submitStatus === 'idle' && (
                <p className="text-sm text-gray-600 mt-4 text-center">
                  We'll send you personalized AI implementation ideas and insights tailored to your business
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
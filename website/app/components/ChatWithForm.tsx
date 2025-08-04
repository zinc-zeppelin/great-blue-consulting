'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';
import VapiChatSDK from './VapiChatSDK';

interface UserData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

export default function ChatWithForm() {
  const [showChat, setShowChat] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFormSubmit = (data: UserData) => {
    setIsTransitioning(true);
    setUserData(data);
    
    // Add a smooth transition delay
    setTimeout(() => {
      setShowChat(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
      {!showChat ? (
        <ContactForm onSubmit={handleFormSubmit} />
      ) : (
        <div className="animate-fadeIn">
          <VapiChatSDK userData={userData!} />
        </div>
      )}
    </div>
  );
}
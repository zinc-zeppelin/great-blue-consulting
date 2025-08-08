import VoiceChat from './components/VoiceChat';
import AboutJake from './components/AboutJake';
import HowItWorks from './components/HowItWorks';
import AICapabilities from './components/AICapabilities';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

export default function Home() {
  return (
    <>
      <main>
        <VoiceChat />
        <AboutJake />
        <HowItWorks />
        <AICapabilities />
        <FAQ />
        <CTA />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 Great Blue Consulting. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
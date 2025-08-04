import Navigation from './components/Navigation';
import VoiceHeroEnhanced from './components/VoiceHeroEnhanced';
import HowItWorks from './components/HowItWorks';
import AICapabilities from './components/AICapabilities';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <VoiceHeroEnhanced />
        <HowItWorks />
        <AICapabilities />
        <Services />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">PineAI Consulting</h3>
              <p className="text-gray-400">Transforming businesses with intelligent automation solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-green-400 transition">AI Strategy</a></li>
                <li><a href="#services" className="hover:text-green-400 transition">Process Automation</a></li>
                <li><a href="#services" className="hover:text-green-400 transition">Custom Development</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition">About Us</a></li>
                <li><a href="#testimonials" className="hover:text-green-400 transition">Case Studies</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-green-400 transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-green-400 transition">Twitter</a></li>
                <li><a href="mailto:hello@pineai.com" className="hover:text-green-400 transition">hello@pineai.com</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 PineAI Consulting. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-green-400 transition">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-green-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
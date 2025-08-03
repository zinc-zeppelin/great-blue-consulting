import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ChatWithForm from './components/ChatWithForm';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ChatWithForm />
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p>&copy; 2025 PineAI Consulting. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="/privacy" className="hover:text-green-400 transition">Privacy Policy</a>
              <a href="/terms" className="hover:text-green-400 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
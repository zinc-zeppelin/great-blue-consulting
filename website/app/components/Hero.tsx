export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Business Solutions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your business operations with cutting-edge AI automation. 
            We help small businesses leverage artificial intelligence to streamline 
            workflows, enhance customer experiences, and drive growth.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#ai-chat" 
              className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
            >
              Chat with AI Assistant
            </a>
            <a 
              href="#contact" 
              className="bg-white text-green-600 px-8 py-3 rounded-md text-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
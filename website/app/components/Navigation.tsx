export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-green-600">PineAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#ai-chat" className="text-gray-700 hover:text-green-600 transition">
              AI Assistant
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition">
              Contact
            </a>
            <a href="#ai-chat" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
              Chat Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
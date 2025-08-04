export default function HeroEnhanced() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-green-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{' '}
            Business
            <br />
            Transformation
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Unlock the power of conversational AI to streamline your operations, 
            enhance customer experience, and drive growth with personalized automation solutions.
          </p>
          
          {/* Value props */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm">
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="font-semibold text-gray-900">10x Faster</h3>
              <p className="text-sm text-gray-600">Response times</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900">50% Cost Reduction</h3>
              <p className="text-sm text-gray-600">In operational expenses</p>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow-sm">
              <div className="text-3xl mb-2">😊</div>
              <h3 className="font-semibold text-gray-900">95% Satisfaction</h3>
              <p className="text-sm text-gray-600">Customer happiness rate</p>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center">
            <a href="#ai-consultation" className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition">
              <span className="font-medium">Start Your AI Consultation</span>
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
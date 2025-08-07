export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -top-20 -right-20 w-80 h-80 bg-white rounded-full" />
            <div className="absolute transform rotate-45 -bottom-20 -left-20 w-80 h-80 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-green-50 max-w-2xl mx-auto">
              Talk to our AI consultant now and get a personalized automation roadmap in minutes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-full hover:bg-green-50 transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Start Free Consultation
              </a>
              
              <a
                href="#services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-green-600 transition-all duration-200"
              >
                View Our Services
              </a>
            </div>
            
            <p className="mt-8 text-green-100">
              No credit card required • Get insights in 5 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
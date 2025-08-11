import Link from 'next/link';

export const metadata = {
  title: 'How It Works - Great Blue AI | Portland, Maine',
  description: 'Discover the technology stack behind Great Blue AI. Learn how we use Vapi, n8n, and AI to transform your business.',
};

export default function HowItWorks() {
  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#23A6B5] to-[#1E3A5F] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How This Magic Works
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              Full transparency on the AI and automation powering your consultation experience
            </p>
          </div>
        </div>

        {/* Tech Stack Details */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* The Flow */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Complete Process</h2>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      1
                    </div>
                    <h3 className="font-bold text-lg mb-2">You Click & Talk</h3>
                    <p className="text-gray-600">Our Vapi-powered AI assistant engages you in natural conversation about your business challenges.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      2
                    </div>
                    <h3 className="font-bold text-lg mb-2">AI Analyzes</h3>
                    <p className="text-gray-600">GPT-4 processes your specific pain points and matches them against proven automation patterns.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      3
                    </div>
                    <h3 className="font-bold text-lg mb-2">Automation Triggers</h3>
                    <p className="text-gray-600">n8n workflow automation kicks in, orchestrating data flow between multiple systems.</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-[#23A6B5] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      4
                    </div>
                    <h3 className="font-bold text-lg mb-2">Custom Plan Delivered</h3>
                    <p className="text-gray-600">You receive a personalized automation roadmap tailored to your exact needs within minutes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">The Technology Stack</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TechCard
                  icon="🎙️"
                  name="Vapi AI"
                  category="Voice Intelligence"
                  description="Handles natural conversation with ultra-low latency. Vapi processes your voice in real-time, understands context, and maintains a natural dialogue flow."
                  features={["Voice recognition", "Natural language processing", "Real-time responses", "Context awareness"]}
                />
                
                <TechCard
                  icon="🧠"
                  name="OpenAI GPT-4"
                  category="AI Analysis"
                  description="The brain behind your custom recommendations. GPT-4 analyzes your unique situation and generates tailored automation strategies."
                  features={["Pattern matching", "Custom solutions", "Business analysis", "Strategic recommendations"]}
                />
                
                <TechCard
                  icon="⚡"
                  name="n8n"
                  category="Workflow Automation"
                  description="The automation engine that connects everything. n8n orchestrates the entire follow-up process without any manual intervention."
                  features={["Webhook processing", "Email automation", "Data routing", "System integration"]}
                />
                
                <TechCard
                  icon="📊"
                  name="Google Workspace"
                  category="Data Management"
                  description="Your information is organized and delivered seamlessly. Google Sheets stores lead data while Gmail ensures reliable email delivery."
                  features={["Lead tracking", "Email delivery", "Data storage", "Analytics"]}
                />
                
                <TechCard
                  icon="⚛️"
                  name="Next.js + React"
                  category="Web Framework"
                  description="The foundation of this website. Built with modern web technologies for speed, SEO, and optimal user experience."
                  features={["Server-side rendering", "Optimized performance", "Responsive design", "SEO friendly"]}
                />
                
                <TechCard
                  icon="🚂"
                  name="Railway + Netlify"
                  category="Infrastructure"
                  description="Enterprise-grade hosting ensuring 99.9% uptime. Your consultation is always available when you need it."
                  features={["Auto-scaling", "Global CDN", "SSL security", "Continuous deployment"]}
                />
              </div>
            </div>

            {/* Security & Privacy */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security & Privacy</h2>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🔒 Your Data is Protected</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Conversations processed in real-time, not permanently stored
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        SSL encryption for all data transmission
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        No sharing with third parties
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Compliant with data protection standards
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Built for Business</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Enterprise-grade infrastructure
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        99.9% uptime guarantee
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Scalable to any business size
                      </li>
                      <li className="flex items-start">
                        <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Continuous updates and improvements
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#23A6B5] to-[#1E3A5F] rounded-3xl p-12 text-white">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Experience It Yourself?
                </h2>
                <p className="text-xl mb-8 text-[#4FC3D1]">
                  Now that you know how it works, see what it can do for your business
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#23A6B5] bg-white rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Start Your AI Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2025 Great Blue AI. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Portland, Maine | Serving all of New England</p>
        </div>
      </footer>
    </>
  );
}

// Tech Card Component
function TechCard({ icon, name, category, description, features }: {
  icon: string;
  name: string;
  category: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-1">
        {features.map((feature, idx) => (
          <li key={idx} className="text-sm text-gray-500 flex items-center">
            <span className="w-1.5 h-1.5 bg-[#23A6B5] rounded-full mr-2"></span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
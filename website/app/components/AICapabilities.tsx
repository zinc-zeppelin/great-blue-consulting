export default function AICapabilities() {
  const capabilities = [
    {
      title: "Business Process Analysis",
      description: "Identify bottlenecks and inefficiencies in your workflows",
      metrics: "3x faster analysis",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Customer Support Automation",
      description: "Intelligent chatbots and ticket routing systems",
      metrics: "70% ticket reduction",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Sales Intelligence",
      description: "Lead scoring and automated follow-up sequences",
      metrics: "2x conversion rate",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Data Analytics",
      description: "Real-time insights and predictive modeling",
      metrics: "95% accuracy",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            AI Capabilities That Drive Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI consultant analyzes your specific needs and recommends the perfect automation solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-50 p-8 hover:shadow-xl transition-all duration-300">
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{capability.title}</h3>
                  <span className={`px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r ${capability.gradient} rounded-full`}>
                    {capability.metrics}
                  </span>
                </div>
                <p className="text-gray-600 text-lg">{capability.description}</p>
                
                {/* Animated arrow on hover */}
                <div className="mt-6 flex items-center text-gray-900 font-semibold group-hover:text-green-600 transition-colors duration-200">
                  <span>Learn more</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to discover which AI solutions are right for your business?
          </p>
          <a href="#" className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
            Talk to Our AI Consultant
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
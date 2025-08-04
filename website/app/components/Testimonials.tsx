export default function Testimonials() {
  const testimonials = [
    {
      quote: "The AI consultant helped us identify automation opportunities we didn't even know existed. Our customer response time went from hours to seconds.",
      author: "Sarah Chen",
      role: "CEO, TechStart Solutions",
      image: "SC",
      rating: 5
    },
    {
      quote: "Within 6 weeks, we automated 70% of our repetitive tasks. Our team can now focus on growth instead of busywork. Game-changing.",
      author: "Michael Rodriguez",
      role: "Operations Director, GrowthCo",
      image: "MR",
      rating: 5
    },
    {
      quote: "The voice consultation was surprisingly insightful. It felt like talking to a seasoned consultant who really understood our industry.",
      author: "Emily Watson",
      role: "Founder, Watson & Associates",
      image: "EW",
      rating: 5
    }
  ];

  const stats = [
    { value: "200+", label: "Businesses Transformed" },
    { value: "92%", label: "Client Satisfaction" },
    { value: "3.7x", label: "Average ROI" },
    { value: "4 weeks", label: "Avg. Implementation" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Forward-Thinking Businesses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how businesses like yours are thriving with AI automation
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              {/* Stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.image}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
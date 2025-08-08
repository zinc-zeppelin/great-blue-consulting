import Image from 'next/image';

export default function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-[#23A6B5] to-[#1E3A5F] rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute transform rotate-45 -top-20 -right-20 w-80 h-80 bg-white rounded-full" />
            <div className="absolute transform rotate-45 -bottom-20 -left-20 w-80 h-80 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10">
            {/* Small profile photo */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/30">
                <Image
                  src="/jake_profile_photo.jpg"
                  alt="Jake Mahon"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Escape the Chaos?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-[#4FC3D1] max-w-2xl mx-auto">
              Schedule a free 30-minute call with Jake to discuss your specific challenges
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendar.app.google/zHnwJy7RVWUFhNH96"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#23A6B5] bg-white rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule with Jake
              </a>
              
              <a
                href="https://www.linkedin.com/in/jakefmahon/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-[#23A6B5] transition-all duration-200"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </a>
            </div>
            
            <p className="mt-8 text-[#4FC3D1]">
              Portland, Maine • No long-term contracts • Start with a conversation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
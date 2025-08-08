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
              Talk to my AI assistant and get a custom solution roadmap
            </p>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-[#23A6B5] bg-white rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Start Talking Now
            </a>
            
            <p className="mt-8 text-[#4FC3D1]">
              No forms • No scheduling • Just solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
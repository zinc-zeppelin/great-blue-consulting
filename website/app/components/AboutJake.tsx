import Image from 'next/image';

export default function AboutJake() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#23A6B5] to-[#4FC3D1] rounded-2xl transform rotate-6"></div>
              <Image
                src="/jake_profile_photo.jpg"
                alt="Jake Mahon - AI Strategy Director"
                width={400}
                height={400}
                className="relative rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Hi, I'm Jake Mahon
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                As <strong className="text-[#23A6B5]">Director of AI Strategy for Customer Experience</strong> at a leading cybersecurity company, 
                I know how to implement AI transformations that actually work. I've seen firsthand 
                how the right automation can transform a drowning team into a thriving one.
              </p>
              
              <p>
                Based in <strong className="text-[#23A6B5]">Portland, Maine</strong>, I help small businesses escape operational 
                chaos without adding headcount. When I'm not designing AI workflows, you'll find me 
                birding along the Maine coast, playing chess, or hiking with my dog.
              </p>
              
              <p className="font-medium text-[#1E3A5F]">
                I believe every small business deserves enterprise-level efficiency without 
                enterprise-level complexity or cost.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/jakefmahon/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#005885] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                Connect on LinkedIn
              </a>
              
              <a
                href="https://calendar.app.google/zHnwJy7RVWUFhNH96"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#23A6B5] text-white rounded-lg hover:bg-[#1A8A94] transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from 'next/image'

export default function Performances() {
  const performances = [
    {
      title: "上海职工合唱大赛",
      date: "2024-09-15",
      venue: "上海音乐厅",
      description: "上海市总工会第二届职工文化季合唱大赛，荣获全市第二名",
      image: "/competition.jpg",
      status: "completed"
    },
    // Add more performances as needed
  ]

  return (
    <main className="min-h-screen bg-black relative">
      {/* Custom Background */}
      <div className="fixed inset-0">
        {/* Animated Wave Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="wave-line wave-1"></div>
          <div className="wave-line wave-2"></div>
          <div className="wave-line wave-3"></div>
          <div className="wave-line wave-4"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-8xl md:text-9xl font-black text-white brutal-white-text mb-8">
              演出
              <span className="block text-9xl md:text-[12rem] bg-gradient-to-r from-yellow-400 to-orange-500 
                text-transparent bg-clip-text brutal-gradient-text -mt-8">安排</span>
            </h1>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="space-y-32">
              {performances.map((performance, index) => (
                <div key={index} className="relative group">
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-500
                    group-hover:from-orange-500 group-hover:to-yellow-400 transition-colors duration-500"></div>

                  {/* Content Card */}
                  <div className="ml-8 group-hover:translate-x-2 transition-transform duration-500">
                    <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden
                      border border-white/10 group-hover:border-white/20 transition-all duration-500">
                      
                      {/* Image Section */}
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={performance.image || "/placeholder-performance.jpg"}
                          alt={performance.title}
                          width={1200}
                          height={675}
                          className="object-cover w-full h-full transform group-hover:scale-105 
                            transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-8 relative">
                        {/* Status Badge */}
                        <div className={`absolute top-0 right-8 -translate-y-1/2 px-6 py-2 rounded-full 
                          backdrop-blur-md border border-white/20 
                          ${performance.status === 'upcoming' 
                            ? 'bg-yellow-400/20 text-yellow-400' 
                            : 'bg-green-500/20 text-green-400'}`}>
                          {performance.status === 'upcoming' ? '即将开始' : '已完成'}
                        </div>

                        <h3 className="text-4xl font-black text-white brutal-white-text mb-4">
                          {performance.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-6 mb-4 text-white/80">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {performance.date}
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {performance.venue}
                          </div>
                        </div>

                        <p className="text-lg text-white/70">
                          {performance.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 
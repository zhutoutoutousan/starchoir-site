import Image from 'next/image'

export default function Join() {
  const requirements = [
    { title: "年龄要求", desc: "18-45岁，热爱音乐的年轻人" },
    { title: "时间投入", desc: "每周固定排练，重要演出季需要额外时间" },
    { title: "音乐基础", desc: "具备基本的视唱练耳能力，有合唱经验者优先" },
    { title: "团队精神", desc: "积极向上，热爱团队活动，有责任心" },
  ]

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Musical Chaos Background */}
      <div className="fixed inset-0">
        {/* Floating Music Notes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute music-note-${i % 4} text-white/10 text-7xl
                animate-float-random transform`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            >
              {['♪', '♫', '♩', '♬'][i % 4]}
            </div>
          ))}
        </div>

        {/* Chaotic Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent
                animate-chaos-line"
              style={{
                top: `${20 * (i + 1)}%`,
                left: '0',
                right: '0',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-8xl md:text-9xl font-black text-white brutal-white-text mb-8 relative">
              加入
              <span className="block text-9xl md:text-[12rem] bg-gradient-to-r from-yellow-400 to-orange-500 
                text-transparent bg-clip-text brutal-gradient-text -mt-8">我们</span>
              <div className="absolute -right-20 top-0 animate-bounce-slow">
                <div className="text-6xl transform rotate-12">🎵</div>
              </div>
            </h1>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left Column - Requirements */}
              <div className="space-y-12">
                <h2 className="text-4xl font-bold text-white brutal-white-text mb-8">
                  加入要求
                </h2>
                <div className="space-y-8">
                  {requirements.map((req, index) => (
                    <div 
                      key={index}
                      className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-6
                        border border-white/10 hover:border-white/20 transition-all duration-300
                        hover:translate-x-2"
                    >
                      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6
                        bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full
                        group-hover:scale-125 transition-transform duration-300" />
                      
                      <h3 className="text-xl font-bold text-white mb-2">{req.title}</h3>
                      <p className="text-white/70">{req.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Application Form */}
              <div className="relative">
                <div className="sticky top-8 bg-white/5 backdrop-blur-sm rounded-2xl p-8
                  border border-white/10 hover:border-white/20 transition-all duration-300">
                  <h2 className="text-4xl font-bold text-white brutal-white-text mb-8">
                    申请表
                  </h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-white mb-2">姓名</label>
                      <input 
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-white/50 focus:outline-none focus:border-yellow-400
                          transition-colors duration-300"
                        placeholder="你的名字"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2">声部意向</label>
                      <select 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white focus:outline-none focus:border-yellow-400
                          transition-colors duration-300"
                      >
                        <option value="" className="bg-black">请选择</option>
                        <option value="soprano" className="bg-black">女高音</option>
                        <option value="alto" className="bg-black">女中音</option>
                        <option value="tenor" className="bg-black">男高音</option>
                        <option value="bass" className="bg-black">男低音</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white mb-2">音乐经历</label>
                      <textarea 
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
                          text-white placeholder-white/50 focus:outline-none focus:border-yellow-400
                          transition-colors duration-300 h-32 resize-none"
                        placeholder="简述你的音乐经历..."
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500
                        text-black font-bold text-lg rounded-lg hover:scale-105
                        transition-transform duration-300 brutal-shadow"
                    >
                      提交申请
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <main className="bg-black min-h-screen relative">
      {/* Starry Background - Fixed to create parallax effect */}
      <div className="fixed inset-0">
        <div className="stars-container">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
        </div>
        {/* Additional nebula effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-purple-500/20 
            rounded-full filter blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 
            rounded-full filter blur-[100px] translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-[60vh] flex items-center">
          <div className="max-w-7xl mx-auto px-8 py-24 md:py-32">
            <h1 className="text-7xl md:text-8xl font-black text-white brutal-white-text mb-8">
              关于
              <span className="block text-8xl md:text-9xl bg-gradient-to-r from-yellow-400 to-orange-500 
                text-transparent bg-clip-text brutal-gradient-text">我们</span>
            </h1>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white brutal-white-text">
                汇聚音乐的力量
              </h2>
              <div className="space-y-6 text-lg text-white/80">
                <p>
                  上海星扬室内合唱团成立于2024年6月，为上海市总工会沪东工人文化宫艺术团团队，
                  是一支汇聚众多音乐爱好者与专业人士的青年精英团体。
                </p>
                <p>
                  合唱团由作曲、指挥家方勇担任艺术总监及常任指挥，青年指挥家黄湘担任艺术指导与指挥，
                  青年钢琴家晋亮担任钢琴伴奏，女高音歌唱家叶引弟担任声乐艺术指导。
                </p>
              </div>
            </div>

            {/* Image Section - Same as before but with adjusted styling */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden h-[500px] group">
                <Image
                  src="/competition.jpg"
                  alt="上海职工合唱大赛"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 
                    group-hover:scale-105"
                />
                {/* Glassmorphism Info Card */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/40 backdrop-blur-md
                  translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white text-lg font-medium mb-2">
                    荣获佳绩
                  </p>
                  <p className="text-white/90 text-sm">
                    2024年9月，合唱团参加上海市总工会第二届职工文化季"上海职工合唱大赛"，
                    荣获全市第二名的佳绩。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section with Enhanced Glass Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: '30+', label: '专业团员' },
                { number: '2nd', label: '上海职工合唱大赛' },
                { number: '75周年', label: '国庆献礼演出' },
              ].map((stat, index) => (
                <div key={index} className="relative group hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-lg rounded-xl"></div>
                  <div className="relative p-8 rounded-xl border border-white/20">
                    <div className="text-5xl font-black text-white brutal-white-text mb-2">{stat.number}</div>
                    <div className="text-lg text-white/80">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Content Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-white/80">
              <p>
                星扬室内合唱团以现代、流行作品为主打，同时也能轻松驾驭古典和经典合唱作品，
                在不断追求音乐潮流的同时，将传统文化和跨界元素融入音乐创作和表演之中，
                让经典与新声交融，多元与活力碰撞。
              </p>
              <p>
                成立三个月以来，上海星扬室内合唱团积极参与各类音乐艺术活动，并不断展现其卓越的艺术实力。
                10月1日合唱团受邀参加了庆祝中华人民共和国成立75周年上海职工合唱展演，赢得了广泛的赞誉。
              </p>
              <p>
                未来，星扬室内合唱团将继续追求高水准与高品质，用音乐向外界展示团队特色和音乐实力。
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <TeamSection />
      </div>
    </main>
  )
}

// Replace the existing team section with this:
{/* Team Section */}
<TeamSection />

// Keep these components at the bottom of the file
function AnimatedTeamPlaceholder({ name, role }: { name: string, role: string }) {
  return (
    <div className="group relative">
      <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br 
        from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10
        relative">
        {/* Animated Music Notes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="animate-float-slow absolute top-1/4 left-1/4 
            text-white/30 text-4xl transform -rotate-12">♪</div>
          <div className="animate-float-medium absolute top-1/2 left-1/2 
            text-white/20 text-5xl transform rotate-45">♫</div>
          <div className="animate-float-fast absolute bottom-1/4 right-1/4 
            text-white/25 text-3xl transform rotate-12">♩</div>
        </div>

        {/* Animated Avatar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20
            flex items-center justify-center group-hover:scale-110 
            transition-transform duration-300 relative">
            <span className="text-4xl font-black text-white">{name[0]}</span>
            {/* Orbiting Dot */}
            <div className="absolute w-3 h-3 rounded-full bg-yellow-400/80
              animate-orbit group-hover:animate-orbit-fast" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold text-white brutal-white-text">{name}</h3>
        <p className="text-lg text-white/80">{role}</p>
      </div>
    </div>
  )
}

function TeamSection() {
  const team = [
    { name: '方勇', role: '艺术总监', image: '' },
    { name: '黄湘', role: '艺术指导', image: '' },
    { name: '晋亮', role: '钢琴伴奏', image: '' },
    { name: '叶引弟', role: '声乐艺术指导', image: '' },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white brutal-white-text mb-16 text-center">
          我们的团队
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {team.map((member, index) => (
            <AnimatedTeamPlaceholder 
              key={index}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Add these animations to your globals.css


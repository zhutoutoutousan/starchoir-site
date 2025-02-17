import Image from 'next/image'
import { useState } from 'react'

type SponsorTier = {
  name: string
  amount: string
  benefits: string[]
  icon: string
  color: string
}

export default function Sponsor() {
  const sponsorTiers: SponsorTier[] = [
    {
      name: "音符赞助",
      amount: "¥500",
      benefits: [
        "获得专属感谢证书",
        "音乐会优先购票权",
        "官网名单鸣谢",
      ],
      icon: "♪",
      color: "from-blue-400 to-purple-400"
    },
    {
      name: "和声赞助",
      amount: "¥2,000",
      benefits: [
        "获得专属感谢证书",
        "音乐会VIP座位券 2张",
        "官网名单鸣谢",
        "合唱团周边礼包",
      ],
      icon: "♫",
      color: "from-yellow-400 to-orange-500"
    },
    {
      name: "交响赞助",
      amount: "¥5,000",
      benefits: [
        "获得专属感谢证书",
        "音乐会VIP座位券 4张",
        "官网名单鸣谢",
        "合唱团周边礼包",
        "年度音乐会定制海报",
        "赞助商Logo展示",
      ],
      icon: "♬",
      color: "from-rose-400 to-pink-600"
    },
  ]

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-float-random"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 15}s`
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
              支持
              <span className="block text-9xl md:text-[12rem] bg-gradient-to-r from-yellow-400 to-orange-500 
                text-transparent bg-clip-text brutal-gradient-text -mt-8">我们</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-2xl">
              您的支持是我们前进的动力。加入我们的赞助计划，一起创造音乐的魅力。
            </p>
          </div>
        </section>

        {/* Sponsor Tiers */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sponsorTiers.map((tier, index) => (
                <div
                  key={index}
                  className="group relative"
                >
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8
                    border border-white/10 hover:border-white/20 transition-all duration-500
                    hover:transform hover:scale-105 hover:rotate-1">
                    {/* Floating Icon */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full
                      bg-gradient-to-r border-2 border-white/20 backdrop-blur-sm
                      flex items-center justify-center text-3xl animate-bounce-slow
                      group-hover:animate-none group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        '--tw-gradient-from': tier.color.split(' ')[0].split('-')[1],
                        '--tw-gradient-to': tier.color.split(' ')[2],
                      }}>
                      {tier.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-white mb-4">{tier.name}</h3>
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r
                      mb-6" style={{
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        '--tw-gradient-from': tier.color.split(' ')[0].split('-')[1],
                        '--tw-gradient-to': tier.color.split(' ')[2],
                      }}>
                      {tier.amount}
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-white/80 group-hover:text-white
                          transition-colors duration-300">
                          <span className="mr-2 text-yellow-400">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* Action Button */}
                    <button className="w-full py-4 px-6 rounded-xl bg-white/10 text-white
                      border border-white/20 hover:bg-white/20 transition-all duration-300
                      font-bold group-hover:transform group-hover:translate-y-1">
                      成为赞助者
                    </button>
                  </div>

                  {/* Achievement Badge - Shows on hover */}
                  <div className="absolute -top-4 -left-4 transform scale-0 group-hover:scale-100
                    transition-transform duration-300 rotate-12 group-hover:rotate-0">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center
                      text-black font-bold text-sm animate-pulse">
                      Lv.{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Thanks Section */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-4xl font-bold text-white brutal-white-text text-center mb-12">
              特别鸣谢
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-video relative rounded-lg overflow-hidden
                  bg-white/10 hover:bg-white/20 transition-all duration-300
                  group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/50 group-hover:text-white/80 transition-colors duration-300">
                      赞助商 Logo
                    </span>
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


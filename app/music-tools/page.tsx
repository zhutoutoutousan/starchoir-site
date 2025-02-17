'use client'

import { useState } from 'react'
import Image from 'next/image'
import TunerGame from '../components/tuner-game'
import PitchTrainer from '../components/pitch-trainer'
import RhythmGame from '../components/rhythm-game'
import Metronome from '../components/metronome'
import PitchSinging from '../components/pitch-singing'

type Tool = {
  id: string
  name: string
  description: string
  icon: string
  color: string
  comingSoon?: boolean
}

export default function MusicTools() {
  const tools: Tool[] = [
    {
      id: 'metronome',
      name: '节拍器',
      description: '专业的在线节拍器，支持自定义拍号和速度',
      icon: '🎵',
      color: 'from-blue-400 to-purple-400',
      comingSoon: false
    },
    {
      id: 'tuner',
      name: '调音器',
      description: '精确的音高检测，帮助你保持完美音准',
      icon: '🎼',
      color: 'from-yellow-400 to-orange-500',
      comingSoon: false
    },
    {
      id: 'score-reader',
      name: '谱面阅读',
      description: '上传乐谱，在线练习视唱',
      icon: '📜',
      color: 'from-green-400 to-emerald-500',
      comingSoon: true
    },
    {
      id: 'pitch-trainer',
      name: '音高训练',
      description: '提高你的音准和音程识别能力',
      icon: '🎯',
      color: 'from-rose-400 to-pink-600',
      comingSoon: false
    },
    {
      id: 'rhythm-game',
      name: '节奏游戏',
      description: '通过有趣的游戏提高节奏感',
      icon: '🎮',
      color: 'from-violet-400 to-purple-600',
      comingSoon: false
    },
    {
      id: 'voice-recorder',
      name: '音准训练',
      description: '练习音准，实时获得反馈',
      icon: '🎙️',
      color: 'from-cyan-400 to-blue-500',
      comingSoon: false
    }
  ]

  const [activeToolId, setActiveToolId] = useState<string | null>(null)

  return (
    <main className="min-h-screen bg-black relative overflow-hidden">
      {/* Musical Background */}
      <div className="fixed inset-0">
        {/* Animated Staff Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-white/10 transform"
              style={{
                top: `${30 + i * 10}%`,
                animation: `staffLine ${10 + i * 2}s linear infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Random Musical Symbols */}
        <div className="absolute inset-0">
          {['♪', '♫', '♩', '♬', '𝄞', '𝄢'].map((symbol, i) => (
            <div
              key={i}
              className="absolute text-4xl text-white/5 animate-float-random"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              {symbol}
            </div>
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
            <h1 className="text-8xl md:text-9xl font-black text-white brutal-white-text mb-8">
              音乐
              <span className="block text-9xl md:text-[12rem] bg-gradient-to-r from-yellow-400 to-orange-500 
                text-transparent bg-clip-text brutal-gradient-text -mt-8">工具箱</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-2xl">
              专为合唱团打造的在线音乐工具集，助你提升音乐技能。
            </p>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative"
                  onClick={() => !tool.comingSoon && setActiveToolId(tool.id)}
                >
                  <div className={`relative bg-white/5 backdrop-blur-sm rounded-2xl p-8
                    border border-white/10 transition-all duration-500
                    ${tool.comingSoon ? 'opacity-70' : 'hover:border-white/20 hover:transform hover:scale-105 cursor-pointer'}`}
                  >
                    {/* Tool Icon */}
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tool.color}
                      flex items-center justify-center text-3xl mb-6
                      group-hover:scale-110 transition-transform duration-300`}>
                      {tool.icon}
                    </div>

                    {/* Tool Content */}
                    <h3 className="text-2xl font-bold text-white mb-2">{tool.name}</h3>
                    <p className="text-white/70">{tool.description}</p>

                    {/* Coming Soon Badge */}
                    {tool.comingSoon && (
                      <div className="absolute top-4 right-4 px-4 py-1 rounded-full
                        bg-white/10 border border-white/20 text-white/60 text-sm">
                        即将推出
                      </div>
                    )}

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0
                      group-hover:opacity-10 transition-opacity duration-300"
                      style={{
                        backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        '--tw-gradient-from': tool.color.split(' ')[0].split('-')[1],
                        '--tw-gradient-to': tool.color.split(' ')[2],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Tools Teaser */}
        <section className="py-20 bg-white/5">
          <div className="max-w-7xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold text-white brutal-white-text mb-8">
              更多工具正在开发中
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              我们正在不断开发新的音乐工具，敬请期待更多功能的加入！
            </p>
          </div>
        </section>
      </div>

      {/* Tool Modal - Add your tool implementations here */}
      {activeToolId === 'metronome' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveToolId(null)} />
          <div className="relative bg-black/90 border border-white/20 rounded-2xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">节拍训练</h3>
              <button 
                onClick={() => setActiveToolId(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
            <Metronome />
          </div>
        </div>
      )}

      {activeToolId === 'tuner' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveToolId(null)} />
          <div className="relative bg-black/90 border border-white/20 rounded-2xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">音高训练游戏</h3>
              <button 
                onClick={() => setActiveToolId(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
            <TunerGame />
          </div>
        </div>
      )}

      {activeToolId === 'pitch-trainer' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveToolId(null)} />
          <div className="relative bg-black/90 border border-white/20 rounded-2xl p-8 max-w-5xl w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">高级音高训练</h3>
              <button 
                onClick={() => setActiveToolId(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
            <PitchTrainer />
          </div>
        </div>
      )}

      {activeToolId === 'rhythm-game' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveToolId(null)} />
          <div className="relative bg-black/90 border border-white/20 rounded-2xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">节奏训练游戏</h3>
              <button 
                onClick={() => setActiveToolId(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
            <RhythmGame />
          </div>
        </div>
      )}

      {activeToolId === 'voice-recorder' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setActiveToolId(null)} />
          <div className="relative bg-black/90 border border-white/20 rounded-2xl p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">音准训练</h3>
              <button 
                onClick={() => setActiveToolId(null)}
                className="text-white/60 hover:text-white transition-colors"
              >
                关闭
              </button>
            </div>
            <PitchSinging />
          </div>
        </div>
      )}
    </main>
  )
}


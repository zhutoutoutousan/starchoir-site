'use client'

import { useState, useEffect, useRef } from 'react'

type BeatPattern = {
  pattern: number[]  // 1 for beat, 0 for rest
  tempo: number      // BPM
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const PATTERNS: BeatPattern[] = [
  { pattern: [1, 0, 1, 0], tempo: 80, name: '基础二拍子', difficulty: 'easy' },
  { pattern: [1, 0, 0, 1, 0, 0], tempo: 90, name: '华尔兹', difficulty: 'easy' },
  { pattern: [1, 0, 1, 0, 1, 0, 1, 0], tempo: 100, name: '行进曲', difficulty: 'medium' },
  { pattern: [1, 0, 0, 1, 0, 1, 0, 0], tempo: 110, name: '伦巴', difficulty: 'medium' },
  { pattern: [1, 1, 0, 1, 0, 1, 1, 0], tempo: 120, name: '爵士节奏', difficulty: 'hard' },
  { pattern: [1, 0, 1, 1, 0, 1, 0, 1], tempo: 130, name: '桑巴', difficulty: 'hard' },
]

export default function RhythmGame() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [currentPattern, setCurrentPattern] = useState<BeatPattern | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userPattern, setUserPattern] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [visualizer, setVisualizer] = useState<number[]>([])
  const [combo, setCombo] = useState(0)
  const [highestCombo, setHighestCombo] = useState(0)
  
  const lastTapTime = useRef(0)
  const patternTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
      if (patternTimeout.current) clearTimeout(patternTimeout.current)
    }
  }, [])

  const playBeat = (isAccent = false) => {
    if (!audioContext) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = isAccent ? 'triangle' : 'sine'
    oscillator.frequency.setValueAtTime(isAccent ? 800 : 600, audioContext.currentTime)

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(isAccent ? 0.4 : 0.2, audioContext.currentTime + 0.01)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.1)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const playPattern = (pattern: BeatPattern) => {
    setIsPlaying(true)
    setUserPattern([])
    setVisualizer([])
    
    const beatDuration = 60000 / pattern.tempo // ms per beat
    let currentBeat = 0

    const playNextBeat = () => {
      if (currentBeat < pattern.pattern.length) {
        if (pattern.pattern[currentBeat]) {
          playBeat(true)
        }
        setVisualizer(prev => [...prev, pattern.pattern[currentBeat]])
        currentBeat++
        patternTimeout.current = setTimeout(playNextBeat, beatDuration)
      } else {
        setIsPlaying(false)
        setVisualizer([])
      }
    }

    playNextBeat()
  }

  const startNewRound = () => {
    if (patternTimeout.current) clearTimeout(patternTimeout.current)
    const availablePatterns = PATTERNS.filter(p => p.difficulty === difficulty)
    const newPattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)]
    setCurrentPattern(newPattern)
    setUserPattern([])
    setFeedback('')
    playPattern(newPattern)
  }

  const handleTap = () => {
    if (!currentPattern || isPlaying) return

    const now = Date.now()
    const expectedBeatDuration = 60000 / currentPattern.tempo
    
    if (lastTapTime.current && (now - lastTapTime.current) > expectedBeatDuration * 2) {
      setUserPattern([])
    }
    
    lastTapTime.current = now
    playBeat()
    
    setUserPattern(prev => {
      const newPattern = [...prev, 1]
      if (newPattern.length === currentPattern.pattern.length) {
        checkPattern(newPattern)
        return []
      }
      return newPattern
    })
  }

  const checkPattern = (pattern: number[]) => {
    if (!currentPattern) return

    const accuracy = pattern.reduce((acc, beat, i) => {
      return acc + (beat === currentPattern.pattern[i] ? 1 : 0)
    }, 0) / pattern.length

    if (accuracy >= 0.8) {
      setScore(prev => prev + Math.floor(accuracy * 100))
      setCombo(prev => prev + 1)
      setHighestCombo(prev => Math.max(prev, combo + 1))
      setFeedback('完美！继续保持 🎵')
    } else if (accuracy >= 0.5) {
      setScore(prev => prev + Math.floor(accuracy * 50))
      setFeedback('不错！再接再厉 👍')
      setCombo(0)
    } else {
      setFeedback('继续练习 💪')
      setCombo(0)
    }
  }

  return (
    <div className="space-y-8">
      {/* Difficulty Selection */}
      <div className="flex gap-4 justify-center">
        {(['easy', 'medium', 'hard'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-300
              ${difficulty === level 
                ? 'bg-yellow-400 text-black' 
                : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {level === 'easy' ? '简单' : level === 'medium' ? '中等' : '困难'}
          </button>
        ))}
      </div>

      {/* Score and Combo Display */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-xl text-white/80">
            得分: <span className="text-yellow-400 font-bold">{score}</span>
          </div>
          <div className="text-sm text-white/60">
            连击: <span className="text-green-400 font-bold">{combo}</span>
            <span className="text-white/40 ml-2">最高: {highestCombo}</span>
          </div>
        </div>
        <button
          onClick={startNewRound}
          disabled={isPlaying}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500
            rounded-xl text-black font-bold hover:scale-105 transition-transform
            duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPlaying ? '播放中...' : '播放节奏'}
        </button>
      </div>

      {/* Pattern Visualizer */}
      <div className="flex justify-center gap-2 h-20">
        {visualizer.map((beat, index) => (
          <div
            key={index}
            className={`w-4 transition-all duration-300 rounded-t-lg
              ${beat ? 'bg-yellow-400 h-full' : 'bg-white/20 h-1/3'}`}
          />
        ))}
      </div>

      {/* Tap Area */}
      <button
        onClick={handleTap}
        disabled={isPlaying}
        className="w-full h-48 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20
          backdrop-blur-sm border-2 border-white/10 hover:border-white/20
          transition-all duration-300 relative overflow-hidden
          disabled:opacity-50 disabled:hover:border-white/10"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/80 text-xl font-bold">
            {isPlaying ? '请听节奏...' : '点击这里跟随节奏！'}
          </div>
        </div>
        {/* Ripple Effect on Tap */}
        {userPattern.map((_, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-white/20 animate-ripple rounded-2xl"
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </button>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center text-xl font-bold p-4 rounded-xl ${
          feedback.includes('完美') ? 'text-green-400' : 
          feedback.includes('不错') ? 'text-yellow-400' : 'text-orange-400'
        }`}>
          {feedback}
        </div>
      )}

      {/* Current Pattern Info */}
      {currentPattern && (
        <div className="text-center text-white/60">
          <p>当前节奏: {currentPattern.name}</p>
          <p className="text-sm">速度: {currentPattern.tempo} BPM</p>
        </div>
      )}

      {/* Instructions */}
      <div className="text-white/60 text-center space-y-2">
        <p>1. 点击"播放节奏"听示范</p>
        <p>2. 在大按钮上点击，跟随节奏</p>
        <p>3. 保持节奏获得更高分数！</p>
      </div>
    </div>
  )
} 
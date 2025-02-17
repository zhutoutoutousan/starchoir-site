'use client'

import { useState, useEffect, useRef } from 'react'

type TempoRange = {
  min: number
  max: number
  name: string
  difficulty: 'easy' | 'medium' | 'hard'
}

const TEMPO_RANGES: TempoRange[] = [
  { min: 60, max: 80, name: 'Largo (慢板)', difficulty: 'easy' },
  { min: 76, max: 108, name: 'Andante (行板)', difficulty: 'easy' },
  { min: 108, max: 120, name: 'Moderato (中板)', difficulty: 'medium' },
  { min: 120, max: 156, name: 'Allegro (快板)', difficulty: 'medium' },
  { min: 152, max: 176, name: 'Vivace (活泼)', difficulty: 'hard' },
  { min: 172, max: 200, name: 'Presto (急板)', difficulty: 'hard' },
]

export default function Metronome() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTempo, setCurrentTempo] = useState<number | null>(null)
  const [userTaps, setUserTaps] = useState<number[]>([])
  const [estimatedTempo, setEstimatedTempo] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [showAnswer, setShowAnswer] = useState(false)
  const [streak, setStreak] = useState(0)

  const metronomeInterval = useRef<NodeJS.Timeout | null>(null)
  const lastTapTime = useRef<number>(0)

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
      if (metronomeInterval.current) clearInterval(metronomeInterval.current)
    }
  }, [])

  const playClick = (isAccent = false) => {
    if (!audioContext) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = isAccent ? 'triangle' : 'sine'
    oscillator.frequency.setValueAtTime(isAccent ? 1000 : 800, audioContext.currentTime)

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(isAccent ? 0.3 : 0.2, audioContext.currentTime + 0.01)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.05)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.05)
  }

  const startMetronome = () => {
    if (metronomeInterval.current) clearInterval(metronomeInterval.current)
    
    const availableRanges = TEMPO_RANGES.filter(r => r.difficulty === difficulty)
    const selectedRange = availableRanges[Math.floor(Math.random() * availableRanges.length)]
    const tempo = Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min
    
    setCurrentTempo(tempo)
    setUserTaps([])
    setEstimatedTempo(null)
    setShowAnswer(false)
    setFeedback('')
    setIsPlaying(true)

    let beatCount = 0
    const interval = 60000 / tempo // milliseconds per beat

    playClick(true)
    metronomeInterval.current = setInterval(() => {
      beatCount++
      playClick(beatCount % 4 === 0)
    }, interval)

    // Play for 4 measures (16 beats)
    setTimeout(() => {
      if (metronomeInterval.current) clearInterval(metronomeInterval.current)
      setIsPlaying(false)
    }, interval * 16)
  }

  const handleTap = () => {
    if (isPlaying || !currentTempo) return

    const now = Date.now()
    
    if (lastTapTime.current && (now - lastTapTime.current) > 2000) {
      setUserTaps([])
    }

    playClick()
    lastTapTime.current = now
    
    setUserTaps(prev => {
      const newTaps = [...prev, now]
      if (newTaps.length > 8) newTaps.shift() // Keep last 8 taps
      return newTaps
    })

    // Calculate tempo after 4 taps
    if (userTaps.length >= 3) {
      const intervals = userTaps.slice(1).map((tap, i) => tap - userTaps[i])
      const averageInterval = intervals.reduce((a, b) => a + b) / intervals.length
      const estimatedBPM = Math.round(60000 / averageInterval)
      setEstimatedTempo(estimatedBPM)
    }
  }

  const checkAnswer = () => {
    if (!currentTempo || !estimatedTempo) return
    
    const accuracy = Math.abs(currentTempo - estimatedTempo) / currentTempo
    setShowAnswer(true)

    if (accuracy <= 0.05) { // Within 5%
      setScore(prev => prev + 100)
      setStreak(prev => prev + 1)
      setFeedback('太棒了！非常准确 🎯')
    } else if (accuracy <= 0.1) { // Within 10%
      setScore(prev => prev + 50)
      setStreak(prev => prev + 1)
      setFeedback('不错！很接近了 👍')
    } else {
      setStreak(0)
      setFeedback('继续练习，你可以的！💪')
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

      {/* Score Display */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-xl text-white/80">
            得分: <span className="text-yellow-400 font-bold">{score}</span>
          </div>
          <div className="text-sm text-white/60">
            连续: <span className="text-green-400 font-bold">{streak}</span>
          </div>
        </div>
        <button
          onClick={startMetronome}
          disabled={isPlaying}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500
            rounded-xl text-black font-bold hover:scale-105 transition-transform
            duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPlaying ? '播放中...' : '开始'}
        </button>
      </div>

      {/* Tap Area */}
      <div className="relative">
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
              {isPlaying ? '请听节拍...' : '点击这里跟随节拍！'}
            </div>
          </div>
          {/* Visual Feedback */}
          {userTaps.map((_, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-white/20 animate-ripple rounded-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </button>

        {/* Estimated Tempo Display */}
        {estimatedTempo && !isPlaying && (
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full
            bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="text-white/80">
              估计速度: <span className="text-yellow-400 font-bold">{estimatedTempo} BPM</span>
            </span>
          </div>
        )}
      </div>

      {/* Check Answer Button */}
      {estimatedTempo && !isPlaying && !showAnswer && (
        <button
          onClick={checkAnswer}
          className="w-full py-3 bg-white/10 text-white border border-white/20
            rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          检查答案
        </button>
      )}

      {/* Feedback and Answer */}
      {feedback && (
        <div className="space-y-2 text-center">
          <div className={`text-xl font-bold p-4 rounded-xl ${
            feedback.includes('太棒') ? 'text-green-400' : 
            feedback.includes('不错') ? 'text-yellow-400' : 'text-orange-400'
          }`}>
            {feedback}
          </div>
          {showAnswer && currentTempo && (
            <div className="text-white/80">
              正确速度: <span className="text-yellow-400 font-bold">{currentTempo} BPM</span>
              <span className="text-white/60 text-sm ml-2">
                ({TEMPO_RANGES.find(r => 
                  currentTempo >= r.min && currentTempo <= r.max
                )?.name})
              </span>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="text-white/60 text-center space-y-2">
        <p>1. 点击"开始"听示范节拍</p>
        <p>2. 在大按钮上点击，尽量保持相同的速度</p>
        <p>3. 至少点击4下来估算速度</p>
        <p className="text-sm">提示：速度单位为BPM（每分钟节拍数）</p>
      </div>
    </div>
  )
} 
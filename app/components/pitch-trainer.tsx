'use client'

import { useState, useEffect } from 'react'

type Note = {
  frequency: number
  notation: string  // e.g., "C4", "A3"
  displayName: string // e.g., "c4", "a3"
}

// Generate notes from C1 to C7
const generateNotes = (): Note[] => {
  const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const notes: Note[] = []
  
  for (let octave = 1; octave <= 7; octave++) {
    for (const name of noteNames) {
      // Base frequency of A4 is 440Hz
      const A4 = 440
      const A4_INDEX = 48 // Index of A4 in the piano (starting from C1)
      const currentIndex = (octave - 1) * 7 + noteNames.indexOf(name)
      const halfSteps = (currentIndex * 12/7) - A4_INDEX
      const frequency = A4 * Math.pow(2, halfSteps/12)
      
      notes.push({
        frequency: Number(frequency.toFixed(2)),
        notation: `${name}${octave}`,
        displayName: `${name.toLowerCase()}${octave}`
      })
    }
  }
  return notes
}

const NOTES = generateNotes()

type ChordType = {
  notes: Note[]
  name: string
}

export default function PitchTrainer() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [currentChord, setCurrentChord] = useState<ChordType | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string>('')
  const [showAnswer, setShowAnswer] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
    }
  }, [])

  const generateChord = (noteCount: number) => {
    const notes: Note[] = []
    const usedOctaves = new Set()
    
    while (notes.length < noteCount) {
      const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)]
      const octave = randomNote.notation[1]
      
      // Avoid too many notes in the same octave
      if (!usedOctaves.has(octave) || Math.random() > 0.7) {
        notes.push(randomNote)
        usedOctaves.add(octave)
      }
    }
    
    return {
      notes,
      name: notes.map(n => n.displayName).join(' ')
    }
  }

  const playChord = (chord: ChordType) => {
    if (!audioContext) return

    chord.notes.forEach(note => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime)

      // Envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3 / chord.notes.length, audioContext.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2)

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 2)
    })

    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
  }

  const startNewRound = () => {
    const noteCount = difficulty === 'easy' ? 2 : difficulty === 'medium' ? 3 : 4
    const newChord = generateChord(noteCount)
    setCurrentChord(newChord)
    setUserInput('')
    setShowAnswer(false)
    setFeedback('')
    playChord(newChord)
  }

  const checkAnswer = () => {
    if (!currentChord) return
    
    const userNotes = userInput.toLowerCase().split(' ').sort()
    const correctNotes = currentChord.notes.map(n => n.displayName).sort()
    
    setShowAnswer(true)
    
    if (userNotes.join(' ') === correctNotes.join(' ')) {
      setScore(score + difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)
      setFeedback('正确！👏')
    } else {
      setFeedback(`错误！正确答案是 ${correctNotes.join(' ')} 😅`)
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
        <div className="text-xl text-white/80">
          得分: <span className="text-yellow-400 font-bold">{score}</span>
        </div>
        <button
          onClick={startNewRound}
          disabled={isPlaying}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500
            rounded-xl text-black font-bold hover:scale-105 transition-transform
            duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPlaying ? '播放中...' : '播放和弦'}
        </button>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="输入音符，例如: c4 e4 g4"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg
            text-white placeholder-white/50 focus:outline-none focus:border-yellow-400
            transition-colors duration-300"
        />
        <button
          onClick={checkAnswer}
          disabled={!userInput || isPlaying || showAnswer}
          className="w-full py-3 bg-white/10 text-white border border-white/20
            rounded-lg hover:bg-white/20 transition-all duration-300
            disabled:opacity-50 disabled:hover:bg-white/10"
        >
          检查答案
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center text-xl font-bold p-4 rounded-xl ${
          feedback.includes('正确') ? 'text-green-400' : 'text-orange-400'
        }`}>
          {feedback}
        </div>
      )}

      {/* Instructions */}
      <div className="text-white/60 text-center space-y-2">
        <p>听音后，输入你听到的音符，用空格分隔。</p>
        <p>例如：c4 e4 g4（C大调和弦）</p>
        <p className="text-sm">提示：数字表示八度，1-7分别对应不同音区</p>
      </div>

      {/* Visual Piano */}
      <div className="overflow-x-auto">
        <div className="flex justify-start space-x-1 min-w-[800px]">
          {NOTES.map((note, index) => (
            <div key={index} className="relative">
              <div className={`w-6 h-32 rounded-b-lg transition-colors duration-300
                ${currentChord?.notes.some(n => n.notation === note.notation) && showAnswer
                  ? 'bg-yellow-400' 
                  : 'bg-white/90'}`}
              />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-black">
                {note.displayName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 
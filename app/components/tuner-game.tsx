'use client'

import { useState, useEffect } from 'react'

type Note = {
  frequency: number
  name: string
  octave: number
}

const NOTES: Note[] = [
  { frequency: 261.63, name: 'C', octave: 4 },
  { frequency: 293.66, name: 'D', octave: 4 },
  { frequency: 329.63, name: 'E', octave: 4 },
  { frequency: 349.23, name: 'F', octave: 4 },
  { frequency: 392.00, name: 'G', octave: 4 },
  { frequency: 440.00, name: 'A', octave: 4 },
  { frequency: 493.88, name: 'B', octave: 4 },
  { frequency: 523.25, name: 'C', octave: 5 },
]

export default function TunerGame() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedNote, setSelectedNote] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string>('')
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    setAudioContext(ctx)
    return () => {
      ctx.close()
    }
  }, [])

  const playNote = (note: Note) => {
    if (!audioContext) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime)

    // Envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 2)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 2)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 2000)
  }

  const startNewRound = () => {
    const randomNote = NOTES[Math.floor(Math.random() * NOTES.length)]
    setCurrentNote(randomNote)
    setSelectedNote(null)
    setShowAnswer(false)
    setFeedback('')
    playNote(randomNote)
  }

  const checkAnswer = (noteName: string) => {
    if (!currentNote) return
    setSelectedNote(noteName)
    setShowAnswer(true)

    if (noteName === currentNote.name) {
      setScore(score + 1)
      setFeedback('正确！👏')
    } else {
      setFeedback(`错误！正确答案是 ${currentNote.name} 😅`)
    }
  }

  return (
    <div className="space-y-8">
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
          {isPlaying ? '播放中...' : '播放音符'}
        </button>
      </div>

      {/* Note Buttons */}
      <div className="grid grid-cols-4 gap-4">
        {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
          <button
            key={note}
            onClick={() => checkAnswer(note)}
            disabled={isPlaying || showAnswer}
            className={`p-6 rounded-xl text-2xl font-bold transition-all duration-300
              ${selectedNote === note 
                ? 'bg-yellow-400 text-black scale-95' 
                : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}
              ${showAnswer && currentNote?.name === note ? 'ring-4 ring-green-500' : ''}
              disabled:opacity-50 disabled:hover:scale-100`}
          >
            {note}
          </button>
        ))}
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
      <div className="text-white/60 text-center">
        听音后，点击对应的音符按钮。试着识别音高！
      </div>

      {/* Visual Aid - Piano Keys */}
      <div className="flex justify-center space-x-1 mt-8">
        {NOTES.slice(0, 7).map((note, index) => (
          <div
            key={index}
            className={`w-8 h-32 rounded-b-lg transition-colors duration-300
              ${currentNote?.name === note.name && showAnswer 
                ? 'bg-yellow-400' 
                : 'bg-white/90'}`}
          />
        ))}
      </div>
    </div>
  )
} 
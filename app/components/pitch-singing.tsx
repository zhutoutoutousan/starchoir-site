'use client'

import { useState, useEffect, useRef } from 'react'

type Note = {
  notation: string
  frequency: number
  name: string
}

// Generate notes within human vocal range (roughly A2 to C6)
const VOCAL_NOTES: Note[] = (() => {
  const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  const notes: Note[] = []
  
  for (let octave = 2; octave <= 6; octave++) {
    for (const name of noteNames) {
      // Base frequency of A4 is 440Hz
      const A4 = 440
      const A4_INDEX = 57 // Index of A4 from A2
      const currentIndex = ((octave - 2) * 12) + noteNames.indexOf(name)
      const halfSteps = currentIndex - A4_INDEX
      const frequency = A4 * Math.pow(2, halfSteps/12)
      
      // Only include notes within typical vocal range
      if (frequency >= 80 && frequency <= 1050) {
        notes.push({
          notation: `${name}${octave}`,
          frequency: Number(frequency.toFixed(1)),
          name: `${name.toLowerCase()}${octave}`
        })
      }
    }
  }
  return notes
})()

export default function PitchSinging() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [pitchHistory, setPitchHistory] = useState<number[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [holdDuration, setHoldDuration] = useState(0)
  const [targetHoldDuration] = useState(2000) // 2 seconds to hold
  const [currentFrequency, setCurrentFrequency] = useState<number | null>(null)
  const [microphoneError, setMicrophoneError] = useState<string>('')

  const animationFrame = useRef<number>()
  const startTime = useRef<number>(0)

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current)
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [mediaStream])

  const startListening = async () => {
    try {
      // First create audio context
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioContext(ctx)

      // Request microphone access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      })

      // Create and configure analyser node
      const analyserNode = ctx.createAnalyser()
      analyserNode.fftSize = 2048
      analyserNode.smoothingTimeConstant = 0.8

      // Create source from microphone stream
      const source = ctx.createMediaStreamSource(stream)
      source.connect(analyserNode)
      // Don't connect to destination to avoid feedback
      // analyserNode.connect(ctx.destination)

      setAnalyser(analyserNode)
      setMediaStream(stream)
      setIsListening(true)
      setMicrophoneError('')
      startPitchDetection(analyserNode)
    } catch (error: any) {
      console.error('Microphone error:', error)
      setMicrophoneError(
        error.name === 'NotAllowedError' 
          ? '请允许使用麦克风来开始练习' 
          : '无法访问麦克风，请检查设备连接'
      )
      setIsListening(false)
    }
  }

  const stopListening = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop())
    }
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current)
    }
    if (audioContext) {
      audioContext.close()
    }
    setIsListening(false)
    setMediaStream(null)
    setPitchHistory([])
    setCurrentFrequency(null)
    setMicrophoneError('')
  }

  const playNote = (note: Note) => {
    if (!audioContext) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime)

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1)
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1)

    oscillator.start()
    oscillator.stop(audioContext.currentTime + 1)
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 1000)
  }

  const startNewExercise = () => {
    const randomNote = VOCAL_NOTES[Math.floor(Math.random() * VOCAL_NOTES.length)]
    setCurrentNote(randomNote)
    setHoldDuration(0)
    startTime.current = 0
    setPitchHistory([])
    setFeedback('')
    playNote(randomNote)
  }

  const autoCorrelate = (buffer: Float32Array, sampleRate: number) => {
    const SIZE = buffer.length
    const MAX_SAMPLES = Math.floor(SIZE/2)
    let bestOffset = -1
    let bestCorrelation = 0
    let rms = 0

    // Calculate RMS
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i]
      rms += val * val
    }
    rms = Math.sqrt(rms/SIZE)

    // Even lower threshold for detecting sound
    if (rms < 0.003) return -1 // More sensitive threshold

    let lastCorrelation = 1
    for (let offset = 0; offset < MAX_SAMPLES; offset++) {
      let correlation = 0

      for (let i = 0; i < MAX_SAMPLES; i++) {
        correlation += Math.abs((buffer[i]) - (buffer[i + offset]))
      }

      correlation = 1 - (correlation/MAX_SAMPLES)
      if (correlation > bestCorrelation) {
        bestCorrelation = correlation
        bestOffset = offset
      }

      if (correlation > 0.7 && correlation > lastCorrelation) { // More sensitive threshold
        break
      }
      lastCorrelation = correlation
    }

    if (bestCorrelation > 0.003) { // More sensitive threshold
      return sampleRate/bestOffset
    }
    return -1
  }

  const startPitchDetection = (analyserNode: AnalyserNode) => {
    const bufferLength = analyserNode.frequencyBinCount
    const dataArray = new Float32Array(bufferLength)

    const detectPitch = () => {
      analyserNode.getFloatTimeDomainData(dataArray)
      const frequency = autoCorrelate(dataArray, audioContext!.sampleRate)
      
      // Update current frequency regardless of current note
      if (frequency > 0) {
        setCurrentFrequency(Math.round(frequency))
        
        // Only process pitch matching if we have a current note
        if (currentNote) {
          const expectedFreq = currentNote.frequency
          const cents = Math.abs(1200 * Math.log2(frequency / expectedFreq))
          
          // Update pitch history
          setPitchHistory(prev => {
            const newHistory = [...prev, frequency]
            if (newHistory.length > 10) newHistory.shift()
            return newHistory
          })

          // Check if pitch is held steady and close to target
          if (cents < 50) { // Within 50 cents (half semitone)
            if (!startTime.current) {
              startTime.current = Date.now()
            }
            const currentDuration = Date.now() - startTime.current
            setHoldDuration(currentDuration)

            if (currentDuration >= targetHoldDuration) {
              setScore(prev => prev + 100)
              setStreak(prev => prev + 1)
              setFeedback('完美！音准很准确 🎯')
              startTime.current = 0
              setTimeout(startNewExercise, 1000)
            }
          } else {
            startTime.current = 0
            setHoldDuration(0)
            if (cents < 100) {
              setFeedback('接近了！继续调整 👍')
            } else {
              setFeedback(frequency > expectedFreq ? '音高偏高 ⬆️' : '音高偏低 ⬇️')
            }
          }
        }
      } else {
        setCurrentFrequency(null)
      }

      animationFrame.current = requestAnimationFrame(detectPitch)
    }

    detectPitch()
  }

  return (
    <div className="space-y-8">
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
          onClick={startNewExercise}
          disabled={isPlaying || !isListening}
          className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500
            rounded-xl text-black font-bold hover:scale-105 transition-transform
            duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          {isPlaying ? '播放中...' : '新音符'}
        </button>
      </div>

      {/* Current Note and Frequency Display */}
      <div className="text-center space-y-4">
        {currentNote && (
          <div>
            <div className="text-6xl font-bold text-white mb-2">
              {currentNote.notation}
            </div>
            <div className="text-white/60">
              目标频率: {currentNote.frequency.toFixed(1)} Hz
            </div>
          </div>
        )}
        
        {/* New: Current Frequency Display */}
        {isListening && (
          <div className={`text-2xl font-bold transition-all duration-300 ${
            currentFrequency 
              ? 'text-blue-400 opacity-100 transform scale-100' 
              : 'text-white/20 opacity-50 transform scale-95'
          }`}>
            当前频率: {currentFrequency ? `${currentFrequency} Hz` : '未检测到声音'}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="h-4 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-100"
          style={{ width: `${(holdDuration / targetHoldDuration) * 100}%` }}
        />
      </div>

      {/* Microphone Control with Error Message */}
      <div className="space-y-2">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
            ${isListening 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isListening ? '停止录音' : '开始录音'}
        </button>
        {microphoneError && (
          <div className="text-red-400 text-center text-sm">
            {microphoneError}
          </div>
        )}
      </div>

      {/* Audio Debug Info */}
      <div className="text-xs text-white/40 text-center">
        {isListening && (
          <>
            麦克风状态: {mediaStream?.active ? '活跃' : '未活跃'} |
            音频上下文: {audioContext?.state} |
            采样率: {audioContext?.sampleRate}Hz
          </>
        )}
      </div>

      {/* Pitch Visualization */}
      <div className="h-32 bg-black/20 rounded-xl overflow-hidden">
        <div className="flex h-full items-end">
          {pitchHistory.map((pitch, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-400/50 transition-all duration-150"
              style={{
                height: `${Math.min(100, (pitch / (currentNote?.frequency || 440)) * 50)}%`,
                marginLeft: '1px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`text-center text-xl font-bold p-4 rounded-xl ${
          feedback.includes('完美') ? 'text-green-400' : 
          feedback.includes('接近') ? 'text-yellow-400' : 'text-orange-400'
        }`}>
          {feedback}
        </div>
      )}

      {/* Instructions */}
      <div className="text-white/60 text-center space-y-2">
        <p>1. 点击"开始录音"允许使用麦克风</p>
        <p>2. 点击"新音符"听示范音高</p>
        <p>3. 跟随音高唱出并保持2秒钟</p>
        <p className="text-sm">提示：保持稳定的气息，专注于音高的准确性</p>
      </div>
    </div>
  )
} 
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CircularNav() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    ['首页', '/'],
    ['关于我们', '/about'],
    ['演出安排', '/performances'],
    ['加入我们', '/join'],
    ['支持我们', '/sponsor'],
    ['音乐工具', '/music-tools'],
  ]

  return (
    <nav className="fixed bottom-8 right-8 z-50">
      {/* Navigation Items */}
      <div className={`absolute bottom-0 right-0 transition-all duration-300 ease-in-out
        ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
      >
        {navItems.map(([label, href], index) => {
          // Calculate position in quarter circle (90 degrees)
          const angle = (index * (90 / (navItems.length - 1))) * (Math.PI / 180)
          const radius = 150 // Increased radius for better spacing
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <div
              key={href}
              className="absolute transform transition-all duration-300 ease-in-out"
              style={{
                bottom: `${y}px`,
                right: `${x}px`,
              }}
            >
              {/* Arrow pointing to the item */}
              <div className="absolute w-16 h-[2px] bg-gradient-to-r from-yellow-400/50 to-transparent
                origin-left -rotate-45 -z-10"
                style={{
                  transform: `rotate(${angle * (180 / Math.PI)}deg)`,
                  right: '50%',
                  bottom: '50%',
                }}
              />
              
              <Link
                href={href}
                className="relative flex items-center justify-center w-12 h-12
                  bg-white/10 backdrop-blur-[2px] rounded-full 
                  hover:bg-white/20 transition-all duration-300
                  border border-white/20 group"
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-[60]
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block whitespace-nowrap bg-black/80 text-white text-sm
                    px-3 py-1 rounded-full backdrop-blur-sm">
                    {label}
                  </span>
                  {/* Tooltip Arrow */}
                  <div className="w-2 h-2 bg-black/80 rotate-45 mx-auto mt-[-4px]
                    backdrop-blur-sm" />
                </div>

                {/* Navigation Item Text */}
                <span className="text-white text-lg font-bold relative z-[55]">
                  {label[0]}
                </span>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative z-[51] w-16 h-16 rounded-full 
          bg-gradient-to-r from-yellow-400 to-orange-500 
          flex items-center justify-center shadow-lg
          transition-all duration-300 ease-in-out
          ${isOpen ? 'rotate-90' : 'hover:scale-110'}`}
      >
        <div className="text-black transform transition-transform duration-300">
          {/* Music Note Icon */}
          <svg 
            className="w-8 h-8" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
        </div>
        
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 
          filter blur-md -z-10 scale-110"/>
      </button>
    </nav>
  )
} 
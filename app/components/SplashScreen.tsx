"use client"

import { useEffect, useState } from "react"

export default function SplashScreen() {
  const [logoVisible, setLogoVisible] = useState(false)
  const [textVisible, setTextVisible] = useState(false)
  const [taglineVisible, setTaglineVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const logoTimer = setTimeout(() => setLogoVisible(true), 200)
    const textTimer = setTimeout(() => setTextVisible(true), 800)
    const taglineTimer = setTimeout(() => setTaglineVisible(true), 1400)

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(textTimer)
      clearTimeout(taglineTimer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-green-50 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className={`transition-all duration-1000 ${logoVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg"></div>
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg rotate-45"></div>
        </div>
      </div>

      {/* Main Text */}
      <h1
        className={`text-6xl font-bold text-gray-800 mb-4 transition-all duration-1000 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        Guardmart
      </h1>

      {/* Tagline */}
      <p
        className={`text-xl text-gray-600 mb-16 transition-all duration-1000 ${taglineVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        Fresh. Fast. Digital.
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-green-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

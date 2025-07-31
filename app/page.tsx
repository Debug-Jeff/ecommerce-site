"use client"

import { useEffect, useState } from "react"
import SplashScreen from "./components/SplashScreen"
import MainLayout from "./components/MainLayout"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return <MainLayout />
}

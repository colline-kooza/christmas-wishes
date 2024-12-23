"use client"
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import animationData from "@/public/ani.json"

export default function SecondLottie() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <div className="relative">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="w-full h-auto max-w-[600px] mx-auto"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-500/20 rounded-full blur-3xl -z-10" />
    </div>
  )
}
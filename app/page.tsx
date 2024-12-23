"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Snowflake } from 'lucide-react'
import { useRouter } from "next/navigation"
import LottieComponent from "@/components/lottie"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SecondLottie from "@/components/SecondLottie"
import { createUser } from "../actions/user"
import {  useUserStore } from "@/lib/store"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  const { setUser, setLoading, isLoading , user } = useUserStore()

  const [showOnboarding, setShowOnboarding] = useState(false)
  const [name, setName] = useState("")
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
    
    const timer = setTimeout(() => {
      setShowOnboarding(true)
      if (user) {
        router.push("/home")
      } else {
        router.push("/")
      }
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [])


  const snowflakes = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute"
      initial={{ 
        y: -20, 
        x: window.innerWidth + Math.random() * 100
      }}
      animate={{
        y: window.innerHeight + 20,
        x: -20 - Math.random() * 100
      }}
      transition={{
        duration: Math.random() * 5 + 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Snowflake className="text-white/60" size={16} />
    </motion.div>
  ))

  const handleNext = async () => {
    if (!name.trim()) {
      return;
    }
  
    setLoading(true)
    if (name.trim()) {
      try {
        const userData = await createUser(name.trim())
        setUser(userData)
        router.push("/home")
      } catch (error) {
        console.error('Error creating user:', error)
      }finally{
        setLoading(false)
      }
    }
  }
  if (!isMounted) {
    return null
  }
  return (
    <div className="relative min-h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <div className="fixed inset-0 pointer-events-none">
        {snowflakes}
      </div>

      <AnimatePresence>
        {!showOnboarding && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-screen w-full flex items-center justify-center"
          >
            <LottieComponent />
          </motion.div>
        )}

        {showOnboarding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen w-full relative"
          >
            {/* Left Lottie */}
            <div className="absolute left-0 top-0 w-1/4 h-1/3 hidden lg:block">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full h-full"
              >
                <SecondLottie />
              </motion.div>
            </div>

            {/* Right Lottie */}
            <div className="absolute right-0 top-0 w-1/4 h-1/3 hidden lg:block">
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full h-full"
              >
             <SecondLottie />
              </motion.div>
            </div>

            {/* Top Lottie for small screens */}
            <div className="absolute inset-x-0 top-0 h-1/3 lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full h-full"
              >
                <SecondLottie />
              </motion.div>
            </div>

            {/* Center Column - Main Content */}
            <div className="w-full h-full flex items-center justify-center px-4 py-6 md:mt-9 mt-12">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full max-w-md"
              >
                <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-gray-700 shadow-xl backdrop-blur-md">
                  <CardContent className="p-8 space-y-8">
                    <motion.div 
                      className="space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                    >
                      <h2 className="text-white text-3xl font-bold text-center">
                        Welcome to Christmas Magic
                      </h2>
                      <p className="text-gray-300 text-center leading-relaxed">
                        Lets start by getting to know you. Whats your name?
                      </p>
                    </motion.div>

                    <motion.div 
                      className="relative"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 3, -3, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 flex items-center justify-center border border-yellow-500/40 backdrop-blur-sm">
                        <span className="text-4xl">🎄</span>
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-full blur-xl -z-10" />
                    </motion.div>

                    <motion.div 
                      className="space-y-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    >
                    <div className="input-field">
                    <input  name="text" type="text" 
                     onChange={(e) => setName(e.target.value)}
                    />
                     <label>Enter your name</label>
                   </div>
                      <AnimatePresence>
                        {name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="md:p-4 p-3 rounded-lg bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-500/30 backdrop-blur-sm"
                          >
                            <p className="text-yellow-300 text-center font-medium">
                              ✨ Wonderful to meet you, {name}! ✨
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
      onClick={handleNext}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold py-6 text-lg shadow-lg transition-all duration-300 transform hover:scale-105 px-4"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-900 border-t-transparent" />
          Saving...
        </div>
      ) : (
        'Start Your Christmas Journey'
      )}
    </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


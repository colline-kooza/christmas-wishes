"use client";

import { Snowflake } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      
      const difference = +christmas - +now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);
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
  return (
    <section className="bg-2 text-white py-16 mt-5 lg:px-2 px-4 min-h-[60vh] md:max-w-[1200px] mx-auto rounded-sm">
        <div className="fixed inset-0 pointer-events-none">
        {snowflakes}
      </div>
      <div className="lg:container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">Christmas is Coming:</h2>
        <p className="text-xl mb-8">We Are Waiting For the Precious Time</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center px-7">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white text-red-600 p-6 rounded-lg min-w-[100px] text-center">
              <div className="text-4xl font-bold">{value}</div>
              <div className="text-sm uppercase mt-2">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import Countdown from "@/components/Countdown";
import GiftSection from "@/components/GiftSection";
import Link from "next/link";

export default function Home() {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
      }, []);
      
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  const slides = [
    {
      number: "01",
      title: "Happy new year my friends",
      subtitle: "May your presents be many and your troubles be few",
    },
    {
      number: "02",
      title: "Merry Christmas",
      subtitle: "Spread joy and happiness this holiday season",
    },
    {
      number: "03",
      title: "Season's Greetings",
      subtitle: "Celebrate the magic of Christmas with your loved ones",
    },
  ];

  const currentSlideData = slides[currentSlide - 1];
  if (!isMounted) {
    return null;
  }
  return (
    <main className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:max-w-[1200px] mx-auto rounded-sm">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 responsive-background"
        
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full">
          <nav className="flex justify-between items-center p-6 text-white">
            <div className="text-2xl font-bold">Christmas.</div>
            <div className="md:flex gap-8 hidden">
              <a href="#" className="hover:text-red-400 transition-colors">Home</a>
              <a href="#" className="hover:text-red-400 transition-colors">Collection</a>
              <a href="#" className="hover:text-red-400 transition-colors">About</a>
              <a href="#" className="hover:text-red-400 transition-colors">Contact</a>
            </div>
          </nav>

          <div className="container mx-auto px-6 h-[calc(100%-5rem)] flex items-center">
            <div className="max-w-xl">
              <div className="text-white/60 mb-2">{currentSlideData.number}/{totalSlides}</div>
              <h1 className="md:text-5xl text-5xl font-bold text-white mb-4">{currentSlideData.title}</h1>
              <p className="text-xl text-white/80 mb-8">{currentSlideData.subtitle}</p>
              
              <div className="flex gap-4">
                <Button 
                asChild
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                    <Link href="/generate"> Generate Message</Link>
                
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                 <Link href="/generate"> Generate Card</Link>
                </Button>
              </div>

              <div className="flex gap-4 mt-12">
                <button 
                  onClick={() => setCurrentSlide(prev => prev === 1 ? totalSlides : prev - 1)}
                  className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft />
                </button>
                <button 
                  onClick={() => setCurrentSlide(prev => prev === totalSlides ? 1 : prev + 1)}
                  className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isMounted && <Countdown />}
      {isMounted && <GiftSection />}
    </main>
  );
}
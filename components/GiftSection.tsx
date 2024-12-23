"use client";

import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GiftSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Gift className="text-gold h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Marvelous Gifts for Kids</h2>
          <div className="w-48 h-1 bg-red-600 mx-auto"></div>
        </div>

        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=2070" 
            alt="Christmas gifts" 
            className="w-full min-h-[320px] md:h-[300px] object-cover"
          />
          
          <div className="absolute top-0 left-0 z-20 p-8 text-white">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full mb-4">
              <span className="flex items-center gap-2">
                <Gift size={16} />
                Our Best Pick
              </span>
            </div>
            
            <h3 className="lg:text-4xl text-3xl font-bold mb-4">Christmas Gifts For Children</h3>
            <p className="lg:text-lg text-base mb-6">Christmas is the most wonderful & magic season for children</p>
            
            <Button className="bg-red-600 hover:bg-red-700">
              Gifts for Kids & Children
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
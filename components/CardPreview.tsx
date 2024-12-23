"use client";

import { CardCustomization } from "@/lib/types";
import Image from "next/image";
import { BorderBeam } from "./ui/border-beam";

interface Props {
  customizations: CardCustomization;
  userName: string;
}

export function CardPreview({ customizations, userName }: Props) {
  return (
    <div
      className="rounded-xl shadow-2xl overflow-hidden transition-all duration-300  relative "
      style={{ backgroundColor: customizations.backgroundColor }}
    >
      <div className="relative h-48">
        <Image
          src="https://img.freepik.com/free-vector/merry-christmas-lettering-with-pine-leaves_52683-30638.jpg?ga=GA1.1.123314603.1706863307&semt=ais_hybrid"
          alt="Christmas"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 space-y-6 text-center">
        <p
          className={`text-2xl ${customizations.font}`}
          style={{ color: customizations.textColor }}
        >
          {customizations.message}
        </p>
        <p
          className={`text-base`}
         
        >
          {customizations.paragraph}
        </p>
        
        <p
          className="text-sm italic mt-4"
          style={{ color: customizations.textColor }}
        >
          From: {userName}
        </p>
      </div>
      <BorderBeam />

    </div>
  );
}
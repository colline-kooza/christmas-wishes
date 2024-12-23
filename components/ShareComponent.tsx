"use client"

import { useQuery } from "@tanstack/react-query";
import { getStyle } from "@/actions/styles";
import ChristmasCard from "@/components/ChristmasCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function SharedComponent({id}:{id:string}) {
  const { data: style, isLoading } = useQuery({
    queryKey: ["styles", id],
    queryFn: () => getStyle(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 bg-gray-400">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          <div className="w-[100%] md:w-[42%] mx-auto">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8 text-center">
          {style?.userName} S CHRISTMAS CARD
        </h1>
        <div className="w-[100%] md:w-[42%] mx-auto">
          <ChristmasCard
            customization={style}
            userName={style?.userName}
            isEditable={false}
            setCustomization
          />
        </div>
      </div>
    </div>
  );
}
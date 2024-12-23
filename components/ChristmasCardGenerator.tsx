"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Share2, RefreshCw } from "lucide-react";
import {
   AnimatePresence } from "framer-motion";
import ChristmasCard from "./ChristmasCard";
import { Button } from "@/components/ui/button";
import ShareModal from "./ShareModal";
import { CardCustomization } from "@/lib/types";
import { useUserStore } from "@/lib/store";
import { createStyle } from "@/actions/styles";
import { BiLeftArrow } from "react-icons/bi";
import Link from "next/link";
import { toast } from "sonner";

const defaultCustomization: CardCustomization = {
  message: "Wishing you a Merry Christmas and a Happy New Year!",
  backgroundColor: "#2C5530",
  textColor: "#FFFFFF",
  font: "font-serif",
  paragraph:"I am really excited to wish you a happy merry christmas and a prosperous new year"
};

interface Props {
  userData: { id: string; name: string } | null;
}
const api = process.env.NEXT_PUBLIC_BASE_URL;
export default function ChristmasCardGenerator({ userData }: Props) {
    const queryClient = useQueryClient();
    const { user } = useUserStore();
    const currentUserName=user?.name
    const [customization, setCustomization] = useState<CardCustomization>(defaultCustomization);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [styleId, setStyleId] = useState<string | null>(null);
  
    const { mutate: saveStyle, isPending } = useMutation({
        mutationFn: async () => {
          return createStyle(customization, user?.id || "anonymous", user?.name || "Anonymous");
        },
        onSuccess: (newStyle) => {
          setStyleId(newStyle.id);
          queryClient.invalidateQueries({ queryKey: ["styles", newStyle.id] });
          setIsShareModalOpen(true);
          toast("You are can share!");
        },
        onError: () => {
          toast.error("Failed to share.");
        },
      });
  
    const regenerateCard = () => {
      const newCustomization = {
        ...customization,
        backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      };
      setCustomization(newCustomization);
    //   saveStyle();
    };
  
    const shareableLink = `${api}/share?query=${styleId || "anonymous"}`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">{currentUserName} CHRISTMAS CARD</h1>
        <div className="space-x-4">
        <Button
            asChild
            className="bg-green-800 hover:bg-red-700 text-white"
            disabled={isPending}
          >
          <Link href="/home">
          <BiLeftArrow className={`mr-2 h-4 w-4`} />
          Back
          </Link>
          </Button>
        <Button
            onClick={regenerateCard}
            variant="secondary"
            className="bg-white hover:bg-gray-100"
            disabled={isPending}
          >
           
            {isPending ? "Change Theme..." : "Change Theme"}
          </Button>
          <Button
            onClick={() => saveStyle()}
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={isPending}
          >
          {
            isPending ?(
                <RefreshCw className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
            ):(
                <Share2 className="mr-2 h-4 w-4" />
            )
          }
            {isPending ? "Please wait..." : "Share"}
          </Button>
       
        </div>
      </div>

      <ChristmasCard
        customization={customization}
        setCustomization={setCustomization}
        userName={userData?.name || "Anonymous"}
      />

      <AnimatePresence>
        {isShareModalOpen && (
          <ShareModal
            shareableLink={shareableLink}
            onClose={() => setIsShareModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
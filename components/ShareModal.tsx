"use client";

import { motion } from "framer-motion";
import { X, Facebook, Twitter, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { BsWhatsapp } from "react-icons/bs";

interface Props {
  shareableLink: string;
  onClose: () => void;
}

export default function ShareModal({ shareableLink, onClose }: Props) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast("Link copied to clipboard!");
    } catch (err) {
      toast("Failed to copy link");
      console.log(err)
    }
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent("Check out my Christmas card!");
    const url = encodeURIComponent(shareableLink);
    
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };

    window.open(links[platform as keyof typeof links], "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black rounded-xl p-6 max-w-md w-full space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Share Your Card</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center p-4"
            onClick={() => shareToSocial("facebook")}
          >
            <Facebook className="h-8 w-8 text-blue-600" />
            {/* <span className="mt-2 text-sm">Facebook</span> */}
          </Button>
          <Button
            variant="outline"
            className="flex  items-center p-4 justify-center"
            onClick={() => shareToSocial("twitter")}
          >
            <Twitter className="h-8 w-8 text-blue-400" />
            {/* <span className="mt-2 text-sm ">Twitter</span> */}
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-4"
            onClick={() => shareToSocial("whatsapp")}
          >
            <BsWhatsapp className="h-8 w-8 text-green-500" />
            {/* <span className="mt-2 text-sm">WhatsApp</span> */}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            value={shareableLink}
            readOnly
            className="bg-gray-600"
          />
          <Button onClick={copyToClipboard}>
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
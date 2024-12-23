"use client"
import Lottie from "lottie-react";
import animationData from "@/public/animate2.json";

export default function LottieComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: "450px", height: "450px" }}
        />
    </div>
  );
}

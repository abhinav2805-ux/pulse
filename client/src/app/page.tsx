import Features from "@/components/Features";
import Image from "next/image";
import {MarqueeDemo} from "@/components/homeScreenSlideShow"

export default function Home() {
  return (
    <>
    <div className="min-h-screen">
    <MarqueeDemo/>

    <Features></Features>
    </div>
   
    </>
  );
}

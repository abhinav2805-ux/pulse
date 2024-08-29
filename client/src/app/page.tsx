import Features from "@/components/Features";
import Image from "next/image";
import {MarqueeDemo} from "@/components/homeScreenSlideShow"
import FAQ from "@/components/FAQ";


export default function Home() {
  return (
    <div className="min-h-screen py-16 flex flex-col px-8 rounded-xl">
      <MarqueeDemo/>
      <Features/>
      <FAQ/>  
    </div>
  );
}

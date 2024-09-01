"use client"
import Features from "@/components/Features";
import FAQ from "@/components/faq";
import Carousel from "@/components/carousel";
import India from "@react-map/india";
export default function Home() {
  return (
    <div className="min-h-screen py-16 flex  flex-col px-8 rounded-xl justify-center items-center">     
      <Carousel/>
      <Features/>
      <div className="items-center flex ">
        <India
            selectColor="blue"
            hoverColor="green"
            strokeWidth={1}
            hints={true}
            type="select-single"
        />
      </div>
      
      <FAQ/>  
    </div>
  );
}

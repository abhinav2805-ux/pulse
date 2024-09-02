"use client"
import Features from "@/components/Features";
import FAQ from "@/components/faq";
import Map from "@/components/map";
import Carousel from "@/components/carousel";
export default function Home() {
  return (
    <div className="  bg-dot-black/[0.2] min-h-screen py-16 flex space-y-6 flex-col px-8 rounded-xl justify-center items-center">     
      <Carousel/>
      <Features/>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      
      <div className="mockup-phone">
        <div className="camera" />
          <div className="display">
            <div className="artboard artboard-demo phone-2">
              <div className="flex justify-center items-center h-full">
                <div className="overflow-x-auto w-full">
                  <Map/>
                </div>
              </div>
          </div>
      </div>
</div>
      
      
      <FAQ/>  
    </div>
  );
}

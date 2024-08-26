'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
interface featureProps{
    direction:string,
    data?:string,
    image?:string,
    head?:string
}
function FeaturedCard(props:featureProps) {
    const [dir,setDir]=useState("0");
    useEffect(()=>{
        setDir(props.direction)
    })
    
  return (
    <div className={`flex ${dir=="0"?'flex-row':'flex-row-reverse'} h-1/4 justify-around flex-wrap md:mt-4 md:mb-5 mt-2 mb-2 bg-gray-200`}>
        
        <div className='text-black p-5 text-lg md:text-xl md:w-[60%] h-full font-medium font-sans'>
        <p className='text-2xl font-extrabold mb-3 underline text-blue-800'>
            Real Time Price Analysis
        </p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem commodi doloremque quidem voluptate earum quod. Saepe, maiores. Sed excepturi officiis nisi ipsum eos neque sequi, veritatis recusandae commodi dolores aut?</div>
        <div className='text-black md:p-5 p-2'>
            {/* <Image src="/graphsample.png" alt="graph image" width={350} height={350} /> */}
            <img src="/graphsample.png" alt="graph image" className='h-full w-full' />
        </div>
    </div>
  )
}

export default FeaturedCard
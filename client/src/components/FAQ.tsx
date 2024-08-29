import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Separator } from './ui/separator'
  
function FAQ() {
  return (
    <div className='flex flex-col justify-evenly items-center space-y-8 py-8'>
        <h1 className='text-3xl md:text-5xl font-semibold w-[50%] text-zinc-500 '>Frequently Asked Questions</h1>
        <Separator className='w-[75%] font-bold'/>
        <Accordion type="single" collapsible className="w-[75%]">
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-lg'>Is it accessible?</AccordionTrigger>
                <AccordionContent className='text-lg'>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className='text-lg'>Is it styled?</AccordionTrigger>
                <AccordionContent className='text-lg'>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className='text-lg'>Is it animated?</AccordionTrigger>
                <AccordionContent className='text-lg'>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  )
}

export default FAQ
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Separator } from './ui/separator'
import faqs from "@/constants/faq.json"
function FAQ() {
  return (
    <div className='flex md:flex-row flex-col justify-evenly items-center space-y-8 py-4'>
        <h1 className='text-3xl md:text-5xl font-semibold w-[50%] text-zinc-500 '>Frequently Asked Questions</h1>
        <Separator orientation={'vertical'}  />
        <Accordion type="single" collapsible className="w-full md:w-[50%]">
            {faqs.faqs.map((faq, index) => (
                <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`}>
                    <AccordionTrigger className='text-lg text-left'>
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className='text-lg text-left '>
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
            
        </Accordion>
    </div>
  )
}

export default FAQ
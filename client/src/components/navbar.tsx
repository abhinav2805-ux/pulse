import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
function Navbar() {
  return (
    <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className=" items-center mb-2 md:mb-0 flex flex-col">
            <Link href="/" className="font-bold text-xl">Pulse-O-Meter</Link>
            
          </div>
          <div className="hidden md:flex space-x-4">
            <a href="/" className="hover:text-blue-200 transition-colors duration-300"><Button variant={'ghost'}>Home</Button></a>
            <a href="/features" className="hover:text-blue-200 transition-colors duration-300"><Button variant={'ghost'}>Features</Button></a>
            <a href="/contact" className="hover:text-blue-200 transition-colors duration-300"><Button variant={'ghost'}>Contact</Button></a>
            <a href="/about" className="hover:text-blue-200 transition-colors duration-300"><Button variant={'ghost'}>About Us</Button></a>
          </div>
          <button title='btn' className="md:hidden focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
            </svg>
          </button>
        </div>
    </nav>
  )
}

export default Navbar
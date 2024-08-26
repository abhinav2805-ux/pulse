"use client"; 
import React, { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (): void => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="items-center mb-2 md:mb-0 flex flex-col">
          <Link href="/" className="font-bold text-xl">
            Pulse-O-Meter
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-blue-200 transition-colors duration-300">
            <Button variant={'ghost'}>Home</Button>
          </Link>
          <Link href="/features" className="hover:text-blue-200 transition-colors duration-300">
            <Button variant={'ghost'}>Features</Button>
          </Link>
          <Link href="/contact" className="hover:text-blue-200 transition-colors duration-300">
            <Button variant={'ghost'}>Contact</Button>
          </Link>
          <Link href="/about" className="hover:text-blue-200 transition-colors duration-300">
            <Button variant={'ghost'}>About Us</Button>
          </Link>
        </div>
        <button onClick={toggleSidebar} title="Toggle Sidebar" className="md:hidden focus:outline-none">
          <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
            {isSidebarOpen ? (
              <path d="M6 6L18 18M18 6L6 18" /> // White X icon when sidebar is open
            ) : (
              <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" /> // Hamburger icon when sidebar is closed
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-700 shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} title="Close Sidebar" className="focus:outline-none">
            <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
              <path d="M6 6L18 18M18 6L6 18" /> // White X icon for closing sidebar
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          <Link href="/" className="text-white hover:text-blue-200" onClick={closeSidebar}>
            Home
          </Link>
          <Link href="/features" className="text-white hover:text-blue-200" onClick={closeSidebar}>
            Features
          </Link>
          <Link href="/contact" className="text-white hover:text-blue-200" onClick={closeSidebar}>
            Contact
          </Link>
          <Link href="/about" className="text-white hover:text-blue-200" onClick={closeSidebar}>
            About Us
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;

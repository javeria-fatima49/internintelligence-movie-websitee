"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl text-red-600 font-bold text-primary">
              MovieFlix
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/movies" className="hover:text-primary transition">
                Movies
              </Link>
              <Link href="/about" className="hover:text-primary transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </div>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-red-600">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 text-center">
            <Link href="/movies" className="block hover:text-primary transition">
              Movies
            </Link>
            <Link href="/about" className="block hover:text-primary transition">
              About
            </Link>
            <Link href="/contact" className="block hover:text-primary transition">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

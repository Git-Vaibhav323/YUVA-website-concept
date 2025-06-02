"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Users, FileText, Calendar, Target, Briefcase, Instagram, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)

      // Determine active section based on scroll position
      const sections = ["home", "about", "gallery", "events", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Events", href: "/#events" },
    { name: "Contact", href: "/#contact" },
  ]

  const homeSubsections = [
    {
      title: "Who Are We",
      icon: <Users size={16} />,
    },
    {
      title: "Registration Form",
      icon: <FileText size={16} />,
    },
    {
      title: "When Did We Start",
      icon: <Calendar size={16} />,
    },
    {
      title: "Our Motto",
      icon: <Target size={16} />,
    },
    {
      title: "Our Works",
      icon: <Briefcase size={16} />,
    },
    {
      title: "Instagram Page",
      icon: <Instagram size={16} />,
    },
    {
      title: "Our Domains",
      icon: <Layers size={16} />,
    },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/images/yi-yuva-logo.png" alt="YUVA Logo" width={120} height={40} className="motion-blur-hover" />
          <Image src="/images/vit-logo.png" alt="VIT Logo" width={40} height={40} className="motion-blur-hover" />
        </Link>

        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <div
              key={item.name}
              className={`relative text-sm uppercase tracking-wider transition-colors group ${
                index === 0 ? "home-dropdown-trigger" : ""
              }`}
            >
              <Link
                href={item.href}
                className={`${
                  activeSection === item.href.substring(1) ||
                  (item.href === "/" && activeSection === "home") ||
                  (item.href === "/about-us" && window.location.pathname === "/about-us")
                    ? "text-[#3F51B5]"
                    : "text-[#374151] hover:text-[#3F51B5]"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#3F51B5] transition-all duration-300 ${
                    activeSection === item.href.substring(1) ||
                    (item.href === "/" && activeSection === "home") ||
                    (item.href === "/about-us" && window.location.pathname === "/about-us")
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>

              {index === 0 && (
                <div className="home-dropdown">
                  {homeSubsections.map((subsection) => (
                    <Link href="#" key={subsection.title} className="home-dropdown-item">
                      <span className="home-dropdown-item-icon">{subsection.icon}</span>
                      <div className="font-medium text-[#374151]">{subsection.title}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <Button className="hidden md:block bg-[#FFC107] hover:bg-[#FFC107]/90 text-[#374151] glow-effect">
          Join Us
        </Button>

        <button className="md:hidden text-[#374151]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm uppercase tracking-wider py-2 transition-colors ${
                  activeSection === item.href.substring(1) ||
                  (item.href === "/" && activeSection === "home") ||
                  (item.href === "/about-us" && window.location.pathname === "/about-us")
                    ? "text-[#3F51B5]"
                    : "text-[#374151] hover:text-[#3F51B5]"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-[#374151] w-full glow-effect">Join Us</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

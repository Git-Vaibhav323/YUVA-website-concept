"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const galleryImages = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "YUVA Leadership Summit",
      title: "Leadership Summit 2023",
      description: "Young leaders gathered to discuss the future of innovation and entrepreneurship.",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "YUVA Hackathon",
      title: "Tech Hackathon",
      description: "Students collaborating to solve real-world problems through technology.",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "YUVA Community Service",
      title: "Community Outreach Program",
      description: "Members engaging in social responsibility initiatives to help local communities.",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "YUVA Networking Event",
      title: "Networking Mixer",
      description: "Professionals connecting and building valuable relationships.",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "YUVA Workshop",
      title: "Entrepreneurship Workshop",
      description: "Learning essential skills for building successful startups.",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "YUVA Conference",
      title: "Annual Conference",
      description: "Celebrating achievements and planning for the future.",
    },
  ]

  const featuredGallery = galleryImages.slice(0, 3)
  const remainingGallery = galleryImages.slice(3)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % remainingGallery.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + remainingGallery.length) % remainingGallery.length)
  }

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-accent2/10 px-4 py-2 rounded-full mb-4"
          >
            <span className="text-accent2 font-medium">Our Gallery</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Capturing <span className="text-accent2">Moments</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg"
          >
            Browse through our collection of memorable events, workshops, and community initiatives.
          </motion.p>
        </div>

        {/* Featured Gallery */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {featuredGallery.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg glow-effect"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent1/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 z-20">
                <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                <p className="text-gray-200">{image.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel Gallery */}
        <div className="relative mt-16 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h3 className="text-2xl font-bold text-center text-gray-900">
              More <span className="text-accent2">Highlights</span>
            </h3>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <div className="relative aspect-[16/9]">
                <Image
                  src={remainingGallery[currentIndex].src || "/placeholder.svg"}
                  alt={remainingGallery[currentIndex].alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{remainingGallery[currentIndex].title}</h3>
                  <p className="text-gray-200 max-w-2xl">{remainingGallery[currentIndex].description}</p>
                </div>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition-colors z-10 glow-effect"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-800 hover:bg-primary hover:text-white transition-colors z-10 glow-effect"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {remainingGallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="border-primary/20 hover:bg-primary/10 text-primary glow-effect">
            View Full Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

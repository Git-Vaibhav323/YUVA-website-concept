"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Network, Lightbulb, Heart, Trophy } from "lucide-react"

export default function FocusAreas() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const focusAreas = [
    {
      title: "Strategic Networking",
      description:
        "Build meaningful connections with industry pioneers, policy makers, and fellow changemakers to expand your influence and opportunities.",
      icon: Network,
      color: "from-[#3F51B5] to-[#3F51B5]/60",
    },
    {
      title: "Innovation & Entrepreneurship",
      description:
        "Develop the mindset and skills to identify opportunities, create solutions, and build ventures that address real-world challenges.",
      icon: Lightbulb,
      color: "from-[#14B8A6] to-[#14B8A6]/60",
    },
    {
      title: "Social Impact",
      description:
        "Lead initiatives that create sustainable positive change in communities while developing your leadership capabilities.",
      icon: Heart,
      color: "from-[#FFC107] to-[#FFC107]/60",
    },
    {
      title: "Leadership Excellence",
      description:
        "Master the art of inspiring teams, managing resources, and navigating complex situations to achieve extraordinary outcomes.",
      icon: Trophy,
      color: "from-[#3F51B5] to-[#14B8A6]",
    },
  ]

  return (
    <section id="focus-areas" className="py-20 md:py-32 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-[#14B8A6]/10 px-4 py-2 rounded-full mb-4"
          >
            <span className="text-[#14B8A6] font-medium">Our Focus Areas</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-[#374151]"
          >
            Developing <span className="text-[#14B8A6]">Holistic Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#374151] text-lg"
          >
            We focus on four interconnected pillars that together create well-rounded leaders capable of driving
            meaningful change in any environment.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              variants={itemVariants}
              className="group relative bg-white shadow-lg border border-gray-200 rounded-xl p-6 overflow-hidden hover:border-[#3F51B5]/50 transition-all duration-300 glow-effect"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
              ></div>

              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center mb-6 group-hover:animate-pulse`}
              >
                <area.icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-[#374151] group-hover:text-[#3F51B5] transition-colors">
                {area.title}
              </h3>

              <p className="text-gray-600 mb-6">{area.description}</p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3F51B5]/70 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

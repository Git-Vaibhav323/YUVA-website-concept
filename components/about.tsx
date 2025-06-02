"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="absolute -inset-4 bg-[#3F51B5]/10 rounded-lg blur-xl animate-pulse"></div>
            <div className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6 flex flex-col items-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4 text-[#374151]">Our Vision</h3>
                  <p className="text-[#374151] text-lg">
                    To cultivate a generation of innovative leaders who transform challenges into opportunities and
                    drive sustainable progress across India.
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3F51B5] to-transparent my-6"></div>
                  <p className="text-gray-600">
                    We're building a nationwide network of young changemakers equipped with the skills, connections, and
                    resources to create meaningful impact in their communities and beyond.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-block bg-[#14B8A6]/10 px-4 py-2 rounded-full">
              <span className="text-[#14B8A6] font-medium">About YUVA</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#374151]">
              Shaping India's <span className="text-[#14B8A6]">Future Leaders</span>
            </h2>

            <p className="text-[#374151] text-lg">
              YUVA is the dynamic youth wing of Young Indians (Yi) that creates powerful platforms for students and
              young professionals to develop leadership skills, entrepreneurial mindsets, and a deep commitment to
              social responsibility.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#3F51B5]/20 flex items-center justify-center shrink-0 group-hover:bg-[#3F51B5]/40 transition-colors">
                  <span className="text-[#3F51B5] font-bold">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-[#374151] group-hover:text-[#3F51B5] transition-colors">
                    Collaborative Learning
                  </h3>
                  <p className="text-gray-600">
                    We foster environments where diverse perspectives converge to create innovative solutions to complex
                    challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#14B8A6]/20 flex items-center justify-center shrink-0 group-hover:bg-[#14B8A6]/40 transition-colors">
                  <span className="text-[#14B8A6] font-bold">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-[#374151] group-hover:text-[#14B8A6] transition-colors">
                    Experiential Growth
                  </h3>
                  <p className="text-gray-600">
                    Through hands-on projects and real-world challenges, we transform theoretical knowledge into
                    practical expertise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#FFC107]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FFC107]/40 transition-colors">
                  <span className="text-[#FFC107] font-bold">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 text-[#374151] group-hover:text-[#FFC107] transition-colors">
                    National Impact
                  </h3>
                  <p className="text-gray-600">
                    Our initiatives extend beyond individual development to create ripple effects that contribute to
                    India's growth story.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

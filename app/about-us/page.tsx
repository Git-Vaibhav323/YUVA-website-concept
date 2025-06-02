"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Users, Calendar, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutUs() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = [
    {
      id: "who-we-are",
      title: "Who Are We",
      icon: Users,
      color: "from-primary to-primary/60",
      content: (
        <div className="space-y-4">
          <p>
            YUVA is the youth wing of Young Indians (Yi), an integral part of the Confederation of Indian Industry
            (CII). We are a dynamic community of young leaders, innovators, and changemakers, united by a shared passion
            for nation-building, entrepreneurship, leadership, and social responsibility.
          </p>
          <p>
            At YUVA, we aspire to empower India's youth by providing a vibrant platform where students and young
            professionals can connect, collaborate, and lead impactful initiatives. Guided by the ethos of "We Can, We
            Will," we cultivate a spirit of action, innovation, and civic engagement.
          </p>
          <p>
            Through mentorship, hands-on projects, and powerful networking opportunities, we bridge the gap between
            ideas and execution, preparing tomorrow's leaders to shape a brighter, more inclusive, and sustainable
            India.
          </p>
        </div>
      ),
    },
    {
      id: "when-we-started",
      title: "When Did We Start",
      icon: Calendar,
      color: "from-primary to-secondary",
      content: (
        <div className="space-y-4">
          <p>
            The YUVA movement was initiated in 2008 by Young Indians (Yi) as a powerful platform to connect with college
            students and inspire them to contribute meaningfully to nation-building.
          </p>
          <p>
            Our local YUVA chapter was established and since then, we've been empowering students to lead, innovate, and
            serve with purpose.
          </p>
        </div>
      ),
    },
    {
      id: "our-motto",
      title: "Our Motto",
      icon: Target,
      color: "from-secondary to-primary",
      content: (
        <div className="space-y-6 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-lg blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200">
              <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TODAY'S EFFORT
              </h3>
              <h3 className="text-3xl font-bold text-center mt-2 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                FOR A BETTER FUTURE
              </h3>
            </div>
          </div>
          <p className="text-center mt-4">
            We believe that the actions we take today shape the world of tomorrow. Every initiative, every project, and
            every collaboration is a step toward building a brighter, more sustainable future for all.
          </p>
          <p className="text-center font-medium">
            Our motto encapsulates our commitment to proactive leadership and meaningful impact in everything we do.
          </p>
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen text-gray-900">
      <Navbar />

      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4"
            >
              <span className="text-primary font-medium">About YUVA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            >
              Empowering Young <span className="text-primary">Leaders</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-700 text-lg"
            >
              Learn more about our mission, history, and the values that drive us forward.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {sections.map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group relative bg-white shadow-lg border border-gray-200 rounded-xl p-6 overflow-hidden hover:border-primary/50 transition-all duration-300 glow-effect cursor-pointer"
                onClick={() => setActiveSection(section.id)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                ></div>

                {/* Neon border effect on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 5px #00BFFF, 0 0 10px #00BFFF`,
                    zIndex: -1,
                  }}
                ></div>

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:animate-pulse`}
                  >
                    <section.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm">Click to learn more</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white glow-effect">Back to Home</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for detailed content */}
      <AnimatePresence>
        {activeSection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setActiveSection(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-2xl z-50"
            >
              <button
                onClick={() => setActiveSection(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close</span>
              </button>

              {(() => {
                const section = sections.find((s) => s.id === activeSection)
                if (section) {
                  const Icon = section.icon
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center shrink-0`}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
                      </div>

                      <div className="prose prose-lg max-w-none dark:prose-invert">{section.content}</div>

                      <div className="mt-8 flex justify-end">
                        <Button
                          onClick={() => setActiveSection(null)}
                          className="bg-primary hover:bg-primary/90 text-white glow-effect"
                        >
                          Close
                        </Button>
                      </div>
                    </>
                  )
                }
                return null
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="bg-white">
        <Footer />
      </div>
    </main>
  )
}

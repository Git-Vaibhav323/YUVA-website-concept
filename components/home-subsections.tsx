"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, FileText, Instagram, X } from "lucide-react"
import Link from "next/link"

type SubsectionKey =
  | "whoAreWe"
  | "registrationForm"
  | "whenDidWeStart"
  | "motto"
  | "ourWorks"
  | "instagramPage"
  | "domains"

export default function HomeSubsections() {
  const [activeSection, setActiveSection] = useState<SubsectionKey | null>(null)
  const [clickedSection, setClickedSection] = useState<SubsectionKey | null>(null)

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setClickedSection(null)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (clickedSection) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [clickedSection])

  const subsections = [
    {
      key: "whoAreWe",
      title: "Who Are We",
      icon: Users,
      color: "from-indigo-600 to-blue-500",
      content:
        "YUVA is the youth wing of Young Indians (Yi) that empowers students and young professionals to become catalysts for positive change through leadership, innovation, and social responsibility.",
      fullContent: (
        <div className="space-y-4">
          <p>
            YUVA represents the vibrant youth wing of Young Indians (Yi), an integral part of the Confederation of
            Indian Industry (CII). We are a dynamic community of young leaders, innovators, and changemakers united by a
            shared vision of transforming India through youth-led initiatives.
          </p>
          <p>
            At YUVA, we create powerful platforms where students and young professionals connect, collaborate, and lead
            impactful projects. Guided by our ethos of "Today's Effort for a Better Future," we cultivate a spirit of
            proactive leadership, innovation, and civic engagement.
          </p>
          <p>
            Through structured mentorship, hands-on projects, and strategic networking opportunities, we bridge the gap
            between academic knowledge and real-world impact, preparing tomorrow's leaders to address complex challenges
            and shape a more inclusive and sustainable India.
          </p>
        </div>
      ),
    },
    {
      key: "registrationForm",
      title: "Registration Form",
      icon: FileText,
      color: "from-amber-500 to-yellow-400",
      content:
        "Take the first step toward becoming part of our dynamic community. Complete our registration form to access exclusive events, networking opportunities, and leadership development programs.",
    },
    {
      key: "whenDidWeStart",
      title: "When Did We Start",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "from-emerald-600 to-teal-500",
      content:
        "YUVA was established as the youth initiative of Young Indians (Yi) to create a structured platform where young minds could develop leadership skills while contributing to nation-building.",
      fullContent: (
        <div className="space-y-4">
          <p>
            The YUVA movement was initiated in 2008 by Young Indians (Yi) as a strategic platform to connect with
            college students and inspire them to contribute meaningfully to India's development journey.
          </p>
          <p>
            Since our inception, we've evolved from a small student initiative into a nationwide movement that bridges
            the gap between academic institutions and industry, creating pathways for young Indians to develop practical
            leadership skills while addressing real-world challenges.
          </p>
          <p>
            Our chapter has grown steadily, expanding our reach and impact through innovative programs, strategic
            partnerships, and a growing alumni network that continues to support our mission of youth empowerment.
          </p>
        </div>
      ),
    },
    {
      key: "motto",
      title: "Our Motto",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z" />
          <path d="M12 22V12" />
          <path d="M12 12L4 6" />
          <path d="M12 12l8-6" />
          <path d="M20 18l-8-6" />
          <path d="M4 18l8-6" />
        </svg>
      ),
      color: "from-purple-600 to-indigo-500",
      content:
        "TODAY'S EFFORT FOR A BETTER FUTURE - We believe that meaningful change requires consistent action. Every initiative we undertake today shapes the world we'll inhabit tomorrow.",
      fullContent: (
        <div className="space-y-6 flex flex-col items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#3F51B5] via-[#14B8A6] to-[#3F51B5] rounded-lg blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200">
              <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] bg-clip-text text-transparent">
                TODAY'S EFFORT
              </h3>
              <h3 className="text-3xl font-bold text-center mt-2 bg-gradient-to-r from-[#14B8A6] to-[#3F51B5] bg-clip-text text-transparent">
                FOR A BETTER FUTURE
              </h3>
            </div>
          </div>
          <p className="text-center mt-4">
            Our motto encapsulates our fundamental belief that the future is shaped by the actions we take today. We
            recognize that meaningful progress requires consistent effort, innovative thinking, and collaborative
            action.
          </p>
          <p className="text-center font-medium">
            This guiding principle inspires us to be proactive rather than reactive, to take initiative rather than wait
            for others, and to address challenges with optimism and determination. It reminds us that every project,
            every mentorship, and every community initiative contributes to building the India we envision.
          </p>
        </div>
      ),
    },
    {
      key: "ourWorks",
      title: "Our Works",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M12 2v4" />
          <path d="M12 18v4" />
          <path d="M4.93 4.93l2.83 2.83" />
          <path d="M16.24 16.24l2.83 2.83" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
          <path d="M4.93 19.07l2.83-2.83" />
          <path d="M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      color: "from-rose-600 to-pink-500",
      content:
        "From leadership summits and innovation hackathons to community development projects and mentorship programs, our initiatives create tangible impact while developing future leaders.",
    },
    {
      key: "instagramPage",
      title: "Instagram Page",
      icon: Instagram,
      color: "from-fuchsia-600 to-pink-500",
      content:
        "Follow us @yuva_youngindians to stay updated with our latest events, success stories, and opportunities. Join our digital community to connect with like-minded changemakers.",
    },
    {
      key: "domains",
      title: "Our Domains",
      icon: (props) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.29 7 12 12 20.71 7" />
          <line x1="12" y1="22" x2="12" y2="12" />
        </svg>
      ),
      color: "from-cyan-600 to-blue-500",
      content:
        "Our four interconnected domains—Strategic Networking, Innovation & Entrepreneurship, Social Impact, and Leadership Excellence—create a comprehensive framework for holistic development.",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="mt-24 md:mt-32"
    >
      <div className="grid grid-cols-2 md:grid-cols-7 gap-6">
        {subsections.map((section) => (
          <motion.div
            key={section.key}
            className={`relative group cursor-pointer bg-white shadow-lg border border-gray-200 rounded-xl p-6 overflow-hidden hover:border-[#3F51B5]/50 transition-all duration-300 ${
              activeSection === section.key ? "ring-2 ring-[#3F51B5]" : ""
            }`}
            onMouseEnter={() => setActiveSection(section.key as SubsectionKey)}
            onMouseLeave={() => setActiveSection(null)}
            onClick={() => section.fullContent && setClickedSection(section.key as SubsectionKey)}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
            ></div>

            {/* Neon border effect on hover */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: `0 0 5px #3F51B5, 0 0 10px #3F51B5`,
                zIndex: -1,
              }}
            ></div>

            <div className="flex flex-col items-center text-center">
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-6 group-hover:animate-pulse shadow-lg`}
              >
                <section.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-sm md:text-base font-bold group-hover:text-[#3F51B5] transition-colors">
                {section.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeSection && !clickedSection && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3F51B5]/5 to-[#14B8A6]/5 -z-10"></div>

            {subsections.find((s) => s.key === activeSection) && (
              <div className="flex flex-col md:flex-row items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${
                    subsections.find((s) => s.key === activeSection)?.color
                  } flex items-center justify-center shrink-0`}
                >
                  {(() => {
                    const section = subsections.find((s) => s.key === activeSection)
                    if (section) {
                      const Icon = section.icon
                      return <Icon className="h-6 w-6 text-white" />
                    }
                    return null
                  })()}
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#3F51B5]">
                    {subsections.find((s) => s.key === activeSection)?.title}
                  </h3>
                  <p className="text-gray-300">{subsections.find((s) => s.key === activeSection)?.content}</p>

                  {activeSection === "registrationForm" && (
                    <Button className="mt-4 bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white glow-effect">
                      Register Now
                    </Button>
                  )}

                  {activeSection === "instagramPage" && (
                    <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <Button className="mt-4 bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] hover:from-[#3F51B5]/90 hover:to-[#14B8A6]/90 text-white glow-effect">
                        <Instagram className="mr-2 h-4 w-4" /> Follow Us
                      </Button>
                    </Link>
                  )}

                  {subsections.find((s) => s.key === activeSection)?.fullContent && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        setClickedSection(activeSection)
                      }}
                      className="mt-4 bg-[#3F51B5]/20 hover:bg-[#3F51B5]/30 text-[#3F51B5] border border-[#3F51B5]/30 glow-effect"
                    >
                      Read More
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full content modal with background blur */}
      <AnimatePresence>
        {clickedSection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setClickedSection(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl p-6 md:p-8 shadow-2xl z-50"
            >
              <button
                onClick={() => setClickedSection(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={24} />
                <span className="sr-only">Close</span>
              </button>

              {(() => {
                const section = subsections.find((s) => s.key === clickedSection)
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
                        <h2 className="text-2xl font-bold text-[#374151] dark:text-white">{section.title}</h2>
                      </div>

                      <div className="prose prose-lg max-w-none dark:prose-invert">{section.fullContent}</div>

                      <div className="mt-8 flex justify-end">
                        <Button
                          onClick={() => setClickedSection(null)}
                          className="bg-[#3F51B5] hover:bg-[#3F51B5]/90 text-white glow-effect"
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
    </motion.div>
  )
}

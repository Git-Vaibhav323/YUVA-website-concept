"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Users, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Events() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    event: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Reset form
    setFormData({ name: "", email: "", phone: "", event: "", message: "" })
  }

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

  const upcomingEvents = [
    {
      title: "Leadership Summit 2023",
      date: "August 15, 2023",
      location: "New Delhi",
      attendees: "500+ Participants",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Entrepreneurship Workshop",
      date: "September 22, 2023",
      location: "Mumbai",
      attendees: "300+ Participants",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Social Impact Hackathon",
      date: "October 10, 2023",
      location: "Bangalore",
      attendees: "250+ Participants",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const pastEvents = [
    {
      title: "Tech Innovation Conference",
      date: "May 5, 2023",
      location: "Chennai",
      attendees: "400+ Participants",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Youth Leadership Program",
      date: "March 18, 2023",
      location: "Hyderabad",
      attendees: "200+ Participants",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Startup Pitch Competition",
      date: "January 25, 2023",
      location: "Pune",
      attendees: "150+ Participants",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section id="events" className="py-20 md:py-32 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-accent1/10 px-4 py-2 rounded-full mb-4"
          >
            <span className="text-accent1 font-medium">Events & Registration</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Join Our <span className="text-accent1">Events</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg"
          >
            Discover upcoming events and register to connect, learn, and grow with fellow young professionals and
            entrepreneurs.
          </motion.p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="registration" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Registration
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  variants={itemVariants}
                  className="group bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 glow-effect"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.location}</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border border-secondary/20 glow-effect">
                      Register Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">
                Past <span className="text-accent1">Events</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden shrink-0 shadow-md">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{event.title}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          {event.date} • {event.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="registration">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 md:p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Event Registration</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-gray-50 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-gray-50 border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 1234567890"
                        className="bg-gray-50 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="event" className="text-sm font-medium text-gray-700">
                        Select Event
                      </label>
                      <div className="relative">
                        <select
                          id="event"
                          name="event"
                          value={formData.event}
                          onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 appearance-none text-gray-900"
                          required
                        >
                          <option value="" disabled>
                            Select an event
                          </option>
                          {upcomingEvents.map((event) => (
                            <option key={event.title} value={event.title}>
                              {event.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Additional Information
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about yourself and why you're interested in this event"
                      className="bg-gray-50 border-gray-300 min-h-[120px]"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white glow-effect">
                    Register for Event
                  </Button>
                </form>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

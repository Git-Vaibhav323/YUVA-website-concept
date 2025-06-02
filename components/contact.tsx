"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Contact() {
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [suggestionFormData, setSuggestionFormData] = useState({
    name: "",
    email: "",
    category: "",
    suggestion: "",
  })

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSuggestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSuggestionFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(contactFormData)
    setContactFormData({ name: "", email: "", message: "" })
  }

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(suggestionFormData)
    setSuggestionFormData({ name: "", email: "", category: "", suggestion: "" })
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4"
          >
            <span className="text-primary font-medium">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Contact <span className="text-primary">Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-700 text-lg"
          >
            Have questions or want to join YUVA? Reach out to us and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <Tabs defaultValue="contact" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Contact Us
            </TabsTrigger>
            <TabsTrigger value="suggestion" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Suggestions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/40 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-primary transition-colors">
                        Email
                      </h4>
                      <p className="text-gray-600">info@yuva-india.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/40 transition-colors">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-secondary transition-colors">
                        Phone
                      </h4>
                      <p className="text-gray-600">+91 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/40 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1 text-gray-900 group-hover:text-primary transition-colors">
                        Address
                      </h4>
                      <p className="text-gray-600">
                        YUVA Headquarters
                        <br />
                        123 Innovation Street
                        <br />
                        New Delhi, India
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Follow Us</h3>
                  <div className="flex gap-4">
                    {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                      <a
                        key={social}
                        href={`#${social}`}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-primary/20 transition-colors glow-effect"
                      >
                        <span className="sr-only">{social}</span>
                        <div className="w-5 h-5 text-primary">{/* Social icons would go here */}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-6 bg-white shadow-lg border border-gray-200 rounded-xl p-6 glow-effect"
                >
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={contactFormData.name}
                      onChange={handleContactChange}
                      placeholder="John Doe"
                      className="bg-gray-50 border-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactFormData.email}
                      onChange={handleContactChange}
                      placeholder="john@example.com"
                      className="bg-gray-50 border-gray-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Your Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={contactFormData.message}
                      onChange={handleContactChange}
                      placeholder="How can we help you?"
                      className="bg-gray-50 border-gray-300 min-h-[120px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  >
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="suggestion">
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg border border-gray-200 rounded-xl p-6 md:p-8 glow-effect"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-secondary" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Share Your Suggestions</h3>

                <form onSubmit={handleSuggestionSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="suggestion-name" className="text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <Input
                        id="suggestion-name"
                        name="name"
                        value={suggestionFormData.name}
                        onChange={handleSuggestionChange}
                        placeholder="John Doe"
                        className="bg-gray-50 border-gray-300"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="suggestion-email" className="text-sm font-medium text-gray-700">
                        Your Email
                      </label>
                      <Input
                        id="suggestion-email"
                        name="email"
                        type="email"
                        value={suggestionFormData.email}
                        onChange={handleSuggestionChange}
                        placeholder="john@example.com"
                        className="bg-gray-50 border-gray-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-gray-700">
                      Suggestion Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={suggestionFormData.category}
                      onChange={handleSuggestionChange}
                      className="w-full bg-gray-50 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option value="events">Events</option>
                      <option value="programs">Programs</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="suggestion" className="text-sm font-medium text-gray-700">
                      Your Suggestion
                    </label>
                    <Textarea
                      id="suggestion"
                      name="suggestion"
                      value={suggestionFormData.suggestion}
                      onChange={handleSuggestionChange}
                      placeholder="Share your ideas with us..."
                      className="bg-gray-50 border-gray-300 min-h-[150px]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 text-white"
                  >
                    Submit Suggestion
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

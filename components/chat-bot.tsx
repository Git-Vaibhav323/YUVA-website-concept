"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2 } from "lucide-react"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Hi there! 👋 I'm the YUVA Assistant. How can I help you today?",
      },
    ],
  })

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Chat button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full shadow-xl transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              : "bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] hover:from-[#3F51B5]/90 hover:to-[#14B8A6]/90"
          }`}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </motion.div>

          {/* Notification dot */}
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-24 right-6 w-[380px] max-w-[90vw] z-50 rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 backdrop-blur-sm ${
              isMinimized ? "h-16" : "h-[500px] max-h-[75vh]"
            }`}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full bg-white/95 backdrop-blur-md">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Bot size={18} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base font-space-grotesk">YUVA Assistant</h3>
                    <p className="text-xs text-white/80">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="h-8 w-8 rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="h-8 w-8 rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white/50">
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-3 text-sm relative ${
                            message.role === "assistant"
                              ? "bg-white shadow-md border border-gray-100 text-[#374151]"
                              : "bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] text-white shadow-lg"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {message.role === "assistant" && (
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] flex items-center justify-center shrink-0 mt-0.5">
                                <Bot size={12} className="text-white" />
                              </div>
                            )}
                            <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                            {message.role === "user" && (
                              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                                <User size={12} className="text-white" />
                              </div>
                            )}
                          </div>

                          {/* Message tail */}
                          <div
                            className={`absolute top-3 w-3 h-3 transform rotate-45 ${
                              message.role === "assistant"
                                ? "-left-1.5 bg-white border-l border-b border-gray-100"
                                : "-right-1.5 bg-gradient-to-r from-[#3F51B5] to-[#14B8A6]"
                            }`}
                          />
                        </div>
                      </motion.div>
                    ))}

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 text-center"
                      >
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                          <p className="text-red-600 text-sm font-medium">
                            ⚠️ Something went wrong. Please try again or contact support.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[85%] rounded-2xl p-3 text-sm bg-white shadow-md border border-gray-100 text-[#374151] relative">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] flex items-center justify-center shrink-0">
                              <Bot size={12} className="text-white" />
                            </div>
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-[#3F51B5] rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-[#14B8A6] rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-[#3F51B5] rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              />
                            </div>
                          </div>
                          <div className="absolute top-3 -left-1.5 w-3 h-3 bg-white border-l border-b border-gray-100 transform rotate-45" />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
                    <form onSubmit={handleSubmit} className="flex gap-3">
                      <div className="flex-1 relative">
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          placeholder="Type your message..."
                          className="pr-12 rounded-full border-gray-200 bg-gray-50/50 focus:bg-white transition-colors text-sm"
                          disabled={isLoading}
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={isLoading || !input.trim()}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-r from-[#3F51B5] to-[#14B8A6] hover:from-[#3F51B5]/90 hover:to-[#14B8A6]/90 disabled:opacity-50 transition-all duration-200"
                        >
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Send size={14} />
                          </motion.div>
                        </Button>
                      </div>
                    </form>

                    {/* Quick actions */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleInputChange({ target: { value: "Tell me about YUVA" } } as any)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        About YUVA
                      </button>
                      <button
                        onClick={() => handleInputChange({ target: { value: "How can I join?" } } as any)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        How to join?
                      </button>
                      <button
                        onClick={() => handleInputChange({ target: { value: "Upcoming events" } } as any)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                      >
                        Events
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

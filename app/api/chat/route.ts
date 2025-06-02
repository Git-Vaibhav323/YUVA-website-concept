import { StreamingTextResponse } from "ai"
import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // System prompt to define the chatbot's personality and knowledge
    const systemPrompt = `
      You are YUVA Assistant, a helpful AI chatbot for the YUVA website.
      YUVA is the youth wing of Young Indians (Yi), an integral part of the Confederation of Indian Industry (CII).
      
      Key information about YUVA:
      - YUVA empowers India's youth through leadership, innovation, and social responsibility initiatives
      - YUVA's motto is "TODAY'S EFFORT FOR A BETTER FUTURE"
      - YUVA focuses on four domains: Networking, Entrepreneurship, Social Responsibility, and Leadership
      - YUVA organizes events like leadership summits, hackathons, and community service projects
      
      Be friendly, informative, and helpful. If you don't know something specific about YUVA, 
      suggest that the user contact the YUVA team directly for the most accurate information.
      
      Keep responses concise and relevant to YUVA and its activities.
    `

    // Format the conversation for the AI
    const formattedMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content,
    }))

    // Generate a response using Grok
    const response = await generateText({
      model: xai("grok-1"),
      prompt: formattedMessages.map((m: any) => `${m.role}: ${m.content}`).join("\n"),
      system: systemPrompt,
    })

    // Return a streaming response
    return new StreamingTextResponse(response.textStream)
  } catch (error) {
    console.error("Error in chat route:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

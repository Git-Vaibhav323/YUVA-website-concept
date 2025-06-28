import { streamText } from "ai"
import { xai } from "@ai-sdk/xai"

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
      - YUVA was established in 2008 as part of Young Indians (Yi)
      - YUVA creates platforms for students and young professionals to connect and collaborate
      
      Be friendly, informative, and helpful. Keep responses concise and relevant to YUVA and its activities.
      Use emojis occasionally to make conversations more engaging.
      If you don't know something specific about YUVA, suggest that the user contact the YUVA team directly.
    `

    // Generate a streaming response using Grok
    const result = await streamText({
      model: xai("grok-beta"),
      system: systemPrompt,
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
      maxTokens: 500,
      temperature: 0.7,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat route:", error)

    // Return a fallback response if there's an error
    return new Response(
      JSON.stringify({
        error:
          "I'm having trouble connecting right now. Please try again in a moment or contact our team directly for assistance.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}

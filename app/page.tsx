import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import FocusAreas from "@/components/focus-areas"
import Events from "@/components/events"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import HomeSubsections from "@/components/home-subsections"

export default function Home() {
  return (
    <main className="min-h-screen text-gray-900 overflow-hidden">
      <Navbar />
      <Hero />
      <div className="bg-white">
        <HomeSubsections />
        <About />
        <FocusAreas />
        <Gallery />
        <Events />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

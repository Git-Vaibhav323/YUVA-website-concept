import Link from "next/link"
import { ArrowUp } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-[#F0F2F5] border-t border-gray-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/yi-yuva-logo.png"
                alt="YUVA Logo"
                width={120}
                height={40}
                className="motion-blur-hover"
              />
            </Link>
            <p className="text-[#374151] max-w-xs">
              Empowering young visionaries to become catalysts for positive change through leadership, innovation, and
              social responsibility initiatives.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-[#374151]">Quick Links</h3>
            <ul className="space-y-2">
              {["About", "Gallery", "Events", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-[#3F51B5] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-[#374151]">Programs</h3>
            <ul className="space-y-2">
              {["Leadership Development", "Entrepreneurship", "Social Impact", "Mentorship"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#3F51B5] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-[#374151]">Legal</h3>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#3F51B5] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} YUVA. All rights reserved.</p>

          <Link
            href="#home"
            className="mt-4 md:mt-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-[#3F51B5]/20 transition-colors"
          >
            <ArrowUp className="h-5 w-5 text-[#3F51B5]" />
            <span className="sr-only">Back to top</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

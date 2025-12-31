"use client"

import { motion } from "framer-motion"
import { AuroraLogo } from "./logo"
import { Twitter, Instagram, Youtube, Github } from "lucide-react"
import Link from "next/link"

const footerLinks = {
  Browse: ["Series", "Movies", "Shows", "New Releases", "Popular"],
  Community: ["Forums", "Discord", "Events", "Fan Art", "News"],
  Support: ["Help Center", "Contact Us", "FAQ", "Report Issue"],
  Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Github, href: "#", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-background" />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px]">
        <div className="max-w-4xl mx-auto h-full bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <AuroraLogo className="mb-6" />
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Your gateway to the infinite universe of anime. Stream, discover, and connect with millions of fans
              worldwide.
            </p>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-[#00d4ff] transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-[#00d4ff] transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© 2025 Aurora Anime. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-muted-foreground">
                Made with <span className="text-[#ec4899]">♥</span> for anime fans
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

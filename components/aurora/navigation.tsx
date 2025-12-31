"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuroraLogo } from "./logo"

const navItems = [
  { name: "HOME", href: "/" },
  { name: "SERIES", href: "/series" },
  { name: "MOVIES", href: "/movies" },
  { name: "SHOWS", href: "/shows" },
  { name: "NEWS", href: "/news" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <AuroraLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-sm tracking-widest transition-colors duration-300 ${
                    pathname === item.href ? "text-[#00d4ff]" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff] to-[#a855f7]"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Community button */}
            <motion.button
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full neon-border text-sm tracking-wider text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COMMUNITY
            </motion.button>

            {/* Search */}
            <motion.button
              className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              className="md:hidden p-2 rounded-full hover:bg-foreground/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Search overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 glass p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search anime, movies, shows..."
                  className="w-full pl-12 pr-4 py-3 bg-background/50 border border-[#00d4ff]/30 rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#00d4ff] transition-colors"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 glass md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-2xl tracking-widest ${
                      pathname === item.href ? "text-[#00d4ff] animate-text-glow" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                className="mt-8 px-8 py-3 rounded-full neon-border text-lg tracking-wider text-[#00d4ff]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                COMMUNITY
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

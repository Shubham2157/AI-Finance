"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus !== "true") {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  if (!isAuthenticated) {
    return null
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/transactions", label: "Transactions" },
    { href: "/reports", label: "Reports" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-emerald-100 dark:border-slate-700 sticky top-0 z-50">
        <div className="px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">FinanceHub</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm lg:text-base transition-colors ${
                    pathname === link.href
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? (
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
              )}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 h-auto px-2 py-1"
              >
                Logout
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-slate-600 dark:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-emerald-100 dark:border-slate-700 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {theme === "dark" ? (
                    <>
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Light Mode
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Dark Mode
                    </>
                  )}
                </button>
              )}
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 justify-start"
              >
                Logout
              </Button>
            </nav>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}

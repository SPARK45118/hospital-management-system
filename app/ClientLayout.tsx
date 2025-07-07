"use client"

import type React from "react"

import { useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { initializeData } from "@/lib/data-store"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize data on app load
    initializeData()
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { GeistSans } from "geist/font/sans"
import "./globals.css"
import { VendorProvider } from "./contexts/VendorContext"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddVendorDialog } from "./components/add-vendor-dialog"

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <html lang="en" className="dark">
      <body className={GeistSans.className}>
        <VendorProvider>
          {children}
          <AddVendorDialog onOpenChange={setIsDialogOpen} defaultOpen={isDialogOpen}>
            <Button
              className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary hover:bg-primary/80 shadow-lg"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus size={24} />
            </Button>
          </AddVendorDialog>
        </VendorProvider>
      </body>
    </html>
  )
}


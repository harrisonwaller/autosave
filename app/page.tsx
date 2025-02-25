"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExpenseOverview from "./components/expense-overview"
import ExpenseBreakdown from "./components/expense-breakdown"
import { Building2, FileSpreadsheet, Import, LayoutDashboard, Menu, Plus } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.03] via-transparent to-primary/[0.03] z-0" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8">
          <header className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-foreground">AutoSave</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-foreground-secondary">demo_user</span>
              <Button className="md:hidden" onClick={() => setMenuOpen(true)}>
                <Menu size={24} />
              </Button>
            </div>
          </header>

          <TooltipProvider>
            <Tabs defaultValue={pathname === "/" ? "dashboard" : pathname.slice(1)} className="mb-8">
              <TabsList className="hidden md:grid w-full grid-cols-4 bg-transparent">
                <TabsTrigger
                  value="dashboard"
                  className={`tabs-trigger p-4 flex items-center gap-2 ${
                    pathname === "/" ? "text-primary" : "text-foreground-secondary"
                  }`}
                >
                  <LayoutDashboard size={32} />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>Dashboard</span>
                    </TooltipTrigger>
                    <TooltipContent>Dashboard</TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger
                  value="vendors"
                  className={`tabs-trigger p-4 flex items-center gap-2 ${
                    pathname === "/vendors" ? "text-primary" : "text-foreground-secondary"
                  }`}
                >
                  <Link href="/vendors" className="flex items-center gap-2">
                    <Building2 size={32} />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>Vendors</span>
                      </TooltipTrigger>
                      <TooltipContent>Vendors</TooltipContent>
                    </Tooltip>
                  </Link>
                </TabsTrigger>
                <TabsTrigger
                  value="import"
                  className={`tabs-trigger p-4 flex items-center gap-2 ${
                    pathname === "/import" ? "text-primary" : "text-foreground-secondary"
                  }`}
                >
                  <Import size={32} />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>Import</span>
                    </TooltipTrigger>
                    <TooltipContent>Import Data</TooltipContent>
                  </Tooltip>
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className={`tabs-trigger p-4 flex items-center gap-2 ${
                    pathname === "/reports" ? "text-primary" : "text-foreground-secondary"
                  }`}
                >
                  <FileSpreadsheet size={32} />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>Reports</span>
                    </TooltipTrigger>
                    <TooltipContent>Reports</TooltipContent>
                  </Tooltip>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </TooltipProvider>

          {/* Mobile Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: menuOpen ? 0 : "-100%" }}
            className="fixed top-0 left-0 h-full w-64 bg-background/90 backdrop-blur-xl z-50 md:hidden"
          >
            <Tabs defaultValue={pathname === "/" ? "dashboard" : pathname.slice(1)}>
              <TabsList className="flex flex-col w-full p-4">
                <TabsTrigger value="dashboard" className="w-full justify-start p-4" onClick={() => setMenuOpen(false)}>
                  <Link href="/" className="flex items-center">
                    <LayoutDashboard className="mr-2" />
                    Dashboard
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="vendors" className="w-full justify-start p-4" onClick={() => setMenuOpen(false)}>
                  <Link href="/vendors" className="flex items-center">
                    <Building2 className="mr-2" />
                    Vendors
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="import" className="w-full justify-start p-4" onClick={() => setMenuOpen(false)}>
                  <Link href="/import" className="flex items-center">
                    <Import className="mr-2" />
                    Import
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="reports" className="w-full justify-start p-4" onClick={() => setMenuOpen(false)}>
                  <Link href="/reports" className="flex items-center">
                    <FileSpreadsheet className="mr-2" />
                    Reports
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <div className="space-y-8">
            <ExpenseOverview />
            <ExpenseBreakdown />
          </div>

          <Button className="fixed bottom-6 right-6 rounded-full w-12 h-12 bg-primary hover:bg-primary/80 shadow-lg">
            <Plus size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}


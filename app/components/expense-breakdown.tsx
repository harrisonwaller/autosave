"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Search, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useVendors } from "../contexts/VendorContext"

const UsageLevelBadge = ({ level }: { level: string }) => {
  const getUsageLevelStyles = (level: string) => {
    switch (level) {
      case "HIGH":
        return {
          container: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          dot: "bg-emerald-500",
        }
      case "Medium":
        return {
          container: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          dot: "bg-amber-500",
        }
      case "LOW":
        return {
          container: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
          dot: "bg-zinc-400",
        }
      default:
        return {
          container: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
          dot: "bg-zinc-400",
        }
    }
  }

  const styles = getUsageLevelStyles(level)

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles.container}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot} mr-1.5`}></span>
      {level}
    </div>
  )
}

export default function ExpenseBreakdown() {
  const { vendors } = useVendors()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white/90">Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Search vendors or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white/90"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-white/5">
                <TableHead className="text-white/70">VENDOR NAME</TableHead>
                <TableHead className="text-white/70">SPEND</TableHead>
                <TableHead className="text-white/70">CONTRACT</TableHead>
                <TableHead className="text-white/70">CATEGORY</TableHead>
                <TableHead className="text-white/70">USAGE LEVEL</TableHead>
                <TableHead className="text-white/70">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredVendors.map((vendor, index) => (
                  <motion.tr
                    key={vendor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`table-row-hover border-white/5 ${
                      index % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
                    }`}
                  >
                    <TableCell className="font-medium text-white/90">{vendor.vendor}</TableCell>
                    <TableCell className="text-white/90">${vendor.spend.toLocaleString()}</TableCell>
                    <TableCell className="text-white/90">{vendor.contract}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-white/5 text-white/90 border-white/10">
                        {vendor.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <UsageLevelBadge level={vendor.usageLevel} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="button-hover border border-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300 group"
                          onClick={() => window.open(vendor.loginUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                          Login
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="button-hover border border-white/10 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/50 transition-all duration-300 group"
                        >
                          <X className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                          Cancel
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
          {isLoading && (
            <div className="flex justify-center items-center h-32">
              <div className="loader"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}


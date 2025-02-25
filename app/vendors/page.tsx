"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { EditVendorDialog } from "../components/edit-vendor-dialog"
import { DeleteVendorDialog } from "../components/delete-vendor-dialog"
import { Toaster } from "@/components/ui/toaster"
import { useVendors } from "../contexts/VendorContext"

export default function VendorsPage() {
  const { vendors, updateVendor, deleteVendor } = useVendors()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white/90">Vendor Management</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border-white/5 bg-[#1E1E1E]/90 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white/90">All Vendors</CardTitle>
          </CardHeader>
          <CardContent>
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
                {vendors.map((vendor) => (
                  <TableRow
                    key={vendor.id}
                    className="border-white/5 hover:bg-[#2D2D2D]/70 transition-colors duration-200"
                  >
                    <TableCell className="font-medium text-white/90">{vendor.vendor}</TableCell>
                    <TableCell className="text-white/90">${vendor.spend.toLocaleString()}</TableCell>
                    <TableCell className="text-white/90">{vendor.contract}</TableCell>
                    <TableCell className="text-white/90">{vendor.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`
                          ${vendor.usageLevel === "HIGH" ? "border-[#4CAF50] bg-[#4CAF50]/10 text-[#4CAF50]" : ""}
                          ${vendor.usageLevel === "Medium" ? "border-white/20 bg-white/5 text-white/70" : ""}
                          ${vendor.usageLevel === "LOW" ? "border-white/10 bg-white/5 text-white/50" : ""}
                        `}
                      >
                        {vendor.usageLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="border border-white/10 text-white/90 hover:bg-[#0678FF]/10 hover:text-[#0678FF] hover:border-[#0678FF]/50 transition-all duration-300 group"
                          onClick={() => window.open(vendor.loginUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                          Login
                        </Button>
                        <EditVendorDialog vendor={vendor} onVendorUpdated={updateVendor} />
                        <DeleteVendorDialog vendor={vendor} onVendorDeleted={deleteVendor} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      <Toaster />
    </div>
  )
}


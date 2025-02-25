"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Vendor } from "./add-vendor-dialog"
import { useVendors } from "../contexts/VendorContext"

interface EditVendorDialogProps {
  vendor: Vendor
}

export function EditVendorDialog({ vendor }: EditVendorDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { updateVendor } = useVendors()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const updatedVendor: Vendor = {
      ...vendor,
      vendor: formData.get("vendor") as string,
      spend: Number(formData.get("spend")),
      contract: formData.get("contract") as string,
      category: formData.get("category") as string,
      usageLevel: formData.get("usageLevel") as string,
      loginUrl: formData.get("loginUrl") as string,
    }

    updateVendor(updatedVendor)
    setOpen(false)
    toast({
      title: "Vendor updated",
      description: `${updatedVendor.vendor} has been updated successfully.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="border border-white/10 text-white/90 hover:bg-[#0678FF]/10 hover:text-[#0678FF] hover:border-[#0678FF]/50 transition-all duration-300 group"
      >
        <Pencil className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
        Edit
      </Button>
      <DialogContent className="sm:max-w-[425px] bg-[#1E1E1E] border-white/5">
        <DialogHeader>
          <DialogTitle className="text-white/90">Edit Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="vendor" className="text-white/70">
              Vendor Name
            </Label>
            <Input
              id="vendor"
              name="vendor"
              defaultValue={vendor.vendor}
              required
              className="bg-[#2D2D2D] border-white/5 text-white/90"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spend" className="text-white/70">
              Monthly Spend
            </Label>
            <Input
              id="spend"
              name="spend"
              type="number"
              defaultValue={vendor.spend}
              required
              className="bg-[#2D2D2D] border-white/5 text-white/90"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contract" className="text-white/70">
              Contract Type
            </Label>
            <Select name="contract" defaultValue={vendor.contract} required>
              <SelectTrigger className="bg-[#2D2D2D] border-white/5 text-white/90">
                <SelectValue placeholder="Select contract type" />
              </SelectTrigger>
              <SelectContent className="bg-[#2D2D2D] border-white/5">
                <SelectItem value="12 Months">12 Months</SelectItem>
                <SelectItem value="MTM">Month to Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category" className="text-white/70">
              Category
            </Label>
            <Select name="category" defaultValue={vendor.category} required>
              <SelectTrigger className="bg-[#2D2D2D] border-white/5 text-white/90">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#2D2D2D] border-white/5">
                <SelectItem value="DMS">DMS</SelectItem>
                <SelectItem value="CRM">CRM</SelectItem>
                <SelectItem value="RECON SOFTWARE">RECON SOFTWARE</SelectItem>
                <SelectItem value="VARIABLE STICKERS">VARIABLE STICKERS</SelectItem>
                <SelectItem value="Variable">Variable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="usageLevel" className="text-white/70">
              Usage Level
            </Label>
            <Select name="usageLevel" defaultValue={vendor.usageLevel} required>
              <SelectTrigger className="bg-[#2D2D2D] border-white/5 text-white/90">
                <SelectValue placeholder="Select usage level" />
              </SelectTrigger>
              <SelectContent className="bg-[#2D2D2D] border-white/5">
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loginUrl" className="text-white/70">
              Login URL
            </Label>
            <Input
              id="loginUrl"
              name="loginUrl"
              type="url"
              defaultValue={vendor.loginUrl}
              required
              className="bg-[#2D2D2D] border-white/5 text-white/90"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="border border-white/10 text-white/90 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0678FF] hover:bg-[#0665ff]">
              Update Vendor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


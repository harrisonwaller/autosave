"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useVendors } from "../contexts/VendorContext"

export interface Vendor {
  id: string
  vendor: string
  spend: number
  contract: string
  category: string
  usageLevel: string
  loginUrl: string
}

interface AddVendorDialogProps {
  children?: React.ReactNode
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
}

export function AddVendorDialog({ children, onOpenChange, defaultOpen = false }: AddVendorDialogProps) {
  const [open, setOpen] = useState(defaultOpen)
  const { toast } = useToast()
  const { addVendor } = useVendors()

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newVendor: Vendor = {
      id: Date.now().toString(),
      vendor: formData.get("vendor") as string,
      spend: Number(formData.get("spend")),
      contract: formData.get("contract") as string,
      category: formData.get("category") as string,
      usageLevel: formData.get("usageLevel") as string,
      loginUrl: formData.get("loginUrl") as string,
    }

    addVendor(newVendor)
    handleOpenChange(false)
    toast({
      title: "Vendor added",
      description: `${newVendor.vendor} has been added successfully.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1E1E1E] border-white/5">
        <DialogHeader>
          <DialogTitle className="text-white/90">Add New Vendor</DialogTitle>
          <DialogDescription className="text-white/70">
            Enter the details of the new vendor here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="vendor" className="text-white/70">
              Vendor Name
            </Label>
            <Input id="vendor" name="vendor" required className="bg-[#2D2D2D] border-white/5 text-white/90" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spend" className="text-white/70">
              Monthly Spend
            </Label>
            <Input
              id="spend"
              name="spend"
              type="number"
              required
              className="bg-[#2D2D2D] border-white/5 text-white/90"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contract" className="text-white/70">
              Contract Type
            </Label>
            <Select name="contract" required>
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
            <Select name="category" required>
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
            <Select name="usageLevel" required>
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
              required
              className="bg-[#2D2D2D] border-white/5 text-white/90"
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="border border-white/10 text-white/90 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0678FF] hover:bg-[#0665ff]">
              Add Vendor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}


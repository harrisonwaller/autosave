"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { Vendor } from "./add-vendor-dialog"
import { useVendors } from "../contexts/VendorContext"

interface DeleteVendorDialogProps {
  vendor: Vendor
}

export function DeleteVendorDialog({ vendor }: DeleteVendorDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const { deleteVendor } = useVendors()

  const handleDelete = () => {
    deleteVendor(vendor.id)
    setOpen(false)
    toast({
      title: "Vendor deleted",
      description: `${vendor.vendor} has been deleted successfully.`,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="border border-white/10 text-white/90 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all duration-300 group"
      >
        <XCircle className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
        Delete
      </Button>
      <AlertDialogContent className="bg-[#1E1E1E] border-white/5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white/90">Delete Vendor</AlertDialogTitle>
          <AlertDialogDescription className="text-white/70">
            Are you sure you want to delete {vendor.vendor}? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-white/10 text-white/90 hover:bg-white/5">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


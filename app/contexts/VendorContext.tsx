"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Vendor } from "../components/add-vendor-dialog"

type VendorContextType = {
  vendors: Vendor[]
  addVendor: (vendor: Vendor) => void
  updateVendor: (updatedVendor: Vendor) => void
  deleteVendor: (vendorId: string) => void
}

const initialVendors: Vendor[] = [
  {
    id: "1",
    vendor: "CDK",
    spend: 20000,
    contract: "12 Months",
    category: "DMS",
    usageLevel: "HIGH",
    loginUrl: "https://cdk.com/login",
  },
  {
    id: "2",
    vendor: "VIN SOLUTIONS",
    spend: 1200,
    contract: "MTM",
    category: "CRM",
    usageLevel: "HIGH",
    loginUrl: "https://vinsolutions.com/login",
  },
  {
    id: "3",
    vendor: "RAPID RECON",
    spend: 699,
    contract: "MTM",
    category: "RECON SOFTWARE",
    usageLevel: "LOW",
    loginUrl: "https://rapidrecon.com/login",
  },
  {
    id: "4",
    vendor: "MONRONEYLABELS.com",
    spend: 1000,
    contract: "MTM",
    category: "VARIABLE STICKERS",
    usageLevel: "HIGH",
    loginUrl: "https://monroneylabels.com/login",
  },
  {
    id: "5",
    vendor: "IPACKET",
    spend: 899,
    contract: "12 Months",
    category: "Variable",
    usageLevel: "Medium",
    loginUrl: "https://ipacket.com/login",
  },
]

const VendorContext = createContext<VendorContextType | undefined>(undefined)

export const useVendors = () => {
  const context = useContext(VendorContext)
  if (!context) {
    throw new Error("useVendors must be used within a VendorProvider")
  }
  return context
}

export const VendorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>([])

  useEffect(() => {
    const storedVendors = localStorage.getItem("vendors")
    if (storedVendors) {
      setVendors(JSON.parse(storedVendors))
    } else {
      setVendors(initialVendors)
      localStorage.setItem("vendors", JSON.stringify(initialVendors))
    }
  }, [])

  const saveVendors = (updatedVendors: Vendor[]) => {
    localStorage.setItem("vendors", JSON.stringify(updatedVendors))
    setVendors(updatedVendors)
  }

  const addVendor = (vendor: Vendor) => {
    const updatedVendors = [...vendors, vendor]
    saveVendors(updatedVendors)
  }

  const updateVendor = (updatedVendor: Vendor) => {
    const updatedVendors = vendors.map((vendor) => (vendor.id === updatedVendor.id ? updatedVendor : vendor))
    saveVendors(updatedVendors)
  }

  const deleteVendor = (vendorId: string) => {
    const updatedVendors = vendors.filter((vendor) => vendor.id !== vendorId)
    saveVendors(updatedVendors)
  }

  return (
    <VendorContext.Provider value={{ vendors, addVendor, updateVendor, deleteVendor }}>
      {children}
    </VendorContext.Provider>
  )
}


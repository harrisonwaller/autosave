"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Check, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

export default function ImportPage() {
  const [dragActive, setDragActive] = useState(false)
  const [fileStatus, setFileStatus] = useState<"idle" | "success" | "error">("idle")
  const [fileName, setFileName] = useState<string>("")
  const { toast } = useToast()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    handleFile(file)
  }

  const handleFile = (file: File | undefined) => {
    if (file?.type === "text/csv") {
      setFileStatus("success")
      setFileName(file.name)
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready to be imported.`,
      })
    } else {
      setFileStatus("error")
      setFileName("")
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      })
    }
  }

  const handleImport = () => {
    // Simulating import process
    toast({
      title: "Import started",
      description: "Your data is being processed...",
    })
    setTimeout(() => {
      toast({
        title: "Import completed",
        description: "Your data has been successfully imported.",
      })
      setFileStatus("idle")
      setFileName("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white/90">Import Vendors</h1>

      <Card className="glass-card">
        <CardContent className="p-6">
          <div
            className={`
              relative rounded-lg border-2 border-dashed p-12 text-center
              transition-all duration-200
              ${dragActive ? "border-[#0678FF] bg-[#0678FF]/10" : "border-white/20 hover:border-white/40"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleChange}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              <div className="flex justify-center">
                {fileStatus === "idle" && <Upload className="h-12 w-12 text-white/70" />}
                {fileStatus === "success" && <Check className="h-12 w-12 text-[#4CAF50]" />}
                {fileStatus === "error" && <AlertCircle className="h-12 w-12 text-red-500" />}
              </div>

              <div className="space-y-2">
                <h3 className="text-white/90 text-lg font-medium">
                  {fileStatus === "idle" && "Drop your CSV file here"}
                  {fileStatus === "success" && fileName}
                  {fileStatus === "error" && "Please upload a CSV file"}
                </h3>
                <p className="text-white/70">
                  {fileStatus === "idle" && "or click to browse"}
                  {fileStatus === "success" && "File ready to import"}
                  {fileStatus === "error" && "The selected file is not supported"}
                </p>
              </div>

              {fileStatus === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Button onClick={handleImport} className="bg-[#0678FF] hover:bg-[#0665ff]">
                    Import Data
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-white/90 font-medium mb-4">Template Format</h4>
            <Card className="glass-card">
              <CardContent className="p-4">
                <code className="text-sm text-white/70">vendor_name,spend,contract,category,usage_level,login_url</code>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


"use client"

import React, { useEffect, useState, useMemo, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Users } from "lucide-react"
import { useVendors } from "../contexts/VendorContext"

const SpendByCategoryChart = React.lazy(() => import("./SpendByCategoryChart"))

const SpendCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
}: { icon: any; title: string; value: string; subtitle: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.4, ease: "easeOut", type: "spring", stiffness: 300 }}
    className="glow"
  >
    <Card className="glass-card transition-all duration-300 hover:scale-105">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-foreground-secondary flex items-center">
          <Icon className="w-4 h-4 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-semibold text-foreground"
        >
          {value}
        </motion.div>
        <div className="text-sm text-foreground-secondary mt-1">{subtitle}</div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function ExpenseOverview() {
  const { vendors } = useVendors()
  const [isLoading, setIsLoading] = useState(true)
  const [chartVisible, setChartVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setChartVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const { totalSpend, activeVendors, categorySpend } = useMemo(() => {
    const total = vendors.reduce((sum, vendor) => sum + vendor.spend, 0)
    const active = vendors.length
    const categories = vendors.reduce(
      (acc, vendor) => {
        acc[vendor.category] = (acc[vendor.category] || 0) + vendor.spend
        return acc
      },
      {} as Record<string, number>,
    )

    return { totalSpend: total, activeVendors: active, categorySpend: categories }
  }, [vendors])

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <AnimatePresence>
          {!isLoading && (
            <>
              <SpendCard
                icon={DollarSign}
                title="Total Monthly Spend"
                value={`$${totalSpend.toLocaleString()}`}
                subtitle="Across all vendors"
              />
              <SpendCard
                icon={Users}
                title="Active Vendors"
                value={activeVendors.toString()}
                subtitle="Total active vendors"
              />
              <SpendCard icon={TrendingUp} title="Monthly Trend" value="+2.5%" subtitle="Compared to last month" />
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card className="glass-card overflow-hidden">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">Spend by Category</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {chartVisible && Object.keys(categorySpend).length > 0 && (
                  <Suspense
                    fallback={
                      <div className="flex justify-center items-center h-[400px]">
                        <div className="loader" />
                      </div>
                    }
                  >
                    <div className="h-[400px]">
                      <SpendByCategoryChart categorySpend={categorySpend} />
                    </div>
                  </Suspense>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="col-span-full flex justify-center items-center h-64"
        >
          <div className="loader"></div>
        </motion.div>
      )}
    </div>
  )
}


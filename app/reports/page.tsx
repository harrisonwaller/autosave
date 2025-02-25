"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Bar, Line, Doughnut } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const spendingTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Spend",
      data: [22000, 23500, 23798, 24100, 23900, 24500],
      borderColor: "rgba(6, 120, 255, 1)",
      backgroundColor: "rgba(6, 120, 255, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
}

const categoryDistributionData = {
  labels: ["DMS", "CRM", "Recon Software", "Variable Stickers", "Other"],
  datasets: [
    {
      data: [20000, 1200, 699, 1000, 899],
      backgroundColor: [
        "rgba(6, 120, 255, 0.8)",
        "rgba(76, 175, 80, 0.8)",
        "rgba(255, 193, 7, 0.8)",
        "rgba(255, 87, 34, 0.8)",
        "rgba(156, 39, 176, 0.8)",
      ],
      borderWidth: 0,
    },
  ],
}

const vendorComparisonData = {
  labels: ["CDK", "VIN SOLUTIONS", "RAPID RECON", "MONRONEYLABELS", "IPACKET"],
  datasets: [
    {
      label: "Monthly Spend",
      data: [20000, 1200, 699, 1000, 899],
      backgroundColor: "rgba(6, 120, 255, 0.8)",
      borderRadius: 6,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      borderColor: "rgba(6, 120, 255, 0.3)",
      borderWidth: 1,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "rgba(255, 255, 255, 0.7)",
      },
    },
  },
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white/90">Analytics & Reports</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white/90">Spending Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={spendingTrendData} options={chartOptions} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white/90">Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="w-[300px]">
                  <Doughnut
                    data={categoryDistributionData}
                    options={{
                      ...chartOptions,
                      plugins: {
                        ...chartOptions.plugins,
                        legend: {
                          display: true,
                          position: "bottom" as const,
                          labels: {
                            color: "rgba(255, 255, 255, 0.7)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white/90">Vendor Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={vendorComparisonData} options={chartOptions} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


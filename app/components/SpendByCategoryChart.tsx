import { useRef } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface SpendByCategoryChartProps {
  categorySpend: Record<string, number>
}

export default function SpendByCategoryChart({ categorySpend }: SpendByCategoryChartProps) {
  const chartRef = useRef<ChartJS>(null)

  const categories = Object.keys(categorySpend)
  const values = Object.values(categorySpend)

  const data = {
    labels: categories,
    datasets: [
      {
        data: values,
        backgroundColor: "rgba(0, 122, 255, 0.7)",
        hoverBackgroundColor: "rgba(0, 122, 255, 1)",
        borderRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: "easeOutBounce" },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        yAlign: "bottom",
        position: "nearest",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        titleFont: { size: 16, weight: "bold" },
        bodyFont: { size: 14 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { size: 14 },
          callback: (value: number) => `$${value.toLocaleString()}`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
          font: { size: 14, weight: "bold" },
        },
      },
    },
    elements: {
      bar: {
        borderSkipped: false,
        borderWidth: 0,
      },
    },
    hover: {
      mode: "nearest",
      intersect: false,
    },
  }

  return (
    <div className="h-full w-full">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  )
}


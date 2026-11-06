import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { type ChartData, transformChartData } from '@/lib/chart-utils'

interface BarChartProps {
  data: ChartData
  className?: string
}

export function BarChart({ data, className }: BarChartProps) {
  const chartData = transformChartData(data)

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={data.datasets[0]?.color || 'var(--chart-1)'} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

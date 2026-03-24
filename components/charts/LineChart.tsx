import React from 'react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartData, transformChartData } from '@/lib/chart-utils'

interface LineChartProps {
  data: ChartData
  className?: string
}

export function LineChart({ data, className }: LineChartProps) {
  const chartData = transformChartData(data)

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke={data.datasets[0]?.color || '#3b82f6'}
            strokeWidth={2}
            dot={{ fill: data.datasets[0]?.color || '#3b82f6' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

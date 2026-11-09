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
import { AXIS_PROPS, TOOLTIP_STYLE } from './chart-styles'

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
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis dataKey="name" {...AXIS_PROPS} />
          <YAxis {...AXIS_PROPS} width={40} />
          <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'var(--muted)' }} />
          <Bar
            dataKey="value"
            fill={data.datasets[0]?.color || 'var(--chart-1)'}
            radius={[6, 6, 0, 0]}
            maxBarSize={32}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

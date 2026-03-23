import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types/kpi';

interface LineChartProps {
  data: ChartData;
  className?: string;
}

export function LineChart({ data, className }: LineChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0]?.data[index] || 0,
  }));

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
  );
}

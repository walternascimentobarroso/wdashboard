import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartData } from '@/types/kpi';

interface BarChartProps {
  data: ChartData;
  className?: string;
}

export function BarChart({ data, className }: BarChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0]?.data[index] || 0,
  }));

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill={data.datasets[0]?.color || '#3b82f6'}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

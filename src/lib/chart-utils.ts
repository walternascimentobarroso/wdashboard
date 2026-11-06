export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    color?: string
  }>
}

export interface TransformedChartData {
  name: string
  value: number
}

export function transformChartData(data: ChartData): TransformedChartData[] {
  return data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0]?.data[index] || 0,
  }))
}

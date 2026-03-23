export interface KPI {
  id: string;
  title: string;
  value: number | string;
  previousValue: number | string | null;
  trend: 'up' | 'down' | 'stable' | null;
  unit: string | null;
  format: 'number' | 'currency' | 'percentage' | 'text';
  category: string;
  updatedAt: Date;
}

export interface GetKPIsParams {
  category?: string;
  refresh?: boolean;
}

export interface ChartDataRequest {
  type: 'line' | 'bar';
  metric: string;
  timeRange: '1d' | '7d' | '30d' | '90d';
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalFiles: number;
  processingFiles: number;
  recentLogs: number;
  systemHealth: 'healthy' | 'warning' | 'error';
}

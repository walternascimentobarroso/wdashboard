import { BaseMockService, MockDataStore } from '@/services/api';
import { KPI, ChartData, DashboardStats, GetKPIsParams, ChartDataRequest } from '@/types/kpi';
import { MOCK_DELAYS } from '@/lib/constants';

export class MockDashboardService extends BaseMockService {
  private store = MockDataStore.getInstance();

  constructor() {
    super();
    this.initializeMockData();
  }

  private initializeMockData(): void {
    if (!this.store.has('kpis')) {
      const mockKPIs: KPI[] = [
        {
          id: '1',
          title: 'Total Users',
          value: 1234,
          previousValue: 1156,
          trend: 'up',
          unit: null,
          format: 'number',
          category: 'users',
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Active Sessions',
          value: 89,
          previousValue: 92,
          trend: 'down',
          unit: null,
          format: 'number',
          category: 'users',
          updatedAt: new Date(),
        },
        {
          id: '3',
          title: 'Files Processed',
          value: 567,
          previousValue: 523,
          trend: 'up',
          unit: null,
          format: 'number',
          category: 'files',
          updatedAt: new Date(),
        },
        {
          id: '4',
          title: 'System Health',
          value: 98.5,
          previousValue: 97.2,
          trend: 'up',
          unit: '%',
          format: 'percentage',
          category: 'system',
          updatedAt: new Date(),
        },
        {
          id: '5',
          title: 'Error Rate',
          value: 0.2,
          previousValue: 0.3,
          trend: 'down',
          unit: '%',
          format: 'percentage',
          category: 'system',
          updatedAt: new Date(),
        },
      ];
      this.store.set('kpis', mockKPIs);
    }
  }

  async getKPIs(params?: GetKPIsParams) {
    await this.delay(MOCK_DELAYS.DATA_FETCH);
    this.randomError();

    let kpis = this.store.get('kpis') as KPI[];

    if (params?.category) {
      kpis = kpis.filter(kpi => kpi.category === params.category);
    }

    if (params?.refresh) {
      // Simulate data refresh with slight variations
      kpis = kpis.map(kpi => ({
        ...kpi,
        value: typeof kpi.value === 'number' 
          ? kpi.value + (Math.random() - 0.5) * kpi.value * 0.05
          : kpi.value,
        updatedAt: new Date(),
      }));
      this.store.set('kpis', kpis);
    }

    return this.createResponse(kpis);
  }

  async getChartData(request: ChartDataRequest): Promise<ChartData> {
    await this.delay(MOCK_DELAYS.DATA_FETCH);
    this.randomError();

    const { metric, timeRange } = request;
    
    // Generate mock chart data based on time range
    const labels = this.generateTimeLabels(timeRange);
    const data = labels.map(() => Math.floor(Math.random() * 100) + 20);

    return {
      labels,
      datasets: [
        {
          label: metric,
          data,
          color: this.getChartColor(metric),
        },
      ],
    };
  }

  async getStats(): Promise<DashboardStats> {
    await this.delay(MOCK_DELAYS.DATA_FETCH);
    this.randomError();

    return {
      totalUsers: 1234,
      activeUsers: 89,
      totalFiles: 567,
      processingFiles: 12,
      recentLogs: 234,
      systemHealth: 'healthy',
    };
  }

  private generateTimeLabels(timeRange: string): string[] {
    const now = new Date();
    const labels: string[] = [];

    switch (timeRange) {
      case '1d':
        // Generate hourly labels for the last 24 hours
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
          labels.push(hour.getHours() + ':00');
        }
        break;
      case '7d':
        // Generate daily labels for the last 7 days
        for (let i = 6; i >= 0; i--) {
          const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          labels.push(day.toLocaleDateString('en', { weekday: 'short' }));
        }
        break;
      case '30d':
        // Generate weekly labels for the last 30 days
        for (let i = 4; i >= 0; i--) {
          labels.push(`Week ${5 - i}`);
        }
        break;
      case '90d':
        // Generate monthly labels for the last 90 days
        for (let i = 2; i >= 0; i--) {
          const month = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000);
          labels.push(month.toLocaleDateString('en', { month: 'short' }));
        }
        break;
      default:
        break;
    }

    return labels;
  }

  private getChartColor(metric: string): string {
    const colors: Record<string, string> = {
      users: '#3b82f6',
      files: '#10b981',
      sessions: '#f59e0b',
      errors: '#ef4444',
      performance: '#8b5cf6',
    };

    return colors[metric.toLowerCase()] || '#3b82f6';
  }
}

export const mockDashboardService = new MockDashboardService();

import React from 'react';
import { KPI } from '@/types/kpi';
import { cn } from '@/lib/utils';

interface KPICardProps {
  kpi: KPI;
  className?: string;
}

export function KPICard({ kpi, className }: KPICardProps) {
  const formatValue = (value: number | string, format: string, unit: string | null) => {
    if (typeof value === 'string') return value;

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}${unit || '%'}`;
      case 'number':
        return new Intl.NumberFormat('en-US').format(value);
      default:
        return value.toString();
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable' | null) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      case 'stable':
        return '→';
      default:
        return null;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable' | null) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  const formatChange = (current: number | string, previous: number | string | null) => {
    if (previous === null || typeof current === 'string' || typeof previous === 'string') {
      return null;
    }

    const change = current - previous;
    const percentChange = previous !== 0 ? (change / previous) * 100 : 0;
    
    return {
      value: Math.abs(change),
      percent: Math.abs(percentChange),
    };
  };

  const change = formatChange(kpi.value, kpi.previousValue);

  return (
    <div className={cn(
      "bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatValue(kpi.value, kpi.format, kpi.unit)}
          </p>
          
          {change && kpi.trend && (
            <div className="flex items-center mt-2">
              <span className={cn("text-sm font-medium", getTrendColor(kpi.trend))}>
                {getTrendIcon(kpi.trend)} {change.percent.toFixed(1)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">
                from {formatValue(kpi.previousValue!, kpi.format, kpi.unit)}
              </span>
            </div>
          )}
        </div>
        
        {kpi.trend && (
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            kpi.trend === 'up' && "bg-green-100",
            kpi.trend === 'down' && "bg-red-100",
            kpi.trend === 'stable' && "bg-gray-100"
          )}>
            <span className={cn(
              "text-sm font-bold",
              kpi.trend === 'up' && "text-green-600",
              kpi.trend === 'down' && "text-red-600",
              kpi.trend === 'stable' && "text-gray-600"
            )}>
              {getTrendIcon(kpi.trend)}
            </span>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        Last updated: {kpi.updatedAt.toLocaleTimeString()}
      </div>
    </div>
  );
}

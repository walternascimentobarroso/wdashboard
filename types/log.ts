export interface Log {
  id: string;
  timestamp: Date;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  source: string;
  userId: string | null;
  metadata: Record<string, any>;
}

export interface CreateLogRequest {
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  source: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface GetLogsParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: string;
  source?: string;
  startDate?: Date;
  endDate?: Date;
}

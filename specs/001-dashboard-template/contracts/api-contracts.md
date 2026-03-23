# API Contracts: Dashboard Template

**Purpose**: Service layer interface definitions and mock API contracts
**Created**: 2026-03-23
**Feature**: Dashboard Template

## Base API Contract

### Response Format
```typescript
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: Date;
}
```

### Error Codes
- `AUTH_REQUIRED` - Authentication required
- `INVALID_CREDENTIALS` - Invalid login credentials
- `PERMISSION_DENIED` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Input validation failed
- `SERVER_ERROR` - Internal server error
- `NETWORK_ERROR` - Network connectivity issues

## Authentication Service Contract

### Login
```typescript
interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  user: User;
  token: string;
  expiresAt: Date;
  permissions: string[];
}

// Mock Implementation
mockAuthService.login(credentials: LoginRequest): Promise<LoginResponse>
```

### Logout
```typescript
interface LogoutRequest {
  token: string;
}

// Mock Implementation
mockAuthService.logout(token: string): Promise<void>
```

### Verify Token
```typescript
interface TokenVerification {
  valid: boolean;
  user?: User;
  expiresAt?: Date;
}

// Mock Implementation
mockAuthService.verifyToken(token: string): Promise<TokenVerification>
```

### Get Current User
```typescript
// Mock Implementation
mockAuthService.getCurrentUser(token: string): Promise<User>
```

## Users Service Contract

### Get Users (Paginated)
```typescript
interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Mock Implementation
mockUsersService.getUsers(params: GetUsersParams): Promise<PaginatedResponse<User>>
```

### Get User by ID
```typescript
// Mock Implementation
mockUsersService.getUserById(id: string): Promise<ApiResponse<User>>
```

### Create User
```typescript
interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  status?: string;
}

// Mock Implementation
mockUsersService.createUser(user: CreateUserRequest): Promise<ApiResponse<User>>
```

### Update User
```typescript
interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
}

// Mock Implementation
mockUsersService.updateUser(id: string, user: UpdateUserRequest): Promise<ApiResponse<User>>
```

### Delete User
```typescript
// Mock Implementation
mockUsersService.deleteUser(id: string): Promise<ApiResponse<void>>
```

## Files Service Contract

### Upload File
```typescript
interface UploadFileRequest {
  file: File;
  onProgress?: (progress: number) => void;
}

interface UploadResponse {
  file: File;
  id: string;
  status: 'pending';
}

// Mock Implementation
mockFilesService.uploadFile(request: UploadFileRequest): Promise<UploadResponse>
```

### Get Files (Paginated)
```typescript
interface GetFilesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
}

// Mock Implementation
mockFilesService.getFiles(params: GetFilesParams): Promise<PaginatedResponse<File>>
```

### Get File by ID
```typescript
// Mock Implementation
mockFilesService.getFileById(id: string): Promise<ApiResponse<File>>
```

### Delete File
```typescript
// Mock Implementation
mockFilesService.deleteFile(id: string): Promise<ApiResponse<void>>
```

### Retry File Processing
```typescript
// Mock Implementation
mockFilesService.retryProcessing(id: string): Promise<ApiResponse<File>>
```

## Logs Service Contract

### Get Logs (Paginated)
```typescript
interface GetLogsParams {
  page?: number;
  limit?: number;
  search?: string;
  level?: string;
  source?: string;
  startDate?: Date;
  endDate?: Date;
}

// Mock Implementation
mockLogsService.getLogs(params: GetLogsParams): Promise<PaginatedResponse<Log>>
```

### Get Log by ID
```typescript
// Mock Implementation
mockLogsService.getLogById(id: string): Promise<ApiResponse<Log>>
```

### Create Log Entry
```typescript
interface CreateLogRequest {
  level: string;
  message: string;
  source: string;
  userId?: string;
  metadata?: Record<string, any>;
}

// Mock Implementation
mockLogsService.createLog(log: CreateLogRequest): Promise<ApiResponse<Log>>
```

## Dashboard Service Contract

### Get KPIs
```typescript
interface GetKPIsParams {
  category?: string;
  refresh?: boolean;
}

// Mock Implementation
mockDashboardService.getKPIs(params: GetKPIsParams): Promise<ApiResponse<KPI[]>>
```

### Get Chart Data
```typescript
interface ChartDataRequest {
  type: 'line' | 'bar';
  metric: string;
  timeRange: '1d' | '7d' | '30d' | '90d';
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color?: string;
  }[];
}

// Mock Implementation
mockDashboardService.getChartData(request: ChartDataRequest): Promise<ApiResponse<ChartData>>
```

### Get Dashboard Stats
```typescript
interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalFiles: number;
  processingFiles: number;
  recentLogs: number;
  systemHealth: 'healthy' | 'warning' | 'error';
}

// Mock Implementation
mockDashboardService.getStats(): Promise<ApiResponse<DashboardStats>>
```

## Settings Service Contract

### Get Feature Flags
```typescript
// Mock Implementation
mockSettingsService.getFeatureFlags(): Promise<ApiResponse<FeatureFlag[]>>
```

### Update Feature Flag
```typescript
interface UpdateFeatureFlagRequest {
  enabled: boolean;
}

// Mock Implementation
mockSettingsService.updateFeatureFlag(id: string, request: UpdateFeatureFlagRequest): Promise<ApiResponse<FeatureFlag>>
```

### Get App Settings
```typescript
interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
}

// Mock Implementation
mockSettingsService.getAppSettings(): Promise<ApiResponse<AppSettings>>
```

### Update App Settings
```typescript
// Mock Implementation
mockSettingsService.updateAppSettings(settings: Partial<AppSettings>): Promise<ApiResponse<AppSettings>>
```

## Mock API Behavior

### Response Delays
- Authentication operations: 200-500ms
- Data fetching: 100-300ms
- File uploads: 500-2000ms (simulated processing)
- CRUD operations: 200-400ms

### Error Simulation
- Network errors: 5% probability
- Server errors: 2% probability
- Validation errors: when invalid data provided
- Authentication errors: when token invalid/expired

### Data Persistence
- In-memory storage during session
- Reset on page refresh (simulates no real backend)
- Consistent mock data generation
- Realistic data relationships

## Service Layer Implementation Pattern

### Base Service Class
```typescript
abstract class BaseMockService {
  protected delay(ms: number = 200): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected randomError(errorRate: number = 0.05): void {
    if (Math.random() < errorRate) {
      throw new Error('Simulated network error');
    }
  }

  protected createResponse<T>(data: T): ApiResponse<T> {
    return {
      data,
      success: true,
      timestamp: new Date()
    };
  }

  protected createErrorResponse(code: string, message: string): ErrorResponse {
    return {
      success: false,
      error: { code, message },
      timestamp: new Date()
    };
  }
}
```

### React Query Integration
```typescript
// Example hook for users
export function useUsers(params: GetUsersParams) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => mockUsersService.getUsers(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Example mutation for creating user
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (user: CreateUserRequest) => mockUsersService.createUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

## Type Definitions

```typescript
// Common types used across services
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt: Date | null;
  avatar: string | null;
}

export interface File {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'processing' | 'done' | 'error';
  uploadedAt: Date;
  processedAt: Date | null;
  errorMessage: string | null;
  downloadUrl: string | null;
}

export interface Log {
  id: string;
  timestamp: Date;
  level: 'error' | 'warn' | 'info' | 'debug';
  message: string;
  source: string;
  userId: string | null;
  metadata: Record<string, any>;
}

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

export interface FeatureFlag {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  category: string;
  requiredRole: 'admin' | 'user' | 'viewer' | null;
  updatedAt: Date;
  updatedBy: string | null;
}
```

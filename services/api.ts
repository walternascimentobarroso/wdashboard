import { ApiResponse, ErrorResponse } from '@/types'

export abstract class BaseMockService {
  protected delay(ms: number = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  protected randomError(errorRate: number = 0.05): void {
    if (Math.random() < errorRate) {
      throw new Error('Simulated network error')
    }
  }

  protected createResponse<T>(data: T): ApiResponse<T> {
    return {
      data,
      success: true,
      timestamp: new Date(),
    }
  }

  protected createErrorResponse(code: string, message: string): ErrorResponse {
    return {
      success: false,
      error: { code, message },
      timestamp: new Date(),
    }
  }

  protected generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  protected paginate<T>(data: T[], page: number = 1, limit: number = 10) {
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedData = data.slice(startIndex, endIndex)

    return {
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: data.length,
        totalPages: Math.ceil(data.length / limit),
      },
    }
  }

  protected search<T>(data: T[], searchTerm: string, searchFields: (keyof T)[]): T[] {
    if (!searchTerm) return data

    const lowerSearchTerm = searchTerm.toLowerCase()
    return data.filter((item) =>
      searchFields.some((field) => {
        const value = item[field]
        return value && value.toString().toLowerCase().includes(lowerSearchTerm)
      })
    )
  }

  protected sort<T>(data: T[], sortBy: keyof T, sortOrder: 'asc' | 'desc' = 'asc'): T[] {
    return [...data].sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (aValue === null || aValue === undefined) return sortOrder === 'asc' ? 1 : -1
      if (bValue === null || bValue === undefined) return sortOrder === 'asc' ? -1 : 1

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }
}

// In-memory storage for mock data
export class MockDataStore {
  private static instance: MockDataStore
  private storage: Map<string, unknown> = new Map()

  static getInstance(): MockDataStore {
    if (!MockDataStore.instance) {
      MockDataStore.instance = new MockDataStore()
    }
    return MockDataStore.instance
  }

  set(key: string, value: unknown): void {
    this.storage.set(key, value)
  }

  get(key: string): unknown {
    return this.storage.get(key)
  }

  has(key: string): boolean {
    return this.storage.has(key)
  }

  delete(key: string): boolean {
    return this.storage.delete(key)
  }

  clear(): void {
    this.storage.clear()
  }

  getAll(): Map<string, unknown> {
    return new Map(this.storage)
  }
}

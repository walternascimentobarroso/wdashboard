import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { readJson } from '@/lib/read-json'

export interface CrudService<T, C, U> {
  getAll: () => Promise<T[]>
  create: (data: C) => Promise<T>
  update: (id: string, data: U) => Promise<T>
  remove: (id: string) => Promise<void>
}

export type SortDirection = 'asc' | 'desc'

interface CrudListOptions<T, F> {
  initialFilters: F
  matches: (item: T, filters: F) => boolean
  defaultSort: keyof T
  pageSize?: number
}

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b)
  if (a === b) return 0
  return (a as number) < (b as number) ? -1 : 1
}

// `service` and `matches` must be stable (module-level), or the list reloads every render.
export function useCrudList<T, F, C, U>(
  service: CrudService<T, C, U>,
  { initialFilters, matches, defaultSort, pageSize: explicitPageSize }: CrudListOptions<T, F>
) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<F>(initialFilters)
  const [sorting, setSortingState] = useState<{ column: keyof T; direction: SortDirection }>({
    column: defaultSort,
    direction: 'desc',
  })
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(explicitPageSize ?? 10)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Simulated latency so the skeleton is visible with the mock backend.
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setItems(await service.getAll())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [service])

  useEffect(() => {
    load()
  }, [load])

  // Read after mount: localStorage is unavailable during server render.
  useEffect(() => {
    if (explicitPageSize) return
    const savedPageSize = Number(
      readJson<{ pageSize?: number } | null>('userProfile', null)?.pageSize ?? 0
    )
    if (savedPageSize > 0) setPageSize(savedPageSize)
  }, [explicitPageSize])

  const inFlight = useRef<Promise<unknown> | null>(null)

  // A repeat call while one is pending (double click, Enter) reuses it instead of firing again.
  const mutate = useCallback(
    <R>(action: () => Promise<R>): Promise<R> => {
      if (inFlight.current) return inFlight.current as Promise<R>
      const run = async () => {
        setLoading(true)
        setError(null)
        try {
          const outcome = await action()
          await load()
          return outcome
        } finally {
          inFlight.current = null
          setLoading(false)
        }
      }
      const pending = run()
      inFlight.current = pending
      return pending
    },
    [load]
  )

  const filteredItems = useMemo(() => {
    const { column, direction } = sorting
    const sign = direction === 'asc' ? 1 : -1
    return items
      .filter((item) => matches(item, filters))
      .sort((a, b) => sign * compareValues(a[column], b[column]))
  }, [items, filters, sorting, matches])

  const totalPages = Math.ceil(filteredItems.length / pageSize)
  const currentPage = Math.min(page, Math.max(totalPages, 1))
  const displayItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return {
    items,
    filteredItems,
    displayItems,
    loading,
    error,
    filters,
    sorting,
    pageSize,
    currentPage,
    totalPages,
    hasItems: items.length > 0,
    hasFilteredItems: filteredItems.length > 0,
    create: (data: C) => mutate(() => service.create(data)),
    update: (id: string, data: U) => mutate(() => service.update(id, data)),
    remove: (id: string) => mutate(() => service.remove(id)),
    setSorting: (column: keyof T, direction: SortDirection) => {
      setSortingState({ column, direction })
      setPage(1)
    },
    setFiltering: (partial: Partial<F>) => {
      setFilters((prev) => ({ ...prev, ...partial }))
      setPage(1)
    },
    setPagination: (nextPage: number, nextPageSize?: number) => {
      setPage(nextPage)
      if (nextPageSize) setPageSize(nextPageSize)
    },
  }
}

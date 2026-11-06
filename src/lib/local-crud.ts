import type { CrudService } from '@/hooks/useCrudList'

export interface CrudError {
  code: string
  message: string
}

interface Entity {
  id: string
  createdAt: string
}

interface LocalCrudOptions<T extends Entity, C, U> {
  key: string
  seed: T[]
  build: (data: C) => Omit<T, 'id' | 'createdAt'>
  apply: (item: T, data: U) => T
  // Throw a CrudError to reject the write; `id` is set on update.
  validate?: (items: T[], candidate: T, id?: string) => void
}

export function crudError(code: string, message: string): CrudError {
  return { code, message }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function createLocalCrud<T extends Entity, C, U>({
  key,
  seed,
  build,
  apply,
  validate,
}: LocalCrudOptions<T, C, U>): CrudService<T, C, U> {
  const read = (): T[] => {
    const stored = localStorage.getItem(key)
    if (!stored) return seed
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed))
      throw crudError('STORAGE_ERROR', 'Invalid data structure in storage')
    return parsed
  }

  const write = (items: T[]) => {
    try {
      localStorage.setItem(key, JSON.stringify(items))
    } catch {
      throw crudError('STORAGE_ERROR', 'Failed to write storage data')
    }
  }

  const findIndex = (items: T[], id: string) => {
    const index = items.findIndex((item) => item.id === id)
    if (index === -1) throw crudError('NOT_FOUND', 'Item not found')
    return index
  }

  return {
    getAll: async () => read(),
    create: async (data) => {
      const items = read()
      const created = { ...build(data), id: generateId(), createdAt: new Date().toISOString() } as T
      validate?.(items, created)
      write([...items, created])
      return created
    },
    update: async (id, data) => {
      const items = read()
      const index = findIndex(items, id)
      const updated = apply(items[index], data)
      validate?.(items, updated, id)
      write(items.with(index, updated))
      return updated
    },
    remove: async (id) => {
      const items = read()
      findIndex(items, id)
      write(items.filter((item) => item.id !== id))
    },
  }
}

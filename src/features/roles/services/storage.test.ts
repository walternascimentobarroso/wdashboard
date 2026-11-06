import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'
import { rolesService } from './storage'

const store = new Map<string, string>()
globalThis.localStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
  clear: () => store.clear(),
  key: () => null,
  length: 0,
} as Storage

beforeEach(() => store.clear())

test('seeds mock roles on first read', async () => {
  assert.equal((await rolesService.getAll()).length, 4)
})

test('create, update and remove persist', async () => {
  const created = await rolesService.create({ name: ' Ops ', description: '', status: 'active' })
  assert.equal(created.name, 'Ops')
  await rolesService.update(created.id, { status: 'inactive' })
  assert.equal((await rolesService.getAll()).find((r) => r.id === created.id)?.status, 'inactive')
  await rolesService.remove(created.id)
  assert.equal((await rolesService.getAll()).length, 4)
})

test('rejects duplicate names case-insensitively, but not the role itself', async () => {
  await assert.rejects(rolesService.create({ name: 'admin', description: '', status: 'active' }), {
    code: 'DUPLICATE_NAME',
  })
  await rolesService.update('1', { name: 'ADMIN' })
  await assert.rejects(rolesService.update('2', { name: 'admin' }), { code: 'DUPLICATE_NAME' })
})

test('update of a missing id fails', async () => {
  await assert.rejects(rolesService.update('nope', { name: 'x' }), { code: 'NOT_FOUND' })
})

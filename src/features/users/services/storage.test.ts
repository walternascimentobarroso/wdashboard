import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'
import { usersService } from './storage'

const store = new Map<string, string>()
globalThis.localStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
  clear: () => store.clear(),
  key: () => null,
  length: 0,
} as Storage

const KEY = 'wdashboard-users'
const users = [
  { id: 'admin', role: 'admin' },
  { id: 'bob', role: 'user' },
].map((u) => ({ ...u, name: u.id, email: `${u.id}@x.io`, status: 'active', createdAt: '' }))

beforeEach(() => {
  store.clear()
  store.set(KEY, JSON.stringify(users))
})

test('deleting the only admin throws LAST_ADMIN_DELETION', async () => {
  await assert.rejects(usersService.remove('admin'), { code: 'LAST_ADMIN_DELETION' })
})

test('demoting the only admin throws LAST_ADMIN_DEMOTION', async () => {
  await assert.rejects(usersService.update('admin', { role: 'user' }), {
    code: 'LAST_ADMIN_DEMOTION',
  })
})

test('deactivating the only active admin throws LAST_ADMIN_DEACTIVATION', async () => {
  await assert.rejects(usersService.update('admin', { status: 'inactive' }), {
    code: 'LAST_ADMIN_DEACTIVATION',
  })
})

test('deleting a non-admin works', async () => {
  await usersService.remove('bob')
  assert.equal(JSON.parse(store.get(KEY) ?? '').length, 1)
})

test('reads the legacy { users, lastModified, version } shape', async () => {
  store.set(KEY, JSON.stringify({ users, lastModified: '', version: '1.0.0' }))
  assert.equal((await usersService.getAll()).length, 2)
})

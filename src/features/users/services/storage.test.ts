import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'
import { UsersStorage } from './storage'

const store = new Map<string, string>()
globalThis.localStorage = {
  getItem: (key: string) => store.get(key) ?? null,
  setItem: (key: string, value: string) => store.set(key, value),
  removeItem: (key: string) => store.delete(key),
  clear: () => store.clear(),
  key: () => null,
  length: 0,
} as Storage

function seed(users: { id: string; role: 'admin' | 'user' }[]) {
  const seeded = users.map((u) => ({ ...u, name: u.id, email: `${u.id}@x.io`, status: 'active' }))
  store.set(
    'wdashboard-users',
    JSON.stringify({ users: seeded, lastModified: new Date().toISOString(), version: '1.0.0' })
  )
}

beforeEach(() => {
  store.clear()
  seed([
    { id: 'admin', role: 'admin' },
    { id: 'bob', role: 'user' },
  ])
})

test('deleting the only admin throws LAST_ADMIN_DELETION', async () => {
  await assert.rejects(new UsersStorage().deleteUser('admin'), { code: 'LAST_ADMIN_DELETION' })
})

test('demoting the only admin throws LAST_ADMIN_DEMOTION', async () => {
  await assert.rejects(new UsersStorage().updateUser('admin', { role: 'user' }), {
    code: 'LAST_ADMIN_DEMOTION',
  })
})

test('deleting a non-admin works', async () => {
  await new UsersStorage().deleteUser('bob')
  assert.equal(JSON.parse(store.get('wdashboard-users') ?? '').users.length, 1)
})

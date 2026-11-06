import assert from 'node:assert/strict'
import { beforeEach, test } from 'node:test'
import { readJson } from './read-json'

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

test('returns the parsed value', () => {
  store.set('k', '{"a":1}')
  assert.deepEqual(readJson('k', {}), { a: 1 })
})

test('returns the fallback for a corrupted value', () => {
  store.set('k', '{oops')
  assert.deepEqual(readJson('k', { a: 2 }), { a: 2 })
})

test('returns the fallback for a missing key', () => {
  assert.equal(readJson('missing', 7), 7)
})

// Tiny Promise-based IndexedDB wrapper. Native API is verbose; this trims it.
// All ~80 lines of it — no Dexie, no idb, no library.

const DB_NAME = "kbi-progress"
// Version 2 adds the `itemReview` store for SM-2 spaced repetition. The
// onupgradeneeded handler is forward-compatible: it only creates stores that
// don't already exist, so a v1 → v2 upgrade just adds itemReview without
// touching other stores. See docs/BACKUP_SCHEMA.md for the parallel JSON
// schema bump.
const DB_VERSION = 2

export type StoreName = "profile" | "sessions" | "answers" | "dailyTotals" | "itemReview"

let dbPromise: Promise<IDBDatabase> | null = null

function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise
  dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB unavailable"))
      return
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onerror = () => reject(req.error ?? new Error("indexedDB open failed"))
    req.onsuccess = () => resolve(req.result)
    req.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains("profile")) {
        db.createObjectStore("profile", { keyPath: "id" })
      }
      if (!db.objectStoreNames.contains("sessions")) {
        const s = db.createObjectStore("sessions", { keyPath: "id" })
        s.createIndex("startedAt", "startedAt")
      }
      if (!db.objectStoreNames.contains("answers")) {
        const a = db.createObjectStore("answers", { keyPath: "id" })
        a.createIndex("sessionId", "sessionId")
        a.createIndex("answeredAt", "answeredAt")
      }
      if (!db.objectStoreNames.contains("dailyTotals")) {
        db.createObjectStore("dailyTotals", { keyPath: "date" })
      }
      if (!db.objectStoreNames.contains("itemReview")) {
        const r = db.createObjectStore("itemReview", { keyPath: "itemKey" })
        r.createIndex("dueAt", "dueAt")
      }
    }
  })
  return dbPromise
}

export async function get<T>(store: StoreName, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(store, "readonly").objectStore(store).get(key)
    req.onsuccess = () => resolve(req.result as T | undefined)
    req.onerror = () => reject(req.error)
  })
}

export async function put<T>(store: StoreName, value: T): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, "readwrite")
    tx.objectStore(store).put(value)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getAll<T>(store: StoreName): Promise<T[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(store, "readonly").objectStore(store).getAll()
    req.onsuccess = () => resolve(req.result as T[])
    req.onerror = () => reject(req.error)
  })
}

export async function clearAll(stores: StoreName[]): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(stores, "readwrite")
    for (const s of stores) tx.objectStore(s).clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

/**
 * Batched writes with UI yield between chunks. For very large imports,
 * this prevents the tab from freezing during multi-thousand-row writes.
 *
 * Each chunk is one transaction (atomic + fast). Between chunks we await
 * `setTimeout(0)` to let the event loop run — React paints, browser handles input.
 */
export async function putMany<T>(
  store: StoreName,
  values: T[],
  options: { chunkSize?: number; onChunkComplete?: (writtenSoFar: number) => void } = {},
): Promise<void> {
  const { chunkSize = 500, onChunkComplete } = options
  if (values.length === 0) return
  const db = await openDB()
  let written = 0
  for (let i = 0; i < values.length; i += chunkSize) {
    const chunk = values.slice(i, i + chunkSize)
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, "readwrite")
      const objStore = tx.objectStore(store)
      for (const v of chunk) objStore.put(v)
      tx.oncomplete = () => resolve()
      tx.onerror = () => reject(tx.error)
    })
    written += chunk.length
    onChunkComplete?.(written)
    // Yield to the event loop so React paints + the browser stays responsive
    await new Promise<void>((r) => setTimeout(r, 0))
  }
}

class LRUCache<T> {
  private capacity: number;
  private cache = new Map<string, T>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  set(key: string, value: T) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const firstKeyToRemove = this.cache.keys().next().value;
      this.cache.delete(firstKeyToRemove);
    }
  }

  get(key: string): T | undefined {
    if (!this.cache.has(key)) {
      return;
    }

    this.liftUpBy(key);
    return this.cache.get(key);
  }

  has(key: string): boolean {
    if (!this.cache.has(key)) {
      return false;
    }

    this.liftUpBy(key);
    return true;
  }

  private liftUpBy(key: string) {
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
  }
}

const cache = new LRUCache(3); // Размер кеша

cache.set('key1', 1);
cache.set('key2', 2);
cache.set('key3', 3);

console.log(cache.get('key1')); // 1

cache.set('key4', 4);

console.log(cache.has('key2')); // false

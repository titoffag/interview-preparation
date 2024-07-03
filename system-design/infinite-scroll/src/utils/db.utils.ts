export interface CursorInfo<T> {
  size: number;
  nextCursor: number;
  prevCursor: number;
  chunk: T[];
}

interface DB<T> {
  load: (start: number, limit: number) => Promise<CursorInfo<T>>;
}

interface DBParams<T> {
  size: number;
  pageSize: number;
  getItem: (idx: number) => T;
}

export function db<T>({
  size = 100,
  pageSize = 10,
  getItem,
}: DBParams<T>): DB<T> {
  const items = Array(size)
    .fill(null)
    .map((_, idx) => getItem(idx));

  const load = (start: number, limit = pageSize): Promise<CursorInfo<T>> => {
    const chunk = items.slice(start, start + limit);

    const cursorInfo = {
      chunk,
      nextCursor: start + limit,
      prevCursor: start,
      size: chunk.length,
    };

    return new Promise((resolve) => resolve(cursorInfo));
  };

  return {
    load,
  };
}

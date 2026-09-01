export type QueueItem = {
  id: string;
  tipo: "reserva" | "compra";
  titulo: string;
  detalle: string;
  creado: string;
  estado: "pendiente" | "sincronizado";
};

const KEY = "coina.sync.queue.v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readQueue(): QueueItem[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as QueueItem[];
  } catch {
    return [];
  }
}

export function writeQueue(items: QueueItem[]) {
  if (!isBrowser()) return;
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function enqueue(item: Omit<QueueItem, "id" | "creado" | "estado">, online: boolean) {
  const entry: QueueItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    creado: new Date().toISOString(),
    estado: online ? "sincronizado" : "pendiente",
  };
  const next = [entry, ...readQueue()];
  writeQueue(next);
  return next;
}

export function flushQueue(): QueueItem[] {
  const next = readQueue().map((i) => ({ ...i, estado: "sincronizado" as const }));
  writeQueue(next);
  return next;
}

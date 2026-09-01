import { useMemo, useState } from "react";
import { Check, CreditCard, Leaf, Loader2, Minus, Plus, QrCode, ShoppingBasket, Trash2 } from "lucide-react";
import { products } from "@/data/coina";
import { Badge, Btn, Card, SectionTitle, Sheet } from "./ui";
import { enqueue } from "@/lib/sync-queue";

export function MarketTab({ isOnline, onQueued }: { isOnline: boolean; onQueued: () => void }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [checkout, setCheckout] = useState(false);
  const [metodo, setMetodo] = useState<"qr" | "tarjeta">("qr");
  const [estado, setEstado] = useState<"idle" | "loading" | "done">("idle");

  const items = useMemo(
    () => products.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id]! })),
    [cart],
  );
  const total = items.reduce((s, i) => s + i.precio * i.qty, 0);

  const add = (id: string) => setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  const remove = (id: string) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) - 1 };
      if (next[id]! <= 0) delete next[id];
      return next;
    });

  const pagar = () => {
    setEstado("loading");
    setTimeout(() => {
      enqueue(
        {
          tipo: "compra",
          titulo: `Compra en el Mercado (${metodo === "qr" ? "Yape/Plin" : "Tarjeta"})`,
          detalle: `${items.map((i) => `${i.qty}× ${i.nombre}`).join(", ")} · S/ ${total.toFixed(2)}`,
        },
        isOnline,
      );
      onQueued();
      setEstado("done");
      setCart({});
    }, 1100);
  };

  return (
    <div className="space-y-5 pb-4 animate-fade-up">
      <SectionTitle eyebrow="Mercado de lima dulce" title="Productos de Coina" />

      <div className="space-y-3">
        {products.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-sun text-2xl shadow-soft">
                {p.emoji}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] text-foreground">{p.nombre}</p>
                <p className="text-xs text-muted-foreground">{p.productor}</p>
                <p className="mt-2 flex items-start gap-1.5 text-xs text-foreground">
                  <Leaf className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {p.beneficios}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span className="font-display text-lg text-primary">S/ {p.precio.toFixed(2)}</span>
                    <span className="ml-1 text-[11px] text-muted-foreground">/ {p.unidad}</span>
                  </div>
                  {cart[p.id] ? (
                    <div className="flex items-center gap-2 rounded-xl bg-muted p-1">
                      <Btn size="sm" variant="ghost" onClick={() => remove(p.id)}>
                        <Minus className="size-4" />
                      </Btn>
                      <span className="w-5 text-center text-sm font-bold">{cart[p.id]}</span>
                      <Btn size="sm" variant="ghost" onClick={() => add(p.id)}>
                        <Plus className="size-4" />
                      </Btn>
                    </div>
                  ) : (
                    <Btn size="sm" onClick={() => add(p.id)}>
                      <Plus className="size-4" /> Agregar
                    </Btn>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {items.length > 0 && (
        <Card className="sticky bottom-2 border-primary/30 p-4 animate-pop">
          <div className="flex items-center gap-3">
            <ShoppingBasket className="size-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                {items.reduce((s, i) => s + i.qty, 0)} producto(s)
              </p>
              <p className="font-display text-lg text-foreground">S/ {total.toFixed(2)}</p>
            </div>
            <Btn variant="ghost" size="sm" onClick={() => setCart({})} aria-label="Vaciar carrito">
              <Trash2 className="size-4" />
            </Btn>
            <Btn onClick={() => setCheckout(true)}>Pagar</Btn>
          </div>
        </Card>
      )}

      <Sheet
        open={checkout}
        onClose={() => {
          setCheckout(false);
          setEstado("idle");
        }}
        title="Finalizar compra"
      >
        {estado === "done" ? (
          <div className="py-4 text-center animate-pop">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15">
              <Check className="size-7 text-primary" />
            </div>
            <p className="mt-3 font-display text-lg">
              {isOnline ? "¡Pago simulado con éxito!" : "Compra guardada sin conexión"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isOnline
                ? "Los productores prepararán tu pedido en Coina."
                : "Se procesará automáticamente al recuperar la señal."}
            </p>
            <Btn
              className="mt-4 w-full"
              onClick={() => {
                setCheckout(false);
                setEstado("idle");
              }}
            >
              Listo
            </Btn>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-1.5 rounded-2xl bg-muted p-3 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span>
                    {i.qty}× {i.nombre}
                  </span>
                  <span className="font-semibold">S/ {(i.precio * i.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-1 flex justify-between border-t border-border pt-1.5 font-display">
                <span>Total</span>
                <span className="text-primary">S/ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMetodo("qr")}
                className={`rounded-2xl border p-3 text-left transition-all ${metodo === "qr" ? "border-primary bg-primary/10" : "border-border"}`}
              >
                <QrCode className="size-5 text-primary" />
                <p className="mt-1 text-xs font-semibold">Yape / Plin</p>
              </button>
              <button
                onClick={() => setMetodo("tarjeta")}
                className={`rounded-2xl border p-3 text-left transition-all ${metodo === "tarjeta" ? "border-accent bg-accent/10" : "border-border"}`}
              >
                <CreditCard className="size-5 text-accent" />
                <p className="mt-1 text-xs font-semibold">Tarjeta</p>
              </button>
            </div>

            {metodo === "qr" ? (
              <div className="flex flex-col items-center rounded-2xl bg-sand p-4 animate-pop">
                <QrPlaceholder />
                <p className="mt-2 text-xs text-sand-foreground">
                  Escanea con Yape o Plin · Mercado Coina
                </p>
              </div>
            ) : (
              <div className="space-y-2 animate-pop">
                <input
                  placeholder="Número de tarjeta"
                  className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    placeholder="MM/AA"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    placeholder="CVV"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {!isOnline && (
              <Badge tone="secondary" className="w-full justify-center py-2">
                Sin conexión: tu pedido se guardará en la cola de sincronización
              </Badge>
            )}

            <Btn className="w-full" onClick={pagar} disabled={estado === "loading"}>
              {estado === "loading" ? <Loader2 className="size-4 animate-spin" /> : null}
              {estado === "loading" ? "Procesando pago..." : `Pagar S/ ${total.toFixed(2)}`}
            </Btn>
          </div>
        )}
      </Sheet>
    </div>
  );
}

function QrPlaceholder() {
  const cells = Array.from({ length: 81 }, (_, i) => (i * 7919) % 3 !== 0);
  return (
    <div className="grid size-36 grid-cols-9 gap-0.5 rounded-xl bg-card p-2 shadow-soft">
      {cells.map((on, i) => (
        <span key={i} className={on ? "rounded-[2px] bg-foreground" : "rounded-[2px] bg-card"} />
      ))}
    </div>
  );
}

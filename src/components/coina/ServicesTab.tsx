import { useState } from "react";
import { BedDouble, Bus, Check, Loader2, MessageCircle, Star, UtensilsCrossed } from "lucide-react";
import { lodgings, restaurants, transports, type Lodging } from "@/data/coina";
import { Badge, Btn, Card, SectionTitle, Sheet } from "./ui";
import { enqueue } from "@/lib/sync-queue";

type Sub = "dormir" | "comer" | "viajar";

export function ServicesTab({ isOnline, onQueued }: { isOnline: boolean; onQueued: () => void }) {
  const [sub, setSub] = useState<Sub>("dormir");
  const [booking, setBooking] = useState<Lodging | null>(null);

  const subs: { id: Sub; label: string; icon: typeof BedDouble }[] = [
    { id: "dormir", label: "🛌 Dormir", icon: BedDouble },
    { id: "comer", label: "🍲 Comer", icon: UtensilsCrossed },
    { id: "viajar", label: "🚌 Viajar", icon: Bus },
  ];

  return (
    <div className="space-y-5 animate-fade-up">
      <SectionTitle eyebrow="Directorio local" title="Servicios en Coina" />

      <div className="flex gap-2 rounded-2xl bg-muted p-1" role="tablist" aria-label="Tipos de servicio">
        {subs.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={sub === s.id}
            onClick={() => setSub(s.id)}
            className={`tap-target flex-1 rounded-xl py-2 text-xs font-semibold transition-all duration-200 ${
              sub === s.id ? "bg-card text-primary shadow-soft" : "text-muted-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {sub === "dormir" && (
        <div className="space-y-3">
          {lodgings.map((l) => (
            <Card key={l.id} className="p-4 animate-pop">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[16px] text-foreground">{l.nombre}</p>
                  <div className="mt-1 flex items-center gap-0.5">
                    {Array.from({ length: l.estrellas }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg text-primary">S/ {l.precio.toFixed(2)}</p>
                  <p className="text-[11px] text-muted-foreground">por noche</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {l.amenidades.map((a) => (
                  <Badge key={a} tone="sand">
                    {a}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Badge tone={l.disponible ? "primary" : "secondary"}>
                  {l.disponible ? "Disponible" : "Completo"}
                </Badge>
                <div className="ml-auto flex gap-2">
                  <a
                    href={`https://wa.me/${l.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    <MessageCircle className="size-4 text-primary" /> WhatsApp
                  </a>
                  <Btn size="sm" onClick={() => setBooking(l)}>
                    Reservar ahora
                  </Btn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {sub === "comer" && (
        <div className="space-y-3">
          {restaurants.map((r) => (
            <Card key={r.id} className="p-4 animate-pop">
              <p className="font-display text-[16px] text-foreground">{r.nombre}</p>
              <p className="text-xs text-muted-foreground">{r.especialidad}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {r.platos.map((p) => (
                  <Badge key={p} tone="secondary">
                    {p}
                  </Badge>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <Badge tone="primary">{r.rango}</Badge>
                <a
                  href={`https://wa.me/${r.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"
                >
                  <MessageCircle className="size-4" /> Pedir mesa
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      {sub === "viajar" && (
        <div className="space-y-3">
          {transports.map((t) => (
            <Card key={t.id} className="p-4 animate-pop">
              <div className="flex items-center gap-2">
                <Bus className="size-5 text-accent" />
                <p className="font-display text-[15px]">{t.empresa}</p>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t.ruta}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge tone="accent">{t.horario}</Badge>
                <Badge tone="primary">{t.precio}</Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      <BookingSheet
        lodging={booking}
        onClose={() => setBooking(null)}
        isOnline={isOnline}
        onQueued={onQueued}
      />
    </div>
  );
}

function BookingSheet({
  lodging,
  onClose,
  isOnline,
  onQueued,
}: {
  lodging: Lodging | null;
  onClose: () => void;
  isOnline: boolean;
  onQueued: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [noches, setNoches] = useState(1);
  const [estado, setEstado] = useState<"idle" | "loading" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lodging) return;
    setEstado("loading");
    setTimeout(() => {
      enqueue(
        {
          tipo: "reserva",
          titulo: `Reserva en ${lodging.nombre}`,
          detalle: `${nombre || "Viajero"} · ${fecha || "fecha por confirmar"} · ${noches} noche(s) · S/ ${(lodging.precio * noches).toFixed(2)}`,
        },
        isOnline,
      );
      onQueued();
      setEstado("done");
    }, 900);
  };

  const close = () => {
    setEstado("idle");
    setNombre("");
    setFecha("");
    setNoches(1);
    onClose();
  };

  return (
    <Sheet open={!!lodging} onClose={close} title={`Reservar en ${lodging?.nombre ?? ""}`}>
      {estado === "done" ? (
        <div className="py-4 text-center animate-pop" role="status" aria-live="polite">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15">
            <Check className="size-7 text-primary" />
          </div>
          <p className="mt-3 font-display text-lg">
            {isOnline ? "¡Reserva enviada!" : "Guardada sin conexión"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isOnline
              ? "El hospedaje te confirmará por WhatsApp en breve."
              : "Se enviará automáticamente cuando vuelva la señal."}
          </p>
          <Btn className="mt-4 w-full" onClick={close}>
            Entendido
          </Btn>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <Field label="Nombre completo">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="min-h-11 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground"
              placeholder="Juan Pérez"
            />
          </Field>
          <Field label="Fecha de llegada">
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              className="min-h-11 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground"
            />
          </Field>
          <Field label="Noches">
            <div className="flex items-center gap-3">
              <Btn
                variant="outline"
                size="sm"
                type="button"
                aria-label="Quitar una noche"
                onClick={() => setNoches((n) => Math.max(1, n - 1))}
              >
                −
              </Btn>
              <span className="font-display text-lg" aria-live="polite">
                {noches}
                <span className="sr-only"> noche(s)</span>
              </span>
              <Btn
                variant="outline"
                size="sm"
                type="button"
                aria-label="Agregar una noche"
                onClick={() => setNoches((n) => n + 1)}
              >
                +
              </Btn>
            </div>
          </Field>
          <div className="rounded-2xl bg-muted p-3 text-sm">
            Total estimado:{" "}
            <strong className="text-primary">S/ {((lodging?.precio ?? 0) * noches).toFixed(2)}</strong>
          </div>
          <Btn type="submit" className="w-full" disabled={estado === "loading"}>
            {estado === "loading" ? <Loader2 className="size-4 animate-spin" /> : null}
            {estado === "loading" ? "Procesando..." : "Confirmar reserva"}
          </Btn>
        </form>
      )}
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

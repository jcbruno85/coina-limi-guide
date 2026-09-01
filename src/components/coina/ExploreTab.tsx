import { useState } from "react";
import { Droplets, Footprints, Mountain, Navigation, Tent, Trees } from "lucide-react";
import { attractions, type Attraction } from "@/data/coina";
import { Badge, Btn, Card, SectionTitle, Sheet } from "./ui";

const iconFor = (tipo: Attraction["tipo"]) =>
  tipo === "rio" ? Droplets : tipo === "mirador" ? Navigation : tipo === "campestre" ? Tent : Mountain;

const pinTone: Record<Attraction["tipo"], string> = {
  natural: "bg-primary text-primary-foreground",
  mirador: "bg-secondary text-secondary-foreground",
  campestre: "bg-sand text-sand-foreground",
  rio: "bg-accent text-accent-foreground",
};

export function ExploreTab() {
  const [selected, setSelected] = useState<Attraction | null>(null);

  return (
    <div className="space-y-6 animate-fade-up">
      <SectionTitle eyebrow="Explora" title="Mapa de puntos de interés" />

      <div className="relative h-[320px] overflow-hidden rounded-3xl border border-border shadow-lift">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#BBDEFB" />
              <stop offset="100%" stopColor="#E8F5E9" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#cielo)" />
          <path d="M0 40 L18 18 L34 40 L52 14 L70 42 L86 24 L100 44 L100 100 L0 100 Z" fill="#A5D6A7" />
          <path d="M0 58 L22 44 L44 62 L66 48 L88 66 L100 58 L100 100 L0 100 Z" fill="#81C784" />
          <path
            d="M-2 78 C 20 70, 40 88, 60 76 S 90 68, 102 80 L102 100 L-2 100 Z"
            fill="#64B5F6"
            opacity="0.85"
          />
        </svg>

        {attractions.map((a) => {
          const Icon = iconFor(a.tipo);
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a)}
              style={{ left: `${a.mapa.x}%`, top: `${a.mapa.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 hover:scale-115 active:scale-95"
              aria-label={a.nombre}
            >
              <span
                className={`flex size-9 items-center justify-center rounded-full shadow-lift ring-2 ring-card ${pinTone[a.tipo]}`}
              >
                <Icon className="size-4" />
              </span>
            </button>
          );
        })}

        <div className="absolute bottom-2 left-2 rounded-xl bg-card/90 px-2.5 py-1.5 text-[10px] font-semibold text-muted-foreground backdrop-blur">
          Toca un pin para ver el detalle
        </div>
      </div>

      <div className="space-y-3">
        {attractions.map((a) => {
          const Icon = iconFor(a.tipo);
          return (
            <Card key={a.id} className="p-4 transition-shadow hover:shadow-lift">
              <button onClick={() => setSelected(a)} className="flex w-full items-start gap-3 text-left">
                <span className={`rounded-xl p-2.5 ${pinTone[a.tipo]}`}>
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] text-foreground">{a.nombre}</span>
                  <span className="block text-xs text-muted-foreground">
                    {a.sector} · {a.altitud} msnm
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    <Badge tone="primary">
                      <Footprints className="size-3" /> {a.dificultad}
                    </Badge>
                    <Badge tone="sand">
                      <Trees className="size-3" /> {a.tipo}
                    </Badge>
                  </span>
                </span>
              </button>
            </Card>
          );
        })}
      </div>

      <Sheet open={!!selected} onClose={() => setSelected(null)} title={selected?.nombre ?? ""}>
        {selected ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              <Badge tone="primary">Dificultad: {selected.dificultad}</Badge>
              <Badge tone="accent">{selected.altitud} msnm</Badge>
              <Badge tone="secondary">{selected.sector}</Badge>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{selected.descripcion}</p>
            <div className="rounded-2xl bg-muted p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Accesibilidad
              </p>
              <p className="mt-1 text-sm text-foreground">{selected.accesibilidad}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Coordenadas: {selected.coordenadas.lat}, {selected.coordenadas.lng}
            </p>
            <Btn className="w-full" onClick={() => setSelected(null)}>
              Añadir a mi ruta
            </Btn>
          </div>
        ) : null}
      </Sheet>
    </div>
  );
}

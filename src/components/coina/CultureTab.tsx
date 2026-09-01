import { useState } from "react";
import { BookOpen, ChevronDown, Volume2 } from "lucide-react";
import { legends } from "@/data/coina";
import { Badge, Btn, Card, SectionTitle } from "./ui";

export function CultureTab() {
  const [open, setOpen] = useState<string | null>(legends[0]!.id);

  const leer = (texto: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-PE";
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="space-y-5 animate-fade-up">
      <SectionTitle eyebrow="Cultura viva" title="Leyendas de Coina" />

      <Card className="bg-sand p-4">
        <div className="flex items-center gap-2">
          <BookOpen className="size-5 text-sand-foreground" />
          <p className="font-display text-[15px]">Lectura inmersiva</p>
        </div>
        <p className="mt-1 text-xs text-sand-foreground/80">
          Relatos recogidos de los abuelos coininos. Disponibles siempre, incluso sin señal.
        </p>
      </Card>

      <div className="space-y-3">
        {legends.map((l) => {
          const isOpen = open === l.id;
          return (
            <Card key={l.id} className={isOpen ? "border-primary/40" : undefined}>
              <button
                onClick={() => setOpen(isOpen ? null : l.id)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] text-foreground">{l.titulo}</span>
                  <span className="block text-xs text-muted-foreground">{l.resumen}</span>
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-3 px-4 pb-4">
                    <p className="text-sm leading-relaxed text-foreground">{l.texto}</p>
                    <div className="flex items-center gap-2">
                      <Btn size="sm" variant="accent" onClick={() => leer(l.texto)}>
                        <Volume2 className="size-4" /> Escuchar audio-guía
                      </Btn>
                      <Badge tone="sand">Tradición oral</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Send, Volume2, WifiOff } from "lucide-react";
import { limiKnowledge, quickQuestions } from "@/data/coina";
import { Badge, Btn } from "./ui";

type Msg = { id: string; de: "limi" | "yo"; texto: string; offline?: boolean };

function buscarLocal(pregunta: string) {
  const q = pregunta.toLowerCase();
  const hit = limiKnowledge.find((k) => k.claves.some((c) => q.includes(c.toLowerCase())));
  return (
    hit?.respuesta ??
    "Estoy en modo sin conexión con datos guardados. Pregúntame por itinerarios, cómo llegar, clima saludable, hospedajes, comida, productos de lima dulce o leyendas. 🍋"
  );
}

function responderOnline(pregunta: string) {
  const local = buscarLocal(pregunta);
  return `${local}\n\n¿Quieres que te arme el detalle hora por hora?`;
}

export function LimiTab({ isOnline }: { isOnline: boolean }) {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: "hola",
      de: "limi",
      texto:
        "¡Hola! Soy Limi, tu guía coinina 🍋🎒 Pregúntame lo que quieras sobre Coina: rutas, clima, hospedajes o leyendas.",
    },
  ]);
  const [input, setInput] = useState("");
  const [pensando, setPensando] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, pensando]);

  const enviar = (texto: string) => {
    const limpio = texto.trim();
    if (!limpio || pensando) return;
    setInput("");
    setMsgs((m) => [...m, { id: `${Date.now()}-yo`, de: "yo", texto: limpio }]);
    setPensando(true);
    setTimeout(
      () => {
        setMsgs((m) => [
          ...m,
          {
            id: `${Date.now()}-limi`,
            de: "limi",
            texto: isOnline ? responderOnline(limpio) : buscarLocal(limpio),
            offline: !isOnline,
          },
        ]);
        setPensando(false);
      },
      isOnline ? 900 : 350,
    );
  };

  const escuchar = (texto: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = "es-PE";
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="flex h-[calc(100dvh-13.5rem)] flex-col animate-fade-up">
      <div className="mb-3 flex items-center gap-3 rounded-3xl bg-gradient-hero p-4 text-primary-foreground shadow-lift">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-card text-2xl shadow-soft">
          🍋
        </div>
        <div>
          <p className="font-display text-lg leading-tight">Limi</p>
          <p className="text-xs text-primary-foreground/90">
            {isOnline ? "En línea · asistente turístico" : "Modo offline · base local"}
          </p>
        </div>
        {!isOnline && (
          <Badge tone="sand" className="ml-auto">
            <WifiOff className="size-3" /> Sin API
          </Badge>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-3xl bg-muted/60 p-3">
        {msgs.map((m) => (
          <div key={m.id} className={`flex ${m.de === "yo" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line shadow-soft animate-pop ${
                m.de === "yo"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-card text-foreground"
              }`}
            >
              {m.texto}
              {m.de === "limi" && m.offline ? (
                <button
                  onClick={() => escuchar(m.texto)}
                  className="mt-2 flex items-center gap-1.5 rounded-xl bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-accent-foreground"
                >
                  <Volume2 className="size-3.5" /> Escuchar audio-guía
                </button>
              ) : null}
            </div>
          </div>
        ))}
        {pensando && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-2xl bg-card px-3.5 py-3 shadow-soft">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  style={{ animationDelay: `${d}ms` }}
                  className="size-2 animate-bounce rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => enviar(q)}
            className="shrink-0 rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          enviar(input);
        }}
        className="mt-2 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escríbele a Limi..."
          className="flex-1 rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <Btn type="submit" disabled={pensando}>
          <Send className="size-4" />
        </Btn>
      </form>
    </div>
  );
}

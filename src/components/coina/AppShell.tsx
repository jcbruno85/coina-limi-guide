import { useEffect, useState } from "react";
import { BookOpen, Home, Map, MessageCircleHeart, ShoppingBasket, Store, Wifi, WifiOff, RefreshCw } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { flushQueue, readQueue, type QueueItem } from "@/lib/sync-queue";
import { HomeTab } from "./HomeTab";
import { ExploreTab } from "./ExploreTab";
import { ServicesTab } from "./ServicesTab";
import { MarketTab } from "./MarketTab";
import { CultureTab } from "./CultureTab";
import { LimiTab } from "./LimiTab";
import { Badge } from "./ui";

type TabId = "inicio" | "explora" | "servicios" | "mercado" | "cultura" | "limi";

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "explora", label: "Explora", icon: Map },
  { id: "servicios", label: "Servicios", icon: Store },
  { id: "mercado", label: "Mercado", icon: ShoppingBasket },
  { id: "cultura", label: "Cultura", icon: BookOpen },
  { id: "limi", label: "Limi", icon: MessageCircleHeart },
];

export function AppShell() {
  const [tab, setTab] = useState<TabId>("inicio");
  const { isOnline, simulatedOffline, toggleSimulated } = useOnlineStatus();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [sincronizando, setSincronizando] = useState(false);

  useEffect(() => setQueue(readQueue()), []);

  const pendientes = queue.filter((q) => q.estado === "pendiente");

  useEffect(() => {
    if (!isOnline || pendientes.length === 0) return;
    setSincronizando(true);
    const t = setTimeout(() => {
      setQueue(flushQueue());
      setSincronizando(false);
    }, 1500);
    return () => clearTimeout(t);
  }, [isOnline, pendientes.length]);

  return (
    <div className="min-h-dvh bg-background pb-24">
      <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-hero text-lg shadow-soft">
            🍋
          </div>
          <div className="min-w-0">
            <p className="font-display text-[15px] leading-none text-foreground">Coina Turística</p>
            <p className="text-[11px] text-muted-foreground">La Libertad · Perú</p>
          </div>
          <button
            onClick={toggleSimulated}
            className="ml-auto"
            aria-label="Alternar modo sin conexión"
            title="Simular modo sin conexión"
          >
            <Badge tone={isOnline ? "primary" : "secondary"} className="py-1.5">
              {isOnline ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
              {isOnline ? "Modo Online" : "Modo Sin Conexión"}
            </Badge>
          </button>
        </div>
        {(pendientes.length > 0 || sincronizando) && (
          <div className="flex items-center gap-2 bg-secondary/30 px-4 py-1.5 text-[11px] font-semibold text-secondary-foreground">
            <RefreshCw className={`size-3.5 ${sincronizando ? "animate-spin" : ""}`} />
            {sincronizando
              ? "Sincronizando datos guardados..."
              : `${pendientes.length} operación(es) en cola de sincronización`}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-2xl px-4 py-5">
        {tab === "inicio" && <HomeTab isOnline={isOnline} onGoTo={(t) => setTab(t as TabId)} />}
        {tab === "explora" && <ExploreTab />}
        {tab === "servicios" && (
          <ServicesTab isOnline={isOnline} onQueued={() => setQueue(readQueue())} />
        )}
        {tab === "mercado" && (
          <MarketTab isOnline={isOnline} onQueued={() => setQueue(readQueue())} />
        )}
        {tab === "cultura" && <CultureTab />}
        {tab === "limi" && <LimiTab isOnline={isOnline} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-stretch justify-between px-1 pb-[env(safe-area-inset-bottom)]">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors"
              >
                <span
                  className={`flex size-9 items-center justify-center rounded-xl transition-all duration-200 ${
                    active ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground"
                  }`}
                >
                  <t.icon className="size-[18px]" />
                </span>
                <span
                  className={`text-[10px] font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {simulatedOffline && (
        <p className="pointer-events-none fixed bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-full bg-foreground/85 px-3 py-1.5 text-[11px] font-semibold text-background">
          Simulación offline activa · toca el indicador para volver
        </p>
      )}
    </div>
  );
}

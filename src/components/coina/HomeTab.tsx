import { useEffect, useState } from "react";
import { Bus, CloudSun, HeartPulse, Layers, MapPin, Mountain, Sunrise, Wind } from "lucide-react";
import { transports } from "@/data/coina";
import { Badge, Btn, Card, SectionTitle, Skeleton } from "./ui";

type Weather = { temp: number; min: number; max: number; humedad: number; estado: string };

export function HomeTab({ isOnline, onGoTo }: { isOnline: boolean; onGoTo: (t: string) => void }) {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    setWeather(null);
    const t = setTimeout(
      () =>
        setWeather({
          temp: 23,
          min: 11,
          max: 25,
          humedad: 38,
          estado: isOnline ? "Soleado" : "Soleado (dato guardado)",
        }),
      700,
    );
    return () => clearTimeout(t);
  }, [isOnline]);

  return (
    <div className="space-y-6 animate-fade-up">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 text-primary-foreground shadow-lift">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-secondary/40 blur-2xl" />
        <Badge tone="sand" className="relative">
          <Mountain className="size-3" /> 1942 msnm · Alto Chicama
        </Badge>
        <h1 className="relative mt-3 text-[26px] leading-tight">
          ¡Respira de nuevo en el Paraíso del Alto Chicama!
        </h1>
        <p className="relative mt-2 text-sm text-primary-foreground/90">
          Coina, La Libertad: aire seco, sol andino y limas dulces recién cosechadas.
        </p>
        <div className="relative mt-4 flex gap-2">
          <Btn variant="secondary" onClick={() => onGoTo("explora")}>
            <MapPin className="size-4" /> Explorar rutas
          </Btn>
          <Btn
            variant="outline"
            className="bg-card/15 text-primary-foreground border-primary-foreground/40"
            onClick={() => onGoTo("limi")}
          >
            Habla con Limi
          </Btn>
        </div>
      </section>

      <section>
        <SectionTitle eyebrow="Clima en tiempo real" title="Hoy en Coina" />
        <Card className="p-5">
          {!weather ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ) : (
            <div className="animate-pop">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-4xl text-foreground">{weather.temp}°C</p>
                  <p className="text-sm text-muted-foreground">{weather.estado}</p>
                </div>
                <div className="rounded-2xl bg-gradient-sun p-3 text-secondary-foreground shadow-soft">
                  <CloudSun className="size-8" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-xl bg-muted p-2">
                  <p className="text-muted-foreground">Mín</p>
                  <p className="font-semibold">{weather.min}°</p>
                </div>
                <div className="rounded-xl bg-muted p-2">
                  <p className="text-muted-foreground">Máx</p>
                  <p className="font-semibold">{weather.max}°</p>
                </div>
                <div className="rounded-xl bg-muted p-2">
                  <p className="text-muted-foreground">Humedad</p>
                  <p className="font-semibold">{weather.humedad}%</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3 rounded-2xl bg-primary/10 p-3">
                <HeartPulse className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-foreground">
                  <strong>Bueno para tus pulmones:</strong> el clima seco y soleado a 1942 msnm, con
                  baja humedad, alivia las vías respiratorias. Por eso Coina es conocida como pueblo
                  curativo.
                </p>
              </div>
            </div>
          )}
        </Card>
      </section>

      <section>
        <SectionTitle eyebrow="Manual del viajero" title="Cómo llegar" />
        <div className="space-y-3">
          {transports.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gradient-water p-2.5 text-accent-foreground">
                  <Bus className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[15px] text-foreground">{t.empresa}</p>
                  <p className="text-xs text-muted-foreground">{t.ruta}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge tone="accent">{t.horario}</Badge>
                    <Badge tone="primary">{t.precio}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{t.nota}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <Card className="bg-sand p-4">
          <Layers className="size-5 text-sand-foreground" />
          <p className="mt-2 font-display text-[15px]">Viste en capas</p>
          <p className="mt-1 text-xs text-sand-foreground/80">
            Sol intenso al mediodía y frío al anochecer: polo, casaca ligera y cortavientos.
          </p>
        </Card>
        <Card className="bg-sand p-4">
          <Sunrise className="size-5 text-sand-foreground" />
          <p className="mt-2 font-display text-[15px]">Madruga</p>
          <p className="mt-1 text-xs text-sand-foreground/80">
            Las mejores vistas del valle son entre 6:00 y 8:00 AM, antes de la neblina baja.
          </p>
        </Card>
        <Card className="p-4 sm:col-span-2">
          <div className="flex items-center gap-2">
            <Wind className="size-5 text-primary" />
            <p className="font-display text-[15px]">Hidrátate con lima dulce</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            La altura deshidrata: pide limonada de lima dulce, cítrico bandera del pueblo.
          </p>
        </Card>
      </section>
    </div>
  );
}

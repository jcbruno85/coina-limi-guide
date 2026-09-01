import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/coina/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coina Turística — Paraíso del Alto Chicama" },
      {
        name: "description",
        content:
          "Guía offline de ecoturismo en Coina, La Libertad: rutas, clima saludable a 1942 msnm, hospedajes, leyendas y mercado de lima dulce.",
      },
      { property: "og:title", content: "Coina Turística — Paraíso del Alto Chicama" },
      {
        property: "og:description",
        content:
          "Rutas, servicios, leyendas y mercado de lima dulce de Coina. Funciona sin conexión con el asistente Limi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#4CAF50" },
    ],
    links: [{ rel: "manifest", href: "/manifest.webmanifest" }],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return <AppShell />;
}

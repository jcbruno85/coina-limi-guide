import { useEffect, useState } from "react";

export function useOnlineStatus() {
  const [online, setOnline] = useState(true);
  const [simulatedOffline, setSimulatedOffline] = useState(false);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return {
    isOnline: online && !simulatedOffline,
    simulatedOffline,
    toggleSimulated: () => setSimulatedOffline((v) => !v),
  };
}

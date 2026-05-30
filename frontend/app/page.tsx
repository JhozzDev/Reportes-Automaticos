"use client"

import { useEffect, useState } from "react";
import { generarReporte, obtenerReporte, obtenerReportes, Reporte } from "@/lib/reportes";

export default function Home() {

  const [reportes, setReportes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false)

   useEffect(() => {
    cargarReportes();
  }, []);

   async function cargarReportes() {
    try {
      const fechas = await obtenerReportes();
      console.log(fechas);
      setReportes(fechas);
    } catch {
      setError("No se pudo conectar al backend.");
    }
  }
  async function handleGenerarReporte() {
  setCargando(true);
  setError(null);
  try {
    const mensaje = await generarReporte();
    console.log(mensaje);
    await cargarReportes();
  } catch {
    setError("Error al generar el reporte");
  } finally {
    setCargando(false);
  }
}

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section style={{ marginTop: "1rem" }}>
        <h2>Reportes disponibles</h2>
        {reportes.length === 0 ? (
          <p>No hay reportes todavía.</p>
        ) : (
          reportes.map((fecha) => (
            <button
              key={fecha}
              style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
            >
              {fecha}
            </button>
          ))
        )}
      </section>
      <button onClick={handleGenerarReporte} disabled={cargando}>
  {cargando ? "Generando..." : "Generar reporte ahora"}
</button>
    </div>
  );
}

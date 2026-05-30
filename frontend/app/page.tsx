"use client"

import { useEffect, useState } from "react";
import { generarReporte, obtenerReporte, obtenerReportes, Reporte } from "@/lib/reportes";
import Rinfo from "./components/RInfo";
import Loader from "./components/loader";

export default function Home() {

  const [reportes, setReportes] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false)
  const [reporte, setReporte] = useState<Reporte | null>(null)

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

async function seleccionarReporte(fecha: string) {
    setCargando(true)
    try {
      const data = await obtenerReporte(fecha)
      setReporte(data)
      console.log(data)
    } catch {
      setError("No se pudo cargar el reporte")
    } finally {
      setCargando(false)
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
  <div className="flex w-full h-screen overflow-hidden">

    <aside className="bg-[#534AB7] h-screen p-4 flex flex-col gap-2 w-56 shrink-0">
      <p className="text-[#EEEDFE] text-sm font-medium mb-2">Reportes</p>
      <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar flex-1">
        {reportes.length === 0 ? (
          <p className="text-[#AFA9EC] text-sm">No hay reportes todavía.</p>
        ) : (
          reportes.map((fecha) => (
            <button
              key={fecha}
              onClick={() => seleccionarReporte(fecha)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors
                ${reporte?.generado_en.startsWith(fecha)
                  ? "bg-[#AFA9EC] text-[#26215C] font-medium"
                  : "bg-[#3C3489] text-[#EEEDFE] hover:bg-[#7F77DD]"
                }`}
            >
              {fecha}
            </button>
          ))
        )}
      </div>
    </aside>

 
    <main className="flex-1 p-8 flex flex-col gap-6 overflow-y-auto">

     
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">{reporte ? reporte?.generado_en : "Dashboard"}</h1>
        <button
          onClick={handleGenerarReporte}
          disabled={cargando}
          className="bg-[#1D9E75] text-[#E1F5EE] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
        >
          {cargando ? "Generando..." : "Generar reporte"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

  {cargando ? (
  <Loader />
) : reporte ? (
  <Rinfo info={reporte} key={reporte.generado_en} />
) : (
  <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
    Selecciona un reporte para ver los datos
  </div>
)}

    </main>
  </div>
)}

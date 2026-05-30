"use client"

import GraficaTasas from "./graficaTasas"

export default function Rinfo({ info }: any) {
  return (
    <div className="flex flex-col gap-6">
    
     
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-300 mb-1">Promedio global</p>
          <p className="text-xl font-medium text-[#534AB7]">
            {info.metricas.promedio_global}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-300 mb-1">Moneda máxima</p>
          <p className="text-xl font-medium text-[#1D9E75]">
            {info.metricas.moneda_maxima}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-xs text-gray-300 mb-1">Moneda mínima</p>
          <p className="text-xl font-medium text-[#D85A30]">
            {info.metricas.moneda_minima}
          </p>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <GraficaTasas monedas={info.monedas} />
      </div>


      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <p className="text-xs text-gray-300 mb-3">Detalle de monedas</p>
        {info.monedas.map((item: any) => (
          <div key={item.moneda} className="flex transition-all duration-700 hover:p-2 justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <span className="text-sm">{item.moneda}</span>
            <span className="text-sm font-medium text-[#534AB7]">{item.valor}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
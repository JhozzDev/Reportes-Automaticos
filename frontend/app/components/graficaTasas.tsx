"use client"
 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Moneda } from "@/lib/reportes"
 
interface Props {
  monedas: Moneda[]
}
 
export default function GraficaTasas({ monedas }: Props) {
  return (
    <div className="w-full h-72">
      <h2 className="text-lg font-semibold mb-4">Tasas vs USD</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monedas} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="moneda" />
          <YAxis />
         <Tooltip
  formatter={(value) => [value, "Valor"]}
  labelFormatter={(label) => `Moneda: ${label}`}
/>
          <Bar dataKey="valor" fill="#0070f3" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
"use client"
import { useParams } from "next/navigation"
import { obtenerReporte, Reporte} from "@/lib/reportes"
import { useEffect, useState } from "react"



export default function Page() {

  const { fecha } = useParams()
  const [reporte, setReporte] = useState<Reporte | null>(null)

  useEffect(()=>{
   Get(fecha)
   console.log(fecha)
  }
    ,[])

  async function Get(fecha: any) {
    const data = await obtenerReporte(fecha)
    console.log(data)
    setReporte(data)
  }
  
  

  return(
    <div>
        <h1>Reporte del {fecha}</h1>
        {reporte ? <div>{reporte.base}
        {reporte.fecha_actualizacion}
        {reporte?.monedas.map((data)=>(
<div>
  <p>{data.moneda}: {data.valor}</p>
</div>
        ))}</div> : <p>No hay reporte</p>}
        
    </div>
  )
}
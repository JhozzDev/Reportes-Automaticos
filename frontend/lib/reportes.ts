import axios from "axios";

const BASE_URL = "http://localhost:8000";

export interface Moneda {
  moneda: string;
  valor: number;
}

export interface Metricas {
  promedio_global: number;
  moneda_maxima: string;
  moneda_minima: string;
}

export interface Reporte {
  base: string;
  fecha_actualizacion: string;
  generado_en: string;
  metricas: Metricas;
  monedas: Moneda[];
}

export async function obtenerReportes(): Promise<string[]> {
  const respuesta = await axios.get(`${BASE_URL}/reportes/`);
  return respuesta.data.reportes;
}

export async function obtenerReporte(fecha: string): Promise<Reporte> {
  const respuesta = await axios.get(`${BASE_URL}/reportes/date/${fecha}`);
  return respuesta.data;
}

export async function generarReporte(): Promise<string> {
  const respuesta = await axios.get(`${BASE_URL}/reportes/generar`);
  return respuesta.data.mensaje;
}
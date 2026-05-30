# Automatizador de Reportes de Tasas de Cambio

Sistema que extrae, procesa y visualiza tasas de cambio internacionales de forma automática cada 24 horas.

---

## ¿Qué hace?

- Consulta automáticamente la API de tasas de cambio ([open.er-api.com](https://open.er-api.com)) cada 24 horas
- Procesa y limpia los datos con Pandas calculando métricas globales
- Guarda cada reporte como archivo JSON con la fecha del día
- Muestra los reportes históricos en un dashboard interactivo con gráficas

---

## Stack

**Backend**
- Python 3.12
- FastAPI — API REST
- Pandas — procesamiento de datos
- APScheduler — ejecución automática cada 24 horas

**Frontend**
- Next.js 15 + TypeScript
- Tailwind CSS — estilos
- Recharts — gráfica de barras interactiva

---

## Estructura del proyecto

```
├── backend/
│   ├── main.py              # Punto de entrada FastAPI
│   ├── scraper.py           # Extracción de datos de la API
│   ├── processor.py         # Limpieza y métricas con Pandas
│   ├── scheduler.py         # Tareas automáticas cada 24h
│   └── routers/
│       └── reportes.py      # Endpoints REST
├── frontend/
│   ├── app/
│   │   └── page.tsx         # Dashboard principal
│   ├── components/
│   │   ├── Rinfo.tsx        # Métricas y tabla
│   │   ├── GraficaTasas.tsx # Gráfica de barras
│   │   └── Card.tsx         # Card de fecha en sidebar
│   └── lib/
│       └── reportes.ts      # Llamadas al backend
```

---

## Instalación

### Backend

```bash
cd backend
pip install fastapi uvicorn requests pandas apscheduler
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/reportes` | Lista todos los reportes disponibles |
| GET | `/reportes/{fecha}` | Obtiene el reporte de una fecha específica |
| POST | `/reportes/generar` | Genera un reporte manualmente |

---

## Variables de entorno

Crea un archivo `.env.local` en la carpeta `frontend/`:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Monedas monitoreadas

`DOP` `EUR` `GBP` `MXN` `COP` `BRL` `JPY` `CAD`

---

## Autor

Cristian Hiciano — [GitHub](https://github.com/JhozzDev)

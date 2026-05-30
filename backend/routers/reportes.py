import os
import json
from fastapi import APIRouter, HTTPException

router = APIRouter()
DATA_DIR = "data"

@router.get("/")
def Reportes():
    archivos = [
        f.replace(".json", "")
        for f in os.listdir(DATA_DIR)
        if f.endswith(".json")
    ]

    return{"status": "200",
            "reportes": sorted(archivos, reverse=True)}

@router.get("/{fecha}")
def Reportes_date(fecha:str):
    ruta = os.path.join(DATA_DIR, f"{fecha}.json")
    
    if not os.path.exists(ruta):
        raise HTTPException(status_code=404, detail=f"No hay reporte para la fecha: {fecha}")
    
    with open(ruta, "r", encoding="utf-8") as f:
        datos = json.load(f)

    return datos

@router.get("/generar")
def Generar():
    return {"status": "200"}


@router.get("/test")
def Test():
    return({"status": "200"})
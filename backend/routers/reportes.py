import os
import json
from fastapi import APIRouter, HTTPException
from scheduler import generar_reporte

router = APIRouter()
DATA_DIR = "data"

@router.get("/")
def Reportes():
    archivos = [
        f.replace(".json", "")
        for f in os.listdir(DATA_DIR)
        if f.endswith(".json")
    ]

    return{"reportes": sorted(archivos, reverse=True)}

@router.get("/date/{fecha}")
def Reportes_date(fecha:str):
    ruta = os.path.join(DATA_DIR, f"{fecha}.json")
    
    if not os.path.exists(ruta):
        raise HTTPException(status_code=404, detail=f"No hay reporte para la fecha: {fecha}")
    
    with open(ruta, "r", encoding="utf-8") as f:
        datos = json.load(f)

    return datos

@router.get("/generar")
def Generar():
    try:
        generar_reporte()
        return {"mensaje": "Reporte generado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 


@router.get("/test")
def Test():
    return({"status": "200"})
import os
import json
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from scrapper import obtener_datos
from processor import procesar_datos

DATA_DIR = "data"


def generar_reporte():
    datos_crudos = obtener_datos()

    resultado = procesar_datos(datos_crudos)

    resultado["generado_en"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    nombre_archivo = datetime.now().strftime("%Y-%m-%d-%H-%M-%S") + ".json"
    ruta = os.path.join(DATA_DIR, nombre_archivo)

    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)

    print(f"Reporte generado: {ruta}")


def startTask():
    generar_reporte()
    scheduler = BackgroundScheduler()
    scheduler.add_job(generar_reporte, "interval", hours=24)
    scheduler.start()

    print("Scheduler iniciado — próximo reporte en 24 horas")

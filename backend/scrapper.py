import requests

API_URL =  "https://open.er-api.com/v6/latest/USD"

def obtener_datos() -> dict:
    respuesta = requests.get(API_URL)
 
    if respuesta.status_code != 200:
        raise Exception(f"Error al consultar la API: código {respuesta.status_code}")
 
    datos = respuesta.json()
 
    if datos.get("result") != "success":
        raise Exception("La API respondió pero reportó un error en los datos")
 
    return {
        "base": datos["base_code"],
        "fecha_actualizacion": datos["time_last_update_utc"],
        "tasas": datos["rates"]
    }
 
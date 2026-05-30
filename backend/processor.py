import pandas as pd

MONEDAS_INTERES = ["DOP", "EUR", "GBP", "MXN", "COP", "BRL", "JPY", "CAD"]


def procesar_datos(datos: dict) -> dict:

    df = pd.DataFrame(
        list(datos["tasas"].items()),
        columns=["moneda", "valor"]
    )

    df = df[df["valor"] > 0].dropna()
    promedio = round(df["valor"].mean(), 4)
    maxima = df.loc[df["valor"].idxmax(), "moneda"]
    minima = df.loc[df["valor"].idxmin(), "moneda"]

    df_filtrado = df[df["moneda"].isin(MONEDAS_INTERES)].copy()
    df_filtrado = df_filtrado.sort_values("valor", ascending=False)

    monedas = df_filtrado.to_dict(orient="records")

    return {
        "base": datos["base"],
        "fecha_actualizacion": datos["fecha_actualizacion"],
        "metricas": {
            "promedio_global": promedio,
            "moneda_maxima": maxima,
            "moneda_minima": minima,
        },
        "monedas": monedas
    }
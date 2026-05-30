import os
from fastapi import FastAPI
from routers import reportes
from scheduler import startTask 

DATA_DIR = "data"
app = FastAPI(title="Automatizador de Reportes")
app.include_router(reportes.router, prefix="/reportes")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

@app.on_event("startup")
async def startup():
    startTask()
 
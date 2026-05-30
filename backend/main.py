import os
from fastapi import FastAPI
from routers import reportes
from fastapi.middleware.cors import CORSMiddleware
from scheduler import startTask 

DATA_DIR = "data"
app = FastAPI(title="Automatizador de Reportes", redirect_slashes=False)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(reportes.router, prefix="/reportes")

if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

@app.on_event("startup")
async def startup():
    startTask()
 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.v1.routers.local_connection_router import local_connection_router
from src.api.v1.routers.diagnosis_router import router as diagnosis_router

app = FastAPI(title="BDS Small Business Platform API", version="1.0")

# CORS 미들웨어 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 모든 API 엔드포인트를 여기에 마운트합니다.
app.include_router(local_connection_router) 
app.include_router(diagnosis_router) 

@app.get("/")
def read_root():
    return {"status": "API is running successfully."}
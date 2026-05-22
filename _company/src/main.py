from fastapi import FastAPI
from src.api.v1.routers import local_connection_router # 방금 만든 라우터를 임포트합니다.

app = FastAPI(title="BDS Small Business Platform API", version="1.0")

# 모든 API 엔드포인트를 여기에 마운트합니다.
app.include_router(local_connection_router) 

@app.get("/")
def read_root():
    return {"status": "API is running successfully."}
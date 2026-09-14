from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

from routes import sentiment, themes, qa, summary

app = FastAPI(
    title="Project LOOP AI Engine",
    description="AI-powered backend for customer feedback intelligence",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(sentiment.router, prefix="/api/sentiment", tags=["Sentiment"])
app.include_router(themes.router, prefix="/api/themes", tags=["Themes"])
app.include_router(qa.router, prefix="/api/qa", tags=["Q&A"])
app.include_router(summary.router, prefix="/api/summary", tags=["Summary"])

@app.get("/")
async def root():
    return {"message": "Project LOOP AI Engine", "status": "running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )

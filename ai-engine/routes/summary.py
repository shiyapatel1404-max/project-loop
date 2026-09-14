from fastapi import APIRouter, HTTPException
from models import SummaryRequest, SummaryResponse
from processors.summarizer import summarize_texts

router = APIRouter()

@router.post("/", response_model=SummaryResponse)
async def summarize(request: SummaryRequest):
    """
    Generate summary and key points from texts.
    """
    try:
        result = summarize_texts(request.texts, request.max_length)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/key-points")
async def extract_key_points(texts: list[str]):
    """
    Extract key points from multiple texts.
    """
    try:
        return {"key_points": []}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

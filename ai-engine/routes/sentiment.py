from fastapi import APIRouter, HTTPException
from models import SentimentRequest, SentimentResponse
from processors.sentiment_analyzer import analyze_sentiment

router = APIRouter()

@router.post("/", response_model=SentimentResponse)
async def analyze(request: SentimentRequest):
    """
    Analyze sentiment of the given text.
    Returns sentiment polarity and confidence score.
    """
    try:
        result = analyze_sentiment(request.text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/batch")
async def analyze_batch(texts: list[str]):
    """
    Analyze sentiment of multiple texts.
    """
    try:
        results = [analyze_sentiment(text) for text in texts]
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

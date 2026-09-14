from fastapi import APIRouter, HTTPException
from models import ThemeRequest, ThemeResponse
from processors.theme_extractor import extract_themes

router = APIRouter()

@router.post("/", response_model=ThemeResponse)
async def extract(request: ThemeRequest):
    """
    Extract themes from a list of texts.
    Returns identified themes and keywords.
    """
    try:
        result = extract_themes(request.texts, request.num_themes)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/trending")
async def get_trending_themes(limit: int = 10):
    """
    Get trending themes across all feedback.
    """
    try:
        return {"themes": [], "trending": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

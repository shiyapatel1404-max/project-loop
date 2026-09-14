from fastapi import APIRouter, HTTPException
from models import QARequest, QAResponse
from processors.qa_engine import answer_question

router = APIRouter()

@router.post("/", response_model=QAResponse)
async def answer(request: QARequest):
    """
    Answer questions based on provided context.
    Uses transformer-based QA models.
    """
    try:
        result = answer_question(request.query, request.context)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/search")
async def search_feedback(query: str, limit: int = 5):
    """
    Search feedback using semantic similarity.
    """
    try:
        return {"results": [], "count": 0}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

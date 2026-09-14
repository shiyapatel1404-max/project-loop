from pydantic import BaseModel
from typing import List, Optional

class TextInput(BaseModel):
    text: str
    language: Optional[str] = "en"

class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    confidence: float
    emotions: dict

class ThemeRequest(BaseModel):
    texts: List[str]
    num_themes: Optional[int] = 5

class ThemeResponse(BaseModel):
    themes: List[dict]
    keywords: List[str]

class QARequest(BaseModel):
    query: str
    context: List[str]

class QAResponse(BaseModel):
    answer: str
    confidence: float
    sources: List[str]

class SummaryRequest(BaseModel):
    texts: List[str]
    max_length: Optional[int] = 100

class SummaryResponse(BaseModel):
    summary: str
    key_points: List[str]

from transformers import pipeline
from typing import Dict, List

# Load QA model
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def answer_question(query: str, context: List[str]) -> Dict:
    """
    Answer questions using context provided.
    Uses transformer-based QA model.
    """
    try:
        if not context:
            return {
                "answer": "No context provided",
                "confidence": 0.0,
                "sources": []
            }
        
        # Combine context
        full_context = " ".join(context[:5])[:1024]  # Limit to 1024 tokens
        
        result = qa_pipeline(question=query, context=full_context)
        
        return {
            "answer": result['answer'],
            "confidence": round(result['score'], 3),
            "sources": context[:2]
        }
    except Exception as e:
        print(f"Error answering question: {e}")
        return {
            "answer": "Unable to find answer",
            "confidence": 0.0,
            "sources": []
        }

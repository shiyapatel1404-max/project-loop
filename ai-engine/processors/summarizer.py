from transformers import pipeline
from typing import Dict, List

# Load summarization model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_texts(texts: List[str], max_length: int = 100) -> Dict:
    """
    Generate summary and extract key points from texts.
    """
    try:
        if not texts:
            return {
                "summary": "",
                "key_points": []
            }
        
        # Combine texts
        combined = " ".join(texts)
        
        # Limit length for summarization
        if len(combined.split()) < 50:
            summary = combined
        else:
            result = summarizer(combined[:1024], max_length=max_length, min_length=30, do_sample=False)
            summary = result[0]['summary_text']
        
        # Extract key points (simple implementation)
        sentences = [s.strip() for s in combined.split('.') if s.strip()]
        key_points = sentences[:3] if sentences else []
        
        return {
            "summary": summary,
            "key_points": key_points
        }
    except Exception as e:
        print(f"Error summarizing: {e}")
        return {
            "summary": "",
            "key_points": []
        }

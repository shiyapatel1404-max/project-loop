from transformers import pipeline
from typing import Dict

# Load sentiment analysis model
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def analyze_sentiment(text: str) -> Dict:
    """
    Analyze sentiment using pre-trained transformer model.
    Returns sentiment label and confidence score.
    """
    try:
        # Truncate text if too long
        text = text[:512]
        result = sentiment_pipeline(text)[0]
        
        label = result['label'].lower()
        score = result['score']
        
        # Map labels
        sentiment_map = {
            'positive': 'positive',
            'negative': 'negative',
            'neutral': 'neutral'
        }
        
        return {
            "sentiment": sentiment_map.get(label, 'neutral'),
            "confidence": round(score, 3),
            "emotions": {
                label: score,
                "other": round(1 - score, 3)
            }
        }
    except Exception as e:
        print(f"Error analyzing sentiment: {e}")
        return {
            "sentiment": "neutral",
            "confidence": 0.0,
            "emotions": {}
        }

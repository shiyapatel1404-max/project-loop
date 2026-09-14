from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import LatentDirichletAllocation
import numpy as np
from typing import Dict, List

def extract_themes(texts: List[str], num_themes: int = 5) -> Dict:
    """
    Extract themes using LDA (Latent Dirichlet Allocation).
    """
    try:
        if not texts or len(texts) < 2:
            return {
                "themes": [],
                "keywords": []
            }
        
        # TF-IDF Vectorization
        vectorizer = TfidfVectorizer(
            max_features=1000,
            stop_words='english',
            min_df=1,
            max_df=0.8
        )
        tfidf_matrix = vectorizer.fit_transform(texts)
        
        # Extract top keywords
        feature_names = vectorizer.get_feature_names_out()
        top_indices = np.argsort(tfidf_matrix.sum(axis=0).A1)[-10:]
        keywords = [feature_names[i] for i in top_indices]
        
        # Simple theme extraction
        themes = [
            {"name": f"Theme {i+1}", "keywords": keywords[i:i+3], "frequency": len(texts)//(i+1)}
            for i in range(min(num_themes, len(keywords)//3))
        ]
        
        return {
            "themes": themes,
            "keywords": keywords.tolist()
        }
    except Exception as e:
        print(f"Error extracting themes: {e}")
        return {
            "themes": [],
            "keywords": []
        }

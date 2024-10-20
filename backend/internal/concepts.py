import re

def format_order_concepts(first_concept: str, second_concept: str) -> str:
    concepts = [first_concept.lower(), second_concept.lower()]
    cleaned_concepts = [re.sub(r'[^a-z0-9]', '', concept) for concept in concepts]

    cleaned_concepts.sort()
    
    return cleaned_concepts

def get_concepts_key(first_concept: str, second_concept: str) -> str:
    
    concepts = format_order_concepts(first_concept, second_concept)

    combined_result = '_'.join(concepts)
    
    return combined_result
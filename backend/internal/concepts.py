import re

def get_concepts_key(first_concept: str, second_concept: str) -> str:
    concepts = [first_concept.lower(), second_concept.lower()]

    # Remove special characters, allowing only ASCII
    cleaned_concepts = [re.sub(r'[^a-z0-9]', '', concept) for concept in concepts]

    if cleaned_concepts[0] == "" or cleaned_concepts[1] == "":
        return ""

    cleaned_concepts.sort()

    # Combine with an underscore
    combined_result = '_'.join(cleaned_concepts)
    return combined_result
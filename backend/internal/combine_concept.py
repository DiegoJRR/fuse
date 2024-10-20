import dspy

class ConceptWordCombination(dspy.Signature):
    """You are a helpful assistant that helps people to craft new things by combining two words into a new word.
    
    Try to use concepts that can be understood by a global audience, avoiding things that may only be known to people from certain countries.
    
    Here are some examples:
    water + earth = mud
    fire + rock = lava
    mountain + fire = volcano
    copper + tin = bronze
    """
    concept_1 = dspy.InputField(desc="Concept to be combined, described by one or two words.")
    concept_2 = dspy.InputField(desc="Concept to be combined, described by one or two words.")
    result_concept = dspy.OutputField(desc="Result of the combination of concepts, described by one or two words. Prefer one word.")
    
class ConceptCombinator(dspy.Module):
    
    def __init__(self):
        super().__init__()
        self.combine = dspy.ChainOfThought(ConceptWordCombination)
        
    def forward(self, concept_1, concept_2):
        result_concept = self.combine(concept_1=concept_1, concept_2=concept_2)
        return result_concept
        
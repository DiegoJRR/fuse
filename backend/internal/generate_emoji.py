import dspy

class ConceptEmoji(dspy.Signature):
    """Given a concept described by a a word or two, produce one to three related emojis. Prefer generating a single emoji.
    
    Here are some examples:
    water -> 💧
    chicken  -> 🐔
    egg -> 🥚
    """
    concept = dspy.InputField(desc="Concept, described by one or two words.")
    result_concept = dspy.OutputField(desc="Result emojis related to the concept. Prefer a single emoji.")
    
class EmojiGenerator(dspy.Module):
    
    def __init__(self):
        super().__init__()
        self.generate_emoji = dspy.ChainOfThought(ConceptEmoji)
        
    def forward(self, concept):
        result_emoji = self.generate_emoji(concept=concept)
        return result_emoji
        
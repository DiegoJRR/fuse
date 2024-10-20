from fastapi import FastAPI
from typing import Union
import json
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv() 

import dspy

lm = turbo = dspy.OpenAI(model='gpt-3.5-turbo-1106', max_tokens=4096, stop=['Observation'])
dspy.settings.configure(lm=lm)

from .internal import walrus, concepts, db, ai_gen

app = FastAPI()


PUBLISHER = "https://walrus-testnet-publisher.nodes.guru"
AGGREGATOR = "https://walrus-testnet.blockscope.net"
DEFAULT_EPOCHS = 1 # TODO: Tune

@app.get("/")
def read_root():
    return {"Hello": "to Fuse!"}

class CombineConceptsRequest(BaseModel):
    session_id: str
    first_concept: str
    second_concept: str

@app.post("/combine")
def combine_concepts(request: CombineConceptsRequest):
    """
    This endpoint recieves a session id, and two concepts as strings, and returns
    the generated result concept from their combination.

    It first checks Walrus to see if the concept already exists, and if it
    does not, it calls OpenAI to generate it and save it in Walrus
    """

    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)
    db_client = db.DB()
    
    ordered_concepts = concepts.format_order_concepts(request.first_concept, request.second_concept)
    combination_key = concepts.get_concepts_key(request.first_concept, request.second_concept)

    # Check DB to see if this key already exists
    combination_data = db_client.get_combination(combination_key)
    
    if combination_data:
        return combination_data

    concept_combinator = ai_gen.ConceptCombinator()
    emoji_generator = ai_gen.EmojiGenerator()

    combination_result = concept_combinator(concept_1 = ordered_concepts[0], concept_2 = ordered_concepts[1])
    emoji_result = emoji_generator(combination_result)
    
    combination_metadata = {
        "description": "Fuse game object.",
        "name": f"{combination_result} {emoji_result}",
    }
    
    blob_id = walrus.upload_json(walrus_client, combination_metadata, DEFAULT_EPOCHS)
    
    # And add metadata
    db_object = {
        "name": combination_result,
        "emoji": emoji_result,
        "uri": 'https://blobid.walrus/'+blob_id,
        "parent_name1": ordered_concepts[0],
        "parent_name2": ordered_concepts[1],
        "combination_key": combination_key
    }

    db_client.put_combination(db_object)

    return json.dumps(db_object).encode('utf-8')

@app.get("/download/{bloc_id}")
def read_item(blob_id: str):
    # Initialize the Walrus client
    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)

    blob_bytes = walrus_client.retrieve_blob(blob_id)

    # Save the retrieved bytes to a file
    with open("retrieved_blob_output.jpg", "wb") as file:
        file.write(blob_bytes)

    return {"blob_id": blob_id}
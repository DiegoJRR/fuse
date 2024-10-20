from fastapi import BackgroundTasks, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
import json
from pydantic import BaseModel
from dotenv import load_dotenv
import uuid


load_dotenv()

import dspy

lm = turbo = dspy.OpenAI(model='gpt-3.5-turbo-1106', max_tokens=4096, stop=['Observation'])
dspy.settings.configure(lm=lm)

from .internal import walrus, concepts, db, ai_gen, signer

app = FastAPI()

origins = [
    "http://localhost:3000",  # Example of a front-end app origin
    "https://fuse-gzf35clch-efrain-quinteros-projects.vercel.app",     # You can also specify your production domain
    "*",
    "https://fuse-flax.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)


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

def upload_to_walrus(combination_metadata, concept_id: str):
    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)
    db_client = db.DB()

    blob_id = walrus.upload_json(walrus_client, combination_metadata, DEFAULT_EPOCHS)

    # Update existing db record
    db_object = db_client.get_combination_by_id(concept_id)
    db_object["uri"] = f"{AGGREGATOR}/v1/{blob_id}"

    # This upserts the combination record
    db_client.put_combination(db_object)


@app.post("/combine")
async def combine_concepts(request: CombineConceptsRequest, background_tasks: BackgroundTasks):
    """
    This endpoint recieves a session id, and two concepts as strings, and returns
    the generated result concept from their combination.

    It first checks Walrus to see if the concept already exists, and if it
    does not, it calls OpenAI to generate it and save it in Walrus
    """

    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)
    db_client = db.DB()

    # Check if there's an entry in the sessions table
    session_data = db_client.get_session(request.session_id)
    if not session_data:
        db_client.put_session({"id": request.session_id})
    
    ordered_concepts = concepts.format_order_concepts(request.first_concept, request.second_concept)
    combination_key = concepts.get_concepts_key(request.first_concept, request.second_concept)

    # Check DB to see if this key already exists
    combination_data = db_client.get_combination(combination_key)

    if combination_data:
        # Store in sessions table
        session_data = db_client.get_session(request.session_id)
        session_data["concept_ids"].append(combination_data["id"])
        db_client.put_session(session_data)
        
        combination_data["parent_name1"] = ordered_concepts[0]
        combination_data["parent_name2"] = ordered_concepts[1]
        combination_data["combination_key"] = combination_key
        return combination_data

    concept_combinator = ai_gen.ConceptCombinator()
    emoji_generator = ai_gen.EmojiGenerator()

    combination_result = concept_combinator(concept_1 = ordered_concepts[0], concept_2 = ordered_concepts[1])
    emoji_result = emoji_generator(combination_result)
    
    combination_metadata = {
        "description": "Fuse game object.",
        "name": f"{combination_result} {emoji_result}",
    }
    
    # And add metadata
    db_object = {
        "name": combination_result,
        "emoji": emoji_result,
        "uri": "", # Adding empty since the column is not nullable
        "parent_name1": ordered_concepts[0],
        "parent_name2": ordered_concepts[1],
        "combination_key": combination_key
    }

    response = db_client.put_combination(db_object)
    background_tasks.add_task(upload_to_walrus, combination_result, response.data[0]["id"])

    # Store in sessions table
    session_data = db_client.get_session(request.session_id)
    session_data["concept_ids"].append(response.data[0]["id"])
    db_client.put_session(session_data)

    return db_object

@app.post("/session")
def create_session():
    return {"session_id": str(uuid.uuid4())}

@app.get("/download/{bloc_id}")
def read_item(blob_id: str):
    # Initialize the Walrus client
    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)

    blob_bytes = walrus_client.retrieve_blob(blob_id)

    # Save the retrieved bytes to a file
    with open("retrieved_blob_output.jpg", "wb") as file:
        file.write(blob_bytes)

    return {"blob_id": blob_id}

@app.get("/uris/{session_id}")
def sign(session_id: str):
    uris = []
    db_client = db.DB()
    session_data = db_client.get_session(session_id)

    if not session_data:
        return {"uris": uris}

    for concept_id in session_data["concept_ids"]:
        db_object = db_client.get_combination_by_id(concept_id)
        uris.append(db_object["uri"])

    return {"uris": uris}

from fastapi import FastAPI
from typing import Union
from pydantic import BaseModel

from .internal import walrus, concepts, db

app = FastAPI()


PUBLISHER = "https://publisher.walrus-testnet.walrus.space"
AGGREGATOR = "https://aggregator.walrus-testnet.walrus.space"
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
    key = concepts.get_concepts_key(request.first_concept, request.second_concept)

    # Check DB to see if this key already exists
    blob_id = db_client.get_metadata(key)

    if blob_id:
        # Download the file from walrus
        combination_metadata = walrus.read_json(walrus_client, blob_id)
        return json.dumps(combination_metadata).encode('utf-8')

    # If it doesn't exist, we call OpenAI
    combination_result = "egg" # TODO: Call openai

    # And add metadata
    combination_metadata = {
        "result": combination_result,
        "blob_id": blob_id, # TODO: Agregar mas metadata, de wallet, usuario, etc
    }

    # And we update walrus
    walrus.upload_json(walrus_client, combination_metadata, DEFAULT_EPOCHS)

    # And store the mapping of blobId <-> key in our DB
    db_client.put_metadata(combination_metadata)

    return json.dumps(combination_metadata).encode('utf-8')

@app.get("/download/{bloc_id}")
def read_item(blob_id: str):
    # Initialize the Walrus client
    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)

    blob_bytes = walrus_client.retrieve_blob(blob_id)

    # Save the retrieved bytes to a file
    with open("retrieved_blob_output.jpg", "wb") as file:
        file.write(blob_bytes)

    return {"blob_id": blob_id}
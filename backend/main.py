from fastapi import FastAPI
from typing import Union

from .internal import walrus

app = FastAPI()


PUBLISHER = "https://publisher.walrus-testnet.walrus.space"
AGGREGATOR = "https://aggregator.walrus-testnet.walrus.space"

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/download/{bloc_id}")
def read_item(blob_id: str):
    # Initialize the Walrus client
    walrus_client = walrus.Walrus(PUBLISHER, AGGREGATOR)

    blob_bytes = walrus_client.retrieve_blob(blob_id)

    # Save the retrieved bytes to a file
    with open("retrieved_blob_output.jpg", "wb") as file:
        file.write(blob_bytes)

    return {"blob_id": blob_id}
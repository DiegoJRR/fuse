from fastapi import FastAPI
from typing import Union

from .internal import walrus

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    # Initialize the Walrus client
    publisher = "https://publisher.walrus-testnet.walrus.space"
    aggregator = "https://aggregator.walrus-testnet.walrus.space"
    walrus_client = walrus.Walrus(publisher, aggregator)

    blob_bytes = walrus_client.retrieve_blob('py5ZxopU3-vibQ2MbGCN0rHOQ2CiBhDhWvi_aySvh8w')

    # Save the retrieved bytes to a file
    with open("retrieved_blob_output.jpg", "wb") as file:
        file.write(blob_bytes)

    return {"item_id": item_id, "q": q}
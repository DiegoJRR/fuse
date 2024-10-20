import walrus
import io
import json

# Initialize the Walrus client
publisher = "https://walrus-testnet-publisher.nodes.guru"
aggregator = "https://walrus-testnet.blockscope.net"
walrus_client = walrus.Walrus(publisher, aggregator)
combination_metadata = {
    "description": "Fuse game object.",
    "name": "sample name",
}

blob_id = walrus.upload_json(walrus_client, combination_metadata, 1)

print(blob_id)

json_response = walrus.read_json(walrus_client, blob_id)

print(json_response)

import walrus
import io
import json

# Initialize the Walrus client
publisher = "https://publisher.walrus-testnet.walrus.space"
aggregator = "https://aggregator.walrus-testnet.walrus.space"
walrus_client = walrus.Walrus(publisher, aggregator)
json_data = {'uwu':'uwu'}


blob_id = walrus.upload_json(walrus_client, json_data, epochs=5)

print(blob_id)

json_response = walrus.read_json(walrus_client, blob_id)

print(json_response)



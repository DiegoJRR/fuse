import walrus

# Initialize the Walrus client
publisher = "https://publisher.walrus-testnet.walrus.space"
aggregator = "https://aggregator.walrus-testnet.walrus.space"
walrus_client = walrus.Walrus(publisher, aggregator)

# Store a file
with open("fuse.jpg", "rb") as file:
    file_data = file.read()

blob_id = walrus_client.store_blob(file_data, epochs=5)
print(blob_id)
print("Stored file response:", blob_id)


# Retrieve a blob and save to file
blob_bytes = walrus_client.retrieve_blob(blob_id)

# Save the retrieved bytes to a file
with open("retrieved_blob_output.jpg", "wb") as file:
    file.write(blob_bytes)


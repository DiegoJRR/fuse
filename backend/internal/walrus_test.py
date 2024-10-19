import walrus

# Initialize the Walrus client
publisher = "https://publisher.walrus-testnet.walrus.space"
aggregator = "https://aggregator.walrus-testnet.walrus.space"
walrus_client = walrus.Walrus(publisher, aggregator)

# Store a file
with open("apple_icon.jpg", "rb") as file:
    file_data = file.read()

response = walrus_client.store_blob(file_data, epochs=5)
print("Stored file response:", response)

# Retrieve a blob
blob_id = ""
if "newlyCreated" in response.keys():
    blob_id = response['newlyCreated']['blobObject']['blobId']
else:
    blob_id = response['alreadyCertified']['blobId']

# Retrieve a blob and save to file
blob_bytes = walrus_client.retrieve_blob(blob_id)

# Save the retrieved bytes to a file
with open("retrieved_blob_output.jpg", "wb") as file:
    file.write(blob_bytes)


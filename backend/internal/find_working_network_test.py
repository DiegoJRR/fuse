import walrus
from colorama import Fore
from walrus_constants import publishers, aggregators

# Initialize the Walrus client

for index in range(0, len(publishers) - 1):
    publisher = publishers[index]
    aggregator = aggregators[index]

    try:
        walrus_client = walrus.Walrus(publisher, aggregator)

        # Store a file
        with open("fuse copy.jpg", "rb") as file:
            file_data = file.read()

        blob_id = walrus_client.store_blob(file_data, epochs=5)
        print(blob_id)
        print("Stored file response:", blob_id)

        # Retrieve a blob and save to file
        blob_bytes = walrus_client.retrieve_blob(blob_id)

        # Save the retrieved bytes to a file
        with open("retrieved_blob_output.jpg", "wb") as file:
            file.write(blob_bytes)

        print(Fore.RED + "SUCCESS" + Fore.WHITE)
        print(publisher)
        print(aggregator)
        print(index)

        break
    except:
        pass

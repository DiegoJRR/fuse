import time
import json
import requests
import io


class Walrus:
    def __init__(self, publisher_url: str, aggregator_url: str):
        self.publisher_url = publisher_url
        self.aggregator_url = aggregator_url

    def store_blob(self, file_data: bytes, epochs: int = 1) -> dict:
        """
        Store raw bytes for a specified number of storage epochs.

        :param file_data: The raw bytes to be uploaded.
        :param epochs: Number of epochs to store the data for. Defaults to 1.
        :return: The response from the server as a dictionary.
        """
        url = f"{self.publisher_url}/v1/store?epochs={epochs}"
        start_time = time.time()
        response = requests.put(url, data=file_data)
        end_time = time.time()
        
        elapsed_time = end_time - start_time
        print(f"Time taken to upload data: {elapsed_time:.2f} seconds")
        
        response.raise_for_status()
        json_response = response.json()
        
        blob_id = None
        if "newlyCreated" in json_response.keys():
            blob_id = json_response['newlyCreated']['blobObject']['blobId']
        else:
            blob_id = json_response['alreadyCertified']['blobId']
        
        return blob_id

    # TODO: Cache this
    def retrieve_blob(self, blob_id: str, output_file: str = None) -> str:
        """
        Retrieve a blob by its ID. Optionally save the contents to a file.

        :param blob_id: The ID of the blob to retrieve.
        :param output_file: Optional path to save the blob's contents to a file.
        :return: The content of the blob as bytes.
        """
        url = f"{self.aggregator_url}/v1/{blob_id}"
        with requests.get(url, stream=True) as response:
            response.raise_for_status()  # Raise an error if the request failed
            content = bytearray()
            for chunk in response.iter_content(chunk_size=8192):
                content.extend(chunk)
                if output_file:
                    with open(output_file, "ab") as file:
                        file.write(chunk)

        return bytes(content)

def upload_json(walrus_instance: Walrus, data_dict: dict, epochs: int = 1) -> dict:
    """
    Upload a JSON representation of a Python dictionary to the Walrus instance.

    :param walrus_instance: An instance of the Walrus class.
    :param data_dict: The Python dictionary to be uploaded.
    :param epochs: Number of epochs to store the data for. Defaults to 1.
    :return: The response from the server as a dictionary.
    """
    # Convert the dictionary to a JSON string and encode it to bytes
    json_data = json.dumps(data_dict).encode('utf-8')
    # Call the store_blob method to upload the data
    print(json_data)
    virtual_file = io.BytesIO(json_data)

    response = walrus_instance.store_blob(virtual_file, epochs)
    return response


def read_json(walrus_instance: Walrus, blob_id: str) -> dict:
    """
    Retrieve a JSON blob from the Walrus instance and convert it back to a Python dictionary.

    :param walrus_instance: An instance of the Walrus class.
    :param blob_id: The ID of the blob to retrieve.
    :return: The retrieved data as a Python dictionary.
    """
    # Retrieve the blob content as bytes
    blob_content = walrus_instance.retrieve_blob(blob_id)
    # Decode the bytes back to a JSON string and parse it into a dictionary
    data_dict = json.loads(blob_content.decode('utf-8'))
    return data_dict
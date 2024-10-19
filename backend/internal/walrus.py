import time
import requests


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
        return response.json()

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

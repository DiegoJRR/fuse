import uuid
import db

# Generate session id
session_id = "25c2ff6d-7401-4f4b-b185-eb7edbd746fd"

db_client = db.DB()

db_object = {
    "name": "goldtree",
    "emoji": "nothing",
    "uri": 'https://blobid.walrus/'+"",
    "parent_name1": "tree",
    "parent_name2": "gold",
    "combination_key": "tree_gold"
}

response = db_client.put_combination(db_object)
print(response.data[0])

session_data = db_client.get_session(session_id)
print(session_data)
session_data["concept_ids"].append(response.data[0]["id"])

session_response = db_client.put_session(session_data)
print(session_response)
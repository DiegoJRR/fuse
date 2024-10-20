from .supabase_client import supabase_client

class DB:
    def __init__(self):
        return

    def get_session(self, session_id: str):
        metadata_query_result = supabase_client.table('sessions').select('id', 'created_at', 'concept_ids', 'owner_address').eq('id', session_id).execute()
        
        if len(metadata_query_result.data) > 0:
            return metadata_query_result.data[0]
        else:
            return None

    def put_session(self, session_data):
        return supabase_client.table('sessions').upsert(session_data).execute()

    def get_combination(self, combination_key: str):
        metadata_query_result = supabase_client.table('concepts').select('id','uri','name','emoji').eq('combination_key',combination_key).execute()
        
        if len(metadata_query_result.data) > 0:
            return metadata_query_result.data[0]
        else:
            return None

    def put_combination(self, combination_metadata):
        return supabase_client.table('concepts').insert(combination_metadata).execute()
        
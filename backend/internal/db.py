from  supabase_client import supabase_client

class DB:
    def __init__(self):
        return

    def get_combination(self, combination_key: str):
        metadata_query_result = supabase_client.table('concepts').select('id','uri').eq('combination_key',combination_key).execute()
        
        if metadata_query_result.count > 0:
            return metadata_query_result.data[0]
        else:
            return None
        
    def put_combination(self, combination_metadata):
        insert_query_result = supabase_client.table('concepts').insert(combination_metadata).execute()
        
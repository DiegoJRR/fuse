export const fetchSignature = async (collectibleURIs: string,collectibleURIs: string): Promise<any> => {
    try {
      const response = await fetch(`https://fuse-production.up.railway.app/uris/${session_id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching URI data:', error);
      throw error;
    }
  };
export type ConceptCombinationRequest = {
  session_id: string;
  first_concept: string;
  second_concept: string;
};

export type ConceptCombinationResponse = {
  name: string;
  emoji: string;
  uri: string;
  parent_name1: string;
  parent_name2: string;
  combination_key: string;
};

export const postConceptCombination = async (request: ConceptCombinationRequest): Promise<ConceptCombinationResponse> => {
  const response = await fetch("https://fuse-production.up.railway.app/combine", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ConceptCombinationResponse = await response.json();
  return data;
};
 
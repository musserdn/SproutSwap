// Fetch species list
export const fetchSpeciesList = async (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`/api/species-list?${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch species list');
  }

  const data = await response.json();
  return data.data;
};

// Fetch plant details by ID
export const fetchPlantDetails = async (id) => {
  const response = await fetch(`/api/species/details/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch plant details');
  }

  const data = await response.json();
  return data;
};

// Fetch plant care guides
export const fetchPlantGuides = async (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const response = await fetch(`/api/species-care-guide-list?${queryString}`);

  if (!response.ok) {
    throw new Error('Failed to fetch plant care guides');
  }

  const data = await response.json();
  return data.data; // Adjust based on the API response structure
};
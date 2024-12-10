import Instance from "../axios"; // Ensure you have the axios instance set up

// Fetch all subcategories
export const fetchSubcategories = async () => {
  try {
    const response = await Instance.get("/subcategory");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchSubcategoriesByCategories = async (categoryId) => {
  try {
    const response = await Instance.get(
      `/subcategory/bycategory/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new subcategory
export const createSubcategories = async (subcategoryData) => {
  try {
    const response = await Instance.post(
      "/subcategory/create",
      subcategoryData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing subcategory
export const updateSubcategories = async (id, subcategoryData) => {
  try {
    const response = await Instance.post(`/subcategory/update/${id}`, subcategoryData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a subcategory
export const deleteSubcategories = async (id) => {
  try {
    const response = await Instance.delete(`/subcategory/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

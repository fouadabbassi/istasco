import Instance from "../axios";

export const fetchCategories = async () => {
  try {
    const response = await Instance.get("/category");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCategories = async (formData) => {
  try {
    const response = await Instance.post("/category/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCategories = async (id, formData) => {
  try {
    const response = await Instance.post(`/category/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCategories = async (id) => {
  try {
    const response = await Instance.delete(`/category/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

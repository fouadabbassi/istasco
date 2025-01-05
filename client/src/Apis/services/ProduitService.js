import Instance from "../axios"; // Ensure you have the axios instance set up

// Fetch all products
export const fetchProduits = async (filters) => {
  try {
    let queryString = "";
    if (filters !== undefined) {
      if (filters.subcategoryId) {
        queryString += `subcategoryId=${filters.subcategoryId}&`;
      }
      if (filters.categoryId) {
        queryString += `categoryId=${filters.categoryId}&`;
      }
      if (filters.search) {
        queryString += `search=${filters.search}&`;
      }
      if (filters.page) {
        queryString += `page=${filters.page}&`;
      }

      if (filters.sort) {
        queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`;
      }
    }
    const response = await Instance.get(`/produit?${queryString}`);
    return response.data.totalProduits;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a single product by ID
export const fetchProduitById = async (id) => {
  try {
    const response = await Instance.get(`/produit/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const fetchProduitByTag = async () => {
  try {
    const response = await Instance.get(`/produit/produitbytag`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// Create a new product
export const createProduit = async (produitData, files) => {
  const formData = new FormData();
  formData.append("name", produitData.name);
  formData.append("description", produitData.description);
  formData.append("price", produitData.price);
  formData.append("categoryId", produitData.categoryId);
  formData.append("subcategoryId", produitData.subcategoryId);

  // Ensure files is defined and iterable
  if (files) {
    if (files.images) {
      for (const file of files.images) {
        formData.append("images", file);
      }
    }
    if (files.pdf) {
      formData.append("pdf", files.pdf);
    }
  }

  try {
    const response = await Instance.post("/produit/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.produitRes;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing product
export const updateProduit = async (id, produitData, files) => {
  const formData = new FormData();
  formData.append("name", produitData.name);
  formData.append("description", produitData.description);
  formData.append("price", produitData.price);
  formData.append("categoryId", produitData.categoryId);
  formData.append("subcategoryId", produitData.subcategoryId);

  // Ensure files is defined and iterable
  if (files) {
    if (files.images) {
      for (const file of files.images) {
        formData.append("images", file);
      }
    }
    if (files.pdf) {
      formData.append("pdf", files.pdf);
    }
  }

  try {
    const response = await Instance.post(`/produit/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.produit;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a product
export const deleteProduit = async (id) => {
  try {
    const response = await Instance.delete(`/produit/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

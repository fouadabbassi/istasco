import Instance from "../axios"; // Ensure you have your axios instance set up

// Create a new contact message
export const createContact = async (contactData) => {
  try {
    const response = await Instance.post("/contact/create", contactData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all contact messages
export const fetchContacts = async () => {
  try {
    const response = await Instance.get("/contact");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a contact message
export const deleteContact = async (id) => {
  try {
    const response = await Instance.delete(`/contact/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
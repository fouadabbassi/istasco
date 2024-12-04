import Instance from "../axios";

// Login user
export const login = async (data) => {
  try {
    const response = await Instance.post("/user/login", data);
    return response.data; 
  } catch (error) {
    throw error?.response?.data; 
  }
};

// Register a new user

export const register = async (data) => {
  try {
    const response = await Instance.post("/user/register", data);
    return response.data;
  } catch (error) {
    throw error?.response?.data;
  }
};

// Logout user
export const logout = async () => {
  try {
    await Instance.get("/user/logout"); // Use GET for logout
  } catch (error) {
    throw error.response.data; // Throw error response if logout fails
  }
};

// Update user information by admin
export const updateAdmin = async (id,userData) => {
  try {
    const response = await Instance.post(`/user/updatebyadmin/${id}`, userData); // Assuming you're sending user data for admin update
    console.log(response);
    return response.data; // Return updated user data
  } catch (error) {
    throw error.response.data; // Throw error response if update fails
  }
};
export const fetchProfileUser = async () => {
  try {
    const response = await Instance.get("/user/profile"); // Adjust path to match your API
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

// Fetch all users (requires admin access)
export const fetchAllUsers = async () => {
  try {
    const response = await Instance.get("/user"); // Adjust path to match your API
    return response.data; // Return list of users
  } catch (error) {
    throw error.response.data; // Throw error response if fetching users fails
  }
};

// Delete a user (requires admin access)
export const destroyUser = async (userId) => {
  try {
    const response = await Instance.delete(`/user/${userId}`); // Adjust path to match your API
    return response.data; // Return success message
  } catch (error) {
    throw error.response.data; // Throw error response if deletion fails
  }
};
// forgotPassword a user (requires admin access)
export const forgotPassword = async (email) => {
  try {
    const response = await Instance.post(`/user/forgot-password`, email); // Adjust path to match your API
    return response.data; // Return success message
  } catch (error) {
    throw error.response.data; // Throw error response if deletion fails
  }
};
export const resetPassword = async (token, password) => {
  try {
    const response = await Instance.post(
      `/user/reset-password/${token}`,
      password
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// verify email
export const verifyEmailService = async (token) => {
  try {
    const response = await Instance.get(`/user/verify-email/${token}`);
    console.log(response);
    return response.data; // Return success message
  } catch (error) {
    console.log(error);
    throw error.response.data; // Throw error response if verification fails
  }
}
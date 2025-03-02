import Instance from "../axios";

export const fetchDashboardData = async () => {
    try {
      const response = await Instance.get("/dashboard");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "Erreur lors de la récupération des données"
      );
    }
};
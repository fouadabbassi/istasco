import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "../../Redux/categoryAction";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const {
    categories = [],
    loading,
    error,
  } = useSelector((state) => state.category);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setImageFile(null);
    setEditCategoryId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Le nom est obligatoire");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    if (imageFile) formDataToSend.append("image", imageFile);

    try {
      if (editCategoryId) {
        await dispatch(updateCategory(editCategoryId, formDataToSend));
        toast.success("Catégorie mise à jour avec succès !");
      } else {
        await dispatch(createCategory(formDataToSend));
        toast.success("Catégorie créée avec succès !");
      }
      resetForm();
    } catch (err) {
      toast.error(error?.message || "Une erreur est survenue");
    }
  };

  const handleDelete = async (categoryId) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      try {
        await dispatch(deleteCategory(categoryId));
        //toast.success("Catégorie supprimée avec succès !");
      } catch (err) {
        //toast.error(error?.message || "Erreur lors de la suppression");
      }
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category._id);
    setFormData({
      name: category.name,
      description: category.description,
    });
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error)
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des catégories
      </h1>

      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editCategoryId
            ? "Modifier la catégorie"
            : "Ajouter une nouvelle catégorie"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nom de la catégorie"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Description"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              {editCategoryId ? "Nouvelle image" : "Image *"}
            </label>
            <input
              type="file"
              value={formData.image}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          {editCategoryId && (
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {editCategoryId ? "Mettre à jour" : "Créer"}
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher des catégories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Tableau des catégories */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category._id}>
                  <td className="px-6 py-4">
                    {category.image && (
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/images/categories/${category.image}`}
                        alt={category.name}
                        className="w-100 h-60 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {category.description || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Aucune catégorie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;

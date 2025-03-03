import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../Redux/categoryAction";
import {
  createSubcategory,
  deleteSubcategory,
  fetchSubcategory,
  updateSubcategory,
} from "../../Redux/subcategoryAction";
import toast from "react-hot-toast";

const SubcategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.category);
  const {
    subcategories = [],
    loading,
    error,
  } = useSelector((state) => state.subcategory);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
  });
  const [editSubcategoryId, setEditSubcategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchSubcategory());
  }, [dispatch]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      categoryId: "",
    });
    setEditSubcategoryId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.description || !formData.categoryId) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    try {
      if (editSubcategoryId) {
        await dispatch(updateSubcategory(editSubcategoryId, formData));
        toast.success("Sous-catégorie mise à jour avec succès !");
      } else {
        await dispatch(createSubcategory(formData));
        toast.success("Sous-catégorie créée avec succès !");
      }
      resetForm();
    } catch (err) {
      toast.error(error?.message || "Une erreur est survenue");
    }
  };

  const handleDelete = async (subcategoryId) => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette sous-catégorie ?"
      )
    ) {
      try {
        await dispatch(deleteSubcategory(subcategoryId));
        toast.success("Sous-catégorie supprimée avec succès !");
      } catch (err) {
        toast.error(error?.message || "Erreur lors de la suppression");
      }
    }
  };

  const filteredSubcategories = subcategories.filter(
    (subcategory) =>
      subcategory?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subcategory?.description?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      subcategory?.categoryId?.name?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des sous-catégories
      </h1>

      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editSubcategoryId
            ? "Modifier la sous-catégorie"
            : "Ajouter une nouvelle sous-catégorie"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nom de la sous-catégorie
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Nom de la sous-catégorie"
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
              Catégorie parente
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          {editSubcategoryId && (
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {editSubcategoryId ? "Mettre à jour" : "Créer"}
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher des sous-catégories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Tableau des sous-catégories */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie parente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {subcategory.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {subcategory.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {subcategory.categoryId?.name || "Non spécifié"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditSubcategoryId(subcategory._id);
                        setFormData({
                          name: subcategory.name,
                          description: subcategory.description,
                          categoryId: subcategory.categoryId?._id || "",
                        });
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(subcategory._id)}
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
                  Aucune sous-catégorie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubcategoriesPage;

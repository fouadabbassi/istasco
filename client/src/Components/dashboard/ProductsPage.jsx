import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../Redux/productAction";
import { fetchCategory } from "../../Redux/categoryAction";
import { fetchSubcategoriesByCategory } from "../../Redux/subcategoryAction";

const ProductsPage = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.product);
  const { subcategories = [] } = useSelector((state) => state.subcategory);
  const { categories = [] } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    subcategoryId: "",
    images: null,
    pdf: null,
  });
  const [editProductId, setEditProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategory());
    if (formData.categoryId) {
      dispatch(fetchSubcategoriesByCategory(formData.categoryId));
    }
  }, [dispatch, formData.categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files }));
  };

  const handleSubmit = () => {
    const productData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      categoryId: formData.categoryId,
      subcategoryId: formData.subcategoryId,
    };

    const files = {
      images: formData.images ? Array.from(formData.images) : [],
      pdf: formData.pdf ? formData.pdf[0] : null,
    };

    if (editProductId) {
      dispatch(updateProduct(editProductId, productData, files));
      setEditProductId(null);
    } else {
      dispatch(createProduct(productData, files));
      dispatch(fetchProducts());
    }
    resetForm();
  };

  const handleDelete = (productId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      dispatch(deleteProduct(productId));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      subcategoryId: "",
      images: null,
      pdf: null,
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Chargement...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Erreur: {error}</div>;

  return (
    <div className="container mx-auto p-4 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Gestion des produits
      </h1>

      {/* Formulaire */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editProductId ? "Modifier le produit" : "Ajouter un nouveau produit"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Nom du produit
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Prix</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Catégorie</label>
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

          <div>
            <label className="block mb-2 text-sm font-medium">
              Sous-catégorie
            </label>
            <select
              name="subcategoryId"
              value={formData.subcategoryId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              disabled={!formData.categoryId}
            >
              <option value="">Sélectionner une sous-catégorie</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Images</label>
            <input
              type="file"
              name="images"
              onChange={handleFileChange}
              multiple
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">PDF</label>
            <input
              type="file"
              name="pdf"
              onChange={handleFileChange}
              accept="application/pdf"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          {editProductId && (
            <button
              onClick={() => {
                setEditProductId(null);
                resetForm();
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Annuler
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editProductId ? "Mettre à jour" : "Créer"}
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher des produits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Tableau des produits */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <div className="flex-auto space-x-2">
                      {product.images?.map((image, index) => (
                        <img
                          key={index}
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/produits/${image}`}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {product.price} DH
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {product.categoryId?.name || "Non spécifié"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditProductId(product._id);
                        setFormData({
                          name: product.name,
                          description: product.description,
                          price: product.price,
                          categoryId: product.categoryId?._id || "",
                          subcategoryId: product.subcategoryId?._id || "",
                          images: null,
                          pdf: null,
                        });
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
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
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Aucun produit trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;

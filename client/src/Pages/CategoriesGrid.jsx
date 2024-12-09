import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { fetchCategory } from "../Redux/categoryAction";
import { motion, useInView } from "framer-motion";
import { addingIdCategoryFromNavbar, fetchProducts } from "../Redux/productAction";
import { useNavigate } from "react-router-dom";

const CategoriesGrid = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
    const ref4 = useRef(null);
    const isInView4 = useInView(ref4, { once: false });
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const handleProduitFromNavbar = (categoryId) => {
    dispatch(
      fetchProducts({
        page: 1,
        categoryId: categoryId,
      })
    );
    dispatch(addingIdCategoryFromNavbar(categoryId));
    navigate("/produits");
  };
  const categories = useSelector((state) => state.category.categories);

    return (
      <motion.div
        ref={ref4}
        initial={{ y: 100 }}
        animate={isInView4 ? { y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="font-sans py-16 px-4 mt-4"
      >
        {categories.length > 0 && (
          <h2 className="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">
            Explorez nos catégories de protection
          </h2>
        )}
        <div className="mx-auto px-2">
          <div className="mt-2">
            <div className="mx-auto ">
              <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-2">
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <motion.div
                      onClick={() => {
                        handleProduitFromNavbar(category._id);
                        dispatch(fetchProducts(1,category._id));
                      }}
                      whileHover={{ scale: 1.05 }}
                      key={index}
                      className="p-4 h-72 w-full"
                    >
                      <div className="h-full flex items-start rounded-md bg-gray-100">
                        <img
                          src={`${
                            import.meta.env.VITE_BACKEND_URL
                          }/images/categories/${category.image}`}
                          alt={category?.name}
                          className="w-24 h-full object-fill flex-shrink-0"
                        />
                        <div className="flex flex-col p-4">
                          <h3 className="text-2xl font-semibold h-36 cursor-pointer text-gray-900 mb-3">
                            {category?.name}
                          </h3>
                          <div className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium w-full flex items-center">
                            En savoir plus
                            <svg
                              className="w-4 h-4 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
};

export default CategoriesGrid;

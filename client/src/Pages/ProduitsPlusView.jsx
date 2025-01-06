import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchProduitByTag } from "../Apis/services/ProduitService";
import { addingIdCategoryFromNavbar, addingSearchingFromLandingPage, addingSearchingFromNavbar } from "../Redux/productAction";
import { useDispatch } from "react-redux";

const ProduitsPlusView = () => {
  const dispatch = useDispatch();
  const [produits, setProduits] = useState([]);
  const ref4 = useRef(null);
  const isInView4 = useInView(ref4, { once: false });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduitByTag();
      setProduits(data.produits);
    };
    fetchData();
  }, []);

  return (
    <motion.div
      ref={ref4}
      initial={{ opacity: 0 }}
      animate={isInView4 ? { opacity: 1 } : {}}
      transition={{ duration: 0.1 }}
      className="font-sans py-4 px-4 bg-[#5091d2]"
    >
      {produits?.length > 0 && (
        <>
          <h2 className="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">
            Produits plus consultés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {produits.map((produit, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 100,
                }}
                animate={isInView4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                key={index}
                className="relative group h-[550px] overflow-hidden rounded-md hover:shadow-lg transition-shadow duration-300 bg-white "
              >
                <Link to={`/produits/${produit._id}`}>
                  <div className="bg-gray-50 p-4 h-[350px] overflow-hidden m-4 aspect-w-16 aspect-h-8 rounded-b-2xl">
                    <img
                      src={
                        import.meta.env.VITE_BACKEND_URL +
                        "/images/produits/" +
                        produit.images[0]
                      }
                      alt={produit.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl text-center font-bold text-slate-950">
                    {produit.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Added button */}
          <div className="flex justify-center mt-8">
            <Link
              onClick={() => {
                dispatch(addingIdCategoryFromNavbar(null));
                dispatch(addingSearchingFromLandingPage(""));
                dispatch(addingSearchingFromNavbar(""));
              }}
              to="/produits"
              className="bg-[#EE902F] text-white px-6 py-3 rounded-lg hover:bg-[#d2ab84] transition-colors duration-300"
            >
              Voir tous les produits
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProduitsPlusView;

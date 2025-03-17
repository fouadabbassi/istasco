import { useDispatch} from "react-redux";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  addingIdCategoryFromNavbar,
  addingSearchingFromLandingPage,
} from "../Redux/productAction";
import { useNavigate } from "react-router-dom";

const TravailleurGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const cards = [
     {
       background: "/images/secteur/BTP.jpg",
       name: "🏗 Bâtiment et Travaux Publics (BTP)",
     },
     {
       background: "/images/secteur/Secteur-chimique.jpg",
       name: "🔬 Industrie Chimique et Laboratoires",
     },
     {
       background: "/images/secteur/secteur_medical_et_sante.jpg",
       name: "🩺 Secteur Médical et Santé",
     },
     {
       background: "/images/secteur/Idustrie_agroalimentaire.jpg",
       name: "🍽 Industrie Agroalimentaire",
     },
     {
       background: "/images/secteur/transport_et_logistique.jpg",
       name: "🚚 Transport et logistique",
     },
     {
       background: "/images/secteur/Énergie_Électricité_Nucléaire.jpg",
       name: "⚡  Énergie/Électricité/Nucléaire",
     },
     {
       background: "/images/secteur/Services_de_nettoyage_et_désinfection.jpg",
       name: "🧼 Services de nettoyage et désinfection",
     },
     {
       background: "/images/secteur/Agriculture_et_élevage.jpg",
       name: "🌾 Agriculture et élevage",
     },
     {
       background: "/images/secteur/Pétrole,_gaz_et_mines.jpg",
       name: "🛢️ Pétrole, gaz et mines",
     },
     {
       background: "/images/secteur/Forêt_et_espaces_verts.jpg",
       name: "🌳 Forêt et espaces verts",
     },
   ];
  const ref4 = useRef(null);
  const isInView4 = useInView(ref4, { once: false });
  const handleSearchingFromLandingPage = (searsh) => {
    dispatch(addingIdCategoryFromNavbar(null));
    dispatch(addingSearchingFromLandingPage(searsh));
    navigate("/produits");
  };
  return (
      <motion.div
        ref={ref4}
        initial={{ opacity: 0 }}
        animate={isInView4 ? { opacity: 1 } : {}}
        transition={{ duration: 0.10 }}
        className="font-sans py-4 px-4"
      >
          <h2 className="text-gray-800 sm:text-4xl text-2xl font-extrabold text-center mb-16">
            secteur d'activité
          </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {
            cards.map((card, index) => (
              <motion.div
                onClick={() => {
                  handleSearchingFromLandingPage(card.name.substring(3));
                }}
                initial={{
                  opacity: 0,
                  y: Math.floor(Math.random() * (98 - 0 + 1) + 0)
                }}
                animate={isInView4 ? { opacity: 1 , y : 0 } : {}}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                key={index}
                className="relative group h-[350px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="block h-full">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.background})` }}
                  ></div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-blue-950 bg-opacity-10 transition-opacity duration-300 group-hover:bg-opacity-20"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                  <div className="text-white mb-4">
                    <h3 className="text-2xl cursor-pointer font-bold mb-2">{card.name}</h3>
                  </div>
                  <div>
                    <div className="inline-flex items-center cursor-pointer bg-white bg-opacity-90 text-blue-600 px-6 py-2 rounded-full hover:bg-opacity-100 transition-all duration-300 hover:translate-y-1">
                      <span className="mr-2">Voir plus</span>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
  );
};

export default TravailleurGrid;


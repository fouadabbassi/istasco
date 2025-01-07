import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../Redux/productAction";
import { addItemCart, addItemCartStatic, fetchCart, removeItemCart, removeItemCartStatic } from "../Redux/cartAction";
const SingleProduitPage = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { cart, cartStatic } = useSelector((state) => state.cart);
  const { isLoggedIn, userProfile } = useSelector((state) => state.auth);
  const idProduut = useParams();
  const [imageFull, setImageFull] = useState(null);

  useEffect(() => {
    dispatch(fetchProductById(idProduut.id));
    if (isLoggedIn) {
      dispatch(fetchCart(userProfile?._id));
    }
  }, [idProduut, dispatch, userProfile, isLoggedIn]);
  return product ? (
    <div>
      <div className="font-sans">
        <div className="p-4 lg:max-w-6xl max-w-lg mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
            <div className="w-full lg:sticky top-0 sm:flex gap-2">
              <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                {product["images"].length > 0
                  ? product.images.map((image, index) => (
                      <img
                        key={index}
                        onClick={() => setImageFull(image)}
                        src={
                          import.meta.env.VITE_BACKEND_URL +
                          "/images/produits/" +
                          image
                        }
                        alt={product["name"] + index}
                        className={
                          imageFull === image
                            ? "w-full cursor-pointer rounded-md outline"
                            : "w-full cursor-pointer rounded-md"
                        }
                      />
                    ))
                  : null}
              </div>
              <img
                src={
                  import.meta.env.VITE_BACKEND_URL +
                  "/images/produits/" +
                  (imageFull ? imageFull : product["images"][0])
                }
                alt={product["name"]}
                className="w-4/5 rounded-md object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {product["name"] ? product["name"] : null}
              </h2>
              <div className="mt-8">
                <p className="text-xl text-gray-800">
                  {product["description"] ? product["description"] : null}
                </p>
                <div className="flex flex-wrap gap-4 mt-4"></div>
              </div>

              <button
                onClick={() => {
                  if (isLoggedIn) {
                    dispatch(fetchCart(userProfile._id));
                    if (
                      cart.some((item) => item?.produitId?._id === product._id)
                    ) {
                      dispatch(removeItemCart(userProfile._id, product._id));
                    } else {
                      dispatch(addItemCart(userProfile._id, product._id, 1));
                    }
                  } else {
                    if (
                      cartStatic.some(
                        (item) => item.produitId._id === product._id
                      )
                    ) {
                      dispatch(removeItemCartStatic(product._id));
                    } else {
                      dispatch(
                        addItemCartStatic({
                          produitId: product,
                          quantity: 1,
                        })
                      );
                    }
                  }
                }}
                className="w-full mt-8 px-6 py-3 bg-[#EE902F] hover:bg-[#C06E1A]
                text-white text-sm font-semibold rounded-md"
              >
                {(cart.some((item) => item.produitId._id === product._id) &&
                  userProfile) ||
                cartStatic.some((item) => item.produitId._id === product._id)
                  ? "Suprimer Au Panier"
                  : "Ajouter Au Panier"}
              </button>

              <div className="mt-8">
                <a
                  href={
                    import.meta.env.VITE_BACKEND_URL + "/pdfs/" + product["pdf"]
                  }
                >
                  <button
                    type="button"
                    className="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent hover:bg-[#EBEBEB] text-gray-800 text-sm font-semibold rounded-md"
                  >
                    Telecharger Fiche Technique
                  </button>
                </a>
                <Link to={"/confirmation"}>
                  <button className="mt-6 text-base tracking-wide px-5 p-4 w-full bg-[#1B5085] hover:bg-[#0D3052] text-white rounded-lg">
                    Demande un Devis
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : null;
};

export default SingleProduitPage;

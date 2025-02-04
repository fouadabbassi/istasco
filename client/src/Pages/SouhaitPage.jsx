import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import { addItemCart, addItemCartStatic, fetchCart, removeItemCart, removeItemCartStatic } from "../Redux/cartAction";
import {
  fetchWishlist,
  removeItem,
  removeItemStatic,
} from "../Redux/wishlistAction";
const SouhaitPage = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userProfile);
  const wishlistItems = useSelector((state) => state.wishlist.wishlist);
  const { wishlistStatic } = useSelector((state) => state.wishlist);
  const { cart, cartStatic } = useSelector((state) => state.cart);
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWishlist(currentUser._id));
      dispatch(fetchCart(currentUser._id));
    }
  }, [currentUser, dispatch]);

  return (
    <div>
      <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
          Souhaits
        </h2>
        {currentUser && wishlistItems && wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 flex flex-column lg:grid-cols-3 m-3 gap-6">
            {wishlistItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
              >
                <div>
                  <div className="p-6 w-3/3 h-[200px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    {item.produitId &&
                    item.produitId.images &&
                    item.produitId.images[0] !== undefined ? (
                      <img
                        src={
                          import.meta.env.VITE_BACKEND_URL +
                          "/images/produits/" +
                          item.produitId.images[0]
                        }
                        alt={
                          item.produitId && item.produitId.name
                            ? item.produitId.name
                            : null
                        }
                        className="h-full w-full object-contain"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="text-center bg-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.produitId && item.produitId.name
                      ? item.produitId.name
                      : null}
                  </h3>{" "}
                  {/* Adjust the key to your actual name property */}
                  <div className="w-full flex flex-column items-center justify-center gap-3">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 mt-6  py-3 bg-[#EE902F] hover:bg-[#EE992F]  text-base text-[#fff] font-semibold rounded-xl"
                      onClick={() => {
                        dispatch(
                          removeItem(currentUser._id, item.produitId._id)
                        );
                      }}
                    >
                      Supprimer Au Souhait
                    </button>
                    <button
                      className={
                        (cart.some(
                          (produit) =>
                            produit?.produitId?._id === item?.produitId?._id
                        ) &&
                          currentUser) ||
                        cartStatic.some(
                          (produit) =>
                            produit.produitId._id === item.produitId._id
                        )
                          ? "w-100% flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-blue-300 text-base font-semibold rounded-xl"
                          : "w-100% flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-gray-300 text-base font-semibold rounded-xl"
                      }
                      onClick={() => {
                        if (currentUser) {
                          dispatch(fetchCart(currentUser._id));
                          if (
                            cart.some(
                              (produit) =>
                                produit.produitId._id === item.produitId._id
                            )
                          ) {
                            dispatch(
                              removeItemCart(
                                currentUser._id,
                                item.produitId._id
                              )
                            );
                          } else {
                            dispatch(
                              addItemCart(
                                currentUser._id,
                                item.produitId._id,
                                1
                              )
                            );
                          }
                          dispatch(fetchCart(currentUser._id));
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : wishlistStatic?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 flex flex-column lg:grid-cols-3 m-3 gap-6">
            {wishlistStatic.map((item) => (
              <div
                key={item._id}
                className="bg-gray-200 rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden"
              >
                <div>
                  <div className="p-6 w-3/3 h-[200px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img
                      src={
                        import.meta.env.VITE_BACKEND_URL +
                        "/images/produits/" +
                        item.images[0]
                      }
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-center bg-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h3>
                  <div className="w-full flex flex-column items-center justify-center gap-3">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 mt-6  py-3 bg-[#EE902F] hover:bg-[#EE992F] text-base text-gray-800 font-semibold rounded-xl"
                      onClick={() => dispatch(removeItemStatic(item._id))} // Implement the addToCart function
                    >
                      Supprimer Au Souhait
                    </button>
                    <button
                      className={
                        (cart.some(
                          (produit) => produit.produitId._id === item._id
                        ) &&
                          currentUser) ||
                        cartStatic.some(
                          (produit) => produit.produitId._id === item._id
                        )
                          ? "w-100% flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-blue-300 text-base font-semibold rounded-xl"
                          : "w-100% flex items-center justify-center gap-3 mt-6 px-6 py-3 bg-gray-300 text-base font-semibold rounded-xl"
                      }
                      onClick={() => {
                        if (
                          cartStatic.some(
                            (produit) => produit.produitId._id === item._id
                          )
                        ) {
                          dispatch(removeItemCartStatic(item._id));
                        } else {
                          dispatch(
                            addItemCartStatic({
                              produitId: item,
                              quantity: 1,
                            })
                          );
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-center p-8 min-h-[380px] bg-gradient-to-t from-gray-50 to-gray-300 w-full font-[sans-serif]">
            <div className="max-w-4xl mx-auto">
              <h1 className="sm:text-4xl text-2xl font-bold text-black">
                Votre liste de souhaits est vide.
              </h1>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SouhaitPage;

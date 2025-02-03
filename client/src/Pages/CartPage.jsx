import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addQCartStatic,
  addQuantity,
  fetchCart,
  removeItemCart,
  removeItemCartStatic,
  removeQCartStatic,
  removeQuantity,
} from "../Redux/cartAction";

const CartPage = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.auth);
  const { cart, cartStatic } = useSelector((state) => state.cart);
  useEffect(() => {
    if (userProfile) {
      dispatch(fetchCart(userProfile._id));
    }
  }, [userProfile, dispatch]);

  return (
    <div>
      <div className="font-[sans-serif] py-4 mx-auto lg:max-w-6xl max-w-lg md:max-w-full">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Panier</h2>
        <div className="overflow-x-auto">
          {userProfile && cart && cart.length > 0 ? (
            <table className="mt-12 w-full border-collapse divide-y">
              <thead className="whitespace-nowrap text-left">
                <tr>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Image
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Nom
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Description
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Quantity
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-4">
                      <Link to={`/produits/${item.produitId._id}`}>
                        <div className="flex items-center gap-4 w-60">
                          <div className="h-32 shrink-0">
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
                                className="w-full h-full object-contain rounded-lg"
                              />
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-2 py-4">
                      <Link to={`/produits/${item.produitId._id}`}>
                        <div>
                          <p className="text-base font-bold text-gray-800 min-w-40 w-40">
                            {item?.produitId?.name}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-2 py-4">
                      <Link to={`/produits/${item.produitId._id}`}>
                        <p className="text-base text-gray-800 min-w-80 w-80">
                          {item?.produitId?.description.substring(0, 150) +
                            "..."}
                        </p>
                      </Link>
                    </td>
                    <td className="px-2 py-4">
                      <div className="flex overflow-hidden border w-max rounded-lg">
                        <button
                          onClick={() => {
                            dispatch(fetchCart(userProfile._id));
                            if (item?.quantity === 1) {
                              dispatch(
                                removeItemCart(
                                  userProfile._id,
                                  item?.produitId?._id
                                )
                              );
                            } else {
                              dispatch(
                                removeQuantity(
                                  userProfile?._id,
                                  item?.produitId?._id,
                                  1
                                )
                              );
                            }

                            dispatch(fetchCart(userProfile._id));
                          }}
                          type="button"
                          className="bg-gray-100 flex items-center justify-center w-11 h-10 font-semibold"
                        >
                          {item?.quantity === 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 fill-red-500 inline"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"
                              ></path>
                              <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          )}
                        </button>

                        <span className="bg-transparent flex items-center justify-center w-11 h-10 font-semibold text-gray-800 text-base">
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() => {
                            dispatch(fetchCart(userProfile._id));
                            dispatch(
                              addQuantity(
                                userProfile?._id,
                                item?.produitId?._id,
                                1
                              )
                            );
                            dispatch(fetchCart(userProfile._id));
                          }}
                          type="button"
                          className="bg-gray-800 text-white flex items-center justify-center w-11 h-10 font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-2 py-4">
                      <button
                        onClick={() => {
                          dispatch(
                            removeItemCart(
                              userProfile._id,
                              item?.produitId?._id
                            )
                          );
                        }}
                        className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 fill-red-500 inline"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : cartStatic && cartStatic.length > 0 ? (
            <table className="mt-12 w-full border-collapse divide-y">
              <thead className="whitespace-nowrap text-left">
                <tr>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Image
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Nom
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Description
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Quantity
                  </th>
                  <th className="text-base text-gray-500 font-medium p-2">
                    Remove
                  </th>
                </tr>
              </thead>

              <tbody>
                {cartStatic.map((item, index) => (
                  <tr key={index}>
                    <td className="px-2 py-4">
                      <Link to={`/produits/${item.produitId._id}`}>
                        <div className="flex items-center gap-4 w-60">
                          <div className="h-32 shrink-0">
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
                                className="w-full h-full object-contain rounded-lg"
                              />
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td className="px-2 py-4">
                      <Link to={`/produits/${item.produitId._id}`}>
                        <div>
                          <p className="text-base font-bold text-gray-800 min-w-40">
                            {item?.produitId?.name}
                          </p>
                        </div>
                      </Link>
                    </td>

                    <td className="px-2 py-4">
                      <Link to={`/produits/${item.produitId._id}`}>
                        <p className="text-base text-gray-800 min-w-60">
                          {item?.produitId?.description.substring(0, 150) +
                            "..."}
                        </p>
                      </Link>
                    </td>

                    <td className="px-2 py-4">
                      <div className="flex overflow-hidden border w-max rounded-lg">
                        <button
                          onClick={() => {
                            if (item.quantity === 1) {
                              dispatch(
                                removeItemCartStatic(item.produitId._id)
                              );
                            } else {
                              dispatch(removeQCartStatic(item, 1));
                            }
                          }}
                          type="button"
                          className="bg-gray-100 flex items-center justify-center w-11 h-10 font-semibold"
                        >
                          {item.quantity === 1 ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 fill-red-500 inline"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                                data-original="#000000"
                              ></path>
                              <path
                                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 fill-current"
                              viewBox="0 0 124 124"
                            >
                              <path
                                d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          )}
                        </button>
                        <span className="bg-transparent flex items-center justify-center w-11 h-10 font-semibold text-gray-800 text-base">
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() => {
                            dispatch(addQCartStatic(item, 1));
                          }}
                          type="button"
                          className="bg-gray-800 text-white flex items-center justify-center w-11 h-10 font-semibold"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 fill-current"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="px-2 py-4">
                      <button
                        onClick={() => {
                          dispatch(removeItemCartStatic(item.produitId._id));
                        }}
                        className="bg-transparent border flex items-center justify-center w-11 h-10 rounded-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 fill-red-500 inline"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center text-center p-8 min-h-[380px] bg-gradient-to-t from-gray-50 to-gray-300 w-full font-[sans-serif]">
              <div className="max-w-4xl mx-auto">
                <h1 className="sm:text-4xl text-2xl font-bold text-black">
                  Votre liste de panier est vide.
                </h1>
              </div>
            </div>
          )}
        </div>

        {(userProfile && cart && cart.length > 0) ||
        (cartStatic && cartStatic.length > 0) ? (
          <div className="max-w-xl ml-auto">
            <Link to={"/confirmation"}>
              <button className="mt-6 text-base tracking-wide px-5 p-4 w-full bg-[#1B5085] hover:bg-[#0D3052] text-white rounded-lg">
                Demande un Devis
              </button>
            </Link>
          </div>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;

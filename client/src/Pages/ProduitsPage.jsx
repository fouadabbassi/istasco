import { useCallback, useEffect, useState } from "react";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../Redux/categoryAction";
import { Link } from "react-router-dom";
import { fetchSubcategoriesByCategory } from "../Redux/subcategoryAction";
import toast from "react-hot-toast";
import {
  addingIdCategoryFromNavbar,
  addingSearchingFromLandingPage,
  addingSearchingFromNavbar,
  fetchProducts,
} from "../Redux/productAction";
import {
  addItem,
  addItemStatic,
  fetchWishlist,
  removeItem,
  removeItemStatic,
} from "../Redux/wishlistAction";
import {
  addItemCart,
  addItemCartStatic,
  fetchCart,
  removeItemCart,
  removeItemCartStatic,
} from "../Redux/cartAction";
const ProduitsPage = () => {
  const categorys = useSelector((state) => state.category.categories);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const { wishlistStatic, wishlist } = useSelector((state) => state.wishlist);
  const { cart, cartStatic } = useSelector((state) => state.cart);
  const subcategorys = useSelector((state) => state.subcategory.subcategories);
  const { products, idCategory, searching, searchingtwo } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const [subMenuOpen, setSubMenuOpen] = useState("");
  const [page, setPage] = useState(1);
  const [arrNembre, setArrNumbers] = useState([]);
  const [categoryIdState, setCategoryId] = useState(null);
  const [subcategoryIdState, setSubcategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchtwo, setSearchtow] = useState("");
  const [fetchingBy, setFetchingBy] = useState("");

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrePage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const handlePage = (nbr) => {
    setPage(nbr);
  };

  const handleProduitsByCategory = useCallback(
    (page, categoryId) => {
      setFetchingBy("categoryId");
      dispatch(fetchProducts({ page, categoryId }));
      setCategoryId(categoryId);
    },
    [dispatch]
  );

  const handleProduitsBySubcategory = useCallback(
    (page, subcategoryId) => {
      setFetchingBy("subcategoryId");
      dispatch(fetchProducts({ page, subcategoryId }));
      setSubcategoryId(subcategoryId);
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (page, search, type) => {
      setFetchingBy(type);
      dispatch(fetchProducts({ page, search }));
      dispatch(addingIdCategoryFromNavbar(null));
      setCategoryId(null);
      setSubcategoryId(null);
      setSearch(search);
      setSearchtow(search);
      if (type === "searching") {
        addingSearchingFromNavbar(search);
        dispatch(addingSearchingFromLandingPage(""));
      } else {
        addingSearchingFromLandingPage(search);
        dispatch(addingSearchingFromNavbar(""));
      }
    },
    [dispatch]
  );
  useEffect(() => {
    setArrNumbers(page > 1 ? [page - 1, page, page + 1] : [1, 2, 3]);

    const fetchData = () => {
      if (fetchingBy === "categoryId" && categoryIdState) {
        handleProduitsByCategory(page, categoryIdState);
      } else if (fetchingBy === "subcategoryId" && subcategoryIdState) {
        handleProduitsBySubcategory(page, subcategoryIdState);
      } else if (fetchingBy === "searching" && search) {
        handleSearch(page, search, "searching");
      } else if (fetchingBy === "searchingtwo" && searchtwo) {
        handleSearch(page, searchtwo, "searchingtwo");
      } else {
        dispatch(fetchProducts({ page }));
      }
    };

    fetchData();
  }, [
    page,
    categoryIdState,
    subcategoryIdState,
    fetchingBy,
    search,
    searchtwo,
    dispatch,
    handleProduitsByCategory,
    handleProduitsBySubcategory,
    handleSearch,
  ]);

  useEffect(() => {
    const controller = new AbortController();

    const initializeData = async () => {
      await dispatch(fetchCategory({ signal: controller.signal }));

      // التحقق من التغييرات قبل تحديث الحالة
      if (searchingtwo && searchingtwo !== searchtwo) {
        setSearchtow(searchingtwo);
        setFetchingBy((prev) =>
          prev !== "searchingtwo" ? "searchingtwo" : prev
        );
        setPage(1);
      } else if (searching && searching !== search) {
        setSearch(searching);
        setFetchingBy((prev) => (prev !== "searching" ? "searching" : prev));
        setPage(1);
      } else if (idCategory && idCategory !== categoryIdState) {
        setCategoryId(idCategory);
        setFetchingBy((prev) => (prev !== "categoryId" ? "categoryId" : prev));
        setPage(1);
      }
    };

    initializeData();

    return () => controller.abort();
  }, [
    dispatch,
    idCategory,
    searching,
    searchingtwo,
    categoryIdState,
    search,
    searchtwo,
  ]);

  const handleSubcategorys = (categoryId) => {
    try {
      dispatch(fetchSubcategoriesByCategory(categoryId));
    } catch {
      toast.error("not found");
    }
  };
  return (
    <div>
      <div className="flex max-sm:flex-col p-2 gap-12 max-lg:gap-4 h-full">
        <nav
          style={{ zIndex: "10" }}
          className="bg-white shadow-lg sm:h-auto sm:sticky sm:top-0 lg:min-w-[225px] sm:min-w-[225px]"
        >
          <div
            className="lg:sticky top-0"
            onMouseLeave={() => {
              setSubMenuOpen(false);
            }}
          >
            <div className=" text-left">
              <div className="origin-top-left  w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      setFetchingBy("");
                      setPage(1);
                      dispatch(addingIdCategoryFromNavbar(null));
                    }}
                    className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative rounded-md"
                    style={{
                      color:
                        fetchingBy === "" || fetchingBy === "searching"
                          ? "#EE902F"
                          : "",
                    }}
                  >
                    All Produit
                    <svg
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="h-5 w-5 ml-2"
                      style={{ transform: "rotate(270deg)" }}
                    >
                      <path d="M24,27.2L13.4,16.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l12,11.9a1.9,1.9,0,0,0,2.8,0l12-11.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {categorys.map((category, index) => (
              <div key={index} className=" text-left">
                <div className="origin-top-left  w-56 shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2">
                  <div className="relative">
                    <button
                      onMouseEnter={() => {
                        if (subMenuOpen !== category._id) {
                          setSubMenuOpen(category._id);
                          handleSubcategorys(category._id);
                        } else {
                          setSubMenuOpen("");
                        }
                      }}
                      onClick={() => {
                        setFetchingBy("categoryId");
                        setCategoryId(category._id);
                        setPage(1);
                        dispatch(addingIdCategoryFromNavbar(null));
                        dispatch(addingSearchingFromNavbar(""));
                      }}
                      className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative rounded-md"
                      style={{
                        color:
                          fetchingBy !== "" &&
                          fetchingBy !== "searching" &&
                          categoryIdState === category._id
                            ? "#EE902F"
                            : "",
                      }}
                    >
                      {category.name}
                      <svg
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="h-5 w-5 ml-2"
                        style={{ transform: "rotate(270deg)" }}
                      >
                        <path d="M24,27.2L13.4,16.6a1.9,1.9,0,0,0-3,.2,2.1,2.1,0,0,0,.2,2.7l12,11.9a1.9,1.9,0,0,0,2.8,0l12-11.9a2.1,2.1,0,0,0,.2-2.7,1.9,1.9,0,0,0-3-.2Z" />
                      </svg>
                    </button>

                    {subMenuOpen === category._id &&
                      subcategorys.length !== 0 && (
                        <div
                          style={{ zIndex: "10" }}
                          className="absolute sm:top-0 lg:top-0 sm:left-full sm:w-full  lg:mt-2 lg:left-full  lg:w-full sm:ml-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2"
                        >
                          {subcategorys.map((sub, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setFetchingBy("subcategoryId");
                                setSubcategoryId(sub._id);
                                setPage(1);
                                setSubMenuOpen("");
                                dispatch(addingIdCategoryFromNavbar(null));
                                setCategoryId(category._id);
                              }}
                              className="w-full"
                            >
                              <div
                                style={{
                                  color:
                                    fetchingBy === "subcategoryId" &&
                                    subcategoryIdState === sub._id
                                      ? "#EE902F"
                                      : "",
                                }}
                                className="flex px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100"
                              >
                                {sub.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </nav>
        {/**produits list */}
        <div className="font-[sans-serif] p-2 md:p-4 mx-auto w-full sm:max-w-md md:max-w-3xl lg:max-w-5xl">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
            {fetchingBy === "subcategoryId" ? (
              <>
                Produits de la sous-catégorie :
                <span className="text-[#007bff] ml-2">
                  {subcategorys.find((sub) => sub._id === subcategoryIdState)
                    ?.name || "Sous-catégorie"}
                </span>
              </>
            ) : fetchingBy === "categoryId" ? (
              <>
                Produits de la catégorie :
                <span className="text-[#007bff] ml-2">
                  {categorys.find((cat) => cat._id === categoryIdState)?.name ||
                    "Catégorie"}
                </span>
              </>
            ) : fetchingBy.startsWith("searching") ? (
              <>
                Résultats pour :
                <span className="text-[#007bff] ml-2">
                  {searching || searchingtwo }
                </span>
              </>
            ) : (
              "Tous les produits"
            )}
          </h2>

          {/**cart produit */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((produit, index) => {
                const svgSouhait =
                  (wishlist.some(
                    (item) => item?.produitId?._id === produit._id
                  ) &&
                    userProfile) ||
                  wishlistStatic.some((item) => item._id === produit._id) ? (
                    <div className="w-7 h-5  bg-gray-100 flex items-center justify-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#f9595f"
                          d="M449.28 121.43a115.2 115.2 0 0 0-137.89-35.75c-21.18 9.14-40.07 24.55-55.39 45-15.32-20.5-34.21-35.91-55.39-45a115.2 115.2 0 0 0-137.89 35.75c-16.5 21.62-25.22 48.64-25.22 78.13 0 42.44 25.31 89 75.22 138.44 40.67 40.27 88.73 73.25 113.75 89.32a54.78 54.78 0 0 0 59.06 0c25-16.07 73.08-49.05 113.75-89.32 49.91-49.42 75.22-96 75.22-138.44 0-29.49-8.72-56.51-25.22-78.13z"
                          data-original="#f9595f"
                        />
                      </svg>
                    </div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18px"
                      className="cursor-pointer inline-block"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  );
                const svgPanier =
                  (cart.some((item) => item?.produitId?._id === produit._id) &&
                    userProfile) ||
                  cartStatic.some(
                    (item) => item.produitId._id === produit._id
                  ) ? (
                    <div className="w-10 h-10  bg-blue-300 flex items-center justify-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        className="cursor-pointer fill-gray-800 inline-block"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-10 h-10  bg-gray-100 flex items-center justify-center rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18px"
                        className="cursor-pointer fill-gray-800 inline-block"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  );

                return (
                  <div
                    key={index}
                    className="bg-white border overflow-hidden rounded-2xl cursor-pointer hover:border-blue-600 transition-all relative"
                  >
                    <Link to={`/produits/${produit._id}`}>
                      <div className="bg-gray-50 p-4 h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 rounded-b-2xl">
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
                      <h3 className="text-lg font-bold text-gray-800">
                        {produit.name}
                      </h3>
                      <div className="flex items-center justify-between mt-6">
                        <div
                          onClick={() => {
                            if (isLoggedIn) {
                              dispatch(fetchWishlist(userProfile._id));
                              if (
                                wishlist.some(
                                  (item) => item?.produitId?._id === produit._id
                                )
                              ) {
                                dispatch(
                                  removeItem(userProfile._id, produit._id)
                                );
                              } else {
                                dispatch(addItem(userProfile._id, produit._id));
                              }
                            } else {
                              if (
                                wishlistStatic.some(
                                  (item) => item._id === produit._id
                                )
                              ) {
                                dispatch(removeItemStatic(produit._id));
                              } else {
                                dispatch(addItemStatic(produit));
                              }
                            }
                          }}
                          className="w-10 h-10  bg-gray-100 flex items-center justify-center rounded-full"
                        >
                          {svgSouhait}
                        </div>

                        <div
                          onClick={() => {
                            if (isLoggedIn) {
                              dispatch(fetchCart(userProfile._id));
                              if (
                                cart.some(
                                  (item) => item?.produitId?._id === produit._id
                                )
                              ) {
                                dispatch(
                                  removeItemCart(userProfile._id, produit._id)
                                );
                              } else {
                                dispatch(
                                  addItemCart(userProfile._id, produit._id, 1)
                                );
                              }
                            } else {
                              if (
                                cartStatic.some(
                                  (item) => item.produitId._id === produit._id
                                )
                              ) {
                                dispatch(removeItemCartStatic(produit._id));
                              } else {
                                dispatch(
                                  addItemCartStatic({
                                    produitId: produit,
                                    quantity: 1,
                                  })
                                );
                              }
                            }
                          }}
                          className="relative"
                        >
                          {svgPanier}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /**products vide */ <div className="flex items-center text-center p-8 min-h-[380px] bg-gradient-to-t from-gray-50 to-gray-300 w-full font-[sans-serif]">
              <div className="max-w-4xl mx-auto">
                <h1 className="sm:text-4xl text-2xl font-bold text-black">
                  La liste des produits de cette catégorie est vide ou a atteint
                  la dernière page
                </h1>
              </div>
            </div>
          )}

          {/**pagination */}
          <ul className="flex space-x-4 m-10 justify-center">
            <li
              onClick={() => handlePrePage()}
              className="flex items-center justify-center shrink-0 bg-gray-50 hover:bg-gray-300 w-10 h-10 border-2  cursor-pointer rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-gray-400"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </li>
            {arrNembre.map((number, index) => (
              <li
                onClick={() => {
                  if (products.length < 6 && number > page && number >= 3) {
                    toast.success(
                      "Passer à une autre catégorie. La dernière page de produits pour cette catégorie a atteint"
                    );
                  } else {
                    handlePage(number);
                  }
                }}
                key={index}
                style={{
                  color: page === number ? "blue" : "",
                  borderColor: page === number ? "blue" : "",
                }}
                className="flex items-center justify-center shrink-0 hover:bg-gray-50  border-2 border-gray-500 cursor-pointer text-base font-bold text-gray-500 w-10 h-10 rounded-lg"
              >
                {number}
              </li>
            ))}

            <li
              onClick={() => {
                if (!(products.length < 6)) {
                  handleNextPage();
                } else {
                  toast.success(
                    "Passer à une autre catégorie. La dernière page de produits pour cette catégorie a atteint"
                  );
                }
              }}
              className="flex items-center justify-center shrink-0 bg-gray-50 hover:bg-gray-300 border-2 cursor-pointer w-10 h-10 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-gray-400 rotate-180"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProduitsPage;

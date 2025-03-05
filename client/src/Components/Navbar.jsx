import { Logo } from "../assets/Logo"; // Ensure this path is correct
import { useEffect,useRef , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUser, logoutUser } from "../Redux/userAction";
import toast from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Logs,
  User,
} from "lucide-react";
import ScrollToTop from "./ScroolToTheTop";
import { fetchCategory } from "../Redux/categoryAction";
import {
  addingIdCategoryFromNavbar,
  addingSearchingFromLandingPage,
  addingSearchingFromNavbar,
  fetchProducts,
} from "../Redux/productAction";
import {
  addItem,
  fetchWishlist,
  removeItemStatic,
} from "../Redux/wishlistAction";
import {
  addItemCart,
  fetchCart,
  removeItemCartStatic,
} from "../Redux/cartAction";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userProfile);
  const categorys = useSelector((state) => state.category.categories);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { wishlistStatic } = useSelector((state) => state.wishlist);
  const { idCategory } = useSelector((state) => state.product);
  const { cart, cartStatic } = useSelector((state) => state.cart);
  
  const [hasSynced, setHasSynced] = useState(false);
  const isProcessing = useRef(false);  
  const [activeNav, setActiveNav] = useState(1);
  const [searsh, setSearsh] = useState("");

  useEffect(() => {
    dispatch(getProfileUser());
  }, [dispatch]);
  
  const handleSearchingFromLandingPage = (searsh) => {
    dispatch(addingSearchingFromLandingPage(searsh));
    navigate("/produits");
  };

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
    const handleSearchingFromNavbar = (searsh) => {
      dispatch(addingSearchingFromNavbar(searsh));
      navigate("/produits");
    };
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  
 const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
 
useEffect(() => {
  const handleDataToServe = async () => {
    if (!currentUser || isProcessing.current || hasSynced) return;
    isProcessing.current = true;

    try {
      if (wishlistStatic?.length) {
        const itemsToAdd = [...wishlistStatic];
        await Promise.all(itemsToAdd.map(item => 
          dispatch(removeItemStatic(item._id))
        ));
        await delay(500);
        
        for (const item of itemsToAdd) {
          await dispatch(addItem(currentUser._id, item._id));
          await delay(200);
        }
      }

      if (cartStatic?.length) {
        const itemsToAdd = [...cartStatic];
        await Promise.all(itemsToAdd.map(item => 
          dispatch(removeItemCartStatic(item.produitId._id))
        ));
        await delay(500);
        
        for (const item of itemsToAdd) {
          await dispatch(addItemCart(
            currentUser._id, 
            item.produitId._id, 
            item.quantity
          ));
          await delay(200);
        }
      }
      
      setHasSynced(true);
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      isProcessing.current = false;
    }
  };

  if (currentUser) {
    handleDataToServe();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [currentUser, hasSynced, wishlistStatic?.length, cartStatic?.length]);


  useEffect(() => {
    if (currentUser) {
      dispatch(fetchWishlist(currentUser._id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart(currentUser._id));
    }
  }, [dispatch, currentUser]);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout successful!");
  };

  return (
    <div>
      <ScrollToTop />
      <header className="shadow-md bg-white font-[sans-serif] tracking-wide relative z-50 h-100%">
        <section className="flex items-center flex-wrap lg:justify-center gap-4  sm:px-10  border-gray-200 border-b min-h-[75px]">
          {/**searsh */}
          <div className="left-10 absolute z-50 bg-gray-100 flex px-4 py-3 rounded max-lg:hidden">
            <svg
              onClick={() => {
                if (searsh) {
                  handleSearchingFromNavbar(searsh);
                }
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="20px"
              className="cursor-pointer fill-gray-400 mr-6 rotate-90 inline-block"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              onChange={(e) => {
                setSearsh(e.target.value);
                handleSearchingFromNavbar(e.target.value);
              }}
              onKeyDown={() => {
                if (searsh) {
                  handleSearchingFromNavbar(searsh);
                }
              }}
              type="text"
              placeholder="chercher..."
              className="outline-none bg-transparent w-full text-sm"
              value={searsh}
            />
          </div>
          {/**logo */}
          <Link to={"/"} className="shrink-0">
            <img src={Logo} alt="logo" className="md:w-[170px] w-26" />
          </Link>
          {/**icons link */}
          <div className="lg:absolute lg:right-10 flex items-center ml-auto space-x-8">
            <Link to={"/souhaits"} className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block"
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                />
              </svg>
              {currentUser && wishlist.length > 0 ? (
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-[red] px-1 py-0 text-xs text-white">
                  {wishlist.length}
                </span>
              ) : wishlistStatic && wishlistStatic.length > 0 ? (
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-[red] px-1 py-0 text-xs text-white">
                  {wishlistStatic.length}
                </span>
              ) : null}
            </Link>
            <Link to={"/panier"} className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                className="cursor-pointer fill-[#333] hover:fill-[#007bff] inline-block"
                viewBox="0 0 512 512"
              >
                <path
                  d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                  data-original="#000000"
                ></path>
              </svg>
              {currentUser && cart?.length > 0 ? (
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-[red] px-1 py-0 text-xs text-white">
                  {cart?.length}
                </span>
              ) : cartStatic && cartStatic?.length > 0 ? (
                <span className="absolute left-auto -ml-1 top-0 rounded-full bg-[red] px-1 py-0 text-xs text-white">
                  {cartStatic?.length}
                </span>
              ) : null}
            </Link>
            {currentUser ? (
              <div className="group  relative">
                <p className=" cursor-pointer flex text-[#11263B]  hover:text-[#EE902F]">
                  <CircleUserRound className="font-medium text-[#11263B] hover:text-[#EE902F]" />{" "}
                  <ChevronDown className="font-medium text-[#11263B] hover:text-[#EE902F]" />
                </p>
                <ul className="absolute  top-10 max-lg:top-8 right-2  z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[160px] group-hover:opacity-100 group-hover:max-h-[700px] px-2 group-hover:pb-2  group-hover:pt-2 transition-all duration-500">
                  <li className="border-b py-3">
                    {/* profile */}
                    <div className="flex items-center gap-4 cursor-pointer hover:text-[#EE902F] hover:fill-[#EE902F] text-[#11263B] font-semibold text-[13px]">
                      <User size="18px" />
                      {currentUser.name} <br /> {currentUser.email}
                    </div>
                  </li>
                  {currentUser["role"] === "admin" ? (
                    <li className="border-b py-3">
                      {/* profile */}
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-4 cursor-pointer hover:text-[#EE902F] hover:fill-[#EE902F] text-[#11263B] font-semibold text-[13px]"
                      >
                        <LayoutDashboard size="18px" />
                        Dashboard
                      </Link>
                    </li>
                  ) : null}

                  {/* order */}
                  <li className="border-b py-3">
                    <Link
                      to={`/commande`}
                      className="flex items-center gap-4 cursor-pointer hover:text-[#EE902F] hover:fill-[#EE902F] text-[#11263B] font-semibold text-[13px]"
                    >
                      <Logs size="18px" />
                      Commande
                    </Link>
                  </li>

                  {/* logout */}

                  <li className="border-b py-3">
                    <p
                      onClick={() => {
                        handleLogout();
                      }}
                      className="flex items-center gap-4 cursor-pointer hover:text-[#EE902F] hover:fill-[#EE902F] text-[#11263B] font-semibold text-[13px]"
                    >
                      <LogOut size="17px" />
                      Déconnexion
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              // login
              <Link to="/login">
                <button className="px-2 py-2  rounded-full text-white border-[1px] font-medium border-gray-300 bg-[#EE902F] hover:bg-[#1B5085] transition duration-200 ease-in-out ">
                  Se connecter
                </button>
              </Link>
            )}
          </div>
        </section>
        <div className="overflow-hidden whitespace-nowrap w-full py-2 border-t border-b border-gray-300 bg-[#EE902F]">
          <div
            style={{ fontFamily: "georgia" }}
            className="animate-marquee text-lg text-gray-800"
          >
            <p className="inline-block-marquee">
              Bienvenue chez ISTASco - votre partenaire en équipements de
              protection individuelle depuis 2010 ! Qualité, sécurité, et
              service personnalisé : votre protection est notre priorité.
            </p>
            <p className="inline-block-marquee">
              Bienvenue chez ISTASco - votre partenaire en équipements de
              protection individuelle depuis 2010 ! Qualité, sécurité, et
              service personnalisé : votre protection est notre priorité.
            </p>
            <p className="inline-block-marquee">
              Bienvenue chez ISTASco - votre partenaire en équipements de
              protection individuelle depuis 2010 ! Qualité, sécurité, et
              service personnalisé : votre protection est notre priorité.
            </p>
            <p className="inline-block-marquee">
              Bienvenue chez ISTASco - votre partenaire en équipements de
              protection individuelle depuis 2010 ! Qualité, sécurité, et
              service personnalisé : votre protection est notre priorité.
            </p>
            <p className="inline-block-marquee">
              Bienvenue chez ISTASco - votre partenaire en équipements de
              protection individuelle depuis 2010 ! Qualité, sécurité, et
              service personnalisé : votre protection est notre priorité.
            </p>
            <p className="inline-block-marquee">
              Bienvenue chez ISTASco - votre partenaire en équipements de
              protection individuelle depuis 2010 ! Qualité, sécurité, et
              service personnalisé : votre protection est notre priorité.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center px-10 py-3 relative">
          <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
          >
            {/**botton nav hiden */}
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li
                onClick={() => {
                  setActiveNav(1);
                }}
                className="max-lg:border-b max-lg:px-3 max-lg:py-3"
              >
                <Link
                  to={"/"}
                  className="hover:text-[#007bff] text-gray-600 font-semibold block text-[15px]"
                  style={{ color: activeNav === 1 ? "#007bff" : null }}
                >
                  Accueil
                </Link>
              </li>

              <li
                onClick={() => {
                  setActiveNav(2);
                }}
                className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative"
              >
                <Link
                  onClick={() =>  {
                    dispatch(fetchProducts({ page: 1 }));
                    dispatch(addingIdCategoryFromNavbar(null));
                    dispatch(addingSearchingFromLandingPage(""));
                    dispatch(addingSearchingFromNavbar(""));
                  }}
                  to={"/produits"}
                  className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  style={{ color: activeNav === 2 ? "#007bff" : null }}
                >
                  Produits
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    className="ml-1 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                      data-name="16"
                      data-original="#000000"
                    />
                  </svg>
                </Link>
                <ul className="absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                  {categorys.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleProduitFromNavbar(category._id);
                      }}
                      className="border-b py-3"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <div
                        className="hover:text-[#007bff] hover:fill-[#007bff]  font-semibold text-[15px] block"
                        style={{
                          color: category._id === idCategory ? "#007bff" : "",
                        }}
                      >
                        {category.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>

              <li
                onClick={() => {
                  setActiveNav(3);
                }}
                className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative"
              >
                <Link
                  to={"/produits"}
                  className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  style={{ color: activeNav === 3 ? "#007bff" : null }}
                >
                  Secteurs d&apos;activité
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    className="ml-1 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                      data-name="16"
                      data-original="#000000"
                    />
                  </svg>
                </Link>
                <ul className="absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[380px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                  {[
                    { id: 1, name: "🏗 Bâtiment et Travaux Publics (BTP)" },
                    { id: 2, name: "🔬 Industrie Chimique et Laboratoires" },
                    { id: 3, name: "🩺 Secteur Médical et Santé" },
                    { id: 4, name: "🍽 Industrie Agroalimentaire" },
                    { id: 5, name: "🚚 Transport et logistique" },
                    { id: 6, name: "⚡  Énergie/Électricité/Nucléaire" },
                    { id: 7, name: "🧼 Services de nettoyage et désinfection" },
                    { id: 8, name: "🌾 Agriculture et élevage" },
                    { id: 9, name: "🛢️ Pétrole, gaz et mines" },
                    { id: 10, name: "🌳 Forêt et espaces verts" },
                  ].map((secteur, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleSearchingFromLandingPage(
                          secteur.name.substring(3)
                        );
                      }}
                      className="border-b py-3"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="hover:text-[#007bff] hover:fill-[#007bff] font-semibold text-[15px] block">
                        {secteur.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
              <li
                onClick={() => {
                  setActiveNav(4);
                }}
                className="max-lg:border-b max-lg:px-3 max-lg:py-3"
              >
                <Link
                  to={"/#about"}
                  className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  style={{ color: activeNav === 4 ? "#007bff" : null }}
                >
                  À propos de nous
                </Link>
              </li>
              <li
                onClick={() => {
                  setActiveNav(5);
                }}
                className="max-lg:border-b max-lg:px-3 max-lg:py-3"
              >
                <Link
                  to={"/#contact"}
                  className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  style={{ color: activeNav === 5 ? "#007bff" : null }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {menuOpen ? (
            <div
              id="collapseMenu"
              className="lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
            >
              {/**botton nav hiden */}
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
                id="toggleClose"
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 fill-black"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>

              <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
                <li className="max-lg:border-b max-lg:px-3 max-lg:py-3">
                  <Link to={"/"} className="shrink-0">
                    <img src={Logo} alt="logo" className="md:w-[170px] w-36" />
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setActiveNav(1);
                  }}
                  className="max-lg:border-b max-lg:px-3 max-lg:py-3"
                >
                  <Link
                    to={"/"}
                    className="hover:text-[#007bff] text-gray-600 font-semibold block text-[15px]"
                    style={{ color: activeNav === 1 ? "#007bff" : null }}
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    Accueil
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setActiveNav(2);
                  }}
                  className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative"
                >
                  <Link
                    to={"/produits"}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                    style={{ color: activeNav === 2 ? "#007bff" : null }}
                    onClick={() => {
                       {
                         dispatch(fetchProducts({ page: 1 }));
                         dispatch(addingIdCategoryFromNavbar(null));
                         dispatch(addingSearchingFromLandingPage(""));
                         dispatch(addingSearchingFromNavbar(""));
                       }
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    Produits
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                        data-name="16"
                        data-original="#000000"
                      />
                    </svg>
                  </Link>
                  <ul className="absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                    {categorys.map((category, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleProduitFromNavbar(category._id);
                          setMenuOpen(!menuOpen);
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                        className="border-b py-3"
                      >
                        <a
                          href="#"
                          className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                          style={{
                            color: category._id === idCategory ? "#007bff" : "",
                          }}
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  onClick={() => {
                    setActiveNav(3);
                    setMenuOpen(!menuOpen);
                  }}
                  className="group max-lg:border-b max-lg:px-3 max-lg:py-3 relative"
                >
                  <Link
                    to={"/produits"}
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                    style={{ color: activeNav === 3 ? "#007bff" : null }}
                  >
                    Secteurs d&apos;activité
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                        data-name="16"
                        data-original="#000000"
                      />
                    </svg>
                  </Link>
                  <ul className="absolute top-5 max-lg:top-8 left-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                    {[
                    { id: 1, name: "🏗 Bâtiment et Travaux Publics (BTP)" },
                    { id: 2, name: "🔬 Industrie Chimique et Laboratoires" },
                    { id: 3, name: "🩺 Secteur Médical et Santé" },
                    { id: 4, name: "🍽 Industrie Agroalimentaire" },
                    { id: 5, name: "🚚 Transport et logistique" },
                    { id: 6, name: "⚡  Énergie/Électricité/Nucléaire" },
                    { id: 7, name: "🧼 Services de nettoyage et désinfection" },
                    { id: 8, name: "🌾 Agriculture et élevage" },
                    { id: 9, name: "🛢️ Pétrole, gaz et mines" },
                    { id: 10, name: "🌳 Forêt et espaces verts" },
                    ].map((secteur, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleSearchingFromLandingPage(
                            secteur.name.substring(3)
                          );
                        }}
                        className="border-b py-3"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="hover:text-[#007bff] hover:fill-[#007bff] font-semibold text-[15px] block">
                          {secteur.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
                <li
                  onClick={() => {
                    setActiveNav(4);
                  }}
                  className="max-lg:border-b max-lg:px-3 max-lg:py-3"
                >
                  <Link
                    to={"/#about"}
                    className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block"
                    style={{ color: activeNav === 4 ? "#007bff" : null }}
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    À propos de nous
                  </Link>
                </li>
                <li
                  onClick={() => {
                    setActiveNav(5);
                  }}
                  className="max-lg:border-b max-lg:px-3 max-lg:py-3"
                >
                  <Link
                    to={"/#contact"}
                    onClick={() => {
                      setMenuOpen(!menuOpen);
                    }}
                    className="hover:text-[#007bff] text-gray-600 font-semibold text-[15px] block"
                    style={{ color: activeNav === 5 ? "#007bff" : null }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}

          <div
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
            className="flex ml-auto lg:hidden"
          >
            <button>
              <svg
                className="w-7 h-7"
                fill="#000"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {currentUser && currentUser?.isVerified === false ? (
          <div className="w-full mx-auto p-6 bg-red-50 border-2 border-red-300 rounded-lg text-center font-sans text-gray-800">
            <h2 className="text-red-600 text-lg font-bold">
              Vérification de l&apos;e-mail requise
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Votre adresse e-mail n&apos;a pas encore été confirmée. Veuillez
              consulter votre boîte de réception .
            </p>
          </div>
        ) : null}
      </header>
      <Outlet />
    </div>
  );
};

export default Navbar;

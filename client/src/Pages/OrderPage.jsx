import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileUser } from "../Redux/userAction";
import toast from "react-hot-toast";
import Footer from "../Components/Footer";
import { Navigate, useNavigate } from "react-router-dom";
import { createOrder } from "../Redux/orderAction";

const OrderPage = () => {
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile, isLoggedIn, loading } = useSelector(
    (state) => state.auth
  );
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProfileUser()); // Fetch user profile
    }
  }, [dispatch, isLoggedIn]);

  const validateForm = () => {
    const newErrors = {};
    if (!phone) newErrors.phone = "Phone is required";
    else if (phone.length < 8) newErrors.phone = "Phone is not valid";
    if (!company) newErrors.company = "Company is required";
    if (!address) newErrors.address = "Address is required";
    else if (address.length < 10) newErrors.address = "Address is not valid";
    if (!message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      for (const key in formErrors) {
        toast.error(formErrors[key]);
      }
    } else {
      if (cart && cart.length > 0) {
        // Calculate the total price
        const calculatedTotalPrice = cart.reduce((acc, current) => {
          return acc + current.produitId.price * current.quantity;
        }, 0);
        dispatch(
          createOrder({
            userId: userProfile._id,
            phone: phone,
            company: company,
            address: address,
            message: message,
            total_price: calculatedTotalPrice,
            items: cart,
          })
        );
        toast.success("Commande envoyée avec succès !");
        setAddress("");
        setCompany("");
        setMessage("");
        setPhone("");
        navigate("/");
      } else {
        toast.error("Aucun article dans le panier.");
      }
    }
  };

  // If loading or userProfile is not yet available, show a loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in or profile doesn't exist, redirect to register
  if (!isLoggedIn || !userProfile) {
    return <Navigate to="/register" />;
  }

  return (
    <div>
      <div className="font-[sans-serif]">
        <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-80">
          <img
            src="/hero.jpg"
            alt="Banner Image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="-mt-28 mb-6 px-4">
          <div className="mx-auto max-w-6xl shadow-lg p-8 relative bg-white rounded-md">
            <h2 className="text-xl text-gray-800 font-bold">
              Demande un devis
            </h2>

            {cart && cart?.items?.length === 0 ? (
              <p className="text-red-500 mt-4">Aucun article dans le panier.</p>
            ) : (
              <form className="mt-8 grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-800 text-sm block mb-2">
                    Votre Number Telephone
                  </label>
                  <input
                    type="text"
                    placeholder="phone No"
                    className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm block mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="company"
                    className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                    onChange={(e) => setCompany(e.target.value)}
                    value={company}
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm block mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="address"
                    className="w-full rounded-md py-2.5 px-4 border border-gray-300 text-sm outline-[#007bff]"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
                <div className="col-span-full">
                  <label className="text-gray-800 text-sm block mb-2">
                    Message
                  </label>
                  <textarea
                    placeholder="Message"
                    rows="6"
                    className="w-full rounded-md px-4 border border-gray-300 text-sm pt-3 outline-[#007bff]"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmitClick}
                  className="text-white w-100% bg-[#007bff] hover:bg-blue-600 tracking-wide rounded-md text-sm px-6 py-3 mt-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    fill="#fff"
                    className="mr-2 inline"
                    viewBox="0 0 548.244 548.244"
                  >
                    <path
                      fillRule="evenodd"
                      d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Envoyer un Demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;

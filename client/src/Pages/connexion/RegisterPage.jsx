import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../Redux/userAction";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [typePassword , setTypePassword]= useState("password");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/produits");
    }
  }, [isLoggedIn, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Nom requis";
    else if (name.length < 4)
      newErrors.name = "Le nom doit comporter au moins 4 caractères";
    if (!email) newErrors.email = "E-mail requis";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "L’adresse e-mail est invalide";
    if (!password) newErrors.password = "Mot de passe requis";
    else if (password.length < 6)
      newErrors.password =
        "Le mot de passe doit comporter au moins 6 caractères";
    if (!confirmationPassword)
      newErrors.confirmationPassword = "Confirmation du mot de passe requise";
    else if (confirmationPassword !== password)
      newErrors.confirmationPassword = "Les mots de passe ne correspondent pas";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
    Object.values(formErrors).forEach(error => toast.error(error));
    return;
  }

  try {
    const result = await dispatch(
      registerUser({
        name,
        email,
        password,
        password_confirmation: confirmationPassword,
      })
    );

    if (result.success === true) {
      toast.success(result.message);
      navigate("/");
    } else if (result.success === false) {
      toast.error(result.error);
    }
  } catch (error) {
    // سيتم التعامل مع الخطأ في Redux action
  }

  };

  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Nom</label>
              <input
                name="name"
                type="text"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Entrez votre nom" // Changed placeholder
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <input
                name="email"
                type="email"
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Mot de passe
              </label>
              <div className="relative flex items-center">
              <input
                name="password"
                type={typePassword}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={() => {
                    typePassword === "password"
                      ? setTypePassword("text")
                      : setTypePassword("password");
                  }}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Confirmez le mot de passe
              </label>
              <div className="relative flex items-center">
              <input
                name="confirmationPassword"
                type={typePassword}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                placeholder="Entrez le mot de passe de confirmation"
                value={confirmationPassword}
                onChange={(e) => setConfirmationPassword(e.target.value)}
              />
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={() => {
                    typePassword === "password"
                      ? setTypePassword("text")
                      : setTypePassword("password");
                  }}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="text-gray-800 ml-3 block text-sm"
              >
                J&apos;accepte les{" "}
                <a
                  href="#"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Termes et Conditions
                </a>
              </label>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Créer un compte
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Connectez-vous ici
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

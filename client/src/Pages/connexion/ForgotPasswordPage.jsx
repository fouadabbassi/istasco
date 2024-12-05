import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../../Apis/services/UserService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Veuillez entrer votre adresse email");
      return;
    }

    setIsLoading(true);
    try {
      const response = await forgotPassword({ email });
        toast.success(response.message);
        navigate("/login");
    } catch (error) {
      console.log(error);
        console.log(error?.message);
      toast.error(
        error?.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Mot de passe oublié
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading
                ? "Envoi en cours..."
                : "Envoyer le lien de réinitialisation"}
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyEmailService } from "../../Apis/services/UserService";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyEmailService(token);
          toast.success(response.message);
        navigate("/login");
      } catch (error) {
        navigate("/");
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Vérification de l&apos;email en cours...
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Veuillez patienter pendant que nous vérifions votre adresse e-mail.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

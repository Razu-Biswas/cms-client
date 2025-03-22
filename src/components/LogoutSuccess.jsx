import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
export default function LogoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center w-[90%] max-w-md">
        <img
          src={logo}
          alt="CyberCraft Bangladesh"
          className="mx-auto mb-4 w-24"
        />
        <h2 className="text-xl font-semibold text-gray-700">
          Thank you so much for your nice contribution for today.
        </h2>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate("/login")}
        >
          Go Back to Login
        </button>
      </div>
    </div>
  );
}

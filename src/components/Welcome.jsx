import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-blue-400  text-white p-4">
      <div className="text-center p-8 bg-gradient-to-r from-blue-400 to-blue-700   rounded-lg shadow-xl backdrop-blur-md max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">
          👋 Welcome to Our <span className="text-orange-400">CMS </span>{" "}
          Platform!
        </h1>
        <p className="text-lg mb-6">
          Your one-stop solution for managing tasks efficiently. Start exploring
          now!
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="px-6 py-3 bg-white bg-gradient-to-r font-bold from-blue-400 to-blue-600 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Welcome;

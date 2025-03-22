import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import logo from "../assets/logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!"); // Show error toast
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details

      toast.success(response.data.message || "Signup successful! 🎉"); // Show success toast

      setTimeout(() => {
        navigate("/dashboard"); // Redirect after a short delay
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row justify-center items-center h-screen bg-blue-100"
      style={{
        backgroundImage: "url(/background-image.jpg)",
        backgroundSize: "cover",
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="flex flex-col md:flex-row bg-white bg-opacity-50 rounded-lg shadow-lg w-11/12 md:w-3/4 overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 lg:w-1/2 p-8 bg-blue-200 flex flex-col justify-center items-center order-2 md:order-1">
          <img src={logo} alt="Signup" className="w-3/5" />
          <p className="text-center mt-4">
            Welcome to CyberCraft Bangladesh, where your creativity thrives!
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 lg:w-1/2 p-8 order-1 md:order-2 bg-blue-200">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create Account
          </h2>

          <form onSubmit={handleSubmit}>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Your full name"
              className="w-full p-2 border rounded mt-1"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label className="block text-gray-700 mt-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full p-2 border rounded mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="block text-gray-700 mt-2">
              Create a password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Must be 8 characters"
                className="w-full p-2 border rounded mt-1 pr-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label className="block text-gray-700 mt-2">Confirm password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Repeat password"
                className="w-full p-2 border rounded mt-1 pr-10"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="white"
                      d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 00-12 12h4z"
                    ></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../assets/logo.png";
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const navigate = useNavigate();

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/api/signup", {
//         fullName: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log(response);
//       setSuccess(response.data.message);
//       localStorage.setItem("token", response.data.token); // Store token
//       localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details

//       setSuccess(response.data.message);
//       setError("");

//       navigate("/");
//       window.location.reload();
//       // navigate("/"); // Redirect to home page
//     } catch (err) {
//       console.log(error);
//       setError(err.response?.data?.message);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col md:flex-row justify-center items-center h-screen bg-blue-100"
//       style={{
//         backgroundImage: "url(/background-image.jpg)",
//         backgroundSize: "cover",
//       }}
//     >
//       <div className="flex flex-col md:flex-row bg-white bg-opacity-50 rounded-lg shadow-lg w-11/12 md:w-3/4 overflow-hidden">
//         <div className="w-full md:w-1/2 lg:w-1/2 p-8 bg-blue-200 flex flex-col justify-center items-center order-2 md:order-1 md:order-none sm:order-2">
//           {/* <h2 className="text-3xl font-semibold text-center mb-4">
//             CyberCraft Bangladesh
//           </h2> */}
//           <img src={logo} alt="Signup" className="w-3/5" />
//           <p className="text-center mb-4">
//             Welcome back to CyberCraft Bangladesh, where your creativity thrives
//           </p>
//         </div>

//         <div className="w-full md:w-1/2 lg:w-1/2 p-8 order-1 md:order-2 sm:order-1 bg-blue-200">
//           <h2 className="text-2xl font-semibold text-center mb-4">
//             Create Account
//           </h2>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {success && <p className="text-green-500 text-center">{success}</p>}
//           <form onSubmit={handleSubmit}>
//             <label className="block text-gray-700">Full Name</label>
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Your full name"
//               className="w-full p-2 border rounded mt-1"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//             <label className="block text-gray-700 mt-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="example@gmail.com"
//               className="w-full p-2 border rounded mt-1"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <label className="block text-gray-700 mt-2">
//               Create a password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Must be 8 characters"
//                 className="w-full p-2 border rounded mt-1 pr-10"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={togglePasswordVisibility}
//                 className="absolute right-3 top-3"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <label className="block text-gray-700 mt-2">Confirm password</label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 placeholder="Repeat password"
//                 className="w-full p-2 border rounded mt-1 pr-10"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={toggleConfirmPasswordVisibility}
//                 className="absolute right-3 top-3"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
//             >
//               Create Account
//             </button>
//           </form>
//           <p className="text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-600">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

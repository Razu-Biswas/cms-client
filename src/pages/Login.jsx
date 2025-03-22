import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner

    try {
      const response = await axios.post(
        "https://cms-server-lemon.vercel.app/api/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const token = response.data.token;
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      toast.success("Login successful! Redirecting to dashboard...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message);
      toast.error(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-blue-500">
      <ToastContainer />
      <div className="flex flex-col md:flex-row  bg-gradient-to-r from-blue-400 to-blue-200 rounded-lg shadow-lg w-11/12 md:w-3/4 overflow-hidden">
        {/* Left Side (Logo & Info) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center ">
          <img src={logo} alt="Logo" />
          <p className="text-center mb-4">
            Welcome back to CyberCraft Bangladesh, where your creativity
            thrives.
          </p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Log in</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <label className="block text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full p-2 border rounded mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password Input */}
            <label className="block text-gray-700 mt-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center mt-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="mr-2"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button with Spinner */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Sign Up Option */}
          <div className="text-center mt-4">
            <p>
              Don’t have an account?
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:underline ml-1"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../assets/logo.png";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, type, checked, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log(response);
//       const token = response.data.token;
//       if (response.data) {
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//       }
//       if (formData.rememberMe) {
//         localStorage.setItem("token", token);
//       } else {
//         sessionStorage.setItem("token", token);
//       }
//       // Store token
//       setSuccess(response.data.message);

//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       setError(err.response?.data?.message);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gradient-to-b from-blue-200 to-blue-500">
//       <div className="flex flex-col md:flex-row bg-white bg-opacity-80 rounded-lg shadow-lg w-11/12 md:w-3/4 overflow-hidden">
//         {/* Left Side (Logo & Info) */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-blue-200">
//           <img src={logo} alt="" />
//           <p className="text-center mb-4">
//             Welcome back to CyberCraft Bangladesh, where your creativity thrives
//           </p>
//         </div>

//         {/* Right Side (Login Form) */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-2xl font-semibold text-center mb-4">Log in</h2>
//           {error && <p className="text-red-500 text-center">{error}</p>}
//           {success && <p className="text-green-500 text-center">{success}</p>}
//           <form onSubmit={handleSubmit}>
//             {/* Email Input */}
//             <label className="block text-gray-700">Email address</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Your email"
//               className="w-full p-2 border rounded mt-1"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             {/* Password Input */}
//             <label className="block text-gray-700 mt-2">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
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

//             {/* Remember Me & Forgot Password */}
//             <div className="flex justify-between items-center mt-3">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="rememberMe"
//                   checked={formData.rememberMe}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Remember me
//               </label>
//               <button
//                 type="button"
//                 className="text-blue-500 hover:underline"
//                 onClick={() => navigate("/forgot-password")}
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white p-2 rounded mt-4 hover:bg-blue-700"
//             >
//               Log in
//             </button>
//           </form>

//           {/* Sign Up Option */}
//           <div className="text-center mt-4">
//             <p>
//               Don’t have an account?
//               <button
//                 onClick={() => navigate("/signup")}
//                 className="text-blue-500 hover:underline ml-1"
//               >
//                 Sign up
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

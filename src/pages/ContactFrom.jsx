import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/contact",
        formData
      );

      toast.success(response.data.message || "Message sent successfully!");

      setFormData({ fullName: "", email: "", message: "" });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 p-4">
      <ToastContainer />
      <div className="max-w-5xl w-full bg-blue-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 p-8">
          <img src={logo} alt="CyberCraft Bangladesh" className="h-14 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Welcome back to CyberCraft Bangladesh,
          </h2>
          <p className="text-gray-600 mb-6">Where your creativity thrives</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your full name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@gmail.com"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write message"
                required
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md shadow-md hover:bg-blue-800 transition duration-300 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>

        {/* Right Section - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-blue-200 items-center justify-center p-6">
          <img src={logo} alt="Illustration" className="max-w-sm" />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

// import { useState } from "react";
// import axios from "axios";
// import logo from "../assets/logo.png";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess("");
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/contact",
//         formData
//       );
//       setSuccess(response.data.message || "Message sent successfully!");
//       setFormData({ fullName: "", email: "", message: "" });
//     } catch (err) {
//       setError("Failed to send message. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 p-4">
//       <div className="max-w-5xl w-full bg-blue-200 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
//         {/* Left Section - Form */}
//         <div className="w-full md:w-1/2 p-8">
//           <img src={logo} alt="CyberCraft Bangladesh" className="h-14 mb-4" />
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//             Welcome back to CyberCraft Bangladesh,
//           </h2>
//           <p className="text-gray-600 mb-6">Where your creativity thrives</p>

//           {success && (
//             <p className="mb-4 text-green-800 bg-green-100 p-3 rounded-md">
//               {success}
//             </p>
//           )}
//           {error && (
//             <p className="mb-4 text-red-600 bg-red-100 p-3 rounded-md">
//               {error}
//             </p>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Your full name"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="example@gmail.com"
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Write message"
//                 required
//                 rows="4"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-700 text-white py-3 rounded-md shadow-md hover:bg-blue-800 transition duration-300"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </form>
//         </div>

//         {/* Right Section - Illustration */}
//         <div className="hidden md:flex md:w-1/2 bg-blue-200 items-center justify-center p-6">
//           <img src={logo} alt="Illustration" className="max-w-sm" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

// import { useState } from "react";
// import axios from "axios";
// import logo from "../assets/logo.png";
// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     message: "",
//   });
//   console.log(formData);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitted Data:", formData);
//     setLoading(true);
//     setSuccess("");
//     setError("");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/contact",
//         formData
//       );
//       setSuccess(response.data.message);
//       setFormData({ fullName: "", email: "", message: "" });
//     } catch (err) {
//       setError("Failed to send message. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 p-4">
//       <div className="max-w-5xl w-full bg-blue-300 i rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
//         {/* Left Section - Form */}
//         <div className="w-full md:w-1/2 p-8">
//           <img src={logo} alt="CyberCraft Bangladesh" className="h-14 mb-4" />
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//             Welcome back to CyberCraft Bangladesh,
//           </h2>
//           <p className="text-gray-600 mb-6">Where your creativity thrives</p>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Your full name"
//                 name="fullName"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="example@gmail.com"
//                 required
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 font-medium mb-2">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 placeholder="Write message"
//                 required
//                 rows="4"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//               ></textarea>
//             </div>

//             <button className="w-full bg-blue-700 text-white py-3 rounded-md shadow-md hover:bg-blue-800 transition duration-300">
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Right Section - Illustration */}
//         <div className="hidden md:flex md:w-1/2 bg-blue-300 items-center justify-center p-6">
//           <img src={logo} alt="Illustration" className="max-w-sm" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

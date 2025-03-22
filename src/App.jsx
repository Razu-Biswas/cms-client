import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import LogoutSuccess from "./components/LogoutSuccess";
import EmployeeList from "./components/EmployeeList";
import DashboardLayout from "./pages/DashboardLayout";
import Settings from "./components/Settings";
import ContactsList from "./components/ContactsList";
import Welcome from "./components/Welcome";
import ContactForm from "./pages/ContactFrom";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/contact" element={<ContactForm />} />
      {/* <Route path="/contact" element={<ContactUs />} /> */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/logout-success" element={<LogoutSuccess />} />
      {/* <Route path="/dashboard" element={<EmployeeList />} /> */}

      {/* trail */}

      <Route
        path="/"
        element={<Navigate to="/dashboard/employees" replace />}
      />

      {/* Dashboard Route (Nested Pages) */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="employees" element={<EmployeeList />} />
        <Route path="contacts-list" element={<ContactsList />} />
        <Route path="settings" element={<Settings />} />
        {/* Default to employees when accessing "/dashboard" */}
        <Route index element={<Navigate to="employees" replace />} />
      </Route>
    </Routes>
  </Router>
);

export default App;

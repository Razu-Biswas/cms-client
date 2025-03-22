import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiTrash,
  FiCheckCircle,
} from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://cms-server-lemon.vercel.app/api/employees?page=${currentPage}&limit=${pageSize}&search=${search}&searchField=${searchField}`
      );
      const data = await response.json();
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
      setTotalEmployees(data.totalEmployees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, search, pageSize]);

  const deleteEmployee = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await fetch(`https://cms-server-lemon.vercel.app/api/employees/${id}`, {
          method: "DELETE",
        });
        setMessage("Employee deleted successfully!");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  // const downloadEmployeePDF = async (id) => {
  //   window.open(`http://localhost:5000/employees/${id}/download`, "_blank");
  //   setMessage("Employee PDF downloaded successfully!");
  // };

  const downloadEmployeePDF = (employee) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Details", 15, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["ID", employee.employeeId],
        ["Name", employee.name],
        ["Email", employee.email],
        ["Department", employee.department],
        ["Designation", employee.designation],
      ],
    });

    doc.save(`${employee.name}_Details.pdf`);
    toast?.success("PDF downloaded successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Employees</h2>

      {/* Success Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center space-x-2">
          <FiCheckCircle />
          <span>{message}</span>
          <button
            onClick={() => setMessage(null)}
            className="ml-auto text-gray-600"
          >
            ✖
          </button>
        </div>
      )}

      {/* Search & Filter Section */}
      <div className="flex flex-wrap justify-end items-center gap-3 mb-4">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="department">Department</option>
          <option value="designation">Designation</option>
        </select>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2 pl-8 text-sm"
          />
          <FiSearch className="absolute left-2 top-3 text-gray-500" size={16} />
        </div>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">No.</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Department</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee._id}
                  className="border-b hover:bg-gray-50 text-sm"
                >
                  <td className="p-3">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="p-3">{employee.name}</td>
                  <td className="p-3">{employee.email}</td>
                  <td className="p-3">{employee.department}</td>
                  <td className="p-3">{employee.designation}</td>
                  <td className="p-3 flex space-x-3">
                    <button
                      onClick={() => setSelectedEmployee(employee)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => downloadEmployeePDF(employee)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiDownload size={18} />
                    </button>

                    <button
                      onClick={() => deleteEmployee(employee._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination & Page Count Section */}
          <div className="flex justify-between items-center mt-4 p-3">
            <div className="text-sm text-gray-600">
              <strong>Total Employees:</strong> {totalEmployees}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-300 rounded-md p-1 text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-600">
                Showing {employees.length} of {totalEmployees}
              </span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                ◀ Prev
              </button>
              <span className="px-4 py-2 border rounded bg-gray-100">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next ▶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all scale-105">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedEmployee.name}
              </h3>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-500 hover:text-gray-800 transition duration-200"
              >
                ✖
              </button>
            </div>

            {/* Employee Info */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">📧 Email:</span>
                <span className="text-gray-800">{selectedEmployee.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">
                  🏢 Department:
                </span>
                <span className="text-gray-800">
                  {selectedEmployee.department}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">
                  🎓 Designation:
                </span>
                <span className="text-gray-800">
                  {selectedEmployee.designation}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;

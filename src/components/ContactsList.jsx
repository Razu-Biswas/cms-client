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

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalContacts, setTotalContacts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/contactsList?page=${currentPage}&limit=${pageSize}&search=${search}&searchField=${searchField}`
      );
      const data = await response.json();
      setContacts(data.contacts);
      setTotalPages(data.totalPages);
      setTotalContacts(data.totalContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [currentPage, search, pageSize]);

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this Contact?")) {
      try {
        await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: "DELETE",
        });
        setMessage("Contact deleted successfully!");
        fetchContacts();
      } catch (error) {
        console.error("Error deleting Contact:", error);
      }
    }
  };

  const downloadContactPDF = (contact) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Contact Details", 15, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["ID", contact.contactId],
        ["Name", contact.name],
        ["Email", contact.email],
        ["Message", contact.message],
      ],
    });

    doc.save(`${contact.name}_Details.pdf`);
    toast.success("PDF downloaded successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Contacts List</h2>

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
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr
                  key={contact._id}
                  className="border-b hover:bg-gray-50 text-sm"
                >
                  <td className="p-3">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="p-3">{contact.name}</td>
                  <td className="p-3">{contact.email}</td>
                  {/* <td className="p-3">{employee.department}</td>
                  <td className="p-3">{employee.designation}</td> */}
                  <td className="p-3 flex space-x-3">
                    <button
                      onClick={() => setSelectedContact(contact)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FiEye size={18} />
                    </button>
                    <button
                      onClick={() => downloadContactPDF(contact)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiDownload size={18} />
                    </button>

                    <button
                      onClick={() => deleteContact(contact._id)}
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
              <strong>Total Contacts:</strong> {totalContacts}
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
                Showing {contacts.length} of {totalContacts}
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

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md transform transition-all scale-105">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedContact.name}
              </h3>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-500 hover:text-gray-800 transition duration-200"
              >
                ✖
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">📧 Email:</span>
                <span className="text-gray-800">{selectedContact.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-600">🏢 Message:</span>
                <span className="text-gray-800">{selectedContact.message}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedContact(null)}
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

export default ContactsList;

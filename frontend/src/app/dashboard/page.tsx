"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getComplaints, submitComplaint, updateComplaintStatus, getProfile } from "@/services/api";

interface Complaint {
  id: number;
  title: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  roll_number: string;
  hostel_name: string;
  room_number: string;
  role: string;
}

export default function Dashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();
  
  const [showNewComplaintForm, setShowNewComplaintForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    category: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");
    
    if (!token) {
      router.push("/login");
      return;
    }

    setIsAdmin(userRole === "admin");

    const fetchData = async () => {
      setLoading(true);
      try {
        const [userProfile, userComplaints] = await Promise.all([
          getProfile(token),
          getComplaints(token),
        ]);
        setUser(userProfile);
        setComplaints(userComplaints);
        setFilteredComplaints(userComplaints);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "Failed to load data");
        // Token might be invalid
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          router.push("/login");
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  useEffect(() => {
    let result = complaints;
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(complaint => 
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(complaint => complaint.status === statusFilter);
    }
    
    setFilteredComplaints(result);
  }, [searchQuery, statusFilter, complaints]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const handleNewComplaintChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setFormLoading(true);
    try {
      const result = await submitComplaint(token, newComplaint);
      setComplaints([result, ...complaints]);
      setNewComplaint({
        category: "",
        title: "",
        description: "",
      });
      setShowNewComplaintForm(false);
    } catch (error: any) {
      console.error("Error submitting complaint:", error);
      setError(error.message || "Failed to submit complaint");
    } finally {
      setFormLoading(false);
    }
  };

  const handleStatusChange = async (complaintId: number, newStatus: string) => {
    const token = localStorage.getItem("token");
    if (!token || !isAdmin) return;

    try {
      await updateComplaintStatus(token, complaintId, newStatus);
      setComplaints(
        complaints.map((c) =>
          c.id === complaintId ? { ...c, status: newStatus } : c
        )
      );
    } catch (error: any) {
      console.error("Error updating status:", error);
      setError(error.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-gray-700 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <header className="bg-gray-800 shadow-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-400">Hostel Complaint Portal</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Hello, <span className="font-semibold text-indigo-300">{user?.name}</span></span>
            <button 
              onClick={handleLogout}
              className="bg-gray-700 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 animate-fadeIn">
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-semibold text-indigo-300 mb-2 md:mb-0">
                {isAdmin ? "Manage Complaints" : "My Complaints"}
              </h2>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search complaints..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-end">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a0aec0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                  appearance: 'none'
                }}
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </select>
              
              {!isAdmin && (
                <button
                  onClick={() => setShowNewComplaintForm(!showNewComplaintForm)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors transform hover:-translate-y-0.5"
                >
                  + New Complaint
                </button>
              )}
            </div>
          </div>

          {!isAdmin && showNewComplaintForm && (
            <div className="bg-gray-700 p-6 rounded-lg mb-6 border border-gray-600 animate-slideUp">
              <h3 className="text-lg font-semibold mb-4 text-indigo-300">Submit New Complaint</h3>
              <form onSubmit={handleSubmitComplaint}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                      name="category"
                      value={newComplaint.category}
                      onChange={handleNewComplaintChange}
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select Category</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newComplaint.title}
                      onChange={handleNewComplaintChange}
                      required
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Brief title for your complaint"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newComplaint.description}
                    onChange={handleNewComplaintChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Describe your issue in detail"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowNewComplaintForm(false)}
                    className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {formLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : "Submit Complaint"}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          <div>
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12 bg-gray-700/50 rounded-lg border border-dashed border-gray-600">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-gray-400">
                  {searchQuery || statusFilter !== 'all' ? 
                    "No complaints match your search criteria" : 
                    "No complaints found. Submit a new one to get started."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 shadow rounded-lg">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                      {isAdmin && <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="py-4 px-4">{complaint.title}</td>
                        <td className="py-4 px-4">{complaint.category}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              complaint.status === "Resolved"
                                ? "bg-green-100 text-green-800"
                                : complaint.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : complaint.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {new Date(complaint.created_at).toLocaleDateString()}
                        </td>
                        {isAdmin && (
                          <td className="py-4 px-4">
                            <select
                              value={complaint.status}
                              onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                              className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23a0aec0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.25rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.25em 1.25em',
                                paddingRight: '2rem',
                                appearance: 'none'
                              }}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
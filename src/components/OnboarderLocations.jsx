import { useState, useEffect } from "react";
import axios from "axios";
import { Lock, Unlock, MoveLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardedLocations() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
  const navigate = useNavigate();


  useEffect(() => {
    async function loadLocations() {
      try {
        const response = await axios.get(`${BASE_API_URL}/accounts/all-locations/`, {
          withCredentials: true  // This is the key line that sends cookies with the request
        });
        setLocations(response.data);
      } catch (err) {
        console.error("Error details:", err.response || err);  // Log more detailed error
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    }
    loadLocations();
  }, []);

  async function toggleLocationStatus(locationId, status) {
    try {
      const response = await axios.put(`${BASE_API_URL}/accounts/locations-change-status/${locationId}/${status}/`);
      const updatedLocation = response.data.location;
      setLocations((prevLocations) =>
        prevLocations.map((loc) =>
          loc.id === updatedLocation.id ? { ...loc, is_blocked: updatedLocation.is_blocked } : loc
        )
      );
    } catch (err) {
      setError("Failed to update location status");
    }
  }

  const filteredLocations = locations.filter((location) =>
    location.account_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 py-6 px-6">
          {/* <button onClick={() => navigate("/")} className="flex items-center text-white font-medium hover:text-indigo-200 transition mb-4">
            <MoveLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-white">Onboarded Locations</h1>
          <p className="text-indigo-100 mt-1">Manage your locations</p> */}

      <div className="bg-indigo-600 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Onboarded Locations</h1>
            <p className="text-indigo-100 mt-1">Manage locations</p>
          </div>
          <button
            onClick={() => navigate("/auth-flow")}
            className="bg-white text-indigo-600 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Add Location
          </button>
        </div>
          
          {/* Search Bar */}
          <div className="mt-4 flex items-center bg-white rounded-lg px-4 py-2 shadow-md">
            <Search className="text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 text-gray-800 focus:outline-none"
            />
          </div>
        </div>






        <div className="p-8">
          {loading ? (
            <p className="text-center text-gray-600">Loading locations...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : currentLocations.length === 0 ? (
            <p className="text-center text-gray-600">No locations found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {currentLocations.map((location) => (
                <li key={location.id} className="flex justify-between items-center py-4">
                  <span className="text-gray-800 font-medium">{location.account_name}</span>
                  <button
                    onClick={() => toggleLocationStatus(location.id, !location.is_blocked)}
                    className={`flex items-center gap-2 py-2 px-5 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out ${
                      location.is_blocked
                        ? "bg-red-600 text-white hover:bg-red-700 hover:scale-105"
                        : "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                    }`}
                  >
                    {location.is_blocked ? <Unlock size={16} /> : <Lock size={16} />}
                    {location.is_blocked ? "Unblock" : "Block"}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg shadow-sm hover:bg-indigo-100 disabled:opacity-50"
              >
                <ChevronLeft size={18} /> Prev
              </button>
              <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg shadow-sm hover:bg-indigo-100 disabled:opacity-50"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

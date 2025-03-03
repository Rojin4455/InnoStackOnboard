import { useState, useEffect } from "react";
import axios from "axios";
import { Lock, Unlock, ArrowLeftSquare, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function OnboardedLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_API_URL = process.env.REACT_APP_BASE_API_URL
  const navigate = useNavigate()

  useEffect(() => {
    async function loadLocations() {
      try {
        const data = await axios.get(`${BASE_API_URL}/accounts/all-locations/`)

        console.log("herererere")
        setLocations(data.data);
      } catch (err) {
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    }
    loadLocations();
  }, []);

    async function toggleLocationStatus(locationId, status) {
      try {
        const response = await axios.put(`${BASE_API_URL}/accounts/locations-change-status/${locationId}/${status}/`)
        const updatedLocation = response.data.location;
        console.log("Location status updated successfully");
    
        setLocations((prevLocations) => 
          prevLocations.map((loc) => 
            loc.id === updatedLocation.id ? { ...loc, is_blocked: updatedLocation.is_blocked } : loc
          )
        );

      } catch (err) {
        setError("Failed to load locations");
      } finally {
        setLoading(false);
      }
    }




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 py-6 px-6">

        <button 
    onClick={() => navigate("/")} 
    className="flex items-center text-white font-medium hover:text-indigo-200 transition mb-4"
  >
    <MoveLeft className="w-5 h-5 mr-2" />
    <span>Back</span>
  </button>
          <h1 className="text-2xl font-bold text-white">Onboarded Locations</h1>
          <p className="text-indigo-100 mt-1">Manage your locations</p>
        </div>

        <div className="p-8">
          {loading ? (
            <p className="text-center text-gray-600">Loading locations...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : locations.length === 0 ? (
            <p className="text-center text-gray-600">No locations onboarded yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {locations.map((location) => (
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
        </div>
      </div>
    </div>
  );
}

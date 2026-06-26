import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; 
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const { user } = useAuth(); 
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data);
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  // Extracts just the first word from the full name string
  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0];
  };

  // Capitalizes the first letter of any text string
  const capitalizeText = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {profile ? (
        <div className="space-y-2 mb-6">
          <p className="text-lg">Welcome, <span className="font-semibold">{getFirstName(profile.full_name)}</span></p>
          
          {/* Now dynamically capitalizes the role text */}
          <p>Role: {capitalizeText(profile.role)}</p>
          
          <p>Status: {profile.is_verified ? "✅ Verified" : "⏳ Pending Verification"}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
      
      <div className="flex flex-col gap-3 mt-6">
        <button
          onClick={() => navigate("/add-property")}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Property
        </button>

        <button
          onClick={() => navigate("/my-properties")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          My Properties
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  ); 
} 

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../lib/supabase";

export default function MyProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  async function fetchProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }

    setProperties(data);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Properties</h1>

      {properties.length === 0 ? (
        <p>You haven't added any properties yet.</p>
      ) : (
        properties.map((property) => (
          <div
            key={property.id}
            className="border rounded p-4 mb-4"
          >
            <h2 className="text-xl font-semibold">
              {property.title}
            </h2>

            <p>{property.city}</p>

            <p>₦{Number(property.price).toLocaleString()}</p>

            <p>
              {property.bedrooms} Bedroom(s) •{" "}
              {property.bathrooms} Bathroom(s)
            </p>

            <Link to={`/property/${property.id}`}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
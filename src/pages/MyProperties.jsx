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

  async function deleteProperty(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("properties")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setProperties((current) =>
      current.filter((property) => property.id !== id)
    );

    alert("Property deleted successfully!");
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

            <div className="flex gap-3 mt-3">
              <Link to={`/property/${property.id}`}>
                View
              </Link>

              <button onClick={() => deleteProperty(property.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
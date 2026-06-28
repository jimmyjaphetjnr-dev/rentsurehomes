import PropertyForm from "../components/property/PropertyForm";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../lib/supabase";

export default function AddProperty() {
  const { user } = useAuth();
  const navigate = useNavigate();

const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  console.log("Current User:", user);

  try {
      const { error } = await supabase
        .from("properties")
        .insert([
          {
            owner_id: user.id,
            title: formData.title,
            description: formData.description,
            price: formData.price,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            address: formData.address,
            city: formData.city,
          },
        ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Property created successfully!");

      navigate("/dashboard");
    } catch (err) {
  alert(err.message);
} finally {
  setLoading(false);
}
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
  Add Property
</h1>

<PropertyForm
  formData={formData}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  loading={loading}
  submitText="Create Property"
/>
    </div>
  );
}
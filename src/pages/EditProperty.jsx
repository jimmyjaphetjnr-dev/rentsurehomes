import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import PropertyForm from "../components/property/PropertyForm";

export default function EditProperty() {
  const { id } = useParams();
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

  useEffect(() => {
    fetchProperty();
  }, []);

  async function fetchProperty() {
    setLoading(true);

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setFormData({
      title: data.title || "",
      description: data.description || "",
      price: data.price || "",
      bedrooms: data.bedrooms || "",
      bathrooms: data.bathrooms || "",
      address: data.address || "",
      city: data.city || "",
    });

    setLoading(false);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);

  const { error } = await supabase
    .from("properties")
    .update({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      address: formData.address,
      city: formData.city,
    })
    .eq("id", id);

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Property updated successfully!");

  navigate("/my-properties");
}


  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Edit Property
      </h1>

      <PropertyForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        submitText="Save Changes"
      />
    </div>
  );
}
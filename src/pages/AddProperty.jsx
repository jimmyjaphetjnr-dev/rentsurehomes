import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../lib/supabase";

export default function AddProperty() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    bedrooms: 1,
    bathrooms: 1,
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
    }
  };

  return (
    <div>
      <h1>Add Property</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Property
        </button>
      </form>
    </div>
  );
}
import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "tenant",
  });

  // This function is now properly closed with })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // This function sits safely on its own now
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      if (error) {
  console.log("AUTH ERROR:", error);
  alert(JSON.stringify(error));
  return;
}

      const user = data.user;

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            full_name: formData.fullName,
            phone: formData.phone,
            role: formData.role,
          },
        ]);

      if (profileError) {
  console.log("PROFILE ERROR:", profileError);
  alert(JSON.stringify(profileError));
  return;
}

      alert("Account created successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="role"
          onChange={handleChange}
        >
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
          <option value="agent">Agent</option>
        </select>

        <br /><br />

        <button type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

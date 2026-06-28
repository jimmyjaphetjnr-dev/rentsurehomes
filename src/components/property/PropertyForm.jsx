import Button from "../ui/Button";

export default function PropertyForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  submitText,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        name="title"
        value={formData.title}
        placeholder="Property Title"
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        value={formData.description}
        placeholder="Description"
        onChange={handleChange}
        rows={4}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="price"
        value={formData.price}
        placeholder="Price"
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="bedrooms"
        value={formData.bedrooms}
        placeholder="Bedrooms"
        min="1"
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="bathrooms"
        value={formData.bathrooms}
        placeholder="Bathrooms"
        min="1"
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        placeholder="Address"
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        placeholder="City"
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : submitText}
      </Button>
    </form>
  );
}
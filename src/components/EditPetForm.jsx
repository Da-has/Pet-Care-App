import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function EditPetForm({ onUpdatePet }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    health: "",
    grooming: "",
    exercise: "",
    vaccination: "",
    image: "",
  });

  // ✅ Fetch pet data by ID
  useEffect(() => {
    fetch(`http://localhost:3001/pets/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() => toast.error("Failed to load pet data"));
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/pets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedPet) => {
        onUpdatePet(updatedPet);
        toast.success(`${updatedPet.name} updated successfully!`);
        navigate("/pets");
      })
      .catch(() => toast.error("Failed to update pet."));
  };

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h2>Edit Pet Details</h2>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label>Breed:</label>
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
      />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
      />

      <label>Health:</label>
      <textarea
        name="health"
        value={formData.health}
        onChange={handleChange}
      />

      <label>Grooming:</label>
      <textarea
        name="grooming"
        value={formData.grooming}
        onChange={handleChange}
      />

      <label>Exercise:</label>
      <textarea
        name="exercise"
        value={formData.exercise}
        onChange={handleChange}
      />

      <label>Vaccination:</label>
      <textarea
        name="vaccination"
        value={formData.vaccination}
        onChange={handleChange}
      />

      <label>Image URL:</label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Update Pet</button>
    </form>
  );
}

export default EditPetForm;

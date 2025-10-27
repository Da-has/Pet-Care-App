import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PetList from "./components/PetList";
import AddPetForm from "./components/AddPetForm";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [pets, setPets] = useState([]);

  // ✅ Fetch pets from db.json on mount
  useEffect(() => {
    fetch("http://localhost:3001/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  // ✅ Add new pet
  const handleAddPet = (newPet) => {
    fetch("http://localhost:3001/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    })
      .then((res) => res.json())
      .then((data) => {
        setPets([...pets, data]);
        toast.success(`${data.name} added successfully!`);
      })
      .catch(() => toast.error("Failed to add pet."));
  };

  // ✅ Delete pet
  const handleDeletePet = (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;

    fetch(`http://localhost:3001/pets/${id}`, { method: "DELETE" })
      .then(() => {
        setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
        toast.success("Pet deleted successfully!");
      })
      .catch(() => toast.error("Failed to delete pet."));
  };

  return (
    <Router>
      <Navbar />
      <Toaster />
      <div className="app-container">
        <Routes>
          {/* 🏠 Home Page */}
          <Route path="/" element={<Home />} />

          {/* 🐾 All Pets Page */}
          <Route
            path="/pets"
            element={<PetList pets={pets} onDelete={handleDeletePet} />}
          />

          {/* ➕ Add Pet Page */}
          <Route
            path="/add"
            element={<AddPetForm onAddPet={handleAddPet} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

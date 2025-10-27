import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PetList from "./components/PetList";
import AddPetForm from "./components/AddPetForm";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [pets, setPets] = useState([]);

  // Fetch pets from db.json
  useEffect(() => {
    fetch("http://localhost:3000/pets")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);

  // Add new pet
  const handleAddPet = (newPet) => {
    fetch("http://localhost:3000/pets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    })
      .then((res) => res.json())
      .then((data) => {
        setPets([...pets, data]);
        toast.success(`${data.name} added successfully!`);
      });
  };

  return (
    <Router>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<PetList pets={pets} />} />
        <Route path="/add" element={<AddPetForm onAddPet={handleAddPet} />} />
      </Routes>
    </Router>
  );
}

export default App;

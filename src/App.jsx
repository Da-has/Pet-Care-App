import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PetList from "./components/PetList";
import AddPetForm from "./components/AddPetForm";
import EditPetForm from "./components/EditPetForm";
import ReminderList from "./components/ReminderList";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [pets, setPets] = useState([]);
  const [reminders, setReminders] = useState([]); // 📅 NEW STATE

  // ✅ Fetch pets from db.json on mount
  useEffect(() => {
    fetch("http://localhost:3001/pets")
      .then((res) => res.json())
      .then((data) => setPets(data))
      .catch((error) => console.error("Error fetching pets:", error));
  }, []);

  // ✅ Fetch reminders (optional: if using db.json for reminders)
  useEffect(() => {
    fetch("http://localhost:3001/reminders")
      .then((res) => res.json())
      .then((data) => setReminders(data))
      .catch(() => console.log("No reminders data found (optional)."));
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

  // ✅ Update pet
  const handleUpdatePet = (updatedPet) => {
    fetch(`http://localhost:3001/pets/${updatedPet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPet),
    })
      .then((res) => res.json())
      .then((data) => {
        setPets((prevPets) =>
          prevPets.map((p) => (p.id === data.id ? data : p))
        );
        toast.success(`${data.name} updated successfully!`);
      })
      .catch(() => toast.error("Failed to update pet."));
  };

  // 📅 Add Reminder
  const handleAddReminder = (reminder) => {
    fetch("http://localhost:3001/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reminder),
    })
      .then((res) => res.json())
      .then((data) => {
        setReminders([...reminders, data]);
        toast.success("Reminder added!");
      })
      .catch(() => toast.error("Failed to add reminder."));
  };

  // ❌ Delete Reminder
  const handleDeleteReminder = (id) => {
    fetch(`http://localhost:3001/reminders/${id}`, { method: "DELETE" })
      .then(() => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
        toast.success("Reminder deleted!");
      })
      .catch(() => toast.error("Failed to delete reminder."));
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
          <Route path="/add" element={<AddPetForm onAddPet={handleAddPet} />} />

          {/* ✏️ Edit Pet Page */}
          <Route
            path="/pets/:id/edit"
            element={<EditPetForm onUpdatePet={handleUpdatePet} />}
          />

          {/* 📅 Reminders Page */}
          <Route
            path="/reminders"
            element={
              <ReminderList
                reminders={reminders}
                onAddReminder={handleAddReminder}
                onDeleteReminder={handleDeleteReminder}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

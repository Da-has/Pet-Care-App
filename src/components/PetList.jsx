import PetCard from "./PetCard";

function PetList({ pets, onDelete }) {
  return (
    <div className="pet-list">
      <h2>All Pets</h2>
      <div className="card-grid">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default PetList;

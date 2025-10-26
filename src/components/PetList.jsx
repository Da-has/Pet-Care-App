import PetCard from "./PetCard";

function PetList({ pets }) {
  return (
    <div className="pet-list">
      <h2>All Pets</h2>
      <div className="card-grid">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
}

export default PetList;

import { Link } from "react-router-dom";

function PetCard({ pet, onDelete }) {
  const {
    id,
    name,
    age,
    breed,
    health,
    grooming,
    exercise,
    vaccination,
    image,
  } = pet;

  return (
    <div className="pet-card">
      <img src={image} alt={name} width="200" />
      <h3>{name}</h3>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Breed:</strong> {breed}
      </p>
      <p>
        <strong>Health:</strong> {health}
      </p>
      <p>
        <strong>Grooming:</strong> {grooming}
      </p>
      <p>
        <strong>Exercise:</strong> {exercise}
      </p>
      <p>
        <strong>Vaccination:</strong> {vaccination}
      </p>
      <Link to={`/edit/${id}`}>
        <button className="btn-ghost">✏️ Edit</button>
      </Link>
      <button onClick={() => onDelete(id)} className="btn-ghost">
        🗑️ Delete
      </button>
    </div>
  );
}

export default PetCard;

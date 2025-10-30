import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar () {
    return (
      <nav className="navbar">
        <h2>Pet Care Tracker</h2>
        <div>
          <Link to="/">Home</Link> | <Link to="/pets">All Pets</Link> |{" "}
          <Link to="/add">Add Your Pet</Link> |
          <Link to="/reminders">Reminders</Link>
        </div>
      </nav>
    );
 }

 export default Navbar
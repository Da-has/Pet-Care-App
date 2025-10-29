import { useEffect, useState } from "react";
import FeatureCards from "./FeatureCards"; // ✅ new component

function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();

        const upcoming = data
          .filter((event) => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);

        setUpcomingEvents(upcoming);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="home">
      <div className="home-left">
        <h1>Pet Buddy App🐾</h1>
        <p>Track your pets' grooming, exercise, and health easily.</p>

        <section className="upcoming-reminders">
          <h2>📅 Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <ul>
              {upcomingEvents.map((event) => (
                <li key={event.id}>
                  <strong>{event.date}</strong> — {event.note}
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming events.</p>
          )}
        </section>
      </div>

      <div className="home-right">
        <FeatureCards />
      </div>
    </div>
  );
}

export default Home;

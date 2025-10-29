function FeatureCards() {
  const features = [
    {
      title: "🦮 Daily Exercise Tracking",
      description: "Monitor your pet’s walks and playtime to keep them active and healthy.",
    },
    {
      title: "💊 Health & Vaccination Logs",
      description: "Keep track of vet visits, medications, and vaccination schedules easily.",
    },
    {
      title: "✂️ Grooming Reminders",
      description: "Never miss a trim, bath, or grooming appointment again.",
    },
  ];

  return (
    <div className="feature-cards">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FeatureCards;

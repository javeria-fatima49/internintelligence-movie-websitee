export default function About() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-black mb-8">About MovieFlix</h1>
      <div className="max-w-3xl text-center">
        <p className="text-lg mb-6">
          Welcome to <span className="text-black font-semibold">MovieFlix</span>, your ultimate destination for everything 
          cinema. We are passionate about bringing you the latest and greatest in the world of movies.
        </p>
        <h2 className="text-2xl font-semibold text-black mb-4">Our Mission</h2>
        <p className="mb-6">
          Our mission is to provide movie enthusiasts with a comprehensive platform to discover, explore, and learn about films 
          from around the world. We strive to offer accurate, up-to-date information and engaging content that enhances your 
          movie-watching experience.
        </p>
        <h2 className="text-2xl font-semibold text-black mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 text-left mb-6">
          <li>Comprehensive movie database with detailed information</li>
          <li>Latest updates on upcoming releases</li>
          <li>Movie reviews and ratings</li>
          <li>User-friendly interface for easy navigation</li>
          <li>Personalized recommendations</li>
        </ul>
        <h2 className="text-2xl font-semibold text-black mb-4">Contact Us</h2>
        <p>
          Have questions or suggestions? We'd love to hear from you! Visit our contact page or reach out to us at 
          <span className="text-red-400">contact@movieflix.com</span>.
        </p>
      </div>
    </div>
  );
}

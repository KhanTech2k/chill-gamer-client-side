import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const UpcomingGames = () => {
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    fetch("https://chill-gamer-server-jet.vercel.app/upcomingGames")
      .then((res) => res.json())
      .then((data) => setUpcomingGames(data));
  }, []);

  return (
    <div className="w-full mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Releases</h2>

      {/* Marquee Section */}
      <Marquee pauseOnHover speed={50} gradient={false}>
        {upcomingGames.map((game) => (
          <div
            key={game.title}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mx-4"
            style={{ width: "250px" }}
          >
            <img
              src={game.image}
              alt={game.title}
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{game.title}</h3>
              <p className="text-sm text-gray-600 mt-2">Release Date: {game.releaseDate}</p>
              <p className="text-sm text-blue-600 font-medium mt-2">
                {Math.ceil(
                  (new Date(game.releaseDate) - new Date()) / (1000 * 60 * 60 * 24)
                )}{" "}
                days to go
              </p>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default UpcomingGames;

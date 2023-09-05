// Hooks
import { useEffect, useState } from "react";
// JSON
import showIds from "./tvShows.json"; // Import the JSON file
// Router
import { useNavigate } from "react-router-dom";
// Enviroment Variables
const { VITE_DB_API_BASE_URL: url, VITE_DB_API_KEY: apiKey } = import.meta.env;

const UpcomingEpisodes = () => {
  const [shows, setShows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEpisodesForAllShowIds();
  }, []);

  const fetchEpisodesForAllShowIds = async () => {
    const promises = showIds.map((id) =>
      fetch(`${url}/tv/${id}?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((details) => ({
          id,
          showName: details.name || details.original_name,
          nextEpisode: details.next_episode_to_air,
        }))
    );
    const allShowsWithUpcomingEpisodes = await Promise.all(promises);
    setShows(allShowsWithUpcomingEpisodes.filter((show) => show.nextEpisode));
  };
  const handleShowClick = (showId) => {
    navigate(`/tv/${showId}`);
  };

  const daysFromNow = new Date();
  daysFromNow.setDate(daysFromNow.getDate() * 10);

  const filteredShows = shows.filter((show) => {
    const episodeDate = new Date(show.nextEpisode.air_date);
    return episodeDate <= daysFromNow;
  });

  const groupedEpisodes = filteredShows.reduce((acc, show) => {
    const date = show.nextEpisode.air_date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(show);
    return acc;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedEpisodes).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className="text-white xl:ml-32 mt-16">
      {sortedDates.map((date) => (
        <div key={date} className="py-2 font-bold xl:ml-20">
          <h2>
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          {groupedEpisodes[date].map((show) => (
            <div key={show.nextEpisode.id} className="mt-2">
              <div
                className="font-bold text-2xl text-green-400 xl:ml-2"
                onClick={() => handleShowClick(show.id)}
              >
                - {show.showName} -{"\u00A0"}
                {show.nextEpisode.episode_number
                  ? `Episode ${show.nextEpisode.episode_number}`
                  : ""}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UpcomingEpisodes;

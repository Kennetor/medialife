import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const {
  VITE_DB_API_BASE_URL: url,
  VITE_DB_API_KEY: apiKey,
  VITE_DB_API_IMAGE: img,
} = import.meta.env;

const DetailedView = () => {
  const { mediaType, mediaId } = useParams();
  const [media, setMedia] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url}/${mediaType}/${mediaId}?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${mediaType}. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error(`Error fetching ${mediaType}:`, error);
      }
    };

    fetchData();
  }, [mediaId, mediaType]);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(
          `${url}/${mediaType}/${mediaId}/videos?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${mediaType} videos. Status: ${response.status}`
          );
        }
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setVideoKey(data.results[0].key);
        }
      } catch (error) {
        console.error(`Error fetching ${mediaType} videos:`, error);
      }
    };

    if (media) {
      fetchVideoDetails();
    }
  }, [media]);

  if (!media) return <div>Loading...</div>;

  const genreNames = media.genres.map((genre) => genre.name).join(", ");

  let newEp =
    media.next_episode_to_air && media.next_episode_to_air.name
      ? media.next_episode_to_air.episode_number
      : null;

  let lastSeason = media.seasons
    ? media.seasons[media.seasons.length - 1]
    : null;
  let airDate =
    media.next_episode_to_air && media.next_episode_to_air.air_date
      ? media.next_episode_to_air.air_date
      : null;
  return (
    <div className="px-4 py-8 xl:h-screen">
      <h1 className="text-3xl xl:text-4xl mb-2 text-center">
        {media.title || media.original_title || media.name}
      </h1>
      <div className="text-center mb-8">{media.tagline}</div>

      <div className="flex flex-direction-switch flex-wrap justify-between mb-8 items-start">
        <div className="w-full lg:w-[500px] mb-4 lg:mb-0">
          <img
            src={`${img}/w300${media.poster_path}`}
            className="rounded-xl w-full"
            alt={media.title}
          />{" "}
          <div className="hidden lg:block">
            <h1 className="mt-8">
              <h1>Status: {media.status}</h1>
              Release date:{" "}
              {new Date(
                media.release_date || media.first_air_date
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>
            {media.last_air_date && (
              <h1>
                Last Release date:{" "}
                {new Date(media.last_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h1>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[1300px]">
          <div className="flex justify-center lg:justify-start w-full h-[450px] lg:h-[750px] mb-8 relative">
            {videoKey ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src={`https://www.youtube.com/embed/${videoKey}`}
                allowFullScreen
              ></iframe>
            ) : (
              <p className="self-center">Video is not available</p>
            )}
          </div>
          <h1>Genre: {genreNames}</h1>
          {media.budget && <h1>Budget: ${media.budget.toLocaleString()}</h1>}
          <h1>Vote Average: {media.vote_average.toFixed(1)}</h1>
          {newEp && media.status !== "Ended" && (
            <h1>
              Next Release:{" "}
              {new Date(airDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              - Season {lastSeason ? lastSeason.season_number : "Unknown"}{" "}
              Episode {newEp} {""}
            </h1>
          )}

          <div className="lg:hidden mt-4">
            <h1>
              Release date:{" "}
              {new Date(
                media.release_date || media.first_air_date
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h1>
            {media.last_air_date && (
              <h1>
                Last Release date:{" "}
                {new Date(media.last_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h1>
            )}
            <h1>Status: {media.status}</h1>
          </div>
        </div>
      </div>

      <div>
        <p>{media.overview}</p>
      </div>
    </div>
  );
};

export default DetailedView;

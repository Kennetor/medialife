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
  //refactor this
  const genreNames = media.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="bg-slate-500 h-screen">
      <h1 className="text-4xl flex justify-center  py-2">
        {media.title || media.original_title || media.name}
      </h1>
      <div className="flex justify-center">{media.tagline}</div>
      <div className="xl:flex xl:items-center">
        <img
          src={`${img}/w300${media.poster_path}`}
          className="rounded-xl px-2 ml- py-0 m-auto"
          alt={media.title}
        />

        <div className="flex">
          {videoKey ? (
            <iframe
              className="absolute right-20 top-40"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoKey}`}
              allowFullScreen
            ></iframe>
          ) : (
            <p>Video is not available</p>
          )}
        </div>

        <div className="flex text-center xl:text-left translate-y-60">
          <p>{media.overview}</p>
        </div>
      </div>
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
      {media.budget && <h1>Budget: {media.budget.toLocaleString()}</h1>}
      <h1>Vote Average: {media.vote_average}</h1>
      <h1>Vote count: {media.vote_count}</h1>
      <div>
        <h1>Genre: {genreNames}</h1>
      </div>
    </div>
  );
};

export default DetailedView;

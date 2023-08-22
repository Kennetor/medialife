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
    fetchMediaDetails();
  }, [mediaId, mediaType]);

  useEffect(() => {
    if (media) {
      fetchVideoDetails();
    }
  }, [media]);

  const fetchMediaDetails = async () => {
    fetchData(
      `${url}/${mediaType}/${mediaId}?api_key=${apiKey}`,
      (data) => setMedia(data),
      `Error fetching ${mediaType}`
    );
  };

  const fetchVideoDetails = async () => {
    fetchData(
      `${url}/${mediaType}/${mediaId}/videos?api_key=${apiKey}`,
      (data) => {
        if (data.results && data.results.length > 0) {
          setVideoKey(data.results[0].key);
        }
      },
      `Error fetching ${mediaType} videos`
    );
  };

  const fetchData = async (endpoint, onSuccess, errorMessage) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`${errorMessage}. Status: ${response.status}`);
      }
      const data = await response.json();
      onSuccess(data);
    } catch (error) {
      console.error(errorMessage, error);
    }
  };

  if (!media) return <div>Loading...</div>;

  return (
    <div className="px-4 py-8 xl:h-screen">
      <Header media={media} />
      <MainContent media={media} videoKey={videoKey} />
      <MediaOverview media={media} />
    </div>
  );
};

const Header = ({ media }) => (
  <>
    <h1 className="text-3xl xl:text-4xl mb-2 text-center">
      {media.title || media.original_title || media.name}
    </h1>
    <div className="text-center mb-8">{media.tagline}</div>
  </>
);

const MainContent = ({ media, videoKey }) => (
  <div className="flex flex-direction-switch flex-wrap justify-between mb-8 items-start">
    <MediaImage media={media} />
    <VideoAndDetails media={media} videoKey={videoKey} />
  </div>
);

const MediaImage = ({ media }) => (
  <div className="w-full lg:w-[500px] mb-4 lg:mb-0">
    <img
      src={`${img}/w300${media.poster_path}`}
      className="rounded-xl w-full"
      alt={media.title}
    />
    <div className="hidden lg:block mt-8">
      <ReleaseDetails media={media} />
    </div>
  </div>
);

const VideoAndDetails = ({ media, videoKey }) => (
  <div className="w-full lg:w-1/2">
    <VideoFrame videoKey={videoKey} />
    <GenresAndRatings media={media} />
    <div className="lg:hidden mt-4">
      <ReleaseDetails media={media} />
    </div>
  </div>
);

const VideoFrame = ({ videoKey }) => (
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
);

const GenresAndRatings = ({ media }) => {
  const genreNames = media.genres.map((genre) => genre.name).join(", ");
  return (
    <>
      <h1>Genre: {genreNames}</h1>
      {media.budget && <h1>Budget: ${media.budget.toLocaleString()}</h1>}
      <h1>Vote Average: {media.vote_average.toFixed(1)}</h1>
      <NextRelease media={media} />
    </>
  );
};

const NextRelease = ({ media }) => {
  const newEp =
    media.next_episode_to_air && media.next_episode_to_air.name
      ? media.next_episode_to_air.episode_number
      : null;
  const lastSeason = media.seasons
    ? media.seasons[media.seasons.length - 1]
    : null;
  const airDate =
    media.next_episode_to_air && media.next_episode_to_air.air_date
      ? media.next_episode_to_air.air_date
      : null;

  return newEp && media.status !== "Ended" ? (
    <h1>
      Next Release:{" "}
      {new Date(airDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}{" "}
      - Season {lastSeason ? lastSeason.season_number : "Unknown"} Episode{" "}
      {newEp}
    </h1>
  ) : null;
};

const ReleaseDetails = ({ media }) => (
  <>
    <h1>Status: {media.status}</h1>
    <h1>
      Release date:{" "}
      {new Date(media.release_date || media.first_air_date).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )}
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
  </>
);

const MediaOverview = ({ media }) => (
  <div>
    <p>{media.overview}</p>
  </div>
);

export default DetailedView;

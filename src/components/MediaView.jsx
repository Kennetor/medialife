import { useNavigate } from "react-router-dom";

// Environment Variables
const { VITE_DB_API_IMAGE: img } = import.meta.env;

const MediaView = ({ media, mediaType }) => {
  const navigate = useNavigate();

  // Handle click to navigate to detailed view
  const handleMediaClick = () => {
    navigate(`/${mediaType}/${media.id}`);
  };

  // Helper function to get media title
  const getMediaTitle = () => {
    return mediaType === "movie" ? media.original_title : media.name;
  };

  return (
    <div
      className="flex xl:break-normal lg:break-all cursor-pointer"
      onClick={handleMediaClick}
      role="button"
      aria-label={`View details for ${getMediaTitle()}`}
      tabIndex={0}
    >
      <img
        src={`${img}/w154${media.poster_path}`}
        alt={getMediaTitle()}
        className="mr-2 rounded-lg"
      />
      <div className="m-auto text-center">
        <p className="lg:text-xl text-2xl text-white">{getMediaTitle()}</p>
        {media.tagline && (
          <p className="text-sm font-sans mt-2 text-gray-300">
            {media.tagline}
          </p>
        )}
      </div>
    </div>
  );
};

export default MediaView;

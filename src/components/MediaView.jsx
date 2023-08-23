// Router
import { useNavigate } from "react-router-dom";

// Enviroment Variables
const { VITE_DB_API_IMAGE: img } = import.meta.env;

const MediaView = ({ media, mediaType }) => {
  const navigate = useNavigate();

  // Props to use for data rendering
  const getMediaTitle = () => {
    return mediaType === "movie" ? media.original_title : media.name;
  };

  // React Router
  const handleMediaClick = () => {
    navigate(`/${mediaType}/${media.id}`);
  };

  return (
    <div className="flex items-center" onClick={handleMediaClick}>
      <img
        src={`${img}/w200${media.poster_path}`}
        alt={getMediaTitle()}
        className="mr-4 rounded-lg"
      />
      <div>
        <p className="text-2xl xl:text-3xl">{getMediaTitle()}</p>
      </div>
    </div>
  );
};

export default MediaView;

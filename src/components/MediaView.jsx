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
    <div className="flex xl:break-normal break-all" onClick={handleMediaClick}>
      <img
        src={`${img}/w154${media.poster_path}`}
        alt={getMediaTitle()}
        className="mr-2 rounded-lg"
      />
      <div className="m-auto text-center">
        <p className="lg:text-xl text-2xl text-white">{getMediaTitle()}</p>
        <p className="text-sm font-sans mt-2 text-gray-300">{media.tagline}</p>
      </div>
    </div>
  );
};

export default MediaView;

/* 
"backdrop_sizes": [
  "w300",
  "w780",
  "w1280",
  "original"
],
"logo_sizes": [
  "w45",
  "w92",
  "w154",
  "w185",
  "w300",
  "w500",
  "original"
],
"poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
"profile_sizes": [
  "w45",
  "w185",
  "h632",
  "original"
],
"still_sizes": [
  "w92",
  "w185",
  "w300",
  "original"
]
*/

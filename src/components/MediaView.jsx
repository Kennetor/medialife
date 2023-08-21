import { useNavigate } from "react-router-dom";

const { VITE_DB_API_IMAGE: img } = import.meta.env;

const MediaView = ({ media, mediaType }) => {
  const navigate = useNavigate();

  const getMediaTitle = () => {
    return mediaType === "movie" ? media.original_title : media.name;
  };

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

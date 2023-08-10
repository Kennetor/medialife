import { useNavigate } from "react-router-dom";

const { VITE_DB_API_IMAGE: img } = import.meta.env;

const MediaView = ({ media, mediaType }) => {
  const navigate = useNavigate();
  const title = mediaType === "movie" ? media.original_title : media.name;

  return (
    <div
      className="flex items-center"
      onClick={() => navigate(`/${mediaType}/${media.id}`)}
    >
      <img
        src={`${img}/w200${media.poster_path}`}
        alt={title}
        className="mr-4 rounded-lg"
      />
      <div>
        <p className="text-3xl">{title}</p>
        <p>{media.overview}</p>
      </div>
    </div>
  );
};

export default MediaView;

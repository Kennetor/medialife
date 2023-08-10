const { VITE_DB_API_IMAGE: img } = import.meta.env;

const MediaView = ({ media, mediaType }) => {
  const title = mediaType === "movie" ? media.original_title : media.name;

  return (
    <div className="flex mb-2 items-center">
      <img
        src={`${img}/w200${media.poster_path}`}
        alt={title}
        className="mr-4"
      />
      <div>
        <p className="text-3xl">{title}</p>
        <p>{media.overview}</p>
      </div>
    </div>
  );
};

export default MediaView;

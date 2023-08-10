import MediaType from "../components/MediaType";

import movies from "../components/movies.json";

const Movies = () => {
  return (
    <div>
      <h1 className="text-3xl text-blue-500">My Movies</h1>
      {movies.map((showId) => (
        <MediaType key={showId} mediaId={showId} mediaType="movie" />
      ))}
    </div>
  );
};

export default Movies;

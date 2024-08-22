// Components
import MediaType from "../components/MediaType";
// JSON
import movies from "../components/movies.json";

// Props for setting correct movie data
const MovieItem = ({ id }) => {
  // Assume that if `id` is missing or `MediaType` fails to load, it shows a loading state
  const isLoading = !id; // This is a simple check; you can enhance it based on actual loading conditions.

  // If loading, return null to hide the component
  if (isLoading) {
    return null;
  }

  return (
    <div className="py-2 flex-grow min-w-min max-w-full">
      <div className="rounded-lg bg-slate-700 cursor-pointer px-2 py-2 hover:bg-slate-600">
        <MediaType mediaId={id} mediaType="movie" />
      </div>
    </div>
  );
};

// Display movies array without shuffling
const Movies = () => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movieId) => (
          <MovieItem key={movieId} id={movieId} />
        ))}
      </div>
    </div>
  );
};

export default Movies;

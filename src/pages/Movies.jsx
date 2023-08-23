// Components
import MediaType from "../components/MediaType";
// JSON
import movies from "../components/movies.json";

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Props for setting correct movie data
const MovieItem = ({ id }) => (
  <div className="py-2">
    <div className="rounded-xl bg-slate-400 hover:cursor-pointer px-2 py-2 hover:bg-slate-300">
      <MediaType mediaId={id} mediaType="movie" />
    </div>
  </div>
);

// Shuffles the movies array using the Fisher-Yates algorithm
const Movies = () => {
  const moviesData = shuffleArray(movies);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moviesData.map((showId, i) => (
          <MovieItem key={i} id={showId} />
        ))}
      </div>
    </div>
  );
};

export default Movies;

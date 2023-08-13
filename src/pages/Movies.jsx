import MediaType from "../components/MediaType";
import movies from "../components/movies.json";

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Movies = () => {
  const moviesData = shuffleArray([...movies]);
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moviesData.map((showId, i) => (
          <div className="py-2" key={i}>
            <div className="rounded-xl bg-slate-400 hover:cursor-pointer px-2 py-2 hover:bg-slate-300">
              <MediaType key={showId} mediaId={showId} mediaType="movie" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;

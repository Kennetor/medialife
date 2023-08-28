// Components
import MediaType from "../components/MediaType";
// JSON
import tvShows from "../components/tvShows.json";

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

// Props for setting correct tv data
const TvShowItem = ({ id }) => (
  <div className="py-2 flex-grow min-w-min max-w-full">
    <div className="rounded-xl bg-slate-400 hover:cursor-pointer px-2 py-2 hover:bg-slate-300">
      <MediaType mediaId={id} mediaType="tv" />
    </div>
  </div>
);

// Shuffles the tvShows array using the Fisher-Yates algorithm
const Tv = () => {
  const tvData = shuffleArray(tvShows);

  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tvData.map((showId, i) => (
          <TvShowItem key={i} id={showId} />
        ))}
      </div>
    </div>
  );
};

export default Tv;

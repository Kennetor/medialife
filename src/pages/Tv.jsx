import MediaType from "../components/MediaType";
import tvShows from "../components/tvShows.json";

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const TvShowItem = ({ id }) => (
  <div className="py-2">
    <div className="rounded-xl bg-slate-400 hover:cursor-pointer px-2 py-2 hover:bg-slate-300">
      <MediaType mediaId={id} mediaType="tv" />
    </div>
  </div>
);

const Tv = () => {
  const tvData = shuffleArray(tvShows);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tvData.map((showId, i) => (
          <TvShowItem key={i} id={showId} />
        ))}
      </div>
    </div>
  );
};

export default Tv;

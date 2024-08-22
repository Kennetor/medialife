// Components
import MediaType from "../components/MediaType";
// JSON
import tvShows from "../components/tvShows.json";

// Props for setting correct tv data
const TvShowItem = ({ id }) => (
  <div className="py-2 flex-grow min-w-min max-w-full">
    <div className="rounded-lg bg-slate-700 hover:cursor-pointer px-2 py-2 hover:bg-slate-600">
      <MediaType mediaId={id} mediaType="tv" />
    </div>
  </div>
);

// Display tvShows array without shuffling
const Tv = () => {
  return (
    <div className="p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tvShows.map((showId) => (
          <TvShowItem key={showId} id={showId} />
        ))}
      </div>
    </div>
  );
};

export default Tv;

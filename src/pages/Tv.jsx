import MediaType from "../components/MediaType";

import tvShows from "../components/tvShows.json";

const Tv = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tvShows.map((showId, i) => (
          <div className="py-2" key={i}>
            <div className="rounded-xl bg-slate-400 hover:cursor-pointer px-2 py-2 hover:bg-slate-300">
              <MediaType key={showId} mediaId={showId} mediaType="tv" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tv;

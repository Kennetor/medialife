import MediaType from "../components/MediaType";

import tvShows from "../components/tvShows.json";

const Tv = () => {
  return (
    <div className="bg-slate-500">
      {tvShows.map((showId, i) => (
        <div className="py-2" key={i}>
          <div className="rounded-xl bg-slate-400 hover:cursor-pointer px-2 py-2 hover:bg-slate-300">
            <MediaType key={showId} mediaId={showId} mediaType="tv" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tv;

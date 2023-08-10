import MediaType from "../components/MediaType";

import tvShows from "../components/tvShows.json";

const Tv = () => {
  return (
    <div>
      <h1 className="text-3xl text-orange-500">My Tv Shows</h1>
      {tvShows.map((showId) => (
        <MediaType key={showId} mediaId={showId} mediaType="tv" />
      ))}
    </div>
  );
};

export default Tv;

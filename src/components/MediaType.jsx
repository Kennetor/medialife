import { useState, useEffect } from "react";
import MediaView from "./MediaView";

const { VITE_DB_API_BASE_URL: url, VITE_DB_API_KEY: apiKey } = import.meta.env;

function MediaType({ mediaId, mediaType }) {
  const [media, setMedia] = useState(null);

  useEffect(() => {
    fetch(`${url}/${mediaType}/${mediaId}?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${mediaType}. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        // console.log("MediaType media data:", data);
        setMedia(data);
      })
      .catch((error) => {
        console.error(`Error fetching ${mediaType}:`, error);
      });
  }, [mediaId, mediaType]);

  if (!media) return <div>Loading...</div>;

  return (
    <div>
      <MediaView media={media} mediaType={mediaType} />
    </div>
  );
}

export default MediaType;

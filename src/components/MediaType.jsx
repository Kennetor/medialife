// Hooks
import { useState, useEffect } from "react";
// Components
import MediaView from "./MediaView";

// Environment Variables
const { VITE_DB_API_BASE_URL: url, VITE_DB_API_KEY: apiKey } = import.meta.env;

function MediaType({ mediaId, mediaType }) {
  const [media, setMedia] = useState(null);

  // Data Fetching
  useEffect(() => {
    async function fetchMediaData() {
      try {
        const response = await fetch(
          `${url}/${mediaType}/${mediaId}?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${mediaType}. Status: ${response.status}`
          );
        }

        const data = await response.json();
        setMedia(data);
      } catch (error) {
        console.error(`Error fetching ${mediaType}:`, error);
      }
    }

    fetchMediaData();
  }, [mediaId, mediaType]);

  if (!media) return <div>Loading...</div>;

  return <MediaView media={media} mediaType={mediaType} />;
}

export default MediaType;

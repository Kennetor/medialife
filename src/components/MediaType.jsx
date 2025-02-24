import { useState, useEffect } from "react";
import MediaView from "./MediaView";

// Environment Variables
const { VITE_DB_API_BASE_URL: url, VITE_DB_API_KEY: apiKey } = import.meta.env;

function MediaType({ mediaId, mediaType }) {
  const [media, setMedia] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch media details
  useEffect(() => {
    const fetchMediaData = async () => {
      setIsLoading(true);
      setError(null);

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
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaData();
  }, [mediaId, mediaType, url, apiKey]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <MediaView media={media} mediaType={mediaType} />;
}

export default MediaType;

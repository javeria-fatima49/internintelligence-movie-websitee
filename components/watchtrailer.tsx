"use client"; 

import { Button } from "@/components/ui/button";

const WatchTrailer = ({ youtubeKey }: { youtubeKey: string }) => {
  const handleWatchTrailer = () => {
    if (youtubeKey) {
      window.open(`https://www.youtube.com/watch?v=${youtubeKey}`, "_blank");
    } else {
      alert("Trailer not available!");
    }
  };

  return (
    <Button size="lg" onClick={handleWatchTrailer}>
      Watch Trailer
    </Button>
  );
};

export default WatchTrailer;

import { useState } from "react";
import SideBar from "./SideBar";
import VideoPlayer from "./VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../services/videosApi";

function VideosList() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { data: videos, isLoading, isError } = useQuery({
    queryKey: ['videos'],   
    queryFn: fetchVideos  
  });
  if (isLoading) return <div className="text-center text-lg font-semibold text-blue-600">Loading videos...</div>;
  if (isError) return <div className="text-center text-lg text-red-600">Error fetching videos. Please try again later.</div>;

  return (
    <>
      <VideoPlayer videos={videos} selectedVideo={selectedVideo} />
      <SideBar videos={videos} setSelectedVideo={setSelectedVideo}  selectedVideo={selectedVideo}/>
    </>
  )
}

export default VideosList

const VideoPlayer = ({ selectedVideo, videos }) => {
  const videoToDisplay = selectedVideo || videos[0];
  return (
    <div className="w-3/4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl  text-gray-800 mb-4">{videoToDisplay.title}</h2>
      <span className="block h-px bg-gray-200 mb-4"></span>
      <video
        width="100%"
        controls
        src={videoToDisplay.video_url}
        type="video/mp4"
        preload="metadata"
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()} 
        className="rounded-lg"
      >
        Your browser does not support the video tag.
      </video>
      <p className="text-gray-800 text-2xl mt-4 mb-4">Описание</p>
      <span className="block h-px bg-gray-200"></span>
      <p className="text-gray-800 p-3">{videoToDisplay.description}</p>
    </div>
  );
};

export default VideoPlayer;
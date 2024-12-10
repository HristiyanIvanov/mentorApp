function SideBar({ videos, setSelectedVideo, selectedVideo }) {
  const videoToDisplay = selectedVideo || videos[0];
  return (
    <div className="w-1/4 bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-gray-800">Всички видеа</h2>
      <span className="block h-px bg-gray-200 mb-4"></span>
      <ul className="scrollbar max-h-96 overflow-auto text-gray-800">
        {videos.length > 0 ? (
          videos.map((video) => (
            <li
              onClick={() => setSelectedVideo(video)}
              key={video.id}
              className={`cursor-pointer py-4 px-4 rounded-lg mb-2 ${
                videoToDisplay.id === video.id
                ? "bg-blue-100 hover:bg-blue-200 transition-all first-letter:capitalize" // Highlight selected video
                : "hover:bg-gray-100" // Default hover effect for unselected
              }`}
              >
              {video.title}
            </li>
            
          ))
        ) : (
          <p className="text-gray-500">No videos available</p>
        )}
      </ul>
    </div>
  );
}

export default SideBar;

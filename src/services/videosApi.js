const fetchVideos = async () => {
  const response = await fetch('http://93.123.16.182/mentorship/get_videos.php');
  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }
  return response.json();
};

const deleteVideo = async (videoId) => {
  const response = await fetch('http://93.123.16.182/mentorship/delete_video.php', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ videoId }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete video');
  }
  return response.json();
};

const uploadVideo = async (formData) => {
  const response = await fetch('http://93.123.16.182/mentorship/upload_video.php', {
    method: 'POST',
    body: formData,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to upload video');
  }
  return responseData;
};


export { fetchVideos, deleteVideo, uploadVideo };
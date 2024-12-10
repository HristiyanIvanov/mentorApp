import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadVideo } from '../services/videosApi'; // Assuming this is a custom API call function

const VideoUpload = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('video', data.video[0]);
    const response = await uploadVideo(formData); 

    if (response.message) {
      setMessage(response.message);
    }
    setIsLoading(false);
    
  };

  return (
    <div className="bg-blue-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Upload Video</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-blue-700 mb-2">Заглавие</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium text-blue-700 mb-2">Описание</label>
          <textarea
            type="text"
            {...register('description', { required: 'Description is required' })}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium text-blue-700 mb-2">Видео</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            {...register('video', { required: 'Video file is required' })}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.video && <p className="text-red-600 text-sm">{errors.video.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Uploading...' : 'Upload Video'}
        </button>

        {message && <p className={`mt-4 text-lg ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default VideoUpload;

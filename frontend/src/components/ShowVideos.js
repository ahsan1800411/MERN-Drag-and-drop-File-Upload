import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import FileDownload from 'js-file-download';

const ShowVideos = () => {
  const [videos, setVideos] = useState([]);

  const listVideos = async () => {
    const { data } = await axios('http://localhost:8000/media/all');
    setVideos(data.media);
  };

  useEffect(() => {
    listVideos();
  }, [videos]);

  const downloadVideo = (e, name) => {
    e.preventDefault();
    axios({
      url: 'http://localhost:8000/media/download',
      method: 'POST',
      responseType: 'blob',
      data: {
        name,
      },
    }).then((res) => {
      FileDownload(res.data, name);
    });
  };

  return (
    <div className='w-full overflow-auto '>
      <table className='w-full mt-5 border border-gray-50'>
        <thead>
          <tr>
            <th className='text-center text-gray-500'>Name</th>
            <th className='text-center text-gray-500'>Size</th>
            <th className='text-center text-gray-500'>Last modified</th>
            <th className='text-center text-gray-500'></th>
            <th className='text-center text-gray-500'></th>
          </tr>
        </thead>
        <tbody>
          {videos?.map((video) => {
            return (
              <tr>
                <td className='tracking-wider text-center text-black '>
                  {video.name}
                </td>
                <td className='text-center text-gray-500 '>{video.size} MB</td>
                <td className='text-center text-gray-500 '>
                  {moment(video.updatedAt).format('MMM Do YY')}
                </td>
                <td>
                  <button
                    className='px-8 py-2 mt-4 mb-3 text-xs font-bold leading-tight text-center text-blue-900 uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded-full hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-0'
                    onClick={(e) => downloadVideo(e, video.name)}
                    type='submit'
                  >
                    Download
                  </button>
                </td>
                <td>
                  <button
                    type='button'
                    className='px-8 py-2 mt-4 mb-2 text-xs font-bold leading-tight text-center text-blue-900 uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded-full hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-0'
                  >
                    Choose
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowVideos;

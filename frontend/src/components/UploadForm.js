import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [name] = useState('');
  const [videos, setVideos] = useState([]);
  const [uploaded, setUploaded] = useState(null);
  const [length, setLength] = useState(null);

  // drag state
  const [dragActive, setDragActive] = React.useState(false);

  // ref
  const inputRef = React.useRef(null);

  // console.log(length);

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setVideos(e.dataTransfer.files);
      setLength(e.dataTransfer.files.length);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setVideos(e.target.files);
      var files = e.target.files;
      setLength(files.length);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append('videos', videos[key]);
    }

    formdata.append('name', name);

    axios
      .post(`http://localhost:8000/media/create`, formdata, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((success) => {
        setVideos([]);
        setLength(null);
      })
      .catch((error) => {
        // console.log();
        alert(error.response.data.msg);
        setVideos([]);
        setLength(null);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        id='form-file-upload'
        onDragEnter={handleDrag}
      >
        <div className='grid grid-cols-2 gap-8 mx-40 mt-10 bg-blue-900 h-[500px]'>
          <div>
            <h1 className='mt-4 text-lg font-bold tracking-wide text-center text-white'>
              Upload Your Files
            </h1>
            <h1 className='mt-2 tracking-wide text-center text-white'>
              It is a long established fact that a reader will be
            </h1>

            <span>
              <input
                type='file'
                title=' '
                name='videos'
                id='videos'
                multiple
                className='input-rm'
                accept='.mp4, .mkv'
                onChange={handleChange}
                ref={inputRef}
              />
              <label
                id='label-file-upload'
                htmlFor='input-file-upload'
                className={dragActive ? 'drag-active' : ''}
              >
                <div>
                  <p className='mt-2 tracking-wide text-center text-gray-300'>
                    Drag and drop your file here or
                  </p>
                  <button
                    className='mt-2 tracking-wide text-center text-gray-300 upload-button '
                    onClick={onButtonClick}
                  >
                    <span className='text-blue-500'>Browse</span> to upload
                  </button>
                </div>
              </label>
            </span>
            {length && (
              <button
                type='submit'
                className='px-8 py-2 mt-4 mb-2 text-xs font-bold leading-tight text-center text-white uppercase transition duration-150 ease-in-out border-2 border-blue-600 rounded-full hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-0'
              >
                Upload
              </button>
            )}
          </div>
          {dragActive && (
            <div
              id='drag-file-element'
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
          <div className='mr-16'>
            <div className='text-xl font-bold text-white mt-7'>
              {' '}
              {length && <div>{length} Files Selected</div>}
            </div>
            {uploaded === 100 || uploaded === null ? (
              <div></div>
            ) : (
              <div className='w-full bg-white rounded-full mt-60 dark:bg-gray-700'>
                <div
                  className='bg-blue-600 text-xs font-medium text-blue-100  p-0.5 leading-none rounded-full'
                  style={{ width: `${uploaded} %` }}
                >
                  {`${uploaded}`}%
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default UploadForm;

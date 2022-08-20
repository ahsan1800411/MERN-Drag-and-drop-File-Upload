import React from 'react';
import './App.css';
import ShowVideos from './components/ShowVideos';
import UploadForm from './components/UploadForm';

export default function App(props) {
  return (
    <>
      <UploadForm />
      <ShowVideos />
    </>
  );
}

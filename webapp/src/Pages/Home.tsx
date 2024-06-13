import React from 'react';
import PostGrid from '../UI/Post/PostGrid';
import MakePostComponent from '../UI/MakePostComponent';

const Home: React.FC = () => {
  return (
    <>
      <PostGrid></PostGrid>
    <MakePostComponent></MakePostComponent>
    </>

  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import PostGrid from '../UI/Post/PostGrid';
import { Post } from '../Lib/typeDefinition';
import MakePostComponent from '../UI/MakePostComponent';

const Home: React.FC = () => { //主界面
  return (
    <>
      <PostGrid></PostGrid>
    <MakePostComponent></MakePostComponent>
    </>

  );
};

export default Home;
import React, { useEffect, useState } from 'react';
import PostGrid from '../UI/Post/PostGrid';
import { GetAllPost } from '../Lib/lib';
import { Post } from '../Lib/typeDefinition';
import MakePostComponent from '../UI/MakePostComponent';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize,setpageSize] = useState<number>(20); // 每页显示的帖子数量

  useEffect(() => {
    const fetchPosts = async () => {
      const myALLPOSTS = await GetAllPost();
      setPosts(myALLPOSTS);
    };
    fetchPosts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowSizeChange = (current:number,pageSize:number) =>{
    setpageSize(pageSize);
  }


  return (
    <>
        <PostGrid
      posts={posts}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={handlePageChange}
      onShowSizeChange={handleShowSizeChange}
    />
    <MakePostComponent></MakePostComponent>
    </>

  );
};

export default Home;
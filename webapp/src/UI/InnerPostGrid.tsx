import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { ShareAndReplies, Reply } from "../Lib/typeDefinition";
import { GetUserDataById } from '../Lib/lib';
import { useState } from 'react';
//定义组件的属性类型
interface InnerPostGridProps {
    post: ShareAndReplies;//主贴和回复
    currentPage: number;//当前页码
    pageSize: number;//每页帖子数
    //下面两个是回调函数
    onPageChange: (page: number) => void;//处理分页
    onShowSizeChange: (current: number, pageSize: number) => void;//处理页面大小
}
//组件定义
const InnerPostGrid: React.FC<InnerPostGridProps> = ({ post, currentPage, pageSize, onPageChange, onShowSizeChange }) => {
    const startIndex = (currentPage - 1) * pageSize;
    const mainPost = post.share[0]
    const repliesInCurrentPage: Reply[] = post.replies.slice(startIndex, startIndex + pageSize)
    const [repliesWithUserData, setRepliesWithUserData] = useState<Reply[]>([]);


    useEffect(() => {
        const fetchUserData = async () => {
            const startIndex = (currentPage - 1) * pageSize;
            const repliesInCurrentPage: Reply[] = post.replies.slice(startIndex, startIndex + pageSize);

            const updatedReplies = await Promise.all(repliesInCurrentPage.map(async (reply) => {
                reply.UserData = await GetUserDataById(reply.UserId);
                return reply;
            }));

            setRepliesWithUserData(updatedReplies);
        };

        fetchUserData();
    }, [post.replies, currentPage, pageSize]);

    console.log(post)
    if(!mainPost)
        return <div>loading</div>
    else{
        const a = (c:number)=>{
            if (c===1){
                return(<Row key={-1}><Col span={24}>{mainPost.Content}</Col></Row>)
            }
        }
        return (
            <>
                {a(currentPage)}
                <hr/>
                {repliesInCurrentPage.map((reply, index) => {
                    console.log(reply)
                        return(             <Row key={index}>
                            <Col span={24}>
                                <p>{reply.Content}</p>
                                <p style={{ fontWeight: 'bold', color: 'red', border: '1px solid black' }}>{`${reply.UserData?.UserName}`}</p>
                            </Col>
                        </Row>)
           
    })}
            </>
        );
    }


};

export default InnerPostGrid;



import {useParams} from "react-router";
import React, { useEffect, useState } from 'react';
import MakeReplyComponent from "../UI/MakeReplyComponent";
import ReplyList from "../UI/Reply/ReplyList";

const PostPage: React.FC=() => {

    const params = useParams();//获取URL中参数
    let id: number
    let title:string

    //设定title，没有则为空
    if (params.title != undefined){
        title = params.title
    }else{
        title = ""
    }
    //设定id，没有则为空
    if (params.id != undefined){
        id=parseInt(params.id,10)
    }else{
        id=-1
    }
    localStorage.setItem("currentShareid",id.toString())
    //渲染组件
    return (
        <>
        {/* id，title（回复列表）， */}
        <ReplyList ShareId={id} Title={title}></ReplyList>
        {/* 创建回复 */}
        <MakeReplyComponent shareid={id}/> 
        </>
    );
};


export default PostPage;
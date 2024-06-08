import {useParams} from "react-router";
import React, { useEffect, useState } from 'react';
import MakeReplyComponent from "../UI/MakeReplyComponent";
import ReplyList from "../UI/Reply/ReplyList";

const PostPage: React.FC=() => {

    const params = useParams();
    let id: number


    if (params.id != undefined){
        id=parseInt(params.id,10)
    }else{
        id=-1
    }
    localStorage.setItem("currentShareid",id.toString())

    return (
        <>
        <ReplyList ShareId={id}></ReplyList>
        <MakeReplyComponent shareid={id}/>
        </>
    );
};


export default PostPage;
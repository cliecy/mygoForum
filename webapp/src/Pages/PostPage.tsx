import {useParams} from "react-router";
import React from 'react';
import MakeReplyComponent from "../UI/MakeReplyComponent";
import ReplyList from "../UI/Reply/ReplyList";

const PostPage: React.FC=() => {

    const params = useParams();
    let id: number
    let title:string


    if (params.title != undefined){
        title = params.title
    }else{
        title = ""
    }

    if (params.id != undefined){
        id=parseInt(params.id,10)
    }else{
        id=-1
    }
    localStorage.setItem("currentShareid",id.toString())

    return (
        <>
        <ReplyList ShareId={id} Title={title}></ReplyList>
        <MakeReplyComponent shareid={id}/>
        </>
    );
};


export default PostPage;
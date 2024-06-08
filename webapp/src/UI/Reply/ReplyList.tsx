import { ProList } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import urequest from "umi-request";
import {PostGet, ReplyGet} from "../../Lib/typeDefinition";
import {useEffect} from "react";
import axios from 'axios';

var PageShareId:number;


async function GetData(params = {} as Record<string, any>) {
    try {
        const response = await axios.get<{ data: ReplyGet[] }>(`http://localhost:8000/posts/${PageShareId}`, {
            params,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export type ReplyProps = {
    ShareId:number;
};

const ReplyList:React.FC<ReplyProps> = ({ShareId}) => {
    useEffect(() => {
        PageShareId = ShareId
    }, [ShareId]);
    return (
        <ProList<ReplyGet>
            search={{
                filterType: "light",
            }}
            rowKey="name"
            headerTitle="帖子"
            request={GetData}
            pagination={{
                pageSize: 5,
            }}
            showActions="hover"
            metas={{
                title: {
                    dataIndex: "AuthorName",
                    title: "用户",
                },
                avatar: {
                    dataIndex: "Avatar",
                    search: false,
                },
                description: {
                    dataIndex: "Content",
                    search: false,
                },
            }}
        />
    );
};

export default ReplyList;

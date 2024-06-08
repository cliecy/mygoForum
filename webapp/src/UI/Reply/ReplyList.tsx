import { ProList } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import urequest from "umi-request";
import {PostGet, ReplyGet} from "../../Lib/typeDefinition";
import {useEffect} from "react";

var PageShareId:number;

async function GetData(params = {} as Record<string, any>) {
    return urequest<{
        data: ReplyGet[];
    }>(`http://localhost:8000/posts/${PageShareId}`, {
        params,
    });
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
                    dataIndex: "",
                    title: "用户",
                },
                avatar: {
                    dataIndex: "avatar",
                    search: false,
                },
                description: {
                    dataIndex: "title",
                    search: false,
                },
                subTitle:{
                    dataIndex:"",
                    search:false,
                }
            }}
        />
    );
};

export default ReplyList;

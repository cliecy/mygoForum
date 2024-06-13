import { ProList } from "@ant-design/pro-components";
import mrequest from "umi-request";
import {PostGet, ReplyGet} from "../../Lib/typeDefinition";
import {useEffect} from "react";
import { ipAddress } from "../../App";

var PageShareId:number;


//获取reply信息，和post差不多
export async function GetReplyData(params = {} as Record<string, any>) {
    const Response = await mrequest<{ data: ReplyGet[] }>(
      `http://${ipAddress}:8000/posts/${PageShareId}`,
      {
        params,
      }
    );
    const pageSize:number = params.pageSize;
    const ResponseData = {
      data: Response.data,
      success: true,
      page: Math.ceil(Response.data.length/pageSize),
      total: Response.data.length,
    };
    console.log(ResponseData);
    return ResponseData;
  }
//格式
export type ReplyProps = {
    ShareId:number;
    Title:string;
};

const ReplyList:React.FC<ReplyProps> = ({ShareId,Title}) => {
    //useEffect 是一个 React 钩子，在组件渲染后执行。这里，当 ShareId 发生变化时，PageShareId 会被更新为新的 ShareId
    useEffect(() => {
        PageShareId = ShareId
    }, [ShareId]);
    return (
        //这部分和post差不多，不写了，你妈的
        <ProList<ReplyGet>
            search={{
                filterType: "light",
            }}
            rowKey="name"
            headerTitle= {Title}
            request={GetReplyData}
            pagination={{
                pageSize: 5,
            }}
            showActions="hover"
            
            metas={{
                subTitle: {
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

import { ProList } from "@ant-design/pro-components";
import mrequest from "umi-request";
import {PostGet, ReplyGet} from "../../Lib/typeDefinition";
import {useEffect} from "react";

var PageShareId:number;



export async function GetReplyData(params = {} as Record<string, any>) {
    const Response = await mrequest<{ data: ReplyGet[] }>(
      `http://127.0.0.1:8000/posts/${PageShareId}`,
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

export type ReplyProps = {
    ShareId:number;
    Title:string;
};

const ReplyList:React.FC<ReplyProps> = ({ShareId,Title}) => {
    useEffect(() => {
        PageShareId = ShareId
    }, [ShareId]);
    return (
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

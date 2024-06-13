import { ProList } from "@ant-design/pro-components";
import { PostGet, ReplyGet } from "../../Lib/typeDefinition";
import mrequest from "umi-request";
import { NavLink } from "react-router-dom";
import { ipAddress } from "../../App";

//规定时间格式
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric', // 使用 'numeric' 或 'long' 根据你的需要
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // 使用 24 小时制，如果想使用 12 小时制可设为 true
};

//获得帖子信息
export async function GetPostData(params = {} as Record<string, any>) {
  console.log("Get Data Once");
  console.log(params);
  const Response = await mrequest<{ data: PostGet[] }>(
    `http://${ipAddress}:8000/posts`,
    {
      params,
    }
  );
  //定义pagesize和response格式
  const pageSize: number = params.pageSize;
  const ResponseData = {
    data: Response.data,
    success: true,
    page: Math.ceil(Response.data.length / pageSize),
    total: Response.data.length,
  };
  console.log(ResponseData);
  return ResponseData;
}
const PostList = () => {
  return (
    //组件配置
    <ProList<PostGet>
      // 搜索栏
      search={{
        filterType: "light",
      }}
      rowKey="name"
      headerTitle="帖子"
      request={GetPostData}
      showActions="hover"
      //meta配置
      metas={{
        //配置标题
        title: {
          dataIndex: "Title",
          render: (_, row) => {
            return <NavLink to={`/PostPage/${row.ID}/${row.Title}`}>{row.Title}</NavLink>;
          },
        },
        //配置头像
        avatar: {
          dataIndex: "Avatar",
          search: false,
        },
        //配置描述
        description: {
          dataIndex: "Content",
          search: false,
        },
        //配置子标题
        subTitle: {
          dataIndex: "AuthorName",
          render: (_, row) => {
            return <>Author:{row.AuthorName},Date:{new Date(row.UpdatedTime).toLocaleString(undefined,options)}</>;
          },
          search: false,
        },
      }}
      pagination={{
        pageSize: 5, //每页5篇帖子
      }}
    />
  );
};

export default PostList;

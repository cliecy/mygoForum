import { ProList } from "@ant-design/pro-components";
import { PostGet, ReplyGet } from "../../Lib/typeDefinition";
import mrequest from "umi-request";
import { NavLink } from "react-router-dom";


const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric', // 使用 'numeric' 或 'long' 根据你的需要
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // 使用 24 小时制，如果想使用 12 小时制可设为 true
};


export async function GetPostData(params = {} as Record<string, any>) {
  console.log("Get Data Once");
  console.log(params);
  const Response = await mrequest<{ data: PostGet[] }>(
    "http://34.85.121.30:8000/posts",
    {
      params,
    }
  );
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
    <ProList<PostGet>
      search={{
        filterType: "light",
      }}
      rowKey="name"
      headerTitle="帖子"
      request={GetPostData}
      showActions="hover"
      metas={{
        title: {
          dataIndex: "Title",
          render: (_, row) => {
            return <NavLink to={`/PostPage/${row.ID}/${row.Title}`}>{row.Title}</NavLink>;
          },
        },
        avatar: {
          dataIndex: "Avatar",
          search: false,
        },
        description: {
          dataIndex: "Content",
          search: false,
        },
        subTitle: {
          dataIndex: "AuthorName",
          render: (_, row) => {
            return <>Author:{row.AuthorName},Date:{new Date(row.UpdatedTime).toLocaleString(undefined,options)}</>;
          },
          search: false,
        },
      }}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default PostList;

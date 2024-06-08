import { ProList } from "@ant-design/pro-components";
import { PostGet, ReplyGet } from "../../Lib/typeDefinition";
import mrequest from "umi-request";
import { NavLink } from "react-router-dom";

export async function GetPostData(params = {} as Record<string, any>) {
  console.log("Get Data Once");
  console.log(params);
  const Response = await mrequest<{ data: PostGet[] }>(
    "http://localhost:8000/posts",
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

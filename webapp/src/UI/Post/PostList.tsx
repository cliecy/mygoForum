import { ProList } from "@ant-design/pro-components";
import { PostGet, ReplyGet } from "../../Lib/typeDefinition";
import mrequest from "umi-request";

async function GetData(params = {} as Record<string, any>) {
  console.log("Get Data Once");
  console.log(params);
  const Response = await mrequest<{ data: PostGet[] }>(
    "http://localhost:8000/posts",
    {
      params,
    }
  );
  const ResponseData = {
    data: Response.data,
    success: true,
    page: 1,
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
      request={GetData}
      showActions="hover"
      metas={{
        title: {
          dataIndex: "Title",
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
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default PostList;

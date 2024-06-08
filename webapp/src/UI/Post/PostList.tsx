import { ProList } from "@ant-design/pro-components";
import { Button, Space, Tag } from "antd";
import urequest from "umi-request";
import { PostGet } from "../../Lib/typeDefinition";

async function GetData(params = {} as Record<string, any>) {
  return urequest<{
    data: PostGet[];
  }>("http://localhost:8000/posts", {
    params,
  });
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

export default PostList;

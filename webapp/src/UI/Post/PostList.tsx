import { ProList } from "@ant-design/pro-components";
import {PostGet, ReplyGet} from "../../Lib/typeDefinition";
import axios from "axios";

async function GetData(params = {} as Record<string, any>) {
  try {
    const response = await axios.get<{ data: PostGet[] }>(`http://localhost:8000/posts`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
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
    />
  );
};

export default PostList;

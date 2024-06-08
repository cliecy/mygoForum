import React from "react";
import { Button, Flex, Form, Input, Select } from "antd";
import storageUtils from "../Lib/storageUtils";
import { GetUserIdByUserName, MakePost } from "../Lib/lib";
export type PostFieldType = {
  content: string;
  title: string;
};


const mp = async (values: PostFieldType) => {
  let now = new Date()
  let userid:number;
  if(storageUtils.getUser()){
    // userid = await GetUserIdByUserName(storageUtils.getUserName())
    await MakePost(
      {AuthorId:1,Content:values.content,Title:values.title}
    )
      ;
  }
  else{
    console.log("LOGIN STATE ERROR")
    window.location.reload()
  }
};

const MakePostComponent = () => {
  const [form] = Form.useForm();
  if (storageUtils.getUser() == false) return <></>;
  return (
    <>
      <Form
        form={form}
        style={{ paddingBlock: 32 }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={mp}
      >
        <Form.Item<PostFieldType>
          name="title"
          label="title"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item<PostFieldType>
          name="content"
          label="content"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6 }}>
          <Flex gap="small">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button danger onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </>
  );
};

export default MakePostComponent;

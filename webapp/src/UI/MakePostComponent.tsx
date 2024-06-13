import React from "react";
import { Button, Flex, Form, Input, Select } from "antd";
import storageUtils from "../Lib/storageUtils";
import { GetUserIdByUserName, MakePost } from "../Lib/lib";
export type PostFieldType = {
  content: string;
  title: string;
};

//发帖业务逻辑，写前端的命的甚鸟名
const mp = async (values: PostFieldType) => {
  let now = new Date()//获取时间
  let userid:number = parseInt(storageUtils.getUserId(),10)//获取id
  //get到用户就发，get不到就error，然后重新加载页面
  if(storageUtils.getUser()){
    await MakePost(
      {AuthorId:userid,Content:values.content,Title:values.title}
    )
      ;
  }
  else{
    console.log("LOGIN STATE ERROR")
    window.location.reload()
  }
};
//发帖组件
const MakePostComponent = () => {
  const [form] = Form.useForm();
  if (storageUtils.getUser() == false) return <></>;
  return (
    <>
    {/* 格式 */}
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

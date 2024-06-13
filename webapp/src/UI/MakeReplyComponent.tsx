import React from "react";
import { Button, Flex, Form, Input, Select } from "antd";
import storageUtils from "../Lib/storageUtils";
import { GetUserIdByUserName, MakePost, MakeReply } from "../Lib/lib";
import { formatDatefordate } from "../Lib/lib";

export type PostFieldType = {
  content: string;
};
//写前端这b人我真是草了，reply也叫mp是吧，你妈的
//这里是处理回复的业务逻辑
const mp = async (values: PostFieldType) => {
  //这部分和post差不多
  let now = new Date()
  let userid:number = parseInt(storageUtils.getUserId(),10)
  if(storageUtils.getUser()){
    const shareid = localStorage.getItem("currentShareid")
    if(shareid){//帖子存在就能发回复，不能就报错
      await MakeReply(
        {AuthorId:userid,Content:values.content,PostId:parseInt(shareid,10),ReplyTo:undefined}
      )
    }
    else{
      console.log("not current shareid ,can't make reply")
    }
      ;
  }
  else{
    console.log("LOGIN STATE ERROR")
    window.location.reload()
  }
};
interface MakeReplyProps{
  shareid:number;
}
//和post差不多，不写了
const MakeReplyComponent :React.FC<MakeReplyProps>=({shareid}) => {
  const [form] = Form.useForm();
  if (!storageUtils.getUser()) return <></>;
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

export default MakeReplyComponent;

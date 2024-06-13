import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { LoginFunc } from '../Lib/lib';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import storageUtils from '../Lib/storageUtils';
//路由重定向
export const Redirect = ()=>{
    const Navigate = useNavigate()
    useEffect(()=>{Navigate("/")})
    return <></>
}
//给组件传输的参数，对应登录界面的输入框和是否记住
export type FieldType = {
    userName?: string;
    password?: string;
    remember?: boolean;
};
//登录成功则唤醒登陆函数
const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await LoginFunc(values)
};
//失败控制台打印错误信息
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = async (errorInfo) => {
    console.log('Failed:', errorInfo);
};
//登录页面
const Login: React.FC = () => (
    
    <Form
        name="basic"//名称
        labelCol={{ span: 8 }}//配置表单标签的布局（占8列宽度）
        wrapperCol={{ span: 16 }}//配置表单输入字段的布局（占16列宽度）
        style={{ maxWidth: 600 }}//设置表单的最大宽度
        initialValues={{ remember: true }}//设置表单字段的初始值（记住我复选框默认是选中的）。
        onFinish={onFinish}//表单提交成功
        onFinishFailed={onFinishFailed}//表单提交失败
        autoComplete="off"//禁用浏览器自动填充         
    >
        {/*用户名字段 */}
        {storageUtils.getUser() && <Redirect/>}{/* 登录成功（获取到用户）则重定向 */}
        <Form.Item<FieldType>//表单项之登录界面
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}//验证规则（必填和自定义）
        >
            <Input />
        </Form.Item>
        {/*密码字段*/}
        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>
        {/*Remember me 复选框*/}
        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {/* 提交按钮（也即登录） */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);
// Login模块作为默认导出
export default Login;
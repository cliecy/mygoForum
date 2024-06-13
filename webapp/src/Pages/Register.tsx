import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { FieldType } from './Login';
import { RegisterFunc } from '../Lib/lib';
import { Redirect } from './Login';
import storageUtils from '../Lib/storageUtils';
//给组件传输的参数
export type RegisterFieldType = {
    userName?: string;
    password?: string;
    remember?: boolean;
}
//成功唤醒登陆函数
const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await RegisterFunc(values)

};
//失败控制台打印失败信息
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
//和Login差不多，不写了 
const Register: React.FC = () => (
    <>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}//设置表单字段的初始值（记住我复选框默认是选中的）。
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        {storageUtils.getUser() && <Redirect/>}
        <Form.Item<FieldType>
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        {/* 密码确认 */}
        </Form.Item>
        <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            // 两个密码不一样就错误
            rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({//不一样则reject
                    validator(_, value) 
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password />
        </Form.Item>
        {/* 记住 */}
        <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {/* 提交 */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
    {}
    </>

);

export default Register;
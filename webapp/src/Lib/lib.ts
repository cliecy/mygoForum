import {
    Post,
    ShareAndReplies,
    HTTPStatus,
    Reply,
    MakeReplyType,
    User,
    GetUserType,
    PostRequest, ReplyRequest
} from './typeDefinition';
import axios from "axios";
import { FieldType } from "../Pages/Login";
import storageUtils from "./storageUtils";
import { RegisterFieldType } from "../Pages/Register";
import { ipAddress } from '../App';

//发post
export async function MakePost(post: PostRequest): Promise<HTTPStatus> {
    let statusNum: number = 0;
    try {//正常情况下干下面这一坨
        await axios.post(`http://${ipAddress}:8000/posts`, post) //向指定ip和端口发post
            .then(function (response) {//then用来处理成功的响应
                console.log(response);//控制台打印
                window.location.reload()//重新加载页面
                return { status: statusNum } 
            }).catch(function (error) {//catch到post中的错误
                console.log(error);//打印错误信息
                return { status: statusNum }
            });
        return { status: statusNum }//返回HTTPstatus
    } catch {//出问题了就返回error，但并非前后端通信问题
        console.log("ERRORS BUT NOT AXIOS ERROR")
        return { status: statusNum }//返回HTTPstatus
    }
}
//发回复
export async function MakeReply(reply: ReplyRequest): Promise<HTTPStatus> {
    let statusNum: number = 0;
    try {
        await axios.post(`http://${ipAddress}:8000/posts/${reply.PostId}`, reply)//向指定端口发post说明这条回复是回复的哪一条帖子
            .then(function (response) {
                console.log(response);
                window.location.reload()
                return { status: statusNum }
            }).catch(function (error) {
                console.log(error);
                return { status: statusNum }
            });
        return { status: statusNum }
    } catch {
        console.log("ERRORS BUT NOT AXIOS ERROR")
        return { status: statusNum }
    }
    return { status: statusNum }
}


//规定Response格式
interface MyResponse {
    data:{    UserName: string;
        PassWord: string;
        ID: number;}[];
    page:number;
    success:boolean;
    total:number
}
//登录
export async function LoginFunc(values: FieldType): Promise<HTTPStatus> {
    let statusNum: number = 0;
    let myresponse: MyResponse | undefined;
    //发送账号密码的post到后端，
    try {
        await axios.post(`http://${ipAddress}:8000/users/login`, { UserName: values.userName, PassWord: values.password }).then(function (response) {
            myresponse = response.data//没问题则登录成功
        }).catch(function (error) {//登录失败控制台打印error
            console.log(error);
        });

        if(myresponse !== undefined){//如果回复定义了，把这个人存到浏览器
            if (myresponse.data[0].UserName !== undefined && myresponse.data[0].PassWord !== undefined)//账户密码未定义
                {
                    console.log(myresponse)
                    storageUtils.saveUser({ UserName:  myresponse.data[0].UserName, PassWord: myresponse.data[0].PassWord ,UserId:myresponse.data[0].ID})
                }
       
                
    
            window.location.reload()
        }
        return { status: statusNum }
    }
    catch {
        console.log("ERRORS BUT NOT AXIOS ERROR")
        return { status: statusNum }
    }
}

// export async function RegisterFunc(values:)
//登出
export function Logout(): void {
    if (storageUtils.getUser())//如果获取到用户处于登录状态，则删除
        storageUtils.removeUser()
    else {
        console.log("already log out")
    }
    window.location.reload()
}
//格式化日期时间
export function formatDate(time: string | number) {
    if (time === null) {
        return ''
    } else {
        const date = new Date(time)
        const y = date.getFullYear()
        let m: string | number = date.getMonth() + 1
        m = m < 10 ? `0${String(m)}` : m
        let d: string | number = date.getDate()
        d = d < 10 ? `0${String(d)}` : d
        let h: string | number = date.getHours()
        h = h < 10 ? `0${String(h)}` : h
        let minute: string | number = date.getMinutes()
        minute = minute < 10 ? `0${String(minute)}` : minute
        let second: string | number = date.getSeconds()
        second = second < 10 ? `0${String(second)}` : second
        return `${String(y)}-${String(m)}-${String(d)}   ${String(h)}:${String(
            minute
        )}:${String(second)}`
    }
}
//格式化时间
export function formatDatefordate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
//通过名字获取id
export async function GetUserIdByUserName(userName: string): Promise<number> {
    let userId: number = 0;
    await axios.get(`http://${ipAddress}:8000/users/${userName}`).then(function (response) {//从后端获取用户名
        console.log(response.data)//打印用户名对应的id
        userId = response.data
    })

    return userId
}
//注册
export async function RegisterFunc(values: RegisterFieldType): Promise<HTTPStatus> {
    let statusNum: number = 0;
    let myresponse: MyResponse | undefined;
    try {
        await axios.post(`http://${ipAddress}:8000/users/register`, { //向后端发送注册post
            UserName: values.userName,PassWord: values.password
        }).then(function (response) {//打印response并获取status
            myresponse = response.data
            console.log(response);
            statusNum = response.status;
        }).catch(function (error) {//error则打印
            console.log(error);
        });
        console.log(myresponse)//打印response
        if(myresponse !== undefined){//回复若不为空则登录成功
                console.log("Register and Login SUCCESS")
                if (myresponse.data[0].UserName !== undefined && myresponse.data[0].PassWord !== undefined)
                    {//保存至浏览器
                        storageUtils.saveUser({ UserName: myresponse.data[0].UserName, PassWord: myresponse.data[0].PassWord ,UserId:myresponse?.data[0].ID})
                    }
                window.location.reload()
                return { status: statusNum }
            

        }
        else{
            return {status: 0}
        }


    }
    catch(e) {//catch到error就打印错误
        console.log(e)
        console.log("ERRORS BUT NOT AXIOS ERROR")
        return { status: statusNum }
    }
}
//通过id获取用户信息
export async function GetUserDataById(userId: number): Promise<GetUserType> {
    //初始化用户类
    let result: GetUserType = {
        UserId: -1,
        LastLogintime: "",
        UserName: "",
        gender: "",
        motto: "",
        numofShares: -1
    }

    if (userId === 0) 
        return result
    await axios.get(`http://${ipAddress}:8000/user/${userId}`).then(function (response) {//get来自后端的response并返回
        console.log(response.data)
        result = response.data
    })

    return result
}
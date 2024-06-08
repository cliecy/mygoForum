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

export async function MakePost(post: PostRequest): Promise<HTTPStatus> {
    let statusNum: number = 0;
    try {
        await axios.post("http://127.0.0.1:8000/posts", post)
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
}
export async function MakeReply(reply: ReplyRequest): Promise<HTTPStatus> {
    let statusNum: number = 0;
    try {
        await axios.post(`http://127.0.0.1:8000/posts/${reply.PostId}`, reply)
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



interface MyResponse {
    data:{    UserName: string;
        PassWord: string;
        ID: number;}[];
    page:number;
    success:boolean;
    total:number
}

export async function LoginFunc(values: FieldType): Promise<HTTPStatus> {
    let statusNum: number = 0;
    let myresponse: MyResponse | undefined;

    try {
        await axios.post('http://127.0.0.1:8000/users/login', { UserName: values.userName, PassWord: values.password }).then(function (response) {
            myresponse = response.data
        }).catch(function (error) {
            console.log(error);
        });

        if(myresponse !== undefined){
            if (myresponse.data[0].UserName !== undefined && myresponse.data[0].PassWord !== undefined)
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

export function Logout(): void {
    if (storageUtils.getUser())
        storageUtils.removeUser()
    else {
        console.log("already log out")
    }
    window.location.reload()
}

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

export function formatDatefordate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export async function GetUserIdByUserName(userName: string): Promise<number> {
    let userId: number = 0;
    await axios.get(`http://127.0.0.1:8000/users/${userName}`).then(function (response) {
        console.log(response.data)
        userId = response.data
    })

    return userId
}

export async function RegisterFunc(values: RegisterFieldType): Promise<HTTPStatus> {
    let statusNum: number = 0;
    const now = new Date();
    let myresponse: MyResponse | undefined;
    try {
        await axios.post('http://127.0.0.1:8000/users', {
            UserName: values.userName, motto: "LEO is really excellent", LastLogintime: formatDatefordate(now)
            , gender: "Male", password: values.password, numofShares: 0
        }).then(function (response) {
            myresponse = response.data.data
            console.log(response);
            statusNum = response.status;
        }).catch(function (error) {
            console.log(error);
        });
        
        if(myresponse !== undefined){
            if (statusNum === 200) {
                console.log("Register and Login SUCCESS")
                if (myresponse.data[0].UserName !== undefined && myresponse.data[0].PassWord !== undefined)
                    if (values.remember === true) {
                        console.log(values)
                        storageUtils.saveUser({ UserName: myresponse.data[0].UserName, PassWord: myresponse.data[0].PassWord ,UserId:myresponse?.data[0].ID})
                    }
                window.location.reload()
                return { status: statusNum }
            }
            else {
                console.log("Register Error")
                return { status: statusNum }
            }
        }
        else{
            return {status: 0}
        }


    }
    catch {
        console.log("ERRORS BUT NOT AXIOS ERROR")
        return { status: statusNum }
    }
}

export async function GetUserDataById(userId: number): Promise<GetUserType> {

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
    await axios.get(`http://127.0.0.1:8000/user/${userId}`).then(function (response) {
        console.log(response.data)
        result = response.data
    })

    return result
}
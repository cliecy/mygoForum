export interface Post {
    ShareId: number | undefined;
    UserId: number;
    Content: string;
    Title: string;
    PostTime: string;
    IsLocked: boolean;
    UserData: GetUserType | undefined;
}



export interface ReplyGet {
    ID: number;
    CreatedTime: string;
    UpdatedTime: string;
    PostId: number;
    AuthorId: number;
    AuthorName: string;
    Gender: string;
    Motto: string;
    LastLoginTime: string;
    Avatar: string;
    NumOfPosts: number;
    UserClass: number;
    Content: string;
    Floor: number;
    ReplyTo: number;
}

export interface ReplyRequest {
    PostId: number
    AuthorId: number;
    Content: string;
    ReplyTo: number |undefined;
}


export interface PostGet {
    ID: number;
    CreatedTime: string;
    UpdatedTime: string;
    Title: string;
    AuthorId: number;
    AuthorName: string;
    Gender: string;
    Motto: string;
    LastLoginTime: string;
    Avatar: string;
    NumOfPosts: number;
    UserClass: number;
    Content: string;
    Floor: number;
    IsLocked: string;
}

export interface PostRequest {
    Title: string;
    AuthorId: number;
    Content: string;
}
export interface Reply {
    Content: string;
    Floor: number;
    PostTime: string;
    ReplyId: number;
    ReplyTo: number;
    ShareId: number;
    UserId: number;
    UserData: GetUserType | undefined;
}

export interface MakeReplyType {
    Content: string;
    PostTime: string;
    ShareId: number;
    UserId: number;
}

export enum gender {
    male = 'male',
    female = 'female',
}

export enum userclass {
    Admin = 'admin',
    Normal = "Normal"
}

export interface User {
    name: string;
    userid: string;
    userclass: userclass;
    gender: gender;
    lastlogintime: Date;
}

export interface GetUserType {
    UserId: number,
    LastLogintime: string;
    UserName: string;
    gender: string;
    motto: string;
    numofShares: number;
}

export interface ShareAndReplies {
    share: Post[];
    replies: Reply[];
}

export interface HTTPStatus {
    status: number;
}
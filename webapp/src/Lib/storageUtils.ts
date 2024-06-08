// ! 本模块主要是进行local数据存储

export interface LoginUser{
    UserName:string;
    PassWord:string;
    UserId:number;
}


export default {
    // 保存用户
    saveUser(user:LoginUser) {
        localStorage.setItem("username",user.UserName);
        localStorage.setItem("password",user.PassWord)
        localStorage.setItem("UserId",user.UserId.toString())
    },

    // 读取用户
    getUser():boolean {
        const result = localStorage.getItem("username")
        if(result!=null && result!=""){
            // console.log(`username:${result}`)
            return true
        }else{
            return false
        }
    },
    getUserName():string{
        const result = localStorage.getItem("username")

        if(result){
            return result
        }
        else{
            return "ERROR"
        }
    },
    getUserId():string{
        const result = localStorage.getItem("UserId")

        if(result){
            return result
        }
        else{
            return "ERROR"
        }
    },

    // 删除用户
    removeUser():void {
        localStorage.setItem("username","")
        localStorage.setItem("password","")
        localStorage.setItem("UserId","")
    }
}

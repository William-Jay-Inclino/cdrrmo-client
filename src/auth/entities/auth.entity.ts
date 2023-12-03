
export interface IAuthUser{
    id: string,
    user_name: string,
    user_level: string
}


export interface IAuth{
    user: IAuthUser
    access_token: string
}
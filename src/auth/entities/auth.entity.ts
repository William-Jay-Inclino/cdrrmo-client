import { UserLevelEnum } from "../../user"

export interface IAuthUser{
    id: string,
    user_name: string,
    user_level: UserLevelEnum
}


export interface IAuth{
    user: IAuthUser
    access_token: string
}
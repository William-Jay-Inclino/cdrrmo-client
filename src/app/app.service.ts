import { IUser } from "@/user"

class AppService{

    private authUser = {} as IUser

    init(){
        console.log('class App init()')
    }

    getAuthUser(){
        return this.authUser
    }


}

export const appService = new AppService()
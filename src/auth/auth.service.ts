
import { IAuth } from "."
import { config } from "../config";
import { UserLevelEnum } from "../user";

class AuthService{

    private endpoint = '/auth/'
    private service = 'AuthService: '
    isTokenExpiredNotificationShown = false // use for displaying only 1 expired notif

    async login(payload: {username: string, password: string}): Promise<IAuth | null>{

        console.log(this.service + 'login()', payload)

		try {
			const response = await config.api.post(this.endpoint + 'login', payload);
			console.log({response})
            if(response.status === 201){
                this.isTokenExpiredNotificationShown = false 
                
                localStorage.setItem('auth', JSON.stringify(response.data));
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null
    }

    async updatePassword(id: string, password: string): Promise<boolean> {

        console.log(this.service + 'updatePassword()', password)

		try {
			const response = await config.api.patch(this.endpoint + 'update-password/' + id, {password});
			console.log({response})
            if(response.status === 200){
                return true
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return false

    }

    async renewPassword(id: string, data: {currentPassword: string, newPassword: string}): Promise<boolean | number> {

        console.log(this.service + 'renewPassword()', data)

		try {
			const response = await config.api.patch(this.endpoint + 'renew-password/' + id, data);
			console.log('===response===', response)
            if(response.status === 200){
                return true
            }
            console.error('Error: ', response)
            return response.status
		} catch (error: any) {
			console.error('Error fetching data:', error);
            if(error.response && error.response.status){
                return error.response.status
            }
		}

        return false

    }

    isAuthenticated() {
        // Check if the auth object exists in localStorage
        return !!localStorage.getItem('auth');
    }

    isAdmin(){
        const auth = this.getAuth()
        return auth?.user.user_level === UserLevelEnum.Admin
    }

    isDispatcher(){
        const auth = this.getAuth()
        return auth?.user.user_level === UserLevelEnum.Dispatcher
    }

    isTeamLeader(){
        const auth = this.getAuth()
        return auth?.user.user_level === UserLevelEnum.Team_Leader
    }

    isFieldOperator(){
        const auth = this.getAuth()
        return auth?.user.user_level === UserLevelEnum.Field_Operator
    }

    getAuth(): IAuth | null {
        console.log(this.service + 'getAuth()')
        const authString = localStorage.getItem('auth');
        return authString ? JSON.parse(authString) : null;
    }

    logout() {
        console.log(this.service + 'logout()')
        localStorage.removeItem('auth')
    }

}

export const authService = new AuthService()

import { IAuth } from "."
import { config } from "../config";

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

    isAuthenticated() {
        // Check if the auth object exists in localStorage
        return !!localStorage.getItem('auth');
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
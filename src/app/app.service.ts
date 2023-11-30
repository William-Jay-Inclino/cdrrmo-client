import { config } from "../config";
import { IAuthUser } from "./entities";

class AppService{

    private service = 'AppService: '

    async login(payload: {username: string, password: string}): Promise<IAuthUser | null>{
        console.log(this.service + 'login()', payload)

		try {
			const response = await config.api.post('/auth/login', payload);
			console.log({response})
            if(response.status === 201){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null 
    }

}

export const appService = new AppService()
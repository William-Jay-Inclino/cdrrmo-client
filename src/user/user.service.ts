import { IUser, SearchFieldEnum } from "."
import { config } from "../config"


class UserService{

    private endpoint = '/user/'
    private service = 'UserService: '

    async findAll(payload: {page: number, pageSize: number, searchField?: SearchFieldEnum, searchValue?: string}): 
        Promise<{
            currentPage: number,
            totalPages: number,
            totalUsers: number,
            users: IUser[]
        }>
    {

        console.log(this.service + 'findAll()')
        
		try {

            let newEndpoint = this.endpoint
            newEndpoint += '?page='+payload.page+'&pageSize='+payload.pageSize

            if(payload.searchValue && payload.searchField){
                newEndpoint += '&searchField='+payload.searchField+'&searchValue='+payload.searchValue
            }

			const response = await config.api.get(newEndpoint);
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return {
            currentPage: 0,
            totalPages: 0,
            totalUsers: 0,
            users: []
        }
    }

    async findOrphanTeamLeaders(): Promise<IUser[]>{
        console.log(this.service + 'findOrphanTeamLeaders()')
        
		try {
			const response = await config.api.get(this.endpoint + 'orphan-team-leaders');
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return []
    }

    async findDispatchers(): Promise<IUser[]>{
        console.log(this.service + 'findDispatchers()')
        
		try {
			const response = await config.api.get(this.endpoint + 'dispatchers');
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return []
    }

    async findUsersWithoutTeam(): Promise<IUser[]>{
        console.log(this.service + 'findUsersWithoutTeam()')
        
		try {
			const response = await config.api.get(this.endpoint + 'no-team');
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return []
    }

    async findOne(id: string): Promise<IUser | null>{
        console.log(this.service + 'findOne()', id)
		try {
			const response = await config.api.get(this.endpoint + id);
			console.log({response})
            if(response.status === 200){
                return {...response.data}
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null
    }

    async create(payload: {data: IUser}): Promise<IUser | null>{
        console.log(this.service + 'create()', payload)

		try {
			const response = await config.api.post(this.endpoint, payload.data);
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

    async update(payload: {id: string, data: IUser}): Promise<IUser | null>{
        console.log(this.service + 'update()', payload)

		try {
			const response = await config.api.patch(this.endpoint + payload.id, payload.data);
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null 
    }

    async remove(id: string): Promise<boolean> {
        console.log(this.service + 'remove()', id)
		try {
			const response = await config.api.delete(this.endpoint + id);
			console.log({response})
            if(response.status === 204){
                return true
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}
        return false

    }

    async isUsernameTaken(user_name: string): Promise<boolean>{
        console.log(this.service + 'checkUsernameValidity()', user_name)

		try {
			const response = await config.api.post(this.endpoint + 'check-username', {user_name});
			console.log({response})
            if(response.status === 200){
                return response.data['taken']
            }else{
                console.error('Error: ', response)
            }
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return true 
    }

}

export const userService = new UserService()

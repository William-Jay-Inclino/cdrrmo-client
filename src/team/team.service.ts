import { config } from "../config";
import { ICreateTeamDto } from "./dto/create-team.dto";
import { IUpdateTeamDto } from "./dto/update-team.dto";
import { ITeam, ITeamMember, SearchFieldEnum } from "./entities"

class TeamService{

    private endpoint = '/team/'
    private service = 'TeamService: '

    async findAll(payload: {page: number, pageSize: number, searchField?: SearchFieldEnum, searchValue?: string}): 
    Promise<{
        currentPage: number,
        totalPages: number,
        totalItems: number,
        teams: ITeam[]
    }>{
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
            totalItems: 0,
            teams: []
        }
    }

    async findAllActive(): Promise<ITeam[]>{
        console.log(this.service + 'findAllActive()')
		try {
			const response = await config.api.get(this.endpoint + 'status');
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

    async findOne(id: string): Promise<ITeam | null>{
        console.log(this.service + 'findOne()', id)
		try {
			const response = await config.api.get(this.endpoint + id);
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

    async create(payload: {data: ICreateTeamDto}): Promise<ITeam | null>{
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

    async update(payload: {id: string, data: IUpdateTeamDto}): Promise<ITeam | null>{
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

    async addTeamMember(payload: {data: {team_id: string, member_id: string}}): Promise<ITeamMember | null>{
        console.log(this.service + 'addTeamMember()', payload)

		try {
			const response = await config.api.post(this.endpoint + 'member', payload.data);
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

    async removeTeamMember(id: string): Promise<boolean> {
        console.log(this.service + 'removeTeamMember()', id)
		try {
			const response = await config.api.delete(this.endpoint + 'member/' + id);
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

}

export const teamService = new TeamService()
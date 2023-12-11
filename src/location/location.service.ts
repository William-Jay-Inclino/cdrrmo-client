import { config } from "../config";
import { ILocation, SearchFieldEnum } from "./entities"

class LocationService{

    private endpoint = '/location/'
    private service = 'LocationService: '

    async findAll(): Promise<ILocation[]>{
        console.log(this.service + 'findAll()')
		try {
			const response = await config.api.get(this.endpoint);
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

    async findPerPage(payload: {page: number, pageSize: number, searchField?: SearchFieldEnum, searchValue?: string}): 
    Promise<{
        currentPage: number,
        totalPages: number,
        totalItems: number,
        locations: ILocation[]
    }>{
        console.log(this.service + 'findPerPage()')
		try {

            let newEndpoint = this.endpoint + 'per-page'
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
            locations: []
        }
    }

    async findOne(id: string): Promise<ILocation | null>{
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

    async create(payload: {data: ILocation}): Promise<ILocation | null>{
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

    async update(payload: {id: string, data: ILocation}): Promise<ILocation | null>{
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

}

export const locationService = new LocationService()
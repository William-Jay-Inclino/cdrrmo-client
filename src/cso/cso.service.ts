import { config } from "../config";
import { ICSO } from "./entities"

class CsoService{

    private endpoint = '/cso/'
    private service = 'CsoService: '

    async findAll(): Promise<ICSO[]>{
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

    async findOne(id: string): Promise<ICSO | null>{
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

    async create(payload: {data: ICSO}): Promise<ICSO | null>{
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

    async update(payload: {id: string, data: ICSO}): Promise<ICSO | null>{
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

export const csoService = new CsoService()
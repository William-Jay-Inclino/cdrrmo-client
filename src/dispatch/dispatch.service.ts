import { config } from "../config";
import { ICreateDispatchDto } from "./dto/create-dispatch.dto";
import { IDispatch } from "./entities"

class DispatchService{

    private endpoint = '/dispatch/'
    private service = 'DispatchService: '

    async findAll(): Promise<IDispatch[]>{
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

    async findOne(id: string): Promise<IDispatch | null>{
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

    async create(payload: {data: ICreateDispatchDto[]}): Promise<IDispatch[] | null>{
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

    async update(payload: {id: string, data: IDispatch}): Promise<IDispatch | null>{
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

export const dispatchService = new DispatchService()
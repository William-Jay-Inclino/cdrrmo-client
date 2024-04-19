import { config } from "../config";
import { ICreateItemDto, ICreateStockMovementDto } from "./dto";
import { IItem, SearchFieldEnum } from "./entities"

class ItemService{

    private endpoint = '/item/'
    private service = 'ItemService: '

    async findAll(payload: {page: number, pageSize: number, searchField?: SearchFieldEnum, searchValue?: string}): 
    Promise<{
        currentPage: number,
        totalPages: number,
        totalItems: number,
        items: IItem[]
    }>{
        console.log(this.service + 'findAll()')
        console.log('searchField', payload.searchField);
        console.log('searchValue', payload.searchValue);
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
            items: []
        }
    }

    async findOne(id: string): Promise<IItem | null>{
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

    async create(payload: {data: ICreateItemDto}): Promise<IItem | null>{
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

    async update(payload: {id: string, data: ICreateItemDto}): Promise<IItem | null>{
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

    async stockIn(payload: {itemId: string, data: ICreateStockMovementDto}): Promise<IItem | null>{
        console.log(this.service + 'stockIn()', payload)

		try {
			const response = await config.api.post(this.endpoint + payload.itemId + '/stock-in', payload.data);
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

    async stockOut(payload: {itemId: string, data: ICreateStockMovementDto}): Promise<IItem | null>{
        console.log(this.service + 'stockOut()', payload)

		try {
			const response = await config.api.post(this.endpoint + payload.itemId + '/stock-out', payload.data);
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

export const itemService = new ItemService()
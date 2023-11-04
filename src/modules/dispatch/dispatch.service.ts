import { DispatchStatusEnum, IDispatch } from "@/types/types"
import { faker } from '@faker-js/faker'
class DispatchService{

    getAllDispatchTeams() :IDispatch[]{
        console.log('getAllDispatchTeams()')
        // get from api TBA 
        return []

    }

    async getDispatchById(dispatch_id: number): Promise<IDispatch | null>{
        console.log('getDispatchById()', dispatch_id)
        const dispatch = {} as IDispatch
        return dispatch
    }

    async createDispatch(payload: IDispatch): Promise<IDispatch> {
        console.log('createDispatch()', payload)
        payload.dispatch_id = faker.string.uuid()
        payload.time_dispatch = new Date()
        
        return payload
    }

    async updateDispatch(id: string, payload: IDispatch): Promise<IDispatch | null> {
        console.log('updateDispatch()', payload)
        payload.time_dispatch = new Date()
        return payload
    }

    async deleteDispatch(dispatch_id: number): Promise<boolean>{
        console.log('deleteDispatch()', dispatch_id)
        return true
    }

    async updateStatus(dispatch_id: string, status: DispatchStatusEnum): Promise<IDispatch | null> {
        console.log('updateStatus')
        const dispatch = {} as IDispatch
        return dispatch
    }

}

export const dispatchService = new DispatchService()
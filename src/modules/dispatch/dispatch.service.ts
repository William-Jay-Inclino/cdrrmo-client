import { IDispatch } from "@/types"

class DispatchService{

    getAllDispatchTeams() :IDispatch[]{
        console.log('getAllDispatchTeams()')
        // get from api TBA 
        return []

    }

}

export const dispatchService = new DispatchService()
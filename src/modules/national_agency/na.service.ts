import { appService } from ".."
import { useFakeData } from "../../config"
import { INationalAgency } from "../../types"

class NationalAgency{

    getAllNAs() :INationalAgency[]{
        console.log('getAllNAs()')
        
        if(useFakeData){
            return appService.nas
        }

        // get from api TBA 
        return []

    }

}

export const NAService = new NationalAgency()
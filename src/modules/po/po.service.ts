import { appService } from "@/modules/app"
import { useFakeData } from "@/config"
import { IPO } from "@/types"

class PO{

    getAllPOs() :IPO[]{
        console.log('getAllPOs()')
        
        if(useFakeData){
            return appService.pos
        }

        // get from api TBA 
        return []

    }

}

export const POService = new PO()
import { appService } from "@/modules/app"
import { useFakeData } from "@/config"
import { IBART } from "@/types"

class BART{

    getAllBARTs() :IBART[]{
        console.log('getAllBARTs()')
        
        if(useFakeData){
            return appService.barts
        }

        // get from api TBA 
        return []

    }

}

export const BARTService = new BART()

import { appService } from "@/modules/app"
import { useFakeData } from "@/config"
import { ICSO } from "@/types"

class CSO{

    getAllCSOs() :ICSO[]{
        console.log('getAllCSOs()')
        
        if(useFakeData){
            return appService.csos
        }

        // get from api TBA 
        return []

    }

}

export const CSOService = new CSO()

import { fakeData } from "@/config"
import { IEmergency } from "@/types"
import { appService } from "../app"

class EmergencyService{

    getAllEmergencies() :IEmergency[]{
        console.log('getAllEmergencies()')
        // get from api TBA 

        if(fakeData){
            return appService.emergencies
        }

        return []

    }

}

export const emergencyService = new EmergencyService()
import { IEmergency } from "./entities"

class EmergencyService{

    getAllEmergencies() :IEmergency[]{
        console.log('getAllEmergencies()')

        return []

    }

}

export const emergencyService = new EmergencyService()
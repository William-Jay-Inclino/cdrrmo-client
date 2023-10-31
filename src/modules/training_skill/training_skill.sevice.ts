import { useFakeData } from "@/config"
import { ITrainingSkill } from "@/types/types"
import { appService } from "../app"

class TrainingSkillService{

    getAllTrainingSkills() :ITrainingSkill[]{
        console.log('getAllTrainingSkills()')
        // get from api TBA 

        if(useFakeData){
            return appService.trainingSkills
        }

        return []

    }

}

export const trainingSkillService = new TrainingSkillService()
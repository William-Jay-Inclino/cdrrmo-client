import { useFakeData } from "@/config"
import { IPersonnelSkills, ITrainingSkill } from "@/types/types"
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

    async getTrainingSkillById(training_id: string): Promise<ITrainingSkill | null>{

        if(useFakeData){
            const skill = appService.trainingSkills.find(i => i.training_id === training_id)
            if(skill){
                return skill
            }
        }

        return null

    }

    async getPersonnelSkillsBy(p: {personnel_id: string}): Promise<IPersonnelSkills[] | null> {
        console.log('IPersonnelSkills', p)

        if(useFakeData){
            console.log('personnelSkills', appService.personnelSkills)
            const personnelSkills = appService.personnelSkills.filter(i => i.personnel_id === p.personnel_id)
            console.log('personnelSkills', personnelSkills)
            if(personnelSkills){
                return personnelSkills
            }
        }

        return null
    }

}

export const trainingSkillService = new TrainingSkillService()
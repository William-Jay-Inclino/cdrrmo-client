import { useFakeData } from "@/config"
import { IPersonnelSkill, ITrainingSkill } from "@/types/types"
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

    getTrainingSkillById(training_id: string): ITrainingSkill | null{

        if(useFakeData){
            const skill = appService.trainingSkills.find(i => i.training_id === training_id)
            if(skill){
                return skill
            }
        }

        return null

    }

    getPersonnelSkillsBy(p: {personnel_id: string}): IPersonnelSkill[] | null {

        if(useFakeData){
            const personnelSkills = appService.personnelSkills.filter(i => i.personnel_id === p.personnel_id)
            
            if(personnelSkills){
                return personnelSkills.map( (i) => {
                    
                    const trainingSkill = this.getTrainingSkillById(i.training_id)

                    if(trainingSkill){
                        i.trainingSkill = trainingSkill
                    }

                    return i

                })
            }
        }

        return null
    }

}

export const trainingSkillService = new TrainingSkillService()
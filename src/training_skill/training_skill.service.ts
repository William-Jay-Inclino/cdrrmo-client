import { ITrainingSkill } from "./entities"
import { IPersonnelSkill } from "@/user"

class TrainingSkillService{

    getAllTrainingSkills() :ITrainingSkill[]{
        console.log('getAllTrainingSkills()')

        return []

    }

    getTrainingSkillById(training_id: string): ITrainingSkill | null{
        console.log('training_id', training_id)
        return null

    }

    getPersonnelSkillsBy(p: {personnel_id: string}): IPersonnelSkill[] | null {
        console.log('p', p)
        return null
    }

}

export const trainingSkillService = new TrainingSkillService()
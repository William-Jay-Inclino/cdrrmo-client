import { config } from "../config";
import { ITrainingSkill } from "./entities"
import { IPersonnelSkill } from "@/user"

class TrainingSkillService{

    async getAllTrainingSkills(): Promise<ITrainingSkill[]>{
        console.log('getAllTrainingSkills()')
		try {
			const response = await config.api.get('/training-skill');
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

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

    async remove(id: string): Promise<boolean> {
        console.log('remove()', id)
		try {
			const response = await config.api.delete(`/training-skill/${id}`);
			console.log({response})
            if(response.status === 204){
                return true
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}
        return false

    }

}

export const trainingSkillService = new TrainingSkillService()
import { config } from "../config";
import { ITrainingSkill } from "./entities"
import { IPersonnelSkill } from "@/user"

class TrainingSkillService{

    async getAllTrainingSkills(): Promise<ITrainingSkill[]>{
        console.log('TrainingSkillService: getAllTrainingSkills()')
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

    async getTrainingSkillById(id: string): Promise<ITrainingSkill | null>{
        console.log('TrainingSkillService: getTrainingSkillById()', id)
		try {
			const response = await config.api.get('/training-skill/' + id);
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null
    }

    getPersonnelSkillsBy(p: {personnel_id: string}): IPersonnelSkill[] | null {
        console.log('p', p)
        return null
    }

    async create(payload: {data: ITrainingSkill}): Promise<ITrainingSkill | null>{
        console.log('TrainingSkillService: create()', payload)

		try {
			const response = await config.api.post('/training-skill', payload.data);
			console.log({response})
            if(response.status === 201){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null 
    }

    async update(payload: {id: string, data: ITrainingSkill}): Promise<ITrainingSkill | null>{
        console.log('TrainingSkillService: update()', payload)

		try {
			const response = await config.api.patch('/training-skill/' + payload.id, payload.data);
			console.log({response})
            if(response.status === 200){
                return response.data
            }
            console.error('Error: ', response)
		} catch (error) {
			console.error('Error fetching data:', error);
		}

        return null 
    }

    async deleteItem(id: string): Promise<boolean> {
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
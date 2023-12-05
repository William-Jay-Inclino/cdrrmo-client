import { config } from "../config";
import { IncidentReport } from "./entities";

class ReportService{

    private endpoint = '/report/'
    private service = 'reportService: '

    async getDispatchesByDate(payload: {startDate: string, endDate: string}): Promise<IncidentReport[]>{
        console.log(this.service + 'getDispatchesByDate()')
		try {
			const response = await config.api.get(this.endpoint + `dispatches/byDate/${payload.startDate}/${payload.endDate}`);
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

}

export const reportService = new ReportService()
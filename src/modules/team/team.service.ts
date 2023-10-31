import { useFakeData } from "@/config"
import { appService } from "@/modules/app"
import { ITeam } from "@/types/types"

class Team{

    getAllTeams() :ITeam[]{
        console.log('getAllTeams()')
        
        return appService.teams

    }

    async getTeamById(team_id: string): Promise<ITeam | null>{
        console.log('getTeamById()', team_id)
        
        if(useFakeData){
            const team = appService.teams.find(i => i.team_id === team_id)
            if(team){
                return team
            }
        }

        return null

    }

}

export const teamService = new Team()

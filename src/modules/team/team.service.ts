import { useFakeData } from "@/config"
import { appService } from "@/modules/app"
import { ITeam } from "@/types/types"
import { userService } from "../user"
import { CONST_TeamStatusText } from "@/helpers/constants"

class Team{

    getAllTeams() :ITeam[]{
        console.log('getAllTeams()')
        
        return appService.teams

    }

    async getTeamById(team_id: string): Promise<ITeam | null>{
        console.log('getTeamById()', team_id)

        const users = userService.getAllUsers()
        
        if(useFakeData){
            const team = appService.teams.find(i => i.team_id === team_id)
            if(team){
                const teamLeader = users.find(j => j.user_id === team.team_leader_id)
                if(teamLeader){
                    team.team_leader = teamLeader
                }
                team.statusText = CONST_TeamStatusText[team.status]
                return team 
            }
        }

        return null

    }

}

export const teamService = new Team()

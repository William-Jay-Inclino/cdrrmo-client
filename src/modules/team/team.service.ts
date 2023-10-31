import { appService } from "@/modules/app"
import { ITeam } from "@/types/types"

class Team{

    getAllTeams() :ITeam[]{
        console.log('getAllTeams()')
        
        return appService.teams

    }

}

export const teamService = new Team()

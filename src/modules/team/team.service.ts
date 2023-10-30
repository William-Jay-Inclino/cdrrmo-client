import { ITeam } from "../../types"
import { appService } from "../"

class Team{

    getAllTeams() :ITeam[]{
        console.log('getAllTeams()')
        
        return appService.teams

    }

}

export const teamService = new Team()

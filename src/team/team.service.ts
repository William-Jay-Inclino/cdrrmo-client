import { ITeam } from "./entities"

class Team{

    getAllTeams() :ITeam[]{
        console.log('getAllTeams()')
        
        return []

    }

    async getTeamById(team_id: string): Promise<ITeam | null>{
        console.log('getTeamById()', team_id)

        // @ts-ignore
        return 'team by id'

    }

}

export const teamService = new Team()

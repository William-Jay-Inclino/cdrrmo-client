import { ITeamMember } from "../../types"
import { appService } from "../"

class TeamMemberService{

    getAllTeamMembers(p: {teamId: string}) :ITeamMember[]{
        console.log('getAllTeamMembers()')
        
        return appService.teamMembers.filter(i => i.team_id === p.teamId)

    }

}

export const teamMemberService = new TeamMemberService()

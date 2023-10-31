import { appService } from "@/modules/app"
import { ITeamMember } from "@/types/types"

class TeamMemberService{

    getAllTeamMembers(p: {teamId: string}) :ITeamMember[]{
        console.log('getAllTeamMembers()')
        
        return appService.teamMembers.filter(i => i.team_id === p.teamId)

    }

}

export const teamMemberService = new TeamMemberService()

import { appService } from "@/modules/app"
import { ITeamMember } from "@/types/types"
import { userService } from "@/modules/user"
import { trainingSkillService } from "@/modules/training_skill"

class TeamMemberService{

    getAllTeamMembers(p: {teamId: string}) :ITeamMember[]{
        console.log('getAllTeamMembers()')
        
        const users = userService.getAllUsers()

        return appService.teamMembers.filter(i => i.team_id === p.teamId).map(i => {
            const user = users.find( j => j.user_id === i.member_id)
            if(user){
                i.member = user

                const personnelSkills = trainingSkillService.getPersonnelSkillsBy({personnel_id: i.member_id})
                if(personnelSkills){
                    i.skills = personnelSkills
                }
            }
            return i
        })

    }

}

export const teamMemberService = new TeamMemberService()

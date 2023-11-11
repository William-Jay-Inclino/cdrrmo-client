import { fakeData } from "@/config"
import { IBART, ICSO, IEmergency, INationalAgency, IPO, IPersonnelSkill, ITeam, ITeamMember, ITrainingSkill, IUser } from "@/common/types/types"
import { generateFakeCSO, fakeCSOs, generateFakeNA, fakeNAs, generateFakeBART, fakeBARTs, generateFakePO, fakePOs, generateFakeUsers, generateFakeTeams, generateFakeTeamMembers, generateFakeEmergencies, fakeEmergencies, fakeTeams, generateFakeSkills, fakeSkills, generateFakePersonnelSkills } from "@/helpers/faker"

class AppService{

    private _authUser?: IUser
    csos: ICSO[] = []
    nas: INationalAgency[] = []
    barts: IBART[] = []
    pos: IPO[] = []
    users: IUser[] = []
    teams: ITeam[] = []
    teamMembers: ITeamMember[] = []
    emergencies: IEmergency[] = []
    trainingSkills: ITrainingSkill[] = []
    personnelSkills: IPersonnelSkill[] = []

    init(){
        console.log('class App init()')
        
        // use fake data for prototyping 
        // change this to api data if prototype is approve

        this.csos = generateFakeCSO({count: fakeCSOs.length})
        this.nas = generateFakeNA({count: fakeNAs.length})
        this.barts = generateFakeBART({count: fakeBARTs.length})
        this.pos = generateFakePO({count: fakePOs.length})
        this.users = generateFakeUsers({count: fakeData.userCount})
        this.teams = generateFakeTeams({count: fakeTeams.length})
        this.teamMembers = generateFakeTeamMembers({count: fakeData.teamMemberCount})
        this.emergencies = generateFakeEmergencies({count: fakeEmergencies.length})
        this.trainingSkills = generateFakeSkills({count: fakeSkills.length})
        this.personnelSkills = generateFakePersonnelSkills({countSkill: fakeData.personnelSkillsCount, users: this.users, trainingSkills: this.trainingSkills})
        this.setAuthUser(this.users[0])
    }

    setAuthUser(user: IUser){
        this._authUser = user
    }

    getAuthUser() :IUser | undefined{
        return this._authUser
    }

}

export const appService = new AppService()
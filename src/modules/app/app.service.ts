import { fakeData } from "../../config"
import { IBART, ICSO, INationalAgency, IPO, ITeam, ITeamMember, IUser } from "../../types"
import { generateFakeCSO, fakeCSOs, generateFakeNA, fakeNAs, generateFakeBART, fakeBARTs, generateFakePO, fakePOs, generateFakeUsers, generateFakeTeams, generateFakeTeamMembers } from "../../helpers/faker"

// root class

class AppService{

    csos: ICSO[] = []
    nas: INationalAgency[] = []
    barts: IBART[] = []
    pos: IPO[] = []
    users: IUser[] = []
    teams: ITeam[] = []
    teamMembers: ITeamMember[] = []

    init(){
        console.log('class App init()')
        
        // use fake data for prototyping 
        // change this to api data if prototype is approve

        this.csos = generateFakeCSO({count: fakeCSOs.length})
        this.nas = generateFakeNA({count: fakeNAs.length})
        this.barts = generateFakeBART({count: fakeBARTs.length})
        this.pos = generateFakePO({count: fakePOs.length})
        this.users = generateFakeUsers({count: fakeData.userCount})
        this.teams = generateFakeTeams({count: fakeData.teamCount})
        this.teamMembers = generateFakeTeamMembers({count: fakeData.teamMemberCount})
    }

}

export const appService = new AppService()
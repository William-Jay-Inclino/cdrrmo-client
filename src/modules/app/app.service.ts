import { fakeData } from "@/config"
import { DispatchStatusEnum, GenderEnum, IBART, ICSO, IEmergency, INationalAgency, IPO, ITeam, ITeamMember, IUser, UserLevelEnum, UserStatusEnum, UserTypeEnum } from "@/types/types"
import { generateFakeCSO, fakeCSOs, generateFakeNA, fakeNAs, generateFakeBART, fakeBARTs, generateFakePO, fakePOs, generateFakeUsers, generateFakeTeams, generateFakeTeamMembers, generateFakeEmergencies, fakeEmergencies, fakeTeams } from "@/helpers/faker"

// root class

const _authUser: IUser = {
    user_id: '0',
    last_name: 'Inclino',
    first_name: 'Jay',
    gender: GenderEnum.Male,
    address: 'Puerto Bello, Merida Leyte',
    birth_date: new Date('1997-10-24'),
    contact_no: '09106024370',
    blood_type: 'O+',
    status: UserStatusEnum.Active,
    dispatch_status: DispatchStatusEnum.Queue,
    user_name: 'Jay',
    password: 'Jay123',
    user_level: UserLevelEnum.Admin,
    type: UserTypeEnum.LGU_Regular,
}

class AppService{

    private _authUser: IUser = _authUser
    csos: ICSO[] = []
    nas: INationalAgency[] = []
    barts: IBART[] = []
    pos: IPO[] = []
    users: IUser[] = []
    teams: ITeam[] = []
    teamMembers: ITeamMember[] = []
    emergencies: IEmergency[] = []

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
    }

    getAuthUser() :IUser{
        return this._authUser
    }

}

export const appService = new AppService()
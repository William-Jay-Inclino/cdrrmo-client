import { DispatchStatusEnum, GenderEnum, IBART, ICSO, IEmergency, INationalAgency, IPO, ITeam, ITeamMember, IUser, LGUEnum, TeamStatusEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../types/types'
import { faker } from '@faker-js/faker'
import { CONST_bloodTypes } from '@/helpers/constants'
import { appService } from '@/modules/app'

export const fakeCSOs = ['Rescue Rider', 'Kabalikat', 'CSO sample 1', 'CSO sample 2', 'CSO sample 3']
export const fakePOs = ['Frat1', 'Frat2', 'Frat3', 'Frat4', 'Frat5']
export const fakeBARTs = ['Brgy Sanjuan', 'Brgy Liloan', 'Brgy Margen', 'Brgy Curva', 'Brgy Ipil']
export const fakeNAs = ['BFP', 'PNP', 'AFP', 'NA1', 'NA2']
export const fakeEmergencies = ['Natural Disaster', 'Medical', 'Fire', 'Environmental', 'Road', 'Security', 'Search and Rescue', 'Infrastructure', 'Public Health Incidents', 'Social and Community']
export const fakeTeams = ['Team 1', 'Team 2', 'Team 3', 'Team 4']

export const generateFakeUsers = (p: {count: number}) :IUser[] => {
    console.log('generateFakeUsers()')

    const fakeUsers: IUser[] = []

    while(p.count--){
        const user = {} as IUser
        user.user_id = faker.string.uuid()
        user.address = faker.location.city()
        user.birth_date = faker.date.birthdate()
        user.blood_type = getRandomEnum(CONST_bloodTypes)
        user.contact_no = faker.phone.number('+63 (9##)-###-####')
        user.dispatch_status = getRandomEnum(Object.values(DispatchStatusEnum))
        user.first_name = faker.person.firstName()
        user.last_name = faker.person.lastName()
        user.gender = getRandomEnum(Object.values(GenderEnum))
        user.password = faker.string.alphanumeric()
        user.status = UserStatusEnum.Active
        user.type = getRandomEnum(Object.values(UserTypeEnum))
        user.user_id = faker.string.uuid()
        user.user_level = getRandomEnum(Object.values(UserLevelEnum))
        user.user_name = faker.internet.userName()

        if(user.type === UserTypeEnum.ACDV_BART){
            const x = getRandomValueIn(appService.barts) as IBART
            user.sub_type_id = x.bart_id
        }
        else if(user.type === UserTypeEnum.ACDV_CSO){
            const x = getRandomValueIn(appService.csos) as ICSO
            user.sub_type_id = x.cso_id
        }
        else if(user.type === UserTypeEnum.ACDV_PO){
            const x = getRandomValueIn(appService.pos) as IPO
            user.sub_type_id = x.po_id
        }
        else if(user.type === UserTypeEnum.National_Agency){
            const x = getRandomValueIn(appService.nas) as INationalAgency
            user.sub_type_id = x.na_id
        }
        else if(user.type === UserTypeEnum.LGU_Casual){
            user.sub_type_id = LGUEnum.Casual
        }
        else if(user.type === UserTypeEnum.LGU_Job_Order){
            user.sub_type_id = LGUEnum.Job_Order
        }
        else if(user.type === UserTypeEnum.LGU_Regular){
            user.sub_type_id = LGUEnum.Regular
        }

        fakeUsers.push(user)
    }

    return fakeUsers

}

export const generateFakeCSO = (p: {count: number}) :ICSO[] => {
    console.log('generateFakeUsers()')

    const fakeData: ICSO[] = []

    while(p.count--){

        const cso = {} as ICSO 
        cso.cso_id = faker.string.uuid()
        cso.org_name = getUniqueValue({inArray: fakeCSOs, refArray: fakeData, nameKey: 'org_name'})
        cso.description = faker.lorem.paragraph()

        fakeData.push(cso)

    }

    return fakeData

}

export const generateFakeBART = (p: {count: number}) :IBART[] => {
    console.log('generateFakeBART()')

    const fakeData: IBART[] = []

    while(p.count--){

        const bart = {} as IBART 
        bart.bart_id = faker.string.uuid()
        bart.bart_name = getUniqueValue({inArray: fakeBARTs, refArray: fakeData, nameKey: 'bart_name'})
        bart.description = faker.lorem.paragraph()

        fakeData.push(bart)

    }

    return fakeData

}

export const generateFakeEmergencies = (p: {count: number}) => {
    console.log('generateFakeEmergencies()')

    const fakeData: IEmergency[] = []

    while(p.count--){

        const emergency = {} as IEmergency 
        emergency.emergency_id = faker.string.uuid()
        emergency.nature = getRandomValueIn(fakeEmergencies)

        fakeData.push(emergency)

    }

    return fakeData
}

export const generateFakeNA = (p: {count: number}) :INationalAgency[] => {
    console.log('generateFakeNA()')

    const fakeData: INationalAgency[] = []

    while(p.count--){

        const fakeNA = {} as INationalAgency 
        fakeNA.na_id = faker.string.uuid()
        fakeNA.na_name = getUniqueValue({inArray: fakeNAs, refArray: fakeData, nameKey: 'na_name'})
        fakeNA.description = faker.lorem.paragraph()

        fakeData.push(fakeNA)

    }

    return fakeData

}

export const generateFakePO = (p: {count: number}) :IPO[] => {
    console.log('generateFakePO()')

    const fakeData: IPO[] = []

    while(p.count--){

        const po = {} as IPO 
        po.po_id = faker.string.uuid()
        po.po_name = getUniqueValue({inArray: fakePOs, refArray: fakeData, nameKey: 'po_name'})
        po.description = faker.lorem.paragraph()

        fakeData.push(po)

    }

    return fakeData

}

export const generateFakeTeams = (p: {count: number}) :ITeam[] => {
    console.log('generateFakeTeams()', p)

    p.count += 1

    const fakeData: ITeam[] = []

    while(--p.count){

        const team = {} as ITeam 
        team.team_id = faker.string.uuid()
        const user = getRandomValueIn(appService.users) as IUser

        if(!user){
            console.error('team leader id not assigned')
            continue 
        }
        team.team_leader_id = user.user_id
        team.team_name = getUniqueValue({inArray: fakeTeams, refArray: fakeData, nameKey: 'team_name'})
        team.status = TeamStatusEnum.Active

        fakeData.push(team)

    }

    return fakeData

}

export const generateFakeTeamMembers = (p: {count: number}) :ITeamMember[] => {
   
    const fakeData: ITeamMember[] = []

    for(let team of appService.teams){

        let count = p.count + 1

        while(--count){

            const teamMember = {} as ITeamMember 
            teamMember.team_member_id = faker.string.uuid()
            teamMember.team_id = team.team_id
            const userId = getUniqueUserId({inArray: appService.users, refArray: fakeData})
            
            if(!userId){
                console.error('Team member not assigned. Teams are all occupied by each user')
                continue
            }

            teamMember.member_id = userId
    
            fakeData.push(teamMember)
    
        }
    }


    return fakeData

}

const getRandomValueIn = (array: any[]) => {

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];

}

const getUniqueValue = (p: {inArray: string[], refArray: any[], nameKey: string}) :string => {

    for(let i of p.inArray){

        // @ts-ignore
        const isExist = p.refArray.find(j => j[p.nameKey] === i)

        if(!isExist) return i

    }

    return ''

}

const getUniqueUserId = (p: {inArray: IUser[], refArray: ITeamMember[]}) :string | undefined => {

    for(let i of p.inArray){
        
        const existInRefAarray = p.refArray.find(j => j.member_id === i.user_id)

        if(!existInRefAarray){
            return i.user_id
        } 

    }
    
}

const getRandomEnum = (array: any[]) => {
    const arrayValues = array.filter(i => typeof i === 'number')

    const randomIndex = Math.floor(Math.random() * arrayValues.length);
    return arrayValues[randomIndex];
}


/*
    Emergencies: 

    1. Natural Disaster
    - Earthquakes - Sudden shaking of the ground, often resulting in structural damage and casualties.
    - Floods - Overflow of water onto normally dry land, causing damage to property and posing a risk to life.
    - Hurricanes, Typhoons, Cyclones - Powerful tropical storms with strong winds and heavy rainfall.
    - Wildfires - Uncontrolled fires that spread rapidly through vegetation and forests.
    - Tornadoes - Violently rotating columns of air with the potential to cause significant 
    - Droughts - Extended periods of water scarcity, affecting agriculture and water supply.

    2. Medical:
    - Medical Emergencies: These include incidents like heart attacks, strokes, or severe injuries that require immediate medical attention.
    - Illness Outbreaks: Incidents related to the spread of contagious diseases within a community or facility.

    3. Fire:
    - Structural Fires: Incidents involving fires in buildings or structures.
    - Wildfires: Uncontrolled fires in forested or grassland areas.
    - Vehicle Fires: Fires in cars, trucks, or other vehicles.
    - Hazardous Material Fires: Fires involving hazardous substances.

    4. Environmental: 
    - Chemical Spills: Accidental or deliberate release of hazardous chemicals.
    - Oil Spills: Incidents involving the release of oil into water bodies.
    - Air Quality Issues: Poor air quality due to pollution or industrial incidents.
    - Wildlife Incidents: Incidents involving wild animals in urban areas.
    - Pollution Incidents: Incidents related to environmental pollution or contamination.

    5. Road: 
    - Vehicle Accidents: Car accidents, collisions, and crashes on roadways.
    - Road Closures: Incidents that lead to the closure of roads or highways.
    - Traffic Congestion: Situations where traffic flow is severely disrupted.

    6. Security:
    - Burglaries and Theft: Incidents involving theft or break-ins.
    - Assaults and Violence: Physical altercations or violent incidents.
    - Suspicious Packages: Incidents related to unattended or suspicious items.

    7. Search and Rescue:
    - Missing Persons: Incidents involving individuals who are lost or unaccounted for.
    - Outdoor Rescues: Incidents requiring rescue operations in wilderness areas.
    - Water Rescues: Incidents involving individuals in distress in bodies of water.

    8. Infrastructure:
    - Utility Outages: Incidents that lead to power, water, or communication service disruptions.
    - Structural Failures: Incidents related to the collapse or failure of buildings or infrastructure.

    9. Public Health Incidents:
    - Foodborne Illness: Incidents related to contaminated or unsafe food.
    - Public Health Alerts: Incidents that require public health advisories or warnings.

    10. Social and Community: 
    - Public Gatherings: Incidents related to large gatherings, such as festivals or protests.
    - Community Disputes: Incidents involving neighborhood disputes or conflicts.

*/
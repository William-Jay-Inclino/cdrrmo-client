import { DispatchStatusEnum, GenderEnum, IBART, ICSO, INationalAgency, IPO, IUser, LGUEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '../types'
import { faker } from '@faker-js/faker'
import { CONST_bloodTypes } from '../helpers/constants'
import { app } from './app.store'


export const fakeCSOs = ['Rescue Rider', 'Kabalikat', 'CSO sample 1', 'CSO sample 2', 'CSO sample 3']
export const fakePOs = ['Frat1', 'Frat2', 'Frat3', 'Frat4', 'Frat5']
export const fakeBARTs = ['Brgy Sanjuan', 'Brgy Liloan', 'Brgy Margen', 'Brgy Curva', 'Brgy Ipil']
export const fakeNAs = ['BFP', 'PNP', 'AFP', 'NA1', 'NA2']

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
            const x = getRandomValueIn(app.fakeBarts) as IBART
            user.sub_type_id = x.bart_id
        }
        else if(user.type === UserTypeEnum.ACDV_CSO){
            const x = getRandomValueIn(app.fakeCSOs) as ICSO
            user.sub_type_id = x.cso_id
        }
        else if(user.type === UserTypeEnum.ACDV_PO){
            const x = getRandomValueIn(app.fakePOs) as IPO
            user.sub_type_id = x.po_id
        }
        else if(user.type === UserTypeEnum.National_Agency){
            const x = getRandomValueIn(app.fakeNas) as INationalAgency
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

    console.log('fakeUsers', fakeUsers)

    return fakeUsers

}


export const generateFakeCSO = (p: {count: number}) :ICSO[] => {
    console.log('generateFakeUsers()')

    const fakeData: ICSO[] = []

    while(p.count--){

        const cso = {} as ICSO 
        cso.cso_id = faker.string.uuid()
        cso.org_name = getRandomValueIn(fakeCSOs)
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
        bart.bart_name = getRandomValueIn(fakeBARTs)
        bart.description = faker.lorem.paragraph()

        fakeData.push(bart)

    }

    return fakeData

}

export const generateFakeNA = (p: {count: number}) :INationalAgency[] => {
    console.log('generateFakeNA()')

    const fakeData: INationalAgency[] = []

    while(p.count--){

        const fakeNA = {} as INationalAgency 
        fakeNA.na_id = faker.string.uuid()
        fakeNA.na_name = getRandomValueIn(fakeNAs)
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
        po.po_name = getRandomValueIn(fakePOs)
        po.description = faker.lorem.paragraph()

        fakeData.push(po)

    }

    return fakeData

}


const getRandomValueIn = (array: any[]) => {

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];

}

const getRandomEnum = (array: any[]) => {
    const arrayValues = array.filter(i => typeof i === 'number')

    const randomIndex = Math.floor(Math.random() * arrayValues.length);
    return arrayValues[randomIndex];
}
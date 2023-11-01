import { DispatchStatusEnum, GenderEnum, TeamStatusEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from '@/types/types'

export const routeNames = {
    users: 'users.route',
    userForm: 'userForm.route',
    dispatch: 'dispatch.route',
    dispatchForm: 'dispatchForm.route',
    teams: 'teams.route',
    teamMembers: 'teamMembers.route',
    barts: 'barts.route',
    csos: 'csos.route',
    nationalAgencies: 'nas.route',
    pos: 'pos.route',
    emergencies: 'emergencies.route',
    trainingSkills: 'trainingSkills.route',
}

export const CONST_GenderText = {
    [GenderEnum.Male]: 'Male',
    [GenderEnum.Female]: 'Female',
}

export const CONST_Gender = {
    [GenderEnum.Male]:{
        text: 'Male',
        color: '#0000FF', //blue
        icon: 'fa-mars'
    },
    [GenderEnum.Female]:{
        text: 'Female',
        color: '#FF00FF', // pink
        icon: 'fa-venus'
    }
}

export const CONST_TeamStatusText = {
    [TeamStatusEnum.Active]: 'Active',
    [TeamStatusEnum.Dispatched]: 'Dispatched',
}

export const CONST_UserStatus = {
    [UserStatusEnum.Active]: {
        text: 'Active',
        color: 'success'
    },
    [UserStatusEnum.Inactive]: {
        text: 'Inactive',
        color: 'danger'
    },
}

export const CONST_DispatchStatus = {
    [DispatchStatusEnum.Queue]: {
        text: 'Queue',
        color: 'primary', 
    },
    [DispatchStatusEnum.Dispatched]: {
        text: 'Dispatched',
        color: 'info', 
    },
    [DispatchStatusEnum.Deck]: {
        text: 'Deck',
        color: 'success', 
    },
}

export const CONST_UserlvlText = {
    [UserLevelEnum.Admin]: 'Admin',
    [UserLevelEnum.Dispatcher]: 'Dispatcher',
    [UserLevelEnum.Field_Operator]: 'Field Operator',
    [UserLevelEnum.Team_Leader]: 'Team Leader',
}

export const CONST_UserTypeText = {
    [UserTypeEnum.LGU_Regular]: 'LGU',
    [UserTypeEnum.LGU_Casual]: 'LGU',
    [UserTypeEnum.LGU_Job_Order]: 'LGU',
    [UserTypeEnum.ACDV_BART]: 'ACDV',
    [UserTypeEnum.ACDV_CSO]: 'ACDV',
    [UserTypeEnum.ACDV_PO]: 'ACDV',
    [UserTypeEnum.ACDV_INDIVIDUAL]: 'ACDV',
    [UserTypeEnum.National_Agency]: 'National Agency',
}

export const CONST_UserSubTypeText = {
    [UserTypeEnum.LGU_Regular]: 'Regular',
    [UserTypeEnum.LGU_Casual]: 'Casual',
    [UserTypeEnum.LGU_Job_Order]: 'Job Order',
    [UserTypeEnum.ACDV_BART]: 'BART',
    [UserTypeEnum.ACDV_CSO]: 'CSO',
    [UserTypeEnum.ACDV_PO]: 'PO',
    [UserTypeEnum.ACDV_INDIVIDUAL]: 'INDIVIDUAL',
    [UserTypeEnum.National_Agency]: '',
}




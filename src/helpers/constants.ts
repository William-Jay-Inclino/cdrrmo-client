import { TeamStatusEnum, UserTypeEnum } from '@/types/types'


export const CONST_bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

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

export const CONST_TeamStatusText = {
    [TeamStatusEnum.Active]: 'Active',
    [TeamStatusEnum.Dispatched]: 'Dispatched',
}

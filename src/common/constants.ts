import { DispatchStatusEnum } from "../dispatch";
import { MovementTypeEnum } from "../inventory";
import { TeamStatusEnum } from "../team";
import { DistinctUserTypeEnum, GenderEnum, UserLevelEnum, UserStatusEnum, UserTypeEnum } from "../user";

export const routeNames = {
    profile: 'profile.route',
    settings: 'settings.route',
    notFound: 'notFound.route',
    unauthorized: 'unauthorized.route',
    login: 'login.route',
    dashboard: 'dashboard.route',
    location: 'location.route',
    locationForm: 'locationForm.route',
    users: 'users.route',
    userForm: 'userForm.route',
    dispatch: 'dispatch.route',
    dispatchForm: 'dispatchForm.route',
    teams: 'teams.route',
    teamsForm: 'teamsForm.route',
    teamManage: 'teamManage.route',
    barts: 'barts.route',
    bartsForm: 'bartsForm.route',
    csos: 'csos.route',
    csosForm: 'csosForm.route',
    nationalAgencies: 'nas.route',
    nationalAgenciesForm: 'nasForm.route',
    pos: 'pos.route',
    posForm: 'posForm.route',
    emergencies: 'emergencies.route',
    emergenciesForm: 'emergenciesForm.route',
    trainingSkills: 'trainingSkills.route',
    trainingSkillsForm: 'trainingSkillsForm.route',
    incidentReport: 'report.incident.route',
    dispatchReport: 'report.dispatch.route',
    inventoryItem: 'inventoryItem.route',
    inventoryItemForm: 'inventoryItemForm.route',
    inventoryItemCategory: 'inventoryItemCategory.route',
    inventoryItemCategoryForm: 'inventoryItemCategoryForm.route',
    inventoryItemStockMovement: 'inventoryItemStockMovement.route',
}

export const dispatcherModules = [
    routeNames.login, 
    routeNames.dispatch, 
    routeNames.dispatchForm, 
    routeNames.notFound, 
    routeNames.unauthorized, 
    routeNames.profile,
    routeNames.settings,
    routeNames.location,
    routeNames.locationForm,
]

export const teamLeadModules = []
export const fieldOperatorModules = []

export const CONST_bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const CONST_Gender = {
    [GenderEnum.Male]:{
        id: GenderEnum.Male,
        text: 'Male',
        color: '#0000FF', //blue
        icon: 'fa-mars'
    },
    [GenderEnum.Female]:{
        id: GenderEnum.Female,
        text: 'Female',
        color: '#FF00FF', // pink
        icon: 'fa-venus'
    }
}

export const CONST_UserStatus = {
    [UserStatusEnum.Active]: {
        id: UserStatusEnum.Active,
        text: 'Active',
        color: 'success'
    },
    [UserStatusEnum.Inactive]: {
        id: UserStatusEnum.Inactive,
        text: 'Inactive',
        color: 'danger'
    },
}

export const CONST_ItemMovementType = {
    [MovementTypeEnum.StockIn]: {
        id: MovementTypeEnum.StockIn,
        text: 'Stock In',
        color: 'success'
    },
    [MovementTypeEnum.StockOut]: {
        id: MovementTypeEnum.StockOut,
        text: 'Stock Out',
        color: 'danger'
    },
}

export const CONST_TeamStatus = {
    [TeamStatusEnum.Active]: {
        id: TeamStatusEnum.Active,
        text: 'Active',
        color: 'success'
    },
    [TeamStatusEnum.Dispatched]: {
        id: TeamStatusEnum.Dispatched,
        text: 'Dispatched',
        color: 'primary'
    },
    [TeamStatusEnum.Inactive]: {
        id: TeamStatusEnum.Inactive,
        text: 'Inactive',
        color: 'danger'
    },
}

export const CONST_DispatchStatus = {
    [DispatchStatusEnum.Queue]: {
        id: DispatchStatusEnum.Queue,
        text: 'Queue',
        color: 'primary', 
    },
    [DispatchStatusEnum.ProceedingScene]: {
        id: DispatchStatusEnum.ProceedingScene,
        text: 'Proceeding to scene',
        color: 'primary', 
    },
    [DispatchStatusEnum.ArrivedScene]: {
        id: DispatchStatusEnum.ArrivedScene,
        text: 'Arrived at scene',
        color: 'primary', 
    },
    [DispatchStatusEnum.ProceedingHospital]: {
        id: DispatchStatusEnum.ProceedingHospital,
        text: 'Proceeding to hospital',
        color: 'primary', 
    },
    [DispatchStatusEnum.ArrivedHospital]: {
        id: DispatchStatusEnum.ArrivedHospital,
        text: 'Arrived at hospital',
        color: 'primary', 
    },
    [DispatchStatusEnum.ProceedingBase]: {
        id: DispatchStatusEnum.ProceedingBase,
        text: 'Proceeding to Base',
        color: 'primary', 
    },
    [DispatchStatusEnum.ArrivedBase]: {
        id: DispatchStatusEnum.ArrivedBase,
        text: 'Arrived at Base',
        color: 'primary', 
    },
}

export const CONST_UserLevel = {
    [UserLevelEnum.Admin]: {
        id: UserLevelEnum.Admin,
        text: 'Admin',
        color: '', 
    },
    [UserLevelEnum.Dispatcher]: {
        id: UserLevelEnum.Dispatcher,
        text: 'Dispatcher',
        color: '', 
    },
    [UserLevelEnum.Team_Leader]: {
        id: UserLevelEnum.Team_Leader,
        text: 'Team Leader',
        color: '', 
    },
    [UserLevelEnum.Field_Operator]: {
        id: UserLevelEnum.Field_Operator,
        text: 'Field Operator',
        color: '', 
    },
}

export const CONST_UserTypes = {
    [UserTypeEnum.LGU_Regular]: {
        id: UserTypeEnum.LGU_Regular,
        text: 'LGU',
        color: '', 
    },
    [UserTypeEnum.LGU_Casual]: {
        id: UserTypeEnum.LGU_Casual,
        text: 'LGU',
        color: '', 
    },
    [UserTypeEnum.LGU_Job_Order]: {
        id: UserTypeEnum.LGU_Job_Order,
        text: 'LGU',
        color: '', 
    },
    [UserTypeEnum.ACDV_BART]: {
        id: UserTypeEnum.ACDV_BART,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.ACDV_CSO]: {
        id: UserTypeEnum.ACDV_CSO,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.ACDV_PO]: {
        id: UserTypeEnum.ACDV_PO,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.ACDV_INDIVIDUAL]: {
        id: UserTypeEnum.ACDV_INDIVIDUAL,
        text: 'ACDV',
        color: '', 
    },
    [UserTypeEnum.National_Agency]: {
        id: UserTypeEnum.National_Agency,
        text: 'National Agency',
        color: '', 
    },
}

export const CONST_DistinctUserTypes = {
    [DistinctUserTypeEnum.LGU]: {
        id: DistinctUserTypeEnum.LGU,
        text: 'LGU - Local Government Unit',
        color: '', 
    },
    [DistinctUserTypeEnum.ACDV]: {
        id: DistinctUserTypeEnum.ACDV,
        text: 'ACDV - Accredited Community Disaster & Emergency Volunteer',
        color: '', 
    },
    [DistinctUserTypeEnum.National_Agency]: {
        id: DistinctUserTypeEnum.National_Agency,
        text: 'National Agency',
        color: '', 
    },
}

export const CONST_SubTypes = {
    [UserTypeEnum.LGU_Regular]: {
        id: UserTypeEnum.LGU_Regular,
        text: 'Regular',
        color: '', 
    },
    [UserTypeEnum.LGU_Casual]: {
        id: UserTypeEnum.LGU_Casual,
        text: 'Casual',
        color: '', 
    },
    [UserTypeEnum.LGU_Job_Order]: {
        id: UserTypeEnum.LGU_Job_Order,
        text: 'Job Order',
        color: '', 
    },
    [UserTypeEnum.ACDV_BART]: {
        id: UserTypeEnum.ACDV_BART,
        text: 'BART - Barangay Auxiliary Response Team',
        color: '', 
    },
    [UserTypeEnum.ACDV_CSO]: {
        id: UserTypeEnum.ACDV_CSO,
        text: 'CSO - Civic Social Organization',
        color: '', 
    },
    [UserTypeEnum.ACDV_PO]: {
        id: UserTypeEnum.ACDV_PO,
        text: "PO - People's Organization",
        color: '', 
    },
    [UserTypeEnum.ACDV_INDIVIDUAL]: {
        id: UserTypeEnum.ACDV_INDIVIDUAL,
        text: 'INDIVIDUAL',
        color: '', 
    },
    [UserTypeEnum.National_Agency]: {
        id: UserTypeEnum.National_Agency,
        text: '',
        color: '', 
    },
}

export const relationships = [
    'Mother', 'Father', 'Stepmother', 'Stepfather', 'Legal Guardian',
    'Brother', 'Sister', 'Half-brother', 'Half-sister', 'Stepbrother', 'Stepsister',
    'Grandparent', 'Uncle', 'Aunt', 'Cousin',
    'Husband', 'Wife', 'Domestic Partner', 'Boyfriend', 'Girlfriend',
    'Work Colleague', 'Supervisor', 'Mentor',
    'Friend', 'Neighbor', 'Roommate', 'Pastor/Religious Leader', 'Doctor', 'Legal Representative'
  ];
  

// =========================== CONSTANTS BELOW ARE USED IN FAKE DATA ONLY  =========================== 

// export const CONST_UserlvlText = {
//     [UserLevelEnum.Admin]: 'Admin',
//     [UserLevelEnum.Dispatcher]: 'Dispatcher',
//     [UserLevelEnum.Field_Operator]: 'Field Operator',
//     [UserLevelEnum.Team_Leader]: 'Team Leader',
// }

// export const CONST_UserTypeText = {
//     [UserTypeEnum.LGU_Regular]: 'LGU',
//     [UserTypeEnum.LGU_Casual]: 'LGU',
//     [UserTypeEnum.LGU_Job_Order]: 'LGU',
//     [UserTypeEnum.ACDV_BART]: 'ACDV',
//     [UserTypeEnum.ACDV_CSO]: 'ACDV',
//     [UserTypeEnum.ACDV_PO]: 'ACDV',
//     [UserTypeEnum.ACDV_INDIVIDUAL]: 'ACDV',
//     [UserTypeEnum.National_Agency]: 'National Agency',
// }

// export const CONST_UserSubTypeText = {
//     [UserTypeEnum.LGU_Regular]: 'Regular',
//     [UserTypeEnum.LGU_Casual]: 'Casual',
//     [UserTypeEnum.LGU_Job_Order]: 'Job Order',
//     [UserTypeEnum.ACDV_BART]: 'BART',
//     [UserTypeEnum.ACDV_CSO]: 'CSO',
//     [UserTypeEnum.ACDV_PO]: 'PO',
//     [UserTypeEnum.ACDV_INDIVIDUAL]: 'INDIVIDUAL',
//     [UserTypeEnum.National_Agency]: '',
// }

// export const CONST_GenderText = {
//     [GenderEnum.Male]: 'Male',
//     [GenderEnum.Female]: 'Female',
// }

// export const CONST_TeamStatusText = {
//     [TeamStatusEnum.Active]: 'Active',
//     [TeamStatusEnum.Dispatched]: 'Dispatched',
// }
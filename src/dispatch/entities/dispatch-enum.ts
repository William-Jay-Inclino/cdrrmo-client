export enum DispatchStatusEnum{
    Queue = 1,
    ProceedingScene = 2,
    ArrivedScene = 3,
    ProceedingHospital = 4,
    ArrivedHospital = 5,
    ProceedingBase = 6,
    ArrivedBase = 7,
}


export enum SearchRefEnum{
    Team = 'Team',
    Dispatcher = 'Dispatcher',
    Emergency = 'Emergency type',
    Location = 'Location',
    CallerName = 'Caller name',
    CallerNumber = 'Caller number',
    Description = 'Description',
}
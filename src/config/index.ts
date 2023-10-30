

export const useFakeData = true  

// Note: (teamCount * teamMemberCount) should not exceed userCount
// team count is static. It is set to fakeTeams.length in src/helpers/faker,ts

export const fakeData = {
    userCount: 20,
    teamMemberCount: 5,
} 

export const routeNames = {
    users: 'users.route',
    dispatch: 'dispatch.route',
    dispatchForm: 'dispatchForm.route',
    teams: 'teams.route',
    teamMembers: 'teamMembers.route',
    barts: 'barts.route',
    csos: 'csos.route',
    nationalAgencies: 'nas.route',
    pos: 'pos.route',
    emergencies: 'emergencies.route',
}

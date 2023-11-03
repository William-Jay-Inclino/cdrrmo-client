
// Comp = component
export interface ICompSkill{
    training_id: string,
    description: string,
    selected: boolean,
    certificates: ICompCertificate[], 
}


export interface ICompCertificate{
    id: string,
    src: string,
}
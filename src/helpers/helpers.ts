
export const getEnumKey = (p: {enumVal: number, enumType: any}) :string => {
    let enumKey = Object.keys(p.enumType)[Object.values(p.enumType).indexOf(p.enumVal)]
    return enumKey
}
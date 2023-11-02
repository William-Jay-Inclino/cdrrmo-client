import { ISingleSelect } from "@/types/forms"

export const getEnumKey = (p: {enumVal: number, enumType: any}) :string => {
    let enumKey = Object.keys(p.enumType)[Object.values(p.enumType).indexOf(p.enumVal)]
    return enumKey
}


// used in forms for single select
// constant is an enum
export const constantToSingleSelect = (constant: any): ISingleSelect[] => {

    const items: ISingleSelect[] = []

    for(let item in constant){
        items.push({
            id: constant[item]['id'],
            text: constant[item]['text'],
            selected: false,
        })
    }

    items[0].selected = true

    return items
}
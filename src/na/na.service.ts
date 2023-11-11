import { INa } from "./entities"

class NationalAgency{

    getAllNAs() :INa[]{
        console.log('getAllNAs()')
        return []

    }

}

export const NAService = new NationalAgency()
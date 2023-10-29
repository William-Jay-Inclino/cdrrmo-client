
import { defineStore } from 'pinia'
import { IBART, ICSO, INationalAgency, IPO, IUser } from '../types'
import { generateFakeBART, generateFakeCSO, generateFakeNA, generateFakePO, generateFakeUsers } from './faker'
import { fakeBARTs, fakeNAs, fakeCSOs, fakePOs } from './faker'

export const appStore = defineStore('app', () => {
    
    // state

    // setters 
   
    // getters 
    

    return {
      
    }
})


// call this class in every component 

class App{

    isInitialize = false 

    fakeCSOs: ICSO[] = []
    fakeNas: INationalAgency[] = []
    fakeBarts: IBART[] = []
    fakePOs: IPO[] = []
    fakeUsers: IUser[] = []

    init(){
        console.log('class App init()')
        
        if(this.isInitialize) return
        
        this.fakeCSOs = generateFakeCSO({count: fakeCSOs.length})
        this.fakeNas = generateFakeNA({count: fakeNAs.length})
        this.fakeBarts = generateFakeBART({count: fakeBARTs.length})
        this.fakePOs = generateFakePO({count: fakePOs.length})
        this.fakeUsers = generateFakeUsers({count: 20})

        this.isInitialize  = true
    }

}

const app = new App()
app.init()

export{
    app
}

// methods


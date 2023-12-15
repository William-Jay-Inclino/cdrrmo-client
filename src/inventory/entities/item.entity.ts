import { IItemCategory, IStockMovement } from "."

export interface IItem {
    id: string 
    category_id: string 
    Category: IItemCategory
    StockMovement: IStockMovement[]
    name: string
    description: string 
    quantity: number 
    cost: number
    date_acquired: string 
    serial_number: string 
}
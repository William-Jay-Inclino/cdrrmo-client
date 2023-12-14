import { IItemCategory, IStockMovement } from "."

export interface IItem {
    id: String 
    category_id: String 
    Category: IItemCategory
    StockMovement: IStockMovement
    name: String
    description: String 
    quantity: Number 
    cost: Number 
    date_acquired: Date 
    serial_number: String 
}
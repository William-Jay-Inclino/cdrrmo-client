import { IItem, MovementTypeEnum } from "."

export interface IStockMovement {
    id: String 
    item_id: String 
    item: IItem 
    quantity: Number 
    movement_type: MovementTypeEnum
    movement_date: Date 
    remarks: String 
}
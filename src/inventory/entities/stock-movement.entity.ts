import { IItem, MovementTypeEnum } from "."
import { IUser } from "../../user"

export interface IStockMovement {
    id: String 
    item_id: String 
    item: IItem 
    user_ud: string
    user: IUser
    quantity: Number 
    movement_type: MovementTypeEnum
    movement_date: Date 
    remarks: String 
}
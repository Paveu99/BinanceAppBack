import {UserEntity} from "./user.entity";
import {TradeEntity} from "../trade";

export interface CreateUserReq extends UserEntity {
    passwordConfirmation: string
}

export type UpdateNameSurnameType = Omit<UserEntity, 'id' | 'email' | 'password'>

export type UpdateEmailType = Omit<UserEntity, 'id' | 'name' | 'surname' | 'password'>
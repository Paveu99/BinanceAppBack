import {UserEntity} from "./user.entity";

export interface CreateUserReq extends UserEntity {
    passwordConfirmation: string
}
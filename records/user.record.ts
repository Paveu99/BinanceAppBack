import {UserEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {genSalt, hash} from "bcrypt";

type UserRecordsResults = [UserRecord[], FieldPacket[]]
export class UserRecord implements UserEntity {

    public id?: string;
    public name: string;
    public surname: string;
    public email: string;
    public password: string;

    constructor(obj: UserEntity) {
        if (obj.name === null) {
            throw new ValidationError('Name must be given');
        }
        if (obj.surname === null) {
            throw new ValidationError('Surname must be given');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.surname = obj.surname;
        this.email = obj.email;
        this.password = obj.password;
    }

    static async listAll(): Promise<UserRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `users`") as UserRecordsResults
        return results.map(obj => new UserRecord(obj))
    }

    static async getOne(email: string): Promise<UserRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `users` WHERE `email` = :email", {
            email,
        }) as UserRecordsResults;
        return results.length === 0 ? null : new UserRecord(results[0]);
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid()
        }
        this.password = await hash(this.password, await genSalt(10));

        await pool.execute("INSERT INTO `users` VALUES(:id, :name, :surname, :email, :password)", {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
        });

        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `users` WHERE `id` = :id", {
            id: this.id,
        });
    }
}


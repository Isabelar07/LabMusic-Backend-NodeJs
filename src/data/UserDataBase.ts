import { User } from "../entities/User";
import { CustomError } from "../error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    public async insertUser(
        id: string,
        name: string,
        nickName: string,
        email: string,
        password: string
    ): Promise<void> {
        try {

            await this.getConnection()
            .insert({
                id, 
                name,
                nickName,
                email,
                password
            }).into(this.tableName.users)

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }
}
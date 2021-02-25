import { User } from "../entities/User";
import { CustomError } from "../error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    public async insertUser(
        user: User
    ): Promise<void> {
        try {

            await this.getConnection()
            .insert({
                id: user.id,
                name: user.name,
                nickName: user.nickName,
                email: user.email,
                password: user.password
            }).into(this.tableName.users)

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }
}
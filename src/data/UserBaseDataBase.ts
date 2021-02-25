import { User } from "../entities/User";
import { CustomError } from "../error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static TABLE_NAME = "LabMusic_Users";

    public async insertUser(
        user: User
    ): Promise<void> {
        try {

            await BaseDataBase.connection
            .insert({
                id: user.id,
                name: user.name,
                nickName: user.nickName,
                email: user.email,
                password: user.password
            }).into(UserDataBase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
    }
}
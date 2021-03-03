import { User } from "../entities/User";
import { CustomError } from "../error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static toUserModel(user: any): User {
        return new User(
            user.id,
            user.name,
            user.nickName,
            user.email,
            user.password
        );
    }

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

    public async selectUserByEmail(email: string): Promise<User> {

        try {

            const result = await this.getConnection()
            .select("*")
            .from(this.tableName.users)
            .where({ email })

            return UserDataBase.toUserModel(result[0])

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }
        
    }
}
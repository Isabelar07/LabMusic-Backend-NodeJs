import { User } from "../model/User";
import { CustomError } from "../error/CustomError";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase {

    private static TABLE_NAME = "LabMusic_Users"

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
            throw new CustomError(500, "An unexpected error ocurred" || error.sqlMessage || error.message)
        }
    }

    

    public async selectUserByEmail(email: string): Promise<User> {

        try {

            const result = await this.getConnection()
            .select("*")
            .from(UserDataBase.TABLE_NAME)
            .where({ email })

            return User.toUserModel(result[0])

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred" || error.sqlMessage || error.message)
        }  
        
    }

}
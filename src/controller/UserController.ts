import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDataBase } from "../data/BaseDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { LoginInputDTO, SignupInputDTO } from "../model/User";
import { CustomError } from "../error/CustomError";
import { Authenticator } from "../service/Authenticator";
import { HashManager } from "../service/HashManager";
import { IdGenerator } from "../service/IdGenerator";


const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new Authenticator(),
    new UserDataBase(),  
);

export class UserController {

    async signup(req: Request, res: Response){
        try {

            const input: SignupInputDTO = {
                name: req.body.name,
                nickName: req.body.nickName,
                email: req.body.email,
                password: req.body.password,  
            }

            const token = await userBusiness.createUser(input)

            res.status(200).send({ token })

        } catch (error) {
            throw new CustomError(500, "An unexpected error ocurred")
        }

        await BaseDataBase.destroyConnection();
    }

    async login(req: Request, res: Response) {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await userBusiness.getUserByEmail(loginData)

            res.status(200).send({ token })


    } catch (error) {
        throw new Error(error.sqlMessage || error.message)

    }

    await BaseDataBase.destroyConnection();
}
}
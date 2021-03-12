import { UserDataBase } from "../data/UserDataBase";
import { LoginInputDTO, SignupInputDTO } from "../model/User";
import { CustomError } from "../error/CustomError";
import { Authenticator } from "../service/Authenticator";
import { HashManager } from "../service/HashManager";
import { IdGenerator } from "../service/IdGenerator";

export class UserBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        public authenticator: Authenticator,
        private userDataBase: UserDataBase
    ) {}

    async createUser(user: SignupInputDTO) {

        if (!user.name || !user.nickName || !user.email || !user.password) {
            throw new CustomError(417, "Please, enter the information required")
        }

        if(!user.email.includes('@')) {
            throw new CustomError (417,"Invalid email")
        }

        if (user.password && user.password.length < 6) {
            throw new CustomError (411,"Enter at least 6 characters")
        }

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDataBase.insertUser(
            id,
            user.name,
            user.nickName,
            user.email,
            hashPassword,
        )

        const acessToken = this.authenticator.generateToken({ id });

        return acessToken
    }

    async getUserByEmail(user: LoginInputDTO) {

        try {

            if(!user.email || !user.password) {
                throw new CustomError(404, 'enter "email" or "nickname" and "password"')
            }
            
    
            const userFromDB = await this.userDataBase.selectUserByEmail(user.email);
    
            if(!userFromDB) {
                throw new CustomError(406, "user does not exist")
            }
    
            const passwordIsCorrect = await this.hashManager.compare(
                user.password,
                userFromDB.password
            )
    
            if (!passwordIsCorrect) {
                throw new CustomError(401, "Invalid password")
            }
    
            const acessToken = this.authenticator.generateToken({
                id: userFromDB.id
            })
    
            return acessToken

        } catch (error) {
            throw new CustomError(400,"Erro ao logar: "+error.sqlMessage);
        }
}
}
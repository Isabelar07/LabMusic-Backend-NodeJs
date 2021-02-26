import { UserDataBase } from "../data/UserBaseDataBase";
import { SignupInputDTO } from "../entities/User";
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
            throw new CustomError(204, "Please, enter the information required")
        }

        if(!user.email.includes('@')) {
            throw new CustomError (404,"Invalid email")
        }

        if (user.password.length < 6) {
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
}
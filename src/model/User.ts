export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly nickName: string,
        public readonly email: string,
        public readonly password: string
    ) {}

    static toUserModel(user: any): User {
        return user && new User(
            user.id,
            user.name,
            user.nickName,
            user.email,
            user.password
        );
    }
}

export interface SignupInputDTO {
    name: string,
    nickName: string,
    email: string,
    password: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}

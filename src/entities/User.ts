export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly nickName: string,
        public readonly email: string,
        public readonly password: string
    ) {}
}

export interface SignupInputDTO {
    name: string,
    nickName: string,
    email: string,
    password: string
}

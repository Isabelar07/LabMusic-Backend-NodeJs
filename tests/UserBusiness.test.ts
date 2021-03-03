import { UserBusiness } from "../src/business/UserBusiness";
import { SignupInputDTO, User } from "../src/entities/User";

const userDataBase = {
    createUser: jest.fn(async (user: User) => {})
}

const authenticator = {
    generateToken: jest.fn((token: {id: string}) => "tuts_tuts"),
    getTokenData: jest.fn((payload: string) => {})
}

const idGenerator = {
    generate: jest.fn(() => "abcdefghijk")
}

const hashManager = {
    hash: jest.fn((password: string) => "secret_pass"),
    compare: jest.fn((text: string, hash: string) => text === "123456" ? true : false)
}

const userBusiness = new UserBusiness(
    userDataBase as any,
    idGenerator as any,
    hashManager as any,
    authenticator as any 
)

describe("SignUp Test Flow", () => {

    test("Should return Missing Input Error on empty name", async() => {

        expect.assertions(2)

        const user = {
            name: "",
            nickName: "isaa",
            email: "isabela@gmail.com",
            password: "123456"

        } as SignupInputDTO

        try {

            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.message).toBe("Please, enter the information required")
            expect(error.statusCode).toBe(417); 

        }
            
    });  
})


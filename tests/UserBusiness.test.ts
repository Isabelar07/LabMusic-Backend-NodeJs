import { UserBusiness } from "../src/business/UserBusiness";
import { LoginInputDTO, SignupInputDTO, User } from "../src/model/User";

const userDataBase = {
    createUser: jest.fn(async (user: User) => {})
}

const authenticator = {
    generateToken: jest.fn((token: {id: string}) => "token_tuts"),
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

    test.skip("Should return Missing Input Error on empty name", async() => {

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

    test.skip("Should return Missing Input Error on empty nickname", async () => {

        expect.assertions(2)

        const user = {
            name: "Isabela",
            nickName: "",
            email: "isabela@gmail.com",
            password: "123456"

        } as SignupInputDTO

        try {

            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.statusCode).toBe(417);
            expect(error.message).toEqual("Please, enter the information required");
        }
    });

    test.skip("Should return Missing Input Error on empty email", async () => {

        expect.assertions(2)

        const user = {
            name: "Isabela",
            nickName: "isaa",
            email: "",
            password: "123456"
        } as SignupInputDTO

        try {

            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.statusCode).toBe(417);
            expect(error.message).toBe("Please, enter the information required")
        }
    });

    test.skip("Should return All addresses must have an @ Error on invalid email", async () => {

        expect.assertions(2)

        const user = {
            name: "Isabela",
            nickName: "isaa",
            email: "isabelagmail.com",
            password: "123456"

        } as SignupInputDTO

        try {

            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.statusCode).toBe(417);
            expect(error.message).toBe("Invalid email")
        }
    });

    test.skip("Should return Missing Input Error on empty password", async () => {

        expect.assertions(2)

        const user = {
            name: "Isabela",
            nickName: "isaa",
            email: "isabela@gmail.com",
            password: ""
        }

        try {

            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.statusCode).toBe(417);
            expect(error.message).toBe("Please, enter the information required")
        }
    });

    test.skip("Should return Invalid password Error on password with length shorter than 6", async () => {

        expect.assertions(2)

        const user = {
            name: "Isabela",
            nickName: "isaa",
            email: "isabela@gmail.com",
            password: "123"

        } as SignupInputDTO

        try {

            await userBusiness.createUser(user)

        } catch (error) {
            expect(error.statusCode).toBe(411);
            expect(error.message).toBe("Enter at least 6 characters")
        }
    });  
})



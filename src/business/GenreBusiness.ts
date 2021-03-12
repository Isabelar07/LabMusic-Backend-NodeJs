import { GenreDataBase } from "../data/GenreDataBase";
import { CustomError } from "../error/CustomError";
import { Genre } from "../model/Genre";
import { Authenticator } from "../service/Authenticator";
import { IdGenerator } from "../service/IdGenerator";

export class GenreBusiness {


    // constructor(
    //     private idGenerator: IdGenerator,
    //     public authenticator: Authenticator,
    //     private genreDataBase: GenreDataBase
    // ) {}

    async createGenre(genre: string, token: string): Promise<void> {
        try {

            if (!genre) {
                throw new CustomError(417, "Invalid genre. Please, fill the field.")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate();

            const authenticator = new Authenticator()
            const verifiedToken = authenticator.getTokenData(token);

            if (!verifiedToken) {
                throw new CustomError(401, "Please log in")
            }

            const genreDataBase = new GenreDataBase()
            await genreDataBase.insertGenre(id, genre)

        } catch(error) {
            throw new CustomError(400, error.sqlMessage || error.message)
        }
    }

    async getGenre(token: string): Promise<Genre[]> {
        try {

            const authenticator = new Authenticator()
            const verifiedToken = authenticator.getTokenData(token);

            if (!verifiedToken) {
                throw new CustomError(401, "Please log in")
            }

            const genreDataBase = new GenreDataBase()

            const genres: Genre[] = await genreDataBase.getGenre();

            return genres

        } catch (error) {
            throw new CustomError(400, error.sqlMessage || error.message)
        }
    }
}
import { GenreDataBase } from "../data/GenreDataBase";
import { MusicDataBase } from "../data/MusicDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { Genre } from "../model/Genre";
import { Music, MusicInputDTO } from "../model/Music";
import { Authenticator } from "../service/Authenticator";
import { IdGenerator } from "../service/IdGenerator";
import { GenreBusiness } from "./GenreBusiness";
import moment from "moment" 

export class MusicBusiness {

    // constructor(
    //     private idGenerator: IdGenerator,
    //     public authenticator: Authenticator,
    //     private musicDataBase: MusicDataBase,
    //     public genreBusiness: GenreBusiness,
    //     public userDataBase: UserDataBase
    // ) {}

    async createMusic(music: MusicInputDTO, token: string): Promise<void> {

        try {

            if (!music.title || !music.author || !music.file || !music.album || music.genre.length < 1) {
                throw new CustomError(417, "Invalid input. Please, fill the fields correctly.");
            }

            const authenticator = new Authenticator()

            const verifiedToken = await authenticator.getTokenData(token)

            if (!verifiedToken) {
                throw new CustomError(401, "Invalid token")
            }

            const genreBusiness = new GenreBusiness()
            const existingGenres = await genreBusiness.getGenre(token);

            const checkedGenres = existingGenres.filter((genre: Genre) => {
                return music.genre.includes(genre.genre);
            });

            if (checkedGenres.length < 1) {
                throw new CustomError(409, "The genre must exist")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate();

            const userDataBase = new UserDataBase()

            const user_id = await userDataBase.selectUserById((verifiedToken).id) 

            const creationDate = Date.now()

            const date = moment(creationDate).format('DD//MM/YYYY')

            const musics: Music = {
                id: id,
                title: music.title,
                author: music.author,
                date,
                file: music.file,
                album: music.album,
                user_id: user_id.id,
                genre: checkedGenres,
                
            }

            const musicDataBase = new MusicDataBase()

            await musicDataBase.createMusic(musics)

        } catch (error) {
            throw new CustomError(400, error.sqlMessage || error.message)
        }
    }
}
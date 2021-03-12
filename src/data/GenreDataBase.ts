import { CustomError } from "../error/CustomError";
import { Genre } from "../model/Genre";
import { BaseDataBase } from "./BaseDataBase";

export class GenreDataBase extends BaseDataBase {

    private static TABLE_NAME = "LabMusic_Genre";

    public async insertGenre(
        id: string, 
        genre: string
        ): Promise<void> {

        try {

            await this.getConnection()
            .insert({
                id,
                genre
            }).into(GenreDataBase.TABLE_NAME)

        } catch (error) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }

    public async getGenre(): Promise<Genre[]> {

        try {

            const result = await this.getConnection()
            .select("*")
            .from(GenreDataBase.TABLE_NAME);

            const genres: Genre[] = [];

            for (let genre of result) {
                genres.push({
                    id: genre.id,
                    genre: genre.genre
                });
            }

            return genres

        } catch (error) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}
import { CustomError } from "../error/CustomError";
import { Genre } from "../model/Genre";
import { Music } from "../model/Music";
import { BaseDataBase } from "./BaseDataBase"

export class MusicDataBase extends BaseDataBase {

    private static TABLE_NAME = "LabMusic_Music";
    private static INTER_TABLE_NAME = "LabMusic_Music_Genre"

    async createMusic(music: Music) {

        try {

            await this.getConnection()
            .insert({
                id: music.id,
                title: music.title,
                author: music.author,
                date: music.date,
                file: music.file,
                album: music.album,
                user_id: music.user_id
            }).into(MusicDataBase.TABLE_NAME)

            if (music.genre) {
                for (let genres of music.genre) {
                    await this.getConnection()
                    .insert({
                        music_id: music.id,
                        genre_id: genres.id
                    }).into(MusicDataBase.INTER_TABLE_NAME);
                }
            }

        } catch (error) {
            throw new CustomError(500, error.sqlMessage || error.message)
        }
    }
}
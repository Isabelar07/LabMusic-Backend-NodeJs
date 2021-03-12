import { Request, Response } from "express";
import { GenreBusiness } from "../business/GenreBusiness";
import { MusicBusiness } from "../business/MusicBusiness";
import { GenreDataBase } from "../data/GenreDataBase";
import { MusicDataBase } from "../data/MusicDataBase";
import { UserDataBase } from "../data/UserDataBase";
import { CustomError } from "../error/CustomError";
import { MusicInputDTO } from "../model/Music";
import { Authenticator } from "../service/Authenticator";
import { IdGenerator } from "../service/IdGenerator";


export class MusicController {

    async createMusic(req: Request, res: Response) {
        try {

            const token = req.headers.authorization!;

            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                file: req.body.file,
                album: req.body.album,
                genre: req.body.genre
            }

            // const musicBusiness = new MusicBusiness(
            //     new IdGenerator(),
            //     new Authenticator(),
            //     new MusicDataBase(),
            //     new GenreDataBase(),
            //     new UserDataBase()
            // );

            const musicBusiness = new MusicBusiness()

            await musicBusiness.createMusic(input,token)


            res.status(200).send({message: "created music!"})

        } catch (error) {
            res.status(error.code || 400).send({message: error.message});
        }
    }
}
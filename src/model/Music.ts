import { Genre } from "./Genre";

export class Music {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly date: string,
        public readonly file: string,
        public readonly album: string,
        public readonly user_id: string,
        public readonly genre?: Genre[]
    ) {}
}

export interface MusicInputDTO {
    title: string,
    author: string,
    file: string,
    album: string,
    genre: string[]
}
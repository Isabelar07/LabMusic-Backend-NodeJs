export class Genre {
    constructor(
        public readonly id: string,
        public readonly genre: string
    ){}
}

export interface GenreInputDTO {
    genre: string,
    token: string
}
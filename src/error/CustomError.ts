export class CustomError extends Error {
    constructor(public error: number, message: string){
        super(message);
        this.error = error;
    }

}
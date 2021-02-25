import knex from "knex"
import Knex from "knex";


export class BaseDataBase {

    protected connection: Knex = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: 3306,
            database: process.env.DB_NAME
        }
    })
}
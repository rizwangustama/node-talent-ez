import express from "express";
import bodyparser from "body-parser";
import router from "./router";
import morgan from "morgan";
import config from "config";
import * as middleware from "./middleware";
import cors from "cors";

export const run =  async (port = 3000) => {
    try {
        const api = express()

        api.use(cors())
        api.use(morgan('combined', {
            skip: function (req, res) { return res.statusCode < 400 }
        }))
        api.use(bodyparser.urlencoded({
            extended: true  
        }));
        api.use(bodyparser.json({ limit: '10mb' }));
        api.use("/v1", router)
        api.use(middleware.notfound)
        api.use(middleware.error)

        await api.listen(port)

        return Promise.resolve(null)
    } catch (error) {
        return Promise.reject(error)
    }
}
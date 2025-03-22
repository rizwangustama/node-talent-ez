import logger from "./../../../../pkg/utils/logger";
import {
    Auth as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller  {
    usecase = new Usecase()

    login = async (req, res, next) => {
        try {
            await Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }).validateAsync(req.body)

            let data = await this.usecase.login({
                username: req.body.username,
                password: req.body.password,
            })

            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data,
            })
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }

    register = async (req, res, next) => {
        try {
            await Joi.object({
                phone: Joi.string().required().pattern(new RegExp('^(0)8[1-9][0-9]{6,9}$')),
                email: Joi.string().required().email(),
                password: Joi.string().required(),
            }).validateAsync(req.body)

            let data = await this.usecase.register({
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            })

            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data,
            })
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
}
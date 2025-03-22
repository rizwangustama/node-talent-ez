import BaseController from "../controller";
import models, {connection} from "../../../model";
import {
    Recruiter as Usecase
} from "../../../usecase";
import Joi from "joi";
import logger from "./../../../../pkg/utils/logger";


export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Recruiter,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    status: Joi.string().required(),
                    expired_at: Joi.date().iso(),
                    status: Joi.string().required(),
                    npwp: Joi.string().required(),
                    identity_number: Joi.string().required(),
                    identity_file: Joi.any(),
                    bank_account_number: Joi.string().required(),
                    bank_account_name: Joi.string().required(),
                    bank_name: Joi.string().required(),
                    user_id: Joi.number(),
                }).unknown(true),
                update: Joi.object({
                    status: Joi.string(),
                    expired_at: Joi.date().iso(),
                    status: Joi.string(),
                    npwp: Joi.string(),
                    identity_number: Joi.string(),
                    identity_file: Joi.any(),
                    bank_account_number: Joi.string(),
                    bank_account_name: Joi.string(),
                    bank_name: Joi.string(),
                    user_id: Joi.number(),
                }).unknown(true)
            }
        })
    }

    show = async (req, res, next) => {
        try {
            const data = await this.usecase.findByID(req.params.id)
            res.status(200).json({
                response: true,
                message: `successfully retrieve`,
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

    create = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            if (this.rules?.store) {
                await this.rules.store.validateAsync(req.body)
            }

            //handling uploaded files
            if (!req.file) {
                res.status(400).json({
                    response: false,
                    message: `identity_file required`,
                })
            }

            let file = {
                originalname: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                buffer: req.file.buffer,
                value: req.file.buffer.toString("base64"),
            }

            let data = await this.usecase.create({
                ...req.body,
                identity_file: file,
            }, {
                transaction: trx,
            })

            await trx.commit()
            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data,
            })
        } catch (error) {
            console.error(error)
            await trx.rollback()
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }

    update = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            if (this.rules?.update) {
                await this.rules.update.validate(req.body)
            }

            //handling uploaded files            

            let file = {
                originalname: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                buffer: req.file.buffer,
                value: req.file.buffer.toString("base64"),
            }
            
            let data = await this.usecase.update(req.params.id, {
                ...req.body,
                identity_file: file,
                user: req.user,
            }, {
                transaction: trx,
            })
            await trx.commit()

            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data
            })
        } catch (error) {
            await trx.rollback()
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
}
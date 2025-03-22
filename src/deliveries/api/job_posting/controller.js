import BaseController from "../controller";
import models, {connection} from "../../../model";
import {
    JobPosting as Usecase
} from "../../../usecase";
import Joi from "joi";
import logger from "./../../../../pkg/utils/logger";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.JobPosting,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    name: Joi.string().required(),
                    contract_type: Joi.string().required(),
                    employement_status: Joi.string().required(),
                    placement_type: Joi.string().required(),
                    description: Joi.string().required(),
                    requirements: Joi.array().items(Joi.string()).required(),
                    skills: Joi.array().items(Joi.string()),
                    location: Joi.string().required(),
                    languages: Joi.array().items(Joi.string()),
                    benefits: Joi.array().items(Joi.string()),
                    is_negotiable: Joi.boolean().default(false),
                    expired_at: Joi.date().iso(),
                    sallary_start: Joi.number().precision(2),
                    sallary_end: Joi.number().precision(2),
                    currency: Joi.string().max(10),
                    is_collaborate: Joi.boolean().default(true),
                    tags: Joi.array().items(Joi.string()),
                    company_id: Joi.number().required(),
                }),
                update: Joi.object({
                    name: Joi.string(),
                    contract_type: Joi.string(),
                    employement_status: Joi.string(),
                    placement_type: Joi.string(),
                    description: Joi.string(),
                    requirements: Joi.array().items(Joi.string()),
                    skills: Joi.array().items(Joi.string()),
                    location: Joi.string(),
                    languages: Joi.array().items(Joi.string()),
                    benefits: Joi.array().items(Joi.string()),
                    is_negotiable: Joi.boolean(),
                    expired_at: Joi.date().iso(),
                    sallary_start: Joi.number().precision(2),
                    sallary_end: Joi.number().precision(2),
                    currency: Joi.string().max(10),
                    is_collaborate: Joi.boolean(),
                    tags: Joi.array().items(Joi.string()),
                    company_id: Joi.number(),
                })
            }
        })
    }

    index = async (req, res, next) => {
        try {
            if (this.rules?.index) {
                await this.rules.index.validate(req.query)
            }
            let data = await this.usecase.find({
                ...req.query,
                user: req.user,
            })
            let result = {
                response: true,
                message: `successfully retrieve`,
                data: data?.rows || data,
            }
            if (req.query.page) {
                result.page = req.query.page
                result.limit = req.query.limit
                result.total = data?.count || data.length
                result.total_page = Math.ceil(result.total / req.query.limit)
            }
            res.status(200).json(result)
        } catch (error) {
            console.error(error)
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }

    apply = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            await Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                phone: Joi.string().required(),
                description: Joi.string().required(),
                // resume: Joi.any(),
                currency: Joi.string().required(),
                expected_sallary: Joi.string().required(),
                current_sallary: Joi.string().required(),
                job_posting_id: Joi.number().required()
            }).unknown().validateAsync(req.body)

            //handling uploaded files
            if (!req?.file) {
                return res.status(400).json({
                    response: false,
                    message: `resume required`,
                })
            }

            let file = {
                originalname: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
                buffer: req.file.buffer,
                value: req.file.buffer.toString("base64"),
            }

            let data = await this.usecase.apply({
                ...req.body,
                resume: file,
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


}
import BaseController from "../controller";
import models from "../../../model";
import {
    JobPostingShare as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.JobPostingShare,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    price_talent: Joi.number().required().precision(2),
                    start_at: Joi.date().required().iso(),
                    end_at: Joi.date().required().iso(),
                    status: Joi.string().required().max(10),
                    type: Joi.string().required().max(50),
                    billable_period: Joi.number(),
                    billable_period_type: Joi.string().max(10),
                    job_posting_id: Joi.number().required(),
                }),
                update: Joi.object({
                    price_talent: Joi.number().precision(2),
                    start_at: Joi.date().iso(),
                    end_at: Joi.date().iso(),
                    status: Joi.string().max(10),
                    type: Joi.string().max(50),
                    billable_period: Joi.number(),
                    billable_period_type: Joi.string().max(10),
                    job_posting_id: Joi.number(),
                })
            }
        })
    }
}
import BaseController from "../controller";
import models from "../../../model";
import {
    JobPostingShareInvoice as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.JobPostingShareInvoice,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    amount: Joi.number().required().precision(2),
                    currency: Joi.string().required().max(10),
                    job_posting_id: Joi.number().required(),
                    job_posting_share_id: Joi.number().required(),
                    invoice_id: Joi.number().required(),
                    recruiter_id: Joi.number().required(),
                }),
                update: Joi.object({
                    amount: Joi.number().precision(2),
                    currency: Joi.string().max(10),
                    job_posting_id: Joi.number(),
                    job_posting_share_id: Joi.number(),
                    invoice_id: Joi.number(),
                    recruiter_id: Joi.number(),
                })
            }
        })
    }
}
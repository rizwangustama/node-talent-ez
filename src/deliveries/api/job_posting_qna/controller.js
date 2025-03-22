import BaseController from "../controller";
import models from "../../../model";
import {
    JobPostingQNA as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.JobPostingQNA,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    question: Joi.string().required(),
                    answer: Joi.string().required(),
                    type: Joi.string().required(),
                    is_mandatory: Joi.boolean().required(),
                    job_posting_id: Joi.number().required(),
                }),
                update: Joi.object({
                    question: Joi.string(),
                    answer: Joi.string(),
                    type: Joi.string(),
                    is_mandatory: Joi.boolean(),
                    job_posting_id: Joi.number(),
                })
            }
        })
    }
}
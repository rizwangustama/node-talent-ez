import BaseController from "../controller";
import models from "../../../model";
import {
    TalentApply as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.TalentApply,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    status: Joi.string().required(),
                    talent_id: Joi.number().required(),
                    job_posting_id: Joi.number().required(),
                }),
                update: Joi.object({
                    status: Joi.string(),
                    talent_id: Joi.number(),
                    job_posting_id: Joi.number(),

                })
            }
        })
    }
}
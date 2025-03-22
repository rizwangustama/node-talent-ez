import BaseController from "../controller";
import models from "../../../model";
import {
    TalentExperience as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.TalentExperience,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    company: Joi.string().required(),
                    role: Joi.string().required(),
                    position: Joi.string().required(),
                    company_industry: Joi.string().required(),
                    start_at: Joi.date().iso().required(),
                    end_at: Joi.date().iso().required(),
                    talent_id: Joi.number().required(),
                }),
                update: Joi.object({
                    company: Joi.string(),
                    role: Joi.string(),
                    position: Joi.string(),
                    company_industry: Joi.string(),
                    start_at: Joi.date().iso(),
                    end_at: Joi.date().iso(),
                    talent_id: Joi.number(),

                })
            }
        })
    }
}
import BaseController from "../controller";
import models from "../../../model";
import {
    TalentAchievement as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.TalentAchievement,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    name: Joi.string().required(),
                    issuer: Joi.string().required(),
                    year: Joi.number().required(),
                    object_id: Joi.string().required(),
                    link: Joi.string().required(),
                    talent_id: Joi.number().required(),
                }),
                update: Joi.object({
                    name: Joi.string(),
                    issuer: Joi.string(),
                    year: Joi.number(),
                    object_id: Joi.string(),
                    link: Joi.string(),
                    talent_id: Joi.number(),

                })
            }
        })
    }
}
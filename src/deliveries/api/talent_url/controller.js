import BaseController from "../controller";
import models from "../../../model";
import {
    TalentUrl as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.TalentUrl,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    platform: Joi.string().required(),
                    value: Joi.string().required(),
                    talent_id: Joi.number().required(),
                }),
                update: Joi.object({
                    platform: Joi.string(),
                    value: Joi.string(),
                    talent_id: Joi.number(),
                })
            }
        })
    }
}
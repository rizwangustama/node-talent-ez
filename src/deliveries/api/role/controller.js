import BaseController from "../controller";
import models from "../../../model";
import {
    Role as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Role,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    code: Joi.string().required(),
                    name: Joi.string().required(),
                    description: Joi.string(),
                }),
                update: Joi.object({
                    code: Joi.string(),
                    name: Joi.string(),
                    description: Joi.string(),
                })
            }
        })
    }
}
import BaseController from "../controller";
import models from "../../../model";
import {
    Reference as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Reference,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    value: Joi.string().required(),
                    type: Joi.string().required(),
                }),
                update: Joi.object({
                    value: Joi.string(),
                    type: Joi.string(),
                })
            }
        })
    }
}
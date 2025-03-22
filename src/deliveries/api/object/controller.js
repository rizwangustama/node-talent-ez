import BaseController from "../controller";
import models from "../../../model";
import {
    Obj as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Obj,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    value: Joi.string().required(),
                    platform: Joi.string().required().max(100),
                }),
                update: Joi.object({
                    value: Joi.string(),
                    platform: Joi.string().max(100),
                })
            }
        })
    }
}
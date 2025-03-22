import BaseController from "../controller";
import models from "../../../model";
import {
    Company as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Company,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    name: Joi.string().required(),
                    industry: Joi.string(),
                    pic_name: Joi.string(),
                    phone: Joi.string(),
                    size: Joi.string(),
                    location: Joi.string(),
                    website: Joi.string(),
                    about: Joi.string(),
                    nib: Joi.string(),
                    npwp: Joi.string(),
                    is_verified: Joi.boolean().default(false),
                }).unknown(true),
                update: Joi.object({
                    name: Joi.string(),
                    industry: Joi.string(),
                    pic_name: Joi.string(),
                    phone: Joi.string(),
                    size: Joi.string(),
                    location: Joi.string(),
                    website: Joi.string(),
                    about: Joi.string(),
                    nib: Joi.string(),
                    npwp: Joi.string(),
                    is_verified: Joi.boolean(),
                }).unknown(true),
            }
        })
    }
}
import BaseController from "../controller";
import models from "../../../model";
import {
    User as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.User,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    name: Joi.string().required(),
                    phone: Joi.string().required().max(16).min(9),
                    email: Joi.string().required().max(50),
                    status: Joi.string().required(),
                    description: Joi.string(),
                    password: Joi.string(),
                    role_id: Joi.number().required(),
                    profile_project_id: Joi.string(),
                    google_id: Joi.string(),
                    linkedin_id: Joi.string(),
                }),
                update: Joi.object({
                    name: Joi.string(),
                    phone: Joi.string().max(16).min(9),
                    email: Joi.string().max(50),
                    status: Joi.string(),
                    description: Joi.string(),
                    password: Joi.string(),
                    role_id: Joi.number(),
                    profile_project_id: Joi.string(),
                    google_id: Joi.string(),
                    linkedin_id: Joi.string(),
                })
            }
        })
    }
}
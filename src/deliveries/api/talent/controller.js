import BaseController from "../controller";
import models from "../../../model";
import {
    Talent as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Talent,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    name: Joi.string().required(),
                    gender: Joi.string().required(),
                    date_of_birth: Joi.date().iso().required(),
                    phone: Joi.string().required().max(16).min(9),
                    email: Joi.string().required().max(50),
                    information: Joi.string(),
                    resume_object_id: Joi.string().required(),
                    portfolio_object_id: Joi.string(),
                    resume_object_id: Joi.string().required(),
                    position: Joi.string().required(),
                    seeker_status: Joi.string().required().max(10),
                    experience_level: Joi.string().required().max(50),
                    current_sallary: Joi.number().required().precision(2),
                    expected_sallary: Joi.number().required().precision(2),
                    currency: Joi.string().required().max(10),
                    nationalization: Joi.string().required(),
                    roles: Joi.array().items(Joi.string()).required(),
                    skills: Joi.array().items(Joi.string()).required(),
                    user_id: Joi.number().required(),
                    recruiter_id: Joi.number().required(),
                }),
                update: Joi.object({
                    name: Joi.string(),
                    gender: Joi.string(),
                    date_of_birth: Joi.date().iso(),
                    phone: Joi.string().max(16).min(9),
                    email: Joi.string().max(50),
                    information: Joi.string(),
                    resume_object_id: Joi.string(),
                    portfolio_object_id: Joi.string(),
                    resume_object_id: Joi.string(),
                    position: Joi.string(),
                    seeker_status: Joi.string().max(10),
                    experience_level: Joi.string().max(50),
                    current_sallary: Joi.number().precision(2),
                    expected_sallary: Joi.number().precision(2),
                    currency: Joi.string().max(10),
                    nationalization: Joi.string(),
                    roles: Joi.array().items(Joi.string()),
                    skills: Joi.array().items(Joi.string()),
                    user_id: Joi.number(),
                    recruiter_id: Joi.number(),
                })
            }
        })
    }
}
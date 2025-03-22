import BaseController from "../controller";
import models from "../../../model";
import {
    Invoice as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.Invoice,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    gross_amount: Joi.number().required().precision(2),
                    net_amount: Joi.number().required().precision(2),
                    currency: Joi.string().required().alphanum().max(10),
                    recruiter_id: Joi.number().required(),
                }),
                update: Joi.object({
                     gross_amount: Joi.number().precision(2),
                    net_amount: Joi.number().precision(2),
                    currency: Joi.string().alphanum().max(10),
                    recruiter_id: Joi.number(),
                })
            }
        })
    }
}
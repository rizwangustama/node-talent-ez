import BaseController from "../controller";
import models from "../../../model";
import {
    InvoiceCharge as Usecase
} from "../../../usecase";
import Joi from "joi";

export default class Controller extends BaseController {
    constructor() {
        super({
            model: models.InvoiceCharge,
            usecase: new Usecase(),
            rules: {
                store: Joi.object({
                    amount: Joi.number().required(),
                    value: Joi.string().required(),
                    currency: Joi.string().required().alphanum().max(10),
                    invoice_id: Joi.number().required(),
                }),
                update: Joi.object({
                    amount: Joi.number(),
                    value: Joi.string(),
                    currency: Joi.string().alphanum().max(10),
                    invoice_id: Joi.number(),
                })
            }
        })
    }
}
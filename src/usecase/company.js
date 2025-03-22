import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";

export class Company extends Usecase {
    constructor() {
        const exceptions = {
            keywords: ["id","is_verified","created_at","updated_at","deleted_at"]
        }
        super(models.Company, exceptions)
    }
}
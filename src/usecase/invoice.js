import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";

export class Invoice extends Usecase {
    constructor(){
        super(models.Invoice)
    }
}
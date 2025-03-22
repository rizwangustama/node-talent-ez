import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";

export class TalentUrl extends Usecase {
    constructor(){
        super(models.TalentUrl)
    }
}
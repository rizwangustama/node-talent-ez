import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";

export class TalentExperience extends Usecase {
    constructor(){
        super(models.TalentExperience)
    }
}
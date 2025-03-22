import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";

export class TalentPool extends Usecase {
    constructor(){
        super(models.TalentPool)
    }
}
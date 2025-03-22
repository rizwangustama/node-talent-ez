import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";

export class Reference extends Usecase {
    constructor(){
        super(models.Reference)
    }
}
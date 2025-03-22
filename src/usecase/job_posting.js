import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";
import { v4 as uuid } from 'uuid'

export class JobPosting extends Usecase {
    constructor() {
        const exceptions = {
            keywords: ["id","is_collaborate","created_at","updated_at","deleted_at", "requirements","benefits","skills","languages","is_negotiable","expired_at","sallary_start","sallary_end","tags","company_id"]
        }
        super(models.JobPosting,exceptions)
    }

    find = async (payload) => {
        try {
            let keywordQ = {}
            if (payload.keyword) {
                let cols = []
                for (const key in this.model.rawAttributes) {
                    if (this.exceptions?.keywords && this.exceptions?.keywords?.length > 0) {
                        if (this.exceptions?.keywords.includes(key)) {
                            continue                            
                        }
                    }
                    cols.push({
                        [key]: {
                            [Op.iLike]: `%${payload.keyword}%`
                        }
                    })
                }
                keywordQ = {
                    [Op.or]: cols
                }
            }
            let data = await this.model.findAndCountAll({
                where: {
                    ...(this.bindFilter(payload)),
                    ...keywordQ,
                },
                ...(this.bindPagination(payload)),
                attributes: {
                    exclude: ['deleted_at']
                },
                ...(this.bindSorting(payload)),
                include: [
                    {
                        model: models.Company,
                        as: "company"
                    }
                ]
            })
            return data
        } catch (error) {
            throw error
        }
    }
    findByID = async (id) => {
        try {
            let data = await this.model.findByPk(id, {
                attributes: {
                    exclude: ['deleted_at']
                },
                include: [
                    {
                        model: models.Company,
                        as: "company"
                    }
                ]
            })
            if (!data) {
                throw new Error("data not found")
            }
            return data
        } catch (error) {
            throw error
        }
    }
    apply = async (payload, options = {}) => {
        try {
            let Obj = null
            //process file
            if (payload?.resume) {
                const item = payload?.resume
                //store object
                let name = `${uuid()}.${item.originalname.split(".")[item.originalname.split(".").length-1]}`
                Obj = await models.Obj.create({
                    name: name,
                    type: item.mimeType,
                    size: item.size,
                    value: item.value,
                })
            }

            //create talent
            const [talent, created] = await models.Talent.findOrCreate({
                where: {
                    [Op.or]: [
                        {phone: payload.phone},
                        {email: payload.email},
                    ]
                }, 
                defaults: {
                    name: payload.name,
                    email: payload.email,
                    phone: payload.phone,
                    current_sallary: payload.current_sallary,
                    expected_sallary: payload.expected_sallary,
                    currency: payload.currency,
                },
                options,
            })

            //create talent applies
            const talent_applies = await models.TalentApply.create({
                job_posting_id: payload.job_posting_id,
                talent_id: talent.id,
                current_sallary: payload.current_sallary,
                expected_sallary: payload.expected_sallary,
                currency: payload.currency,
                resume_object_id: Obj.id,
            }, {options})
             
            return {
                talent_applies,
                talent,
            }
         } catch (error) {
            console.error(error)
            throw error
        }
    }
}
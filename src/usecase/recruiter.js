import moment from "moment";
import models from "../model";
import Usecase from './usecase'
import {QueryTypes} from 'sequelize';
import { Op } from "sequelize";
import { v4 as uuid } from 'uuid'

export class Recruiter extends Usecase {
    constructor() {
        const exceptions = {
            keywords: ["identity_object_id","expired_at","user_id","id","is_verified","created_at","updated_at","deleted_at"]
        }
        super(models.Recruiter,exceptions)
    }

    create = async (payload, options = {}) => {
         try {
            let Obj = null
            let body = {}
            for (const key in this.model.rawAttributes) {
                if (Object.hasOwnProperty.call(payload, key)) {
                    body[key] = payload[key]
                }
            }

            //process file
            if (payload?.identity_file) {
                const item = payload?.identity_file
                //store object
                let name = `${uuid()}.${item.originalname.split(".")[item.originalname.split(".").length-1]}`
                Obj = await models.Obj.create({
                    name: name,
                    type: item.mimeType,
                    size: item.size,
                    value: item.value,
                })
            }
             
            if (body?.expired_at == null || body?.expired_at == undefined || body?.expired_at == "") {
                body.expired_at = moment().toISOString()
            }

            let data = await this.model.create({
                ...body,
                identity_object_id: Obj?.id,
            }, options)
            return data
         } catch (error) {
            console.error(error)
            throw error
        }
    }
    
    update = async (id, payload, options = {}) => {
        try {
            let body = {}
            for (const key in this.model.rawAttributes) {
                if (Object.hasOwnProperty.call(payload, key)) {
                    body[key] = payload[key]
                }
            }
            let data = await this.model.findOne({
                where: {
                    id,
                },
                include: [
                    {
                        as: "identity",
                        model: models.Obj,
                    }
                ]
            })
            if (!data) {
                throw new Error("data not found")
            }
            for (const key in body) {
                if (Object.hasOwnProperty.call(data.toJSON(), key)) {
                    data[key] = body[key]
                }
            }

            if (data?.identity_object_id) {
                const obj = await models.Obj.findByPk(data?.identity_object_id)
                const base64 = "data:image/jpeg;base64," + obj.value
                obj.value = base64
                data.identity = obj
            }

            //process file
            if (payload?.identity_file && payload?.identity_file?.originalname != data?.identity?.name) {
                const item = payload?.identity_file
                //delete object
                await models.Obj.destroy({
                    where: {
                        id: data?.identity_object_id,
                    }
                }, options)
                
                //store object
                let name = `${uuid()}.${item.originalname.split(".")[item.originalname.split(".").length-1]}`
                const obj = await models.Obj.create({
                    name: name,
                    type: item.mimeType,
                    size: item.size,
                    value: item.value,
                })
                data.identity_object_id = obj.id

            }
            
            data = await data.save(options)
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
                        as: "identity",
                        model: models.Obj,
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
}
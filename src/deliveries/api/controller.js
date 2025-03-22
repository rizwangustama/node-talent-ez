import joi from "joi";
import logger from "./../../../pkg/utils/logger";
import {model, connection} from "./../../model";

export default class Controller {
    constructor({ model, rules, usecase }) {
        this.model = model
        this.rules = rules
        this.usecase = usecase
    }
    index = async (req, res, next) => {
        try {
            if (this.rules?.index) {
                await this.rules.index.validate(req.query)
            }
            let data = await this.usecase.find({
                ...req.query,
                user: req.user,
            })
            let result = {
                response: true,
                message: `successfully retrieve`,
                data: data?.rows || data,
            }
            if (req.query.page) {
                result.page = req.query.page
                result.limit = req.query.limit
                result.total = data?.count || data.length
                result.total_page = Math.ceil(result.total / req.query.limit)
            }
            res.status(200).json(result)
        } catch (error) {
            console.error(error)
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
    show = async (req, res, next) => {
        try {
            const data = await this.usecase.findByID(req.params.id)
            res.status(200).json({
                response: true,
                message: `successfully retrieve`,
                data,
            })
        } catch (error) {
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
    create = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            if (this.rules?.store) {
                await this.rules.store.validateAsync(req.body)
            }

            let data = await this.usecase.create(req.body, {
                transaction: trx,
            })

            await trx.commit()
            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data,
            })
        } catch (error) {
            await trx.rollback()
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
    createBulk = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            if (this.rules?.bulkStore) {
                await this.rules.bulkStore.validateAsync(req.body)
            }

            let data = await this.usecase.createBulk(req.body, {
                transaction: trx,
            })
            await trx.commit()

            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data,
            })
        } catch (error) {
            await trx.rollback()
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
    update = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            if (this.rules?.update) {
                await this.rules.update.validate(req.body)
            }
            let data = await this.usecase.update(req.params.id, {
                ...req.body,
                user: req.user,
            }, {
                transaction: trx,
            })
            await trx.commit()

            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data
            })
        } catch (error) {
            await trx.rollback()
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }
    delete = async (req, res, next) => {
        const trx = await connection.transaction()

        try {
            const data = await this.usecase.delete(req.params.id, {
                transaction: trx,
            })
            await trx.commit()

            res.status(200).json({
                response: true,
                message: `successfully proceed`,
                data,
            })
        } catch (error) {
            await trx.rollback()
            logger.error(error)
            res.status(500).json({
                response: false,
                message: error.message,
            })
        }
    }

}
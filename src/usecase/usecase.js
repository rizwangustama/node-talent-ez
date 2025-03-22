import { Op } from "sequelize";

export default class Usecase {
    constructor(model, exceptions) {
        this.model = model
        this.exceptions = exceptions || {}
    }
    bindPagination = (payload) => {
        let res = {}
        if (payload.page != null && payload.page != undefined && payload.page != 0) {
            payload.page = parseInt(payload.page)
            payload.limit = parseInt(payload.limit)
            
            res.limit = payload.limit ? payload.limit : 10
            res.offset = res.limit * (payload.page-1)
        }
        return res
    }
    bindFilter = (payload) => {
        let res = {}
        let def = this.defaultFilter(payload)
    
        for (const key in this.model.rawAttributes) {
            if (Object.hasOwnProperty.call(payload, key)) {
                switch (typeof payload[key]) {
                    case "object":
                        res[key] = {
                            [Op.in]: payload[key]
                        }
                        break;
                    default:
                        if (key.includes("_at")) {
                            if (payload[key].includes("T")) {
                                payload[key] = payload[key].split("T")[0]
                            }
                            res[Op.and] = [
                                Sequelize.where(Sequelize.fn("DATE_FORMAT", Sequelize.col(key), "%Y/%m/%d"), moment(payload[key]).format("YYYY/MM/DD"))
                            ]
                        } else {
                            res[key] = payload[key]
                        }
                        break;
                }
            }
        }

        for (const key in this.model.rawAttributes) {
            if (Object.hasOwnProperty.call(def, key) ) {
                res[Op.and] = {
                    ...res[Op.and],
                    [key]: def[key]
                }
            }
        }

        return res
    }
    defaultFilter = (payload, role = false) => {
        let user = payload.user
        if (!user) {
            return {}
        }

        let filter = {
        
        }
        
        return filter
    }
    bindSorting = (payload) => {
        let res = {}
        if (!payload.sort) {
            res.order = [
                ['id', 'desc']
            ]
            return res
        }
        let sorts = payload.sort
        if (sorts.length == 0) {
            res.order = [
                ['id', 'desc']
            ]
            return res
        }
        let keys = Object.keys(this.model.rawAttributes)
        sorts.forEach((v, i) => {
            let sort = JSON.parse(v)
            const index = keys.findIndex((key) => sort.key === key)
            if (index > -1) {
                if (!res.order)
                    res.order = []
                res.order.push([sort.key, sort.direction])
            }
        });

        if (!res.order) {
            res.order = [
                ['id', 'desc']
            ]
        }
        return res
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
            })
            if (!data) {
                throw new Error("data not found")
            }
            return data
        } catch (error) {
            throw error
        }
    }
    create = async (payload, options = {}) => {
        try {
            let body = {}
            for (const key in this.model.rawAttributes) {
                if (Object.hasOwnProperty.call(payload, key)) {
                    body[key] = payload[key]
                }
            }
            let data = await this.model.create(body, options)
            return data
        } catch (error) {
            throw error
        }
    }
    createBulk = async (payload, options = {}) => {
        try {
            let data = await this.model.bulkCreate(payload, options)
            return data
        } catch (error) {
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
                }
            })
            if (!data) {
                throw new Error("data not found")
            }
            for (const key in body) {
                if (Object.hasOwnProperty.call(data.toJSON(), key)) {
                    data[key] = body[key]
                }
            }
            data = await data.save(options)
            return data
        } catch (error) {
            throw error
        }
    }
    delete = async (id, options = {}) => {
        try {
            let data = await this.model.destroy({
                where: {
                    id,
                }
            }, options)
            return data
        } catch (error) {
            throw error
        }
    }
    injectInArray = async (items) => {
        try {
            if (items && items.length > 0) {
                const prom = items.map(async (item) => {
                    try {
                        item = await injectObject(item, true)
                        return item
                    } catch (error) {
                        throw error
                    }
                })
                items = await Promise.all(prom)
            }
            return items
        } catch (error) {
            throw error
        }
    }
    injectObject = async (item, list = false) => {
        try {
            //users
            if (item.created_by) {
                item.created_by = await repository.user.getOne(item.created_by)
            }
            if (item.updated_by) {
                item.updated_by = await repository.user.getOne(item.updated_by)
            }
            return item
        } catch (error) {
            throw error
        }
    }
}
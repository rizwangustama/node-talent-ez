import jsonwebtoken from 'jsonwebtoken';
import util from "util"
import config from 'config'

export const sign = async (data, privateKey) => {
    try {   
        const signOptions = config.get('jwt.options.create');
        const sign = util.promisify(jsonwebtoken.sign)
        let token = await sign(data, privateKey, signOptions)
        return token
    } catch (error) {
        throw error
    }
}

export const decode = async (token) => {
    try {   
        const decode = util.promisify(jsonwebtoken.decode)
        let data = await decode(token,{complete: true})
        return data
    } catch (error) {
        throw error
    }
}

export const verify = async (token,publicKey) => {
    try {   
        const ver = util.promisify(jsonwebtoken.verify)
        let data = await ver(token, publicKey, config.get('jwt.options.verify'))
        return data
    } catch (error) {
        throw error
    }
}
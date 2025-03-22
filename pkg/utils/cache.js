import logger from "./logger.js";
import cache from "./../config/cache.js"

export const handler =  async (req, res, next) => {
    if (['get'].includes(req.method.toLowerCase())) {
        const key = `${req.originalUrl}`;
        const value = cache.get(key);
        logger.info(`====>get caching ${key}`)
        logger.info(`====>get value ${value}`)
        if(value) {
            res.status(200).json({
                response: true,
                message: 'successfully retrieve',
                data: value,
            })
        } 
        next();
    } else {
        next();
    }
}

export const caching =  async (req, res) => {
    if (['get'].includes(req.method.toLowerCase())) {
        const key = `${req.originalUrl}`;
        logger.info(`====>set caching ${key}`)
        setTimeout(() => {  
            cache.set(key, res.outputData, 60*10) //10minutes
        }, 1000);
    }
}

export const clean =  (req, res) => {
    if (['post','put','patch','delete'].includes(req.method.toLowerCase())) {
        const prefix = `${req.path}`;
        cache
            .keys()
            .filter(key => key.startsWith(prefix))
            .forEach(key => cache.del(key));
    }
}
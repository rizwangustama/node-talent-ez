import config from 'config'
import logger from './../../pkg/utils/logger'
import {connection} from "./../../src/model";
import * as api from '../../src/deliveries/api';
import moment from "moment";

moment.suppressDeprecationWarnings = true;

const main = () => new Promise(async (resolve, reject) => {
    try {
        connection.sync({
            alter: true,
            // force: true,
        }).then(() => {
            logger.info(`Database ${config.get('server.database')} successfully syncronized`)
        }).catch(console.error)

        //api
        await api.run(config.get('server.port'))
        logger.info(`${config.get("server").name} listening on port ${config.get('server.port')}!`)

        resolve(null)
    } catch (error) {
        console.error(error)
        reject(error)
    }
})

main().then(() => {
    logger.info(`${config.get("server").name} version ${config.get("server").version} started`)
}).catch(error => {
    logger.error(error)
})
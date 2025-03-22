import { Op, Sequelize } from "sequelize";
import models from "../model";
import config from "config";
import * as constants from "./../constants";
import { sign } from "./../../pkg/utils/jwt";
import bcryptjs from "bcryptjs";

export class Auth  {
    constructor() {
    }

    login = async ({
        username, //phone, email
        password
    }) => {
        try {
            //getting users
            const user = await models.User.findOne({
                where: {
                    [Op.or]: [
                        {phone: username},
                        {email: username}
                    ],
                    status: constants.USER_STATUS_ACTIVE,
                }
            })

            //validate password
            const isValid = await bcryptjs.compare(`${password}${config.get("keys.secret")}`, user.password)
            if (!isValid) {
                throw new Error("invalid username or password")
            }

            //sign identity to token
            delete user.password
            const accessToken = await sign(user);

            //TODO: generate refresh token
            
            return {
                accessToken,
                refreshToken: "",
            }
        } catch (error) {
            throw error
        }
    }

    register = async ({
        phone,
        email,
        password,
    }) => {
        try {
            //getting users
            const count = await models.User.count({
                where: {
                    [Op.or]: [
                        {phone: phone},
                        {email: email}
                    ],
                    status: constants.USER_STATUS_ACTIVE,
                }
            })

            if (count > 0) {
                throw new Error("phone or email already exists")
            }

            //encode password
            const encodedPassword = await bcryptjs.hashSync(`${password}${config.get("keys.secret")}`, await bcryptjs.genSaltSync(10))

            //create use
            let user = await models.User.create({
                phone:phone,
                email:email,
                password: encodedPassword,
                status: constants.USER_STATUS_ACTIVE,
            })
            delete user.password

            return {
                user: user,
                accessToken: accessToken,
                refreshToken: "",
            }
        } catch (error) {
            throw error
        }
    }
}
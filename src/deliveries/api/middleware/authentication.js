import { 
  verify
} from "./../../../../pkg/utils/jwt";
import config from 'config'

const unathorized = "Unauthorized, invalid token"

export const jwt = async (req, res, next) => {
  if(!req.headers.authorization) {
    next(new Error(unathorized)) 
  }
  const token = req?.cookies?.rt || req.headers?.authorization?.split(' ')[1]
  
  try {
    let data = await verify(token, config.get('jwt.key.public'))
    req.session = data
    req.token = token
    next()
  } catch (e) {
    console.error("e", e);
    res.status(401)
    next(new Error(unathorized)) 
  }
}
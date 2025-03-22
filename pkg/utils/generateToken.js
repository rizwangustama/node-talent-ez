import jwt from 'jsonwebtoken'
import AuthUser from './../../src/repository/auth/user'
import config from 'config'

const generateToken = (user, type) => {
  const { id, is_admin, role_id, roles, unit_id, department_id } = user
  return jwt.sign(
    { id, is_admin, role_id, roles, unit_id, department_id }, 
    type === 'token' ? process.env.JWT_SECRET : process.env.REFRESH_SECRET, 
    { 
      expiresIn: '1d', 
    }
  )
}

const verifyToken = async (token, type) => {
  try {
    const serviceAuthUser = new AuthUser({
      token,
    })

    let claim = jwt.verify(
      token,
      type === 'token' ? config.get('jwt.secret') : config.get('jwt.refresh'),
    );

    return claim

    // let response = await serviceAuthUser.getUserProfile()
    // let user = response?.data?.data
    // return {
    //   ...user,
    //   // roles: claim.roles,
    //   // is_admin: claim.is_admin,
    //   // unit_id: claim.unit_id,
    // }
  } catch (error) {
    throw error
  }
}

export { 
  generateToken,
  verifyToken,
}

import jwt from 'jwt-simple'
import moment from 'moment'

const SECRET = process.env.SECRET

export const createToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, "day").unix()
    }

    return jwt.encode(payload, SECRET)
}
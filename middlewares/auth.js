import jwt from 'jwt-simple'
import moment from 'moment'


export const auth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({error: 'No tienes token en la cabecera'})
    }

    const formatedToken = req.headers.authorization.replace(/['"]+/g, '')

    try {
        const payload = jwt.decode(formatedToken, process.env.SECRET)
        if(payload.exp <= moment().unix()){
            return res.status(400).json({error: "Tokén expirado"})
        }
        req.user = payload
    } catch (error) {
        return res.status(400).json({error: "Tokén no válido"})
    }

    next()
}
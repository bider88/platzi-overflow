import Debug from 'debug'
import { key } from '../config'
import jwt from 'jsonwebtoken'

const debug = Debug('platzi-overflow:auth')

export const required = (req, res, next) => {
    jwt.verify(req.query.token, key, (err, token) => {
        if(err) {
            debug('JWTF was not encrypted with our key')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }

        debug(`Token verified ${token}`)
        req.user = token.user
        next()
    })
}